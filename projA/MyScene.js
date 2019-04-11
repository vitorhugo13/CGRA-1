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

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.cilinder = new MyCone(this, 4);
       

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayNormals = false;

        //Materials
        this.exemplo = new CGFappearance(this);
        this.exemplo.setAmbient(0.1, 0.1, 0.1, 1);
        this.exemplo.setDiffuse(0.9, 0.9, 0.9, 1);
        this.exemplo.setSpecular(0.1, 0.1, 0.1, 1);
        this.exemplo.setShininess(10.0);
        this.exemplo.loadTexture('textures/test.jpg');
        this.exemplo.setTextureWrap('REPEAT', 'REPEAT');

        //VoxHill
        this.vox = new CGFappearance(this);
        this.vox.setAmbient(0.1, 0.1, 0.1, 1);
        this.vox.setDiffuse(0.9, 0.9, 0.9, 1);
        this.vox.setSpecular(0.1, 0.1, 0.1, 1);
        this.vox.setShininess(10.0);
        this.vox.loadTexture('textures/mineSide.png');
        this.vox.setTextureWrap('REPEAT', 'REPEAT');


        this.tree = new MyTree(this, 3, 1.5, 3, 2, this.exemplo, this.exemplo);
        this.voxelHill=new MyVoxelHill(this,4,this.vox);

    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
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
        if (this.displayAxis) {
            this.axis.display();
        }

        // Display normals
        if (this.displayNormals)
            this.tree.enableNormalViz();
        else
            this.tree.disableNormalViz();

        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

       // this.tree.display();
        this.voxelHill.display();
        
        

        // ---- END Primitive drawing section
    }
}