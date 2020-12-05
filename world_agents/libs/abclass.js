function ABClass() {
    this.LOGO_PNG = "images/logo.earth.png"
    this.RUNLOGO_PNG = "images/logo.blue.png"
    this.LOGO_MOBILE_PNG = "images/logo.mobile.3.transp.png"
    this.tickyes = "<img align=absmiddle src=images/tick.yes.png>  &nbsp; "
    this.tickno = "<img align=absmiddle src=images/tick.info.png> &nbsp; "
    this.WORLDIMAGE_WIDTH = 900
    this.WORLDIMAGE_HEIGHT = 600
    this.RUNHEADER_MARGIN = "20"
    this.RUNHEADER_MARGIN_NO = 20
    this.RUN_NORMAL = 0
    this.RUN_GENERATE_IMAGE = 1
    this.RUN_GENERATE_SCORE = 2
    this.NOUSERSPANS = 50
    this.RC_SUCCESS = 0
    this.RC_FAIL = -1
    this.RC_NOT_NEEDED = 1
    this.RC_LOGIN_FAIL = 2
    this.RC_WARN = 3
    this.RC_BLOCK = 4
    this.RC_QUOTA = 5
    this.RC_MAX = 6
    this.RC_MAXIMAGE = 7
    this.RC_DIMENSIONS = 8
    this.RC_WRITEFAIL = 100
    this.RC_SYSFAIL = 101
    this.RC_OBFUSCATE = 102
    this.RC_FAIL_WORLD = 200
    this.RC_FAIL_MIND = 201
    this.RC_FAIL_USER = 202
    this.RC_FAIL_TITLE = 203
    this.RC_FAIL_UPLOAD = 204
    this.RC_FAIL_MIME = 205
    this.RC_FAIL_DESCRIPTION = 206
    this.RC_FAIL_JSON = 207
    this.RC_FILENAME = 208
    this.RC_FILEEXISTS = 209
    this.RC_EXISTS_USER = 300
    this.RC_NONEXIST_USER = 301
    this.RC_EXISTS_DATA = 302
    this.RC_NONEXIST_DATA = 303
    this.RC_TICKET = 400
    this.RC_NEWSCORE = 500
    this.RC_NONEWSCORE = 501
    this.timer
    this.running = !1
    this.step
    this.socket
    this.clockTick = 100
    this.maxSteps = 1e3
    this.screenshotStep = 50
    this.drawRunControls = !0
    this.runReady = !0
    this.abortRun = !1
    this.loggedin = !1
    this.runloggedin = !1
    this.mode = this.RUN_NORMAL
    this.forceGenerateImage = !1
    this.headerSetManually = !1
    this.world = new Object
    this.mind = new Object
    this.worldid = "none"
    this.worldtitle = "none"
    this.worldtype = "none"
    this.api = "none"
    this.mindid = "none"
    this.mindtitle = "none"
    this.topmind = "none"
    this.topmymind = "none"
    this.userid = "none"
    this.myuserid = "none"
    this.username = "none"
    this.myusername = "none"
    this.country = "none"
    this.likes = 0
    this.ticket = 0
    this.scoreticket = 0
    this.imageticket = 0
    this.dataticket = 0
    this.url = "https://" + this.THESERVER
    this.webpage = !1
    this.onDesktop = function () {
        return void 0 === window.orientation
    }
    this.onMobile = function () {
        return !this.onDesktop()
    }
    this.insideIframe = function () {
        return window.location !== window.parent.location
    }
    this.portraitMode = function () {
        return window.screen.width < window.screen.height
    }
    this.isIE = function () {
        var t = window.navigator.userAgent;
        return -1 != t.indexOf("MSIE") || -1 != t.indexOf("Trident")
    }
    this.isWindowsPhone = function () {
        return -1 != window.navigator.userAgent.indexOf("Windows Phone")
    }
    this.isAndroid = function () {
        return -1 != window.navigator.userAgent.indexOf("Android")
    }
    this.browserWarn = function (t) {
        document.write(" <div class='browserwarn' > " + t + " </div> ")
    }
    this.browserWarnLarge = function (t) {
        document.write(" <div class='browserwarn' style='padding:50px;' > " + AB.tickno + " " + t + " </div> ")
    }
    this.displayBrowserWarnings = function () {
        Modernizr.webgl ? Modernizr.canvas ? this.isIE() ? this.browserWarnLarge("Warning: This site does not work on IE.") : this.isWindowsPhone() ? this.browserWarnLarge("Warning: This site does not work on Windows Phone.") : Modernizr.flexbox && Modernizr.flexwrap || this.browserWarnLarge("Warning: Your browser does not support Flexbox. This site will not display nicely.") : this.browserWarnLarge("Warning: Your browser does not support canvas. This site will not work.") : this.browserWarnLarge("Warning: Your browser does not support WebGL. This site will not work.")
    }
    this.displayAndroidWarning = function () {
        this.isAndroid() && this.browserWarn("Warning: Copy-and-paste does not work on Android.")
    }
    this.printIcon = function (t, n) {
        var e = "https://" + AB.THESERVER,
            o = "<img  style='border:none;" + n + "'   \twidth=30  src='" + t + "'>";
        document.write(" <a title='World Agents home' href='" + e + "' >" + o + "</a> ")
    }
    this.printNameIcon = function (t, n) {
        var e = "https://" + AB.THESERVER;
        document.write(" <span class=logo-text > <a title='World Agents home' href='" + e + "' style='text-decoration: none;' >Ancient&nbsp;Brain</a> </span> ")
        this.printIcon(t, n)
    }
    this.printMobileLogo = function () {
        var t = "https://" + AB.THESERVER,
            n = "<img  style='border:none; vertical-align:middle; max-width:20vw; max-height:60px;'   src='" + AB.LOGO_MOBILE_PNG + "'>";
        document.write(" <a title='World Agents home' href='" + t + "' >" + n + "</a> ")
    }
    this.launchWorld = function (t, n) {
        return " <div class=runimgdiv> " + ("<a href='" + ("https://" + AB.RUNSERVER + "/run.php?world=" + t) + "'><img src='" + ("https://" + AB.THESERVER + "/worldpics/" + t + ".jpg") + "'></a>") + " </div>  <div style='font-size:smaller; width:220;' class=wrapbox > World: " + ("<a href='" + ("https://" + AB.THESERVER + "/world.php?world=" + t) + "'>" + n + "</a>") + " </div> "
    }
    this.launchWorldMind = function (t, n, e, o) {
        return " <div class=runimgdiv> " + ("<a href='" + ("https://" + AB.RUNSERVER + "/run.php?world=" + t + "&mind=" + e) + "'><img src='" + ("https://" + AB.THESERVER + "/worldpics/" + t + ".jpg") + "'></a>") + " </div>  <div style='font-size:smaller; width:220;' class=wrapbox > World: " + ("<a href='" + ("https://" + AB.THESERVER + "/world.php?world=" + t) + "'>" + n + "</a>") + " <br> Mind: " + ("<a href='" + ("https://" + AB.THESERVER + "/mind.php?mind=" + e) + "'>" + o + "</a>") + " </div> "
    }
    this.audioIsPlaying = function (t) {
        return t.currentTime > 0 && !t.paused && !t.ended
    }
    this.printRecurse = function (t, n, e) {
        void 0 === e && (e = 0), "undefined" == typeof maxlevel && (n = 0);
        var o = "";
        0 == e && (o = "<pre>");
        for (var i = "<br>", a = 0; a < e; a++) i += "    ";
        if (0 != n && e >= n) return o += i + "...<br>";
        for (var r in t) switch (typeof t[r]) {
            case "string":
            case "number":
            case "boolean":
                o += i + r + ": " + t[r] + " <br>";
                break;
            case "object":
            default:
                o += i + r + ": [ <br>" + this.printRecurse(t[r], n, e + 1) + i + "]</br>"
        }
        return 0 == e && (o += "</pre>"), o
    }
    this.randomFloatAtoB = function (t, n) {
        return t + Math.random() * (n - t)
    }
    this.randomIntAtoB = function (t, n) {
        return Math.round(this.randomFloatAtoB(t, n))
    }
    this.randomEventProb = function (t) {
        return Math.random() < t
    }
    this.randomBoolean = function () {
        return Math.random() < .5
    }
    this.randomPick = function (t, n) {
        return this.randomBoolean() ? t : n
    }
    this.randomPick3 = function (t, n, e) {
        var o = Math.random();
        return o < 1 / 3 ? t : o > 2 / 3 ? n : e
    }
    this.randomElementOfArray = function (t) {
        return t[this.randomIntAtoB(0, t.length - 1)]
    }
    this.distance2D = function (t, n, e, o) {
        var i = t - e,
            a = n - o;
        return Math.sqrt(i * i + a * a)
    }
    this.vector3toString = function (t) {
        var n = Math.floor(t.x);
        xs = n.toString(), xs = xs.padStart(5);
        var e = Math.floor(t.y);
        ys = e.toString(), ys = ys.padStart(5);
        var o = Math.floor(t.z);
        return zs = o.toString(), zs = zs.padStart(5), "(" + xs + "," + ys + "," + zs + ")"
    }
    this.escapeHTML = function (t) {
        return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
    }
    this.escapeHTMLshort = function (t) {
        return t.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }
    this.newDiv = function (t) {
        var n = document.createElement("div");
        n.id = t;
        var e = document.getElementById("threepage");
        e ? e.appendChild(n) : document.body.appendChild(n)
    }
}
var AB = new ABClass;
AB.socketStart = function (t = !1) {
    $.getScript(AB.WEBSOCKET_JS, function () {
        AB.socket = io.connect(AB.WEBSOCKET_URL)
        AB.socket.on("connect", function (n) {
            AB.socket.emit(AB.WEBSOCKET_CONTROL, {
                register: !0,
                worldid: AB.worldid,
                userid: AB.myuserid,
                username: AB.myusername,
                roomlist: t
            })
        })
        AB.socket.on("connect_error", function (t) {
            console.log("Websocket server is down")
        })
        AB.socket.on("connect_timeout", function (t) {
            console.log("Websocket server is down")
        })
        AB.socket.on(AB.WEBSOCKET_NORMAL, function (t) {
            AB.socketIn(t)
        })
        AB.socket.on(AB.WEBSOCKET_CONTROL, function (t) {
            t.roomlist && AB.socketRoomlist(t.payload), t.userlist && AB.socketUserlist(t.payload)
        })
    })
}
AB.socketIn = function (t) {}
AB.socketRoomlist = function (t) {}
AB.socketUserlist = function (t) {}
AB.socketOut = function (t) {
    AB.socket ? AB.socket.emit(AB.WEBSOCKET_NORMAL, {
        worldid: AB.worldid,
        payload: t
    }) : console.log("Socket is not ready yet.")
}
AB.endCondition = function () {
    return AB.step > AB.maxSteps || (!(void 0 === AB.world.endCondition || !AB.world.endCondition) || AB.abortRun)
}
AB.controlRun = function () {
    if (!AB.running) {
        AB.timer = setInterval(AB.nextStep, AB.clockTick)
        AB.running = !0
    }
}
AB.controlPause = function () {
    if (AB.running) {
        clearInterval(AB.timer)
        AB.running = !1
    }
}
AB.controlStep = function () {
    AB.running || AB.nextStep()
}
AB.writeUserSpans = function () {
    for (var t = 1; t <= AB.NOUSERSPANS; t++) document.write(" <span id='user_span" + t + "'> </span> ")
}
AB.msg = function (t, n = 1) {
    $("#user_span" + n).html(t)
}
AB.apimsg = function (t, n = 1) {
    // document.getElementById("api_span" + n).innerHTML = t
}
AB.closeMe = function () {
    try {
        window.close()
    } catch (t) {
        console.log(t)
    }
    try {
        self.close()
    } catch (t) {
        console.log(t)
    }
    $("#closebutton").hide()
}
AB.newSplash = function (t = "") {
    if (AB.splashBlockPage()) {
       AB.newDiv("splash")
       $("#splash").addClass("splash splash-dimensions innerdiv-horizcenter")
       // AB.insideIframe()
       $("#splash").html(" <div id='splash-inner' class='splash-inner' >  <p  style='font-size:20px;'  class=logo-text >" + AB.worldtitle + "</p> <p> <button   id=splashbutton class=largenormbutton >Start</button> </p> <p> " + t + " </p>  </div> ")
    } else {
        var n, e, o = "https://" + AB.THESERVER + "/worldpics/" + AB.worldid + ".jpg";
        AB.onDesktop() ? (n = "max-width:20vw;", e = "<div class='user-submitted'  style='max-width: 40vw;'  >") : (n = "max-width:35vw;", e = "<div class='user-submitted'  style='max-width: 60vw;'  >"), $("#splash").html(" <div id='splash-inner' class='splash-inner' >  <p  style='font-size:30px;'  class=logo-text >" + AB.worldtitle + "</p> <p> <img style='" + n + "' border=1 src='" + o + "'> </p>  <p> <button    id=splashbutton class=largenormbutton >Start</button> </p> " + e + t + " </div>  </div> ")
    }
}
AB.splashBlockPage = function () {
    AB.newDiv("splashblock")
    document.getElementById("splashblock").classList.add("fullpage-alert")
}
AB.removeSplash = function () {
    $("#splashblock").remove(), $("#splash").remove()
}
AB.loadingScreen = function () {
    AB.loadingBlockPage()
    AB.newDiv("loading")
    const loading = document.getElementById('loading')
    loading.classList.add('loading')
    loading.classList.add(AB.onMobile() ? 'mobile-alert' : 'desktop-alert')
    loading.classList.add('innerdiv-horizcenter')
    
    if(AB.insideIframe()) {
        loading.innerHTML = " <div id=loadingcontent  class='loading-inner' >  <div  style='font-size: 20px;'  class=logo-text > <p> Loading ... </p> </div>  <img  src='images/loading.gif'>  </div> "
    } else {
        loading.innerHTML = " <div id=loadingcontent  class='loading-inner' >  <img  width=40 src='" + AB.LOGO_PNG + "'>  <div  style='font-size: 20px;'  class=logo-text > <p> World Agents </p> <p> Loading ... </p> </div>  <img  src='images/loading.gif'>  </div> "
    }
}
AB.loadingBlockPage = function () {
    AB.newDiv("loadingblock")
    document.getElementById("loadingblock").classList.add("fullpage-alert")
}
AB.removeLoading = function () {
    document.getElementById("loadingblock").style.display = 'none'
    document.getElementById("loading").style.display = 'none'
}
AB.stopEverything = function () {
    for (var t = 1; t < 1e5; t++) clearInterval(t);
    window.setTimeout = function () {}, window.setInterval = function () {};
    var n = document.getElementsByTagName("audio");
    for (t = 0; t < n.length; t++) n[t].pause();
    Object.keys(window).forEach(function (t) {
        var n = window[t];
        n instanceof Audio && n.pause()
    })
}
AB.isScreenshotRun = function () {
    return AB.mode == AB.RUN_GENERATE_IMAGE
}

AB.runheaderNormal = function () {
    // document.getElementById("minirunheaderbox").style.display = 'none'
    document.getElementById("runheaderbox").style.display = 'block'
}

AB.showRunHeader = function () {
    AB.runheaderNormal()
}
AB.dumpCanvas = function (t) {
    var n = document.createElement("img");
    n.src = t.toDataURL(), document.getElementById("runheaderbox").appendChild(n)
}
AB.preserveDrawingBufferCheck = function (t) {
    var n = t.getContext("webgl");
    return !n || !!n.getContextAttributes().preserveDrawingBuffer
}
AB.uploadPicture = function () {
    AB.uploadPictureFromCanvas()
}
AB.uploadPictureFromCanvas = function () {
    var t;
    if ((t = void 0 !== ABWorld.canvas ? ABWorld.canvas : document.getElementsByTagName("canvas")[0]) instanceof HTMLCanvasElement)
        if (AB.preserveDrawingBufferCheck(t)) {
            var n = AB.getMiniCanvas(t);
            n instanceof HTMLCanvasElement ? (AB.ajaxMsgSuccess("Sending canvas screenshot to server."), n.toBlob(AB.uploadBlob, "image/jpeg")) : AB.ajaxMsgFail("Error taking screenshot. Canvas found, but cannot get cropped segment of canvas.")
        } else AB.ajaxMsgFail('Error taking screenshot. World code needs to set "preserveDrawingBuffer" to true. For more, see the API documentation.');
    else AB.ajaxMsgFail("Error taking screenshot. Cannot find canvas.")
}
AB.getMiniCanvas = function (t) {
    var n = document.createElement("canvas");
    n.width = AB.WORLDIMAGE_WIDTH, n.height = AB.WORLDIMAGE_HEIGHT;
    var e = Math.trunc((t.width - AB.WORLDIMAGE_WIDTH) / 2),
        o = Math.trunc((t.height - AB.WORLDIMAGE_HEIGHT) / 2),
        i = AB.WORLDIMAGE_WIDTH,
        a = AB.WORLDIMAGE_HEIGHT,
        r = AB.WORLDIMAGE_WIDTH,
        s = AB.WORLDIMAGE_HEIGHT,
        d = n.getContext("2d");
    try {
        d.drawImage(t, e, o, i, a, 0, 0, r, s)
    } catch (t) {
        return console.error(t.message), null
    }
    return n
}	
