function ABWorldClass() {
    this.INIT_3D_THETA = 45
    this.INIT_3D_PHI = 80
    this.INIT_FOV = 75
    this.INIT_NEAR = 1
    this.scene
    this.camera
    this.renderer
    this.canvas
    this.startRadius
    this.maxRadius
    this.display3d = !0
    this.drawCameraControls = !0
    this.follow = new THREE.Vector3
    this.lookat = new THREE.Vector3
    this.radius
    this.theta
    this.phi
    this.cameramotion
    this.init = function (t) {
        this.renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: false })
        this.renderer.setClearColor(t, 1)
        this.canvas = this.renderer.domElement
        document.getElementById('scene').appendChild(this.canvas)
        this.createScene()
        this.camera = new THREE.PerspectiveCamera(this.INIT_FOV, 1, this.INIT_NEAR, this.maxRadius)
        this.scene.add(this.camera)
        this.setSize()
        this.resetCamera()
        
        // this.lookat.copy(this.scene.position)
        // this.follow.copy(this.scene.position)

        //AB.onDesktop() ? window.addEventListener("resize", function () {
        //     ABWorld.setSize()
        // }) : window.addEventListener("orientationchange", function () {
        //     ABWorld.setSize()
        // })
    }
    this.render = function () {
        this.camera.lookAt(this.scene.position)
        this.renderer.render(this.scene, this.camera)
    }
    this.setSize = function () {
        var t, i;
         (AB.onDesktop() ? (t = window.innerWidth, i = window.innerHeight) : (t = window.screen.width, i = window.screen.height), this.camera.aspect = t / i, this.camera.updateProjectionMatrix(), this.renderer.setSize(t, i), AB.showRunHeader())
    }
    this.init3d = function (t, i, e) {
        "string" == typeof e && (e = new THREE.Color(e.toLowerCase())), this.startRadius = Math.abs(t), this.maxRadius = Math.abs(i), this.display3d = !0, this.init(e), ABHandler.init()
    }
    this.init2d = function (t, i, e) {
        "string" == typeof e && (e = new THREE.Color(e.toLowerCase())), this.startRadius = Math.abs(t), this.maxRadius = Math.abs(i), this.display3d = !1, this.init(e), ABHandler.init()
    }
    this.updateCameraFrom = function () {
        (this.camera.position.x = this.radius * Math.sin(this.theta * Math.PI / 360) * Math.cos(this.phi * Math.PI / 360), this.camera.position.y = this.radius * Math.sin(this.phi * Math.PI / 360), this.camera.position.z = this.radius * Math.cos(this.theta * Math.PI / 360) * Math.cos(this.phi * Math.PI / 360), this.camera.updateMatrix())
    }
    this.updateCameraXYZ = function (t, i, e) {
        (this.camera.position.x = t, this.camera.position.y = i, this.camera.position.z = e, this.camera.updateMatrix())
    }
    this.resetCameraFrom = function () {
        this.radius = this.startRadius, this.theta = this.INIT_3D_THETA, this.phi = this.INIT_3D_PHI, this.updateCameraFrom()
    }
    this.resetCameraXYZ = function () {
        this.radius = this.startRadius, this.updateCameraXYZ(0, this.radius, 0)
    }
    this.resetCamera = function () {
        this.display3d ? this.resetCameraFrom() : this.resetCameraXYZ()
    }
    this.cameraTrack = function () {
        this.cameramotion = "track", this.resetCamera()
    }
    this.cameraMove = function () {
        this.cameramotion = "move"
    }
    this.cameraFixed = function () {
        this.cameramotion = "fixed", this.resetCamera()
    }
    this.objectXsize = function (t) {
        var i = (new THREE.Box3).setFromObject(t);
        return i.max.x - i.min.x
    }
    this.objectYsize = function (t) {
        var i = (new THREE.Box3).setFromObject(t);
        return i.max.y - i.min.y
    }
    this.objectZsize = function (t) {
        var i = (new THREE.Box3).setFromObject(t);
        return i.max.z - i.min.z
    }
    this.intersectObject = function (t, i, e) {
        var s = new THREE.Vector2(t / this.canvas.width * 2 - 1, -i / this.canvas.height * 2 + 1),
            a = new THREE.Raycaster;
        return a.setFromCamera(s, this.camera), a.intersectObject(e)
    }
    this.hitsObjectPoint = function (t, i, e) {
        var s = this.intersectObject(t, i, e);
        return s.length ? s[0].point : null
    }
    this.hitsObject = function (t, i, e) {
        return !!this.intersectObject(t, i, e).length
    }
}
var ABWorld = new ABWorldClass;