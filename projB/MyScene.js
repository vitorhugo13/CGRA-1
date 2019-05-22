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
    update(t){

    }

    initMaterials(){
        // grass cube side texture
        this.grassSide = new CGFappearance(this);
        this.grassSide.setAmbient(0.1, 0.1, 0.1, 1);
        this.grassSide.setDiffuse(0.9, 0.9, 0.9, 1);
        this.grassSide.setSpecular(0.1, 0.1, 0.1, 1);
        this.grassSide.setShininess(10.0);
        this.grassSide.loadTexture('images/hill/grassSide.png');
        this.grassSide.setTextureWrap('REPEAT', 'REPEAT');
        
        // grass cube top texture
        this.grassTop = new CGFappearance(this);
        this.grassTop.setAmbient(0.1, 0.1, 0.1, 1);
        this.grassTop.setDiffuse(0.9, 0.9, 0.9, 1);
        this.grassTop.setSpecular(0.1, 0.1, 0.1, 1);
        this.grassTop.setShininess(10.0);
        this.grassTop.loadTexture('images/hill/grassTop.png');
        this.grassTop.setTextureWrap('REPEAT', 'REPEAT');
        
        // grass cube bottom texture
        this.grassBottom = new CGFappearance(this);
        this.grassBottom.setAmbient(0.1, 0.1, 0.1, 1);
        this.grassBottom.setDiffuse(0.9, 0.9, 0.9, 1);
        this.grassBottom.setSpecular(0.1, 0.1, 0.1, 1);
        this.grassBottom.setShininess(10.0);
        this.grassBottom.loadTexture('images/hill/grassBottom.png');
        this.grassBottom.setTextureWrap('REPEAT', 'REPEAT');
        
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
        this.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scale(60, 60, 1);
        this.terrain.display();
        this.popMatrix();
        // ---- END Primitive drawing section

        this.pushMatrix();
        this.translate(0,3,0);
        this.bird.display();
        this.popMatrix();
       
    }
}