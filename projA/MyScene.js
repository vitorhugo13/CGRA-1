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
        
        this.ground = new MyQuad(this);
        this.lantern = new MyLantern(this);
        this.house = new MyHouse(this);
        
        this.smallHill = new MyVoxelHill(this, 3);
        this.bigHill = new MyVoxelHill(this, 5);

        this.treeGroup1 = new MyTreeGroupPatch(this);
        this.treeGroup2 = new MyTreeGroupPatch(this);
        this.treeRow1 = new MyTreeRowPatch(this);
        this.treeRow2 = new MyTreeRowPatch(this);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayNormals = false;

        //Materials
        //testes
        this.exemplo = new CGFappearance(this);
        this.exemplo.setAmbient(0.1, 0.1, 0.1, 1);
        this.exemplo.setDiffuse(0.9, 0.9, 0.9, 1);
        this.exemplo.setSpecular(0.1, 0.1, 0.1, 1);
        this.exemplo.setShininess(10.0);
        this.exemplo.loadTexture('textures/test.jpg');
        this.exemplo.setTextureWrap('REPEAT', 'REPEAT');

        //CubeMap
        this.cmap = new CGFappearance(this);
        this.cmap.setAmbient(0.1, 0.1, 0.1, 1);
        this.cmap.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cmap.setSpecular(0.1, 0.1, 0.1, 1);
        this.cmap.setShininess(10.0);
        this.cmap.loadTexture('images/CubeMap.png');
        this.cmap.setTextureWrap('REPEAT', 'REPEAT');

        this.testObj= new MyCubeMap(this);

    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(0, 5, 30), vec3.fromValues(0, 0, 0));
    }

    hexToRgbA(hex)
    {
        var ret;
        //either we receive a html/css color or a RGB vector
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            ret=[
                parseInt(hex.substring(1,3),16).toPrecision()/255.0,
                parseInt(hex.substring(3,5),16).toPrecision()/255.0,
                parseInt(hex.substring(5,7),16).toPrecision()/255.0,
                1.0
            ];
        }
        else
            ret=[
                hex[0].toPrecision()/255.0,
                hex[1].toPrecision()/255.0,
                hex[2].toPrecision()/255.0,
                1.0
            ];
        return ret;
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
            this.testObj.enableNormalViz();
        else
            this.testObj.disableNormalViz();
        
        
        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        // display the ground (base of the scene)
        this.pushMatrix();
        this.rotate(-Math.PI/2, 1, 0, 0);
        this.scale(50, 50, 1);
        this.ground.display();
        this.popMatrix();
        
        // display the skybox
        this.pushMatrix();
        this.cmap.apply();      
        this.testObj.display();
        this.popMatrix();

        // display house
        this.pushMatrix();
        this.scale(2,2,2);
        this.house.display();
        this.popMatrix();

        // display small hill
        this.pushMatrix();
        this.translate(15, 0, 0);
        this.smallHill.display();
        this.popMatrix();

        // display big hill
        this.pushMatrix();
        this.translate(-15, 0, -20);
        this.bigHill.display();
        this.popMatrix();

        // display treeGroup1
        this.pushMatrix();
        this.translate(0, 0, -15);
        this.rotate(Math.PI/4, 0, 1, 0);
        this.scale(1.5, 2, 1.5);
        this.treeGroup1.display();
        this.popMatrix();

        // display treeGroup2
        this.pushMatrix();
        this.translate(7, 0, -8);
        this.rotate(Math.PI/4, 0, 1, 0);
        this.scale(1.5, 2, 1.5);
        this.treeGroup2.display();
        this.popMatrix();

        // display the lantern
        this.pushMatrix();
        this.translate(2.5, 0, 2.5);
        this.scale(0.25, 0.25, 0.25);
        this.lantern.display();
        this.popMatrix();
            

        // ---- END Primitive drawing section
    }
}