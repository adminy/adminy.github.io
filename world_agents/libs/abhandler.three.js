function ABHandlerClass() {
    this.PINCH_DELTA
    this.SCROLL_DELTA
    this.DRAG_DELTA
    this.startTheta
    this.startPhi
    this.startScreenX
    this.startScreenY
    this.startThreeX
    this.startThreeY
    this.startThreeZ
    this.isMouseDown = !1
    this.gap = -1
    this.multiTouchStarted = !1
    this.multiTouchExiting = !1
    this.events = new Array
    this.textDivs = new Array
    this.touchPinch = function (t, e, i, n) {
        var s = AB.distance2D(t, e, i, n); - 1 == this.gap ? this.gap = s : (s < this.gap && this.touchZoom(this.PINCH_DELTA), s > this.gap && this.touchZoom(-this.PINCH_DELTA), this.gap = s)
    }
    this.indexInCache = function (t) {
        for (var e = 0; e < this.events.length; e++)
            if (this.events[e].originalEvent.pointerId == t.originalEvent.pointerId) return e;
        return -1
    }
    this.initCameraDrag = function (t, e) {
        void 0 !== ABWorld.camera && (this.startTheta = ABWorld.theta, this.startPhi = ABWorld.phi, this.startScreenX = t, this.startScreenY = e, this.startThreeX = ABWorld.camera.position.x, this.startThreeY = ABWorld.camera.position.y, this.startThreeZ = ABWorld.camera.position.z)
    }
    this.cameraDrag = function (t, e) {
        if (void 0 !== ABWorld.camera) {
            var i = t - this.startScreenX,
                n = e - this.startScreenY;
            if (ABWorld.display3d) ABWorld.theta = this.startTheta - i / 2, ABWorld.phi = this.startPhi + n / 2, ABWorld.phi = Math.min(180, Math.max(0, ABWorld.phi)), ABWorld.updateCameraFrom(), ABWorld.render();
            else {
                var s = this.startThreeX - i * this.DRAG_DELTA,
                    r = this.startThreeZ - n * this.DRAG_DELTA;
                ABWorld.updateCameraXYZ(s, this.startThreeY, r), ABWorld.render()
            }
        }
    }
    this.cameraZoom = function (t) {
        if (void 0 !== ABWorld.camera) {
            var e = ABWorld.radius + t;
            Math.abs(e) > this.MAXCAMERAPOS || this.GROUNDZERO && e < 0 || (ABWorld.radius = e, ABWorld.display3d ? ABWorld.updateCameraFrom() : ABWorld.updateCameraXYZ(ABWorld.camera.position.x, ABWorld.radius, ABWorld.camera.position.z), ABWorld.render())
        }
    }
    this.mouseControlCanvasNow = !0
    this.SCROLLFACTOR = 1
    this.PINCHFACTOR = 1
    this.DRAGFACTOR = 1
    this.MAXCAMERAPOS = 0
    this.GROUNDZERO = !1
    this.init = function () {
        this.PINCH_DELTA = ABWorld.startRadius / 50 * this.PINCHFACTOR
        this.SCROLL_DELTA = ABWorld.startRadius / 20 * this.SCROLLFACTOR
        this.DRAG_DELTA = ABWorld.startRadius / 200 * this.DRAGFACTOR, 0 == this.MAXCAMERAPOS ? this.MAXCAMERAPOS = 2 * ABWorld.startRadius : this.MAXCAMERAPOS = Math.abs(this.MAXCAMERAPOS)
    }
    this.defaultMouse = function () {
        this.initMouseDrag = function (t, e) {
            this.initCameraDrag(t, e)
        }
        this.mouseDrag = function (t, e) {
            this.cameraDrag(t, e)
        }
        this.mouseZoom = function (t) {
            this.cameraZoom(t)
        }
    }
    this.defaultTouch = function () {
        this.initTouchDrag = function (t, e) {
            this.initCameraDrag(t, e)
        }
        this.touchDrag = function (t, e) {
            this.cameraDrag(t, e)
        }
        this.touchZoom = function (t) {
            this.cameraZoom(t)
        }
    }
    this.defaultMouse()
    this.defaultTouch()
    this.MouseDown = function (t) {
        this.isMouseDown = !0;
        var e = this.getX(t),
            i = this.getY(t);
        return this.initMouseDrag(e, i), t.preventDefault(), !1
    }
    this.MouseMove = function (t) {
        if (this.isMouseDown) {
            var e = this.getX(t),
                i = this.getY(t);
            this.mouseDrag(e, i)
        }
        return t.preventDefault(), !1
    }
    this.MouseUp = function (t) {
        return this.isMouseDown = !1, t.preventDefault(), !1
    }
    this.MouseWheel = function (t) {
        return t.originalEvent.deltaY < 0 ? this.mouseZoom(-this.SCROLL_DELTA) : this.mouseZoom(this.SCROLL_DELTA), t.preventDefault(), !1
    }
    this.PointerStart = function (t) {
        var e = this.getX(t),
            i = this.getY(t);
        return this.multiTouchExiting ? (t.preventDefault(), !1) : (0 == this.events.length ? (this.events.push(t), this.initTouchDrag(e, i)) : 1 == this.events.length && this.events[0].originalEvent.pointerId != t.originalEvent.pointerId && this.events.push(t), t.preventDefault(), !1)
    }
    this.PointerMove = function (t) {
        var e = this.getX(t),
            i = this.getY(t);
        if (this.multiTouchExiting) return t.preventDefault(), !1;
        var n = this.indexInCache(t);
        if (-1 == n) return t.preventDefault(), !1;
        if (this.events[n] = t, 1 == this.events.length) this.touchDrag(e, i);
        else if (this.events.length > 1) {
            var s = this.getX(this.events[0]),
                r = this.getY(this.events[0]),
                o = this.getX(this.events[1]),
                a = this.getY(this.events[1]);
            this.touchPinch(s, r, o, a)
        }
        return t.preventDefault(), !1
    }
    this.PointerEnd = function (t) {
        var e = this.indexInCache(t);
        return -1 == e ? (t.preventDefault(), !1) : (this.events.length > 1 ? (this.multiTouchExiting = !0, this.gap = -1) : this.multiTouchExiting = !1, this.events.splice(e, 1), t.preventDefault(), !1)
    }
    this.getTouchX = function (t) {
        return t.originalEvent.changedTouches[0].pageX
    }
    this.getTouchY = function (t) {
        return t.originalEvent.changedTouches[0].pageY
    }
    this.TouchStart = function (t) {
        var e = this.getTouchX(t),
            i = this.getTouchY(t);
        return this.multiTouchExiting ? (t.preventDefault(), !1) : (t.originalEvent.touches.length > 1 ? this.multiTouchStarted = !0 : this.initTouchDrag(e, i), t.preventDefault(), !1)
    }
    this.TouchMove = function (t) {
        var e = this.getTouchX(t),
            i = this.getTouchY(t);
        if (this.multiTouchExiting) return t.preventDefault(), !1;
        if (1 == t.originalEvent.touches.length) this.touchDrag(e, i);
        else if (t.originalEvent.touches.length > 1) {
            var n = t.originalEvent.touches[0].pageX,
                s = t.originalEvent.touches[0].pageY,
                r = t.originalEvent.touches[1].pageX,
                o = t.originalEvent.touches[1].pageY;
            this.touchPinch(n, s, r, o)
        }
        return t.preventDefault(), !1
    }
    this.TouchEnd = function (t) {
        return this.multiTouchStarted && (t.originalEvent.touches.length > 0 ? (this.multiTouchExiting = !0, this.gap = -1) : (this.multiTouchExiting = !1, this.multiTouchStarted = !1)), t.preventDefault(), !1
    }
    this.getX = function (t) {
        return t.pageX
    }
    this.getY = function (t) {
        return t.pageY
    }
    this.onCanvas = function (t) {
        return "threepage" === t.target.id ? (this.mouseControlCanvasNow || (this.mouseControlCanvasNow = !0, this.selectOff()), !0) : (this.mouseControlCanvasNow && (this.mouseControlCanvasNow = !1, this.selectOn()), !1)
    }
    this.selectOff = function () {
        for (var t = 0; t < this.textDivs.length; t++) this.textDivs[t].css("user-select", "none")
    }
    this.selectOn = function () {
        for (var t = 0; t < this.textDivs.length; t++) this.textDivs[t].css("user-select", "auto")
    }
    this.setupDiv = function (t) {
        var e = t.attr("id");
        "wrapper" !== e && "threecanvas" !== e && ("threepage" !== e ? this.setupTextDiv(t) : this.setupCanvasDiv(t))
    }
    this.setupCanvasDiv = function (t) {
        AB.onDesktop() ? (t.on("wheel", function (t) {
            if (ABHandler.onCanvas(t)) return ABHandler.MouseWheel(t)
        }), t.mousedown(function (t) {
            if (ABHandler.onCanvas(t)) return ABHandler.MouseDown(t)
        }), t.mousemove(function (t) {
            if (ABHandler.onCanvas(t)) return ABHandler.MouseMove(t)
        }), t.mouseup(function (t) {
            if (ABHandler.onCanvas(t)) return ABHandler.MouseUp(t)
        }), t.mouseleave(function (t) {
            if (ABHandler.onCanvas(t)) return ABHandler.MouseUp(t)
        }), t.mouseout(function (t) {
            if (ABHandler.onCanvas(t)) return ABHandler.MouseUp(t)
        })) : (t.css("touch-action", "none"), "onpointerdown" in window ? (t.on("pointerdown", function (t) {
            if (ABHandler.onCanvas(t)) return ABHandler.PointerStart(t)
        }), t.on("pointermove", function (t) {
            if (ABHandler.onCanvas(t)) return ABHandler.PointerMove(t)
        }), t.on("pointerup", function (t) {
            if (ABHandler.onCanvas(t)) return ABHandler.PointerEnd(t)
        }), t.on("pointercancel", function (t) {
            if (ABHandler.onCanvas(t)) return ABHandler.PointerEnd(t)
        }), t.on("pointerout", function (t) {
            if (ABHandler.onCanvas(t)) return ABHandler.PointerEnd(t)
        }), t.on("pointerleave", function (t) {
            if (ABHandler.onCanvas(t)) return ABHandler.PointerEnd(t)
        })) : (t.on("touchstart", function (t) {
            if (ABHandler.onCanvas(t)) return ABHandler.TouchStart(t)
        }), t.on("touchmove", function (t) {
            if (ABHandler.onCanvas(t)) return ABHandler.TouchMove(t)
        }), t.on("touchend", function (t) {
            if (ABHandler.onCanvas(t)) return ABHandler.TouchEnd(t)
        }), t.on("touchcancel", function (t) {
            if (ABHandler.onCanvas(t)) return ABHandler.TouchEnd(t)
        })))
    }
    this.setupTextDiv = function (t) {
        AB.onDesktop() && this.textDivs.push(t)
    }
}
var ABHandler = new ABHandlerClass;