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
        
        //Initialize scene objects
        this.axis = new CGFaxis(this);

        this.cubeMap = new MyCubeMap(this);
        
        this.ground = new MyQuad(this, 50, 50);
        this.lantern = new MyLantern(this);
        this.house = new MyHouse(this);
        
        this.smallHill = new MyVoxelHill(this, 3);
        this.bigHill = new MyVoxelHill(this, 5);

        this.treeGroup1 = new MyTreeGroupPatch(this);
        this.treeGroup2 = new MyTreeGroupPatch(this);
        this.treeRow1 = new MyTreeRowPatch(this);
        this.treeRow2 = new MyTreeRowPatch(this);

        

        //Objects connected to MyInterface
        this.displayAxis = false;
        this.displayTextures = true;
        this.timeID = { 'Day' : 0, 'Night' : 1 };
        this.selectedTime = 0

        //Materials
        //testes
        this.groundTexture = new CGFappearance(this);
        this.groundTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.groundTexture.setDiffuse(1, 1, 1, 1);
        this.groundTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.groundTexture.setShininess(10.0);
        this.groundTexture.loadTexture('images/mineTop.png');
        this.groundTexture.setTextureWrap('REPEAT', 'REPEAT');

        // day-time skybox texture
        this.day = new CGFappearance(this);
        this.day.setAmbient(0.1, 0.1, 0.1, 1);
        this.day.setDiffuse(0.9, 0.9, 0.9, 1);
        this.day.setSpecular(0.1, 0.1, 0.1, 1);
        this.day.setShininess(10.0);
        this.day.loadTexture('images/CubeMap.png');
        this.day.setTextureWrap('REPEAT', 'REPEAT');

        // night-time skybox texture
        this.night = new CGFappearance(this);
        this.night.setAmbient(0.1, 0.1, 0.1, 1);
        this.night.setDiffuse(0.9, 0.9, 0.9, 1);
        this.night.setSpecular(0.1, 0.1, 0.1, 1);
        this.night.setShininess(10.0);
        this.night.loadTexture('images/night.jpg');
        this.night.setTextureWrap('REPEAT', 'REPEAT');
    }

    initLights() {

        this.globalAmbientLight = 0.1;
        this.setGlobalAmbientLight(this.globalAmbientLight,this.globalAmbientLight,this.globalAmbientLight,1.0);

        // sun
        let sun = this.hexToRgbA("#ffffe6")
        this.lights[0].setPosition(24, 24, 24, 1);        // TODO : change position to match skybox
        this.lights[0].setDiffuse(sun[0], sun[1], sun[2], 1.0);  // TODO : change color
        this.lights[0].setSpecular(sun[0], sun[1], sun[2], 1);         // TODO : change color
        this.lights[0].setConstantAttenuation(1);
        this.lights[0].enable();
        this.lights[0].update();

        // moon
        let moon = this.hexToRgbA("#ccffff");
        this.lights[1].setPosition(24, 24, -24, 1);        // TODO : change position to match skybox
        this.lights[1].setDiffuse(moon[0]/1.1, moon[1]/1.1, moon[2]/1.1, 1.0);  // TODO : change color
        this.lights[1].setSpecular(moon[0]/1.1, moon[1]/1.1, moon[2]/1.1, 1);         // TODO : change color
        this.lights[1].setConstantAttenuation(1.5);    
        this.lights[1].disable();
        this.lights[1].update();

        // lantern
        let lantern = this.hexToRgbA("#ff8000");
        this.lights[2].setPosition(10, 0.2, -3, 1);     // TODO : change positon to match
        this.lights[2].setDiffuse(lantern[0], lantern[1], lantern[2], 1.0);
        this.lights[2].setSpecular(lantern[0],lantern[1], lantern[2], 1.0);
        this.lights[2].setLinearAttenuation(0.1);    // TODO : change attenuation constant
        this.lights[2].disable();
        this.lights[2].update();
    
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(0, 12, 50), vec3.fromValues(0, 0, 0));
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

    updateLights() {
        if (this.selectedTime == 0) {
            this.lights[0].enable();
            this.lights[0].update();
            this.lights[1].disable();
            this.lights[1].update();
            this.lights[2].disable();
            this.lights[2].update();
        }
        else {
            this.lights[0].disable();
            this.lights[0].update();
            this.lights[1].enable();
            this.lights[1].update();
            this.lights[2].enable();
            this.lights[2].update();
        }
    }

    display() {
        this.enableTextures(this.displayTextures);  

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
        
        //Apply default appearance
        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section

        // display the skybox
        this.pushMatrix();
        if (this.selectedTime == 0) {
            this.day.apply();
        }
        else {
            this.night.apply();
        }
        this.cubeMap.display();
        this.popMatrix();

        // display the ground (base of the scene)
        this.pushMatrix();
        this.rotate(-Math.PI/2, 1, 0, 0);
        this.scale(50, 50, 1);
        this.groundTexture.apply();
        this.ground.display();
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

        // display treeRow1
        this.pushMatrix();
        this.translate(-10, 0, -5);
        this.rotate(-Math.PI/2.5, 0, 1, 0);
        this.scale(1.5, 2, 1.5);
        this.treeRow1.display();
        this.popMatrix();

        // display treeRow1
        this.pushMatrix();
        this.translate(13, 0, -1);
        this.rotate(-Math.PI/2, 0, 1, 0);
        this.scale(1.5, 2, 1.5);
        this.treeRow2.display();
        this.popMatrix();
        
        // display the lantern
        this.pushMatrix();
        this.translate(10, 0, -3);
        this.scale(0.5, 0.5, 0.5);
        this.lantern.display();
        this.popMatrix();
            

        // ---- END Primitive drawing section
    }
}