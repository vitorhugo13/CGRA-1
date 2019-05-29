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
        this.setUpdatePeriod(50);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        //this.plane = new Plane(this, 32);

        //Objects connected to MyInterface
        this.bird=new MyBird(this,this.body, this.eyes, this.nose);
        this.terrain = new MyTerrain(this);
        this.house = new MyHouse(this, this.rooft, this.houset, this.pillart);
        this.cubeMap = new MyCubeMap(this);
        this.treeBranch = new MyTreeBranch(this,this.stickSide,this.stick);
        this.nest = new MyNest(this,this.stickSide);
       
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
    initMaterials() {
        this.yellow = new CGFappearance(this);
        this.yellow.setAmbient(0.1, 0.1, 0.1, 1);
        this.yellow.setDiffuse(0.9, 0.9, 0.9, 1);
        this.yellow.setSpecular(0.1, 0.1, 0.1, 1);
        this.yellow.setShininess(10.0);
        /*this.yellow.loadTexture('images/lantern/yellow.jpg');
        this.yellow.setTextureWrap('REPEAT', 'REPEAT');*/
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
            this.bird.accelerate(1);
        }
        if (this.gui.isKeyPressed("KeyS")) {
            text += " S ";
            keysPressed = true;
            this.bird.accelerate(-1);
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

        if (keysPressed) {
            console.log(text);
        }  
    }
    update(t){
        this.checkKeys();
        this.bird.update(t);
    }

    initMaterials(){

        // body of bird texture
        this.body = new CGFappearance(this);
        this.body.setAmbient(0.1, 0.1, 0.1, 1);
        this.body.setDiffuse(0.9, 0.9, 0.9, 1);
        this.body.setSpecular(0.1, 0.1, 0.1, 1);
        this.body.setShininess(10.0);
        this.body.loadTexture('textures/bird/body.png');
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
        this.terrain.display();
        
        // ---- END Primitive drawing section
        /*
        this.pushMatrix();
        this.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scale(60, 60, 1);
        this.plane.display();
        this.popMatrix();
        */

        
        this.pushMatrix();
        this.translate(2,7,-2);
        this.treeBranch.display();
        this.popMatrix();
        


        this.pushMatrix();
        this.translate(0,5,0);
        this.bird.display();
        this.popMatrix();
       

       
        this.pushMatrix();
        this.day.apply();
        this.cubeMap.display();
        this.popMatrix();
        
        

        this.pushMatrix();
        this.translate(4,2.7,-3);
        this.house.display();
        this.popMatrix();
   


        this.pushMatrix();
        this.translate(-2,3,-1);
        this.rotate(-Math.PI/4,1,0,0);
        this.scale(0.5,0.5,0.5);
        this.nest.display();
        this.popMatrix();


    


    }
}