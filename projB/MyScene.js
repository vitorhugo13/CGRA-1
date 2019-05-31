/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.initMaterials();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        this.updatePeriod = 50; // miliseconds
        this.setUpdatePeriod(this.updatePeriod);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        //this.plane = new Plane(this, 32);

        this.bird=new MyBird(this,this.body, this.eyes, this.nose);
        this.terrain = new MyTerrain(this);
        this.house = new MyHouse(this, this.rooft, this.houset, this.pillart);
        this.cubeMap = new MyCubeMap(this);
        this.branches = [];
        this.branches.push(new MyTreeBranch(this, -9, -0.3, 0, 0, this.stick, this.stickSide));
        this.branches.push(new MyTreeBranch(this, -3, -0.3, 3, 1.2, this.stick, this.stickSide));
        this.branches.push(new MyTreeBranch(this, -4, -0.3, -4, Math.PI+2.14, this.stick, this.stickSide));
        this.branches.push(new MyTreeBranch(this, 8, -0.3, 3.5, Math.PI, this.stick, this.stickSide));
        
        this.nest = new MyNest(this, -4, -0.7, -18, this.stickSide);
        
        this.lightning = new MyLightning(this);
        this.startLightingAnimation = false;
        this.displayLightning = false;

        this.tree = new MyLSPlant(this);
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(45, 45, 45), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    checkKeys() {
        var text = "Keys pressed: ";
        var keysPressed = false;
        // Check for key codes e.g. in ​https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            text += " W ";
            keysPressed = true;
            this.bird.accelerate(0.3);
        }
        if (this.gui.isKeyPressed("KeyS")) {
            text += " S ";
            keysPressed = true;
            this.bird.accelerate(-0.3);
        }
        if (this.gui.isKeyPressed("KeyA")) {
            text += " A ";
            keysPressed = true;
            this.bird.turn(Math.PI / 10);
        }
        if (this.gui.isKeyPressed("KeyD")) {
            text += " D ";
            keysPressed = true;
            this.bird.turn(- Math.PI / 10);            
        }
        if (this.gui.isKeyPressed("KeyR")) {
            text += " R ";
            keysPressed = true;
            this.bird.reset();
        }
        if (this.gui.isKeyPressed("KeyP")) {
            text += " P ";
            keysPressed = true;
            this.bird.descend();
        }
        if (this.gui.isKeyPressed("KeyL")) {
            text += " L ";
            keysPressed = true;
            if (!this.displayLightning)
                this.startLightingAnimation = true;
        }

        if (keysPressed) {
            console.log(text);
        }  
    }

    update(t){
        this.checkKeys();
        this.bird.update(t);

        if (this.startLightingAnimation) {
            this.startLightingAnimation = false;
            this.displayLightning = true;
            this.lightning.startAnimation(t);
        }

        if (!this.displayLightning)
            return;
        this.lightning.update(t);
    }

    initMaterials(){

        // body of bird texture
        this.body = new CGFappearance(this);
        this.body.setAmbient(0.1, 0.1, 0.1, 1);
        this.body.setDiffuse(0.9, 0.9, 0.9, 1);
        this.body.setSpecular(0.1, 0.1, 0.1, 1);
        this.body.setShininess(10.0);
        this.body.loadTexture('textures/bird/body.jpg');
        this.body.setTextureWrap('REPEAT', 'REPEAT');

        // eyes of bird texture
        this.eyes = new CGFappearance(this);
        this.eyes.setAmbient(0.1, 0.1, 0.1, 1);
        this.eyes.setDiffuse(0.9, 0.9, 0.9, 1);
        this.eyes.setSpecular(0.1, 0.1, 0.1, 1);
        this.eyes.setShininess(10.0);
        this.eyes.loadTexture('textures/bird/eyes.jpg');
        this.eyes.setTextureWrap('REPEAT', 'REPEAT');

        // nose of bird texture
        this.nose = new CGFappearance(this);
        this.nose.setAmbient(0.1, 0.1, 0.1, 1);
        this.nose.setDiffuse(0.9, 0.9, 0.9, 1);
        this.nose.setSpecular(0.1, 0.1, 0.1, 1);
        this.nose.setShininess(10.0);
        this.nose.loadTexture('textures/bird/nose.jpg');
        this.nose.setTextureWrap('REPEAT', 'REPEAT');

        //house roof texture
        this.rooft = new CGFappearance(this);
        this.rooft.setAmbient(0.1, 0.1, 0.1, 1);
        this.rooft.setDiffuse(0.9, 0.9, 0.9, 1);
        this.rooft.setSpecular(0.1, 0.1, 0.1, 1);
        this.rooft.setShininess(10.0);
        this.rooft.loadTexture('textures/house/roof.jpg');
        this.rooft.setTextureWrap('REPEAT', 'REPEAT');

        //house texture
        this.houset = new CGFappearance(this);
        this.houset.setAmbient(0.1, 0.1, 0.1, 1);
        this.houset.setDiffuse(0.9, 0.9, 0.9, 1);
        this.houset.setSpecular(0.1, 0.1, 0.1, 1);
        this.houset.setShininess(10.0);
        this.houset.loadTexture('textures/house/wall.jpg');
        this.houset.setTextureWrap('REPEAT', 'REPEAT');

        //house pillar texture
        this.pillart = new CGFappearance(this);
        this.pillart.setAmbient(0.1, 0.1, 0.1, 1);
        this.pillart.setDiffuse(0.9, 0.9, 0.9, 1);
        this.pillart.setSpecular(0.1, 0.1, 0.1, 1);
        this.pillart.setShininess(10.0);
        this.pillart.loadTexture('textures/house/pillar.jpg');
        this.pillart.setTextureWrap('REPEAT', 'REPEAT');

            //house roof texture
        this.rooft = new CGFappearance(this);
        this.rooft.setAmbient(0.1, 0.1, 0.1, 1);
        this.rooft.setDiffuse(0.9, 0.9, 0.9, 1);
        this.rooft.setSpecular(0.1, 0.1, 0.1, 1);
        this.rooft.setShininess(10.0);
        this.rooft.loadTexture('textures/house/roof.jpg');
        this.rooft.setTextureWrap('REPEAT', 'REPEAT');

        //house texture
        this.houset = new CGFappearance(this);
        this.houset.setAmbient(0.1, 0.1, 0.1, 1);
        this.houset.setDiffuse(0.9, 0.9, 0.9, 1);
        this.houset.setSpecular(0.1, 0.1, 0.1, 1);
        this.houset.setShininess(10.0);
        this.houset.loadTexture('textures/house/wall.jpg');
        this.houset.setTextureWrap('REPEAT', 'REPEAT');

        //house pillar texture
        this.pillart = new CGFappearance(this);
        this.pillart.setAmbient(0.1, 0.1, 0.1, 1);
        this.pillart.setDiffuse(0.9, 0.9, 0.9, 1);
        this.pillart.setSpecular(0.1, 0.1, 0.1, 1);
        this.pillart.setShininess(10.0);
        this.pillart.loadTexture('textures/house/pillar.jpg');
        this.pillart.setTextureWrap('REPEAT', 'REPEAT');

        //house roof texture
        this.rooft = new CGFappearance(this);
        this.rooft.setAmbient(0.1, 0.1, 0.1, 1);
        this.rooft.setDiffuse(0.9, 0.9, 0.9, 1);
        this.rooft.setSpecular(0.1, 0.1, 0.1, 1);
        this.rooft.setShininess(10.0);
        this.rooft.loadTexture('textures/house/roof.jpg');
        this.rooft.setTextureWrap('REPEAT', 'REPEAT');

        //house texture
        this.houset = new CGFappearance(this);
        this.houset.setAmbient(0.1, 0.1, 0.1, 1);
        this.houset.setDiffuse(0.9, 0.9, 0.9, 1);
        this.houset.setSpecular(0.1, 0.1, 0.1, 1);
        this.houset.setShininess(10.0);
        this.houset.loadTexture('textures/house/wall.jpg');
        this.houset.setTextureWrap('REPEAT', 'REPEAT');

        //house pillar texture
        this.pillart = new CGFappearance(this);
        this.pillart.setAmbient(0.1, 0.1, 0.1, 1);
        this.pillart.setDiffuse(0.9, 0.9, 0.9, 1);
        this.pillart.setSpecular(0.1, 0.1, 0.1, 1);
        this.pillart.setShininess(10.0);
        this.pillart.loadTexture('textures/house/pillar.jpg');
        this.pillart.setTextureWrap('REPEAT', 'REPEAT');

        this.day = new CGFappearance(this);
        this.day.setAmbient(0.1, 0.1, 0.1, 1);
        this.day.setDiffuse(0.9, 0.9, 0.9, 1);
        this.day.setSpecular(0.1, 0.1, 0.1, 1);
        this.day.setEmission(1, 1, 1, 1);
        this.day.setShininess(10.0);
        this.day.loadTexture('textures/sky_box/day.png');
        this.day.setTextureWrap('REPEAT', 'REPEAT');


        //MyTree Branch stick

        this.stickSide = new CGFappearance(this);
        this.stickSide.setAmbient(0.1, 0.1, 0.1, 1);
        this.stickSide.setDiffuse(0.9, 0.9, 0.9, 1);
        this.stickSide.setSpecular(0.1, 0.1, 0.1, 1);
        this.stickSide.setShininess(10.0);
        this.stickSide.loadTexture('textures/branch/trunk.jpeg');
        this.stickSide.setTextureWrap('REPEAT', 'REPEAT');

        this.stick = new CGFappearance(this);
        this.stick.setAmbient(0.1, 0.1, 0.1, 1);
        this.stick.setDiffuse(0.9, 0.9, 0.9, 1);
        this.stick.setSpecular(0.1, 0.1, 0.1, 1);
        this.stick.setShininess(10.0);
        this.stick.loadTexture('textures/branch/top.jpeg');
        this.stick.setTextureWrap('REPEAT', 'REPEAT');


        this.straw = new CGFappearance(this);
        this.straw.setAmbient(0.1, 0.1, 0.1, 1);
        this.straw.setDiffuse(0.9, 0.9, 0.9, 1);
        this.straw.setSpecular(0.1, 0.1, 0.1, 1);
        this.straw.setShininess(10.0);
        this.straw.loadTexture('textures/nest/straw.jpeg');
        this.straw.setTextureWrap('REPEAT', 'REPEAT');

        this.lightningT = new CGFappearance(this);
        this.lightningT.setAmbient(1, 1, 1, 1);
        this.lightningT.setDiffuse(1, 1, 1, 1);
        this.lightningT.setSpecular(1, 1, 1, 1);
        this.lightningT.setShininess(10.0);
        this.lightningT.loadTexture('textures/lightning.png');
        this.lightningT.setTextureWrap('REPEAT', 'REPEAT');
    }

    randomNumber(min, max) {
        return Math.random() * (max - min + 1) + min;
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        this.axis.display();
        
        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        this.pushMatrix();
        this.translate(0,-3,0);
        this.terrain.display();
        this.popMatrix();
        
        for (var i = 0; i < this.branches.length; i++) {
            this.branches[i].display();
        }
        
        this.bird.display();
        
        this.pushMatrix();
        this.day.apply();
        this.cubeMap.display();
        this.popMatrix();
        
        this.pushMatrix();
        this.scale(3, 3, 3);
        this.translate(2.6,-0.1,-1);
        this.house.display();
        this.popMatrix();
        
        this.nest.display();
        
        if (this.displayLightning) {
            this.lightningT.apply();
            this.lightning.display();
        } 

        this.tree.display();
        // ---- END Primitive drawing section
    }
}