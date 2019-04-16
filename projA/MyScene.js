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
        
        //Initialize scene objects
        this.axis = new CGFaxis(this);

        this.cubeMap = new MyCubeMap(this);
        
        this.ground = new MyQuad(this, 50, 50);
        this.lantern = new MyLantern(this, this.yellow, this.green);
        this.house = new MyHouse(this, this.rooft, this.houset, this.pillart);
        
        this.smallHill = new MyVoxelHill(this, 3, this.grassTop, this.grassSide, this.grassBottom);
        this.bigHill = new MyVoxelHill(this, 5, this.grassTop, this.grassSide, this.grassBottom);

        this.treeGroup1 = new MyTreeGroupPatch(this, this.diffuse2, this.topT);
        this.treeGroup2 = new MyTreeGroupPatch(this, this.diffuse2, this.topT);
        this.treeRow1 = new MyTreeRowPatch(this, this.diffuse2, this.topT);
        this.treeRow2 = new MyTreeRowPatch(this, this.diffuse2, this.topT);

        this.pool = new MyPool(this, 7, 5, this.diffuse1, this.diffuse1, this.diffuse1, this.specular);

        //Objects connected to MyInterface
        this.displayAxis = false;
        this.displayTextures = true;
        this.timeID = { 'Day' : 0, 'Night' : 1 };
        this.selectedTime = 0

    }

    initLights() {

        this.globalAmbientLight = 0.5;
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
        this.lights[1].setDiffuse(moon[0], moon[1], moon[2], 1.0);  // TODO : change color
        this.lights[1].setSpecular(moon[0], moon[1], moon[2], 1);         // TODO : change color
        this.lights[1].setConstantAttenuation(1.3);    
        this.lights[1].disable();
        this.lights[1].update();

        // lantern 1 ( the one in the middle of the trees )
        let lantern = this.hexToRgbA("#ff8000");
        this.lights[2].setPosition(-12, 0.2, 17, 1);     // TODO : change positon to match
        this.lights[2].setDiffuse(lantern[0], lantern[1], lantern[2], 1.0);
        this.lights[2].setSpecular(lantern[0],lantern[1], lantern[2], 1.0);
        this.lights[2].setLinearAttenuation(0.4);    // TODO : change attenuation constant
        this.lights[2].disable();
        this.lights[2].update();

        // lantern 2 ( the one on the pool border )
        this.lights[3].setPosition(15.5, 0.7, -14.5, 1);     // TODO : change positon to match
        this.lights[3].setDiffuse(lantern[0], lantern[1], lantern[2], 1.0);
        this.lights[3].setSpecular(lantern[0],lantern[1], lantern[2], 1.0);
        this.lights[3].setLinearAttenuation(0.4);    // TODO : change attenuation constant
        this.lights[3].disable();
        this.lights[3].update();
    
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
            this.lights[3].disable();
            this.lights[3].update();
        }
        else {
            this.lights[0].disable();
            this.lights[0].update();
            this.lights[1].enable();
            this.lights[1].update();
            this.lights[2].enable();
            this.lights[2].update();
            this.lights[3].enable();
            this.lights[3].update();
        }
    }

    initMaterials() {

        // Specular material (WATER)
        let water = this.hexToRgbA("#40a4df");
        this.specular = new CGFappearance(this);
        this.specular.setAmbient(water[0], water[1], water[2], 1.0);
        this.specular.setDiffuse(water[0]/3.0, water[1]/3.0, water[2]/3.0, 1.0);
        this.specular.setSpecular(water[0], water[1], water[2], 1.0);
        this.specular.setShininess(10.0);
        this.specular.loadTexture('images/waterT.jpg');
        this.specular.setTextureWrap('REPEAT', 'REPEAT');
    
  
        // Diffuse material 1 (STONE)
        let stone= this.hexToRgbA("#95948b");
        this.diffuse1 = new CGFappearance(this);
        this.diffuse1.setAmbient(stone[0], stone[1], stone[2], 1.0);
        this.diffuse1.setDiffuse(stone[0], stone[1], stone[2], 1.0);
        this.diffuse1.setSpecular(stone[0]/3.0, stone[1]/3.0, stone[2]/3.0, 1.0);
        this.diffuse1.setShininess(10.0);
        this.diffuse1.loadTexture('images/stoneT.jpg');
        this.diffuse1.setTextureWrap('REPEAT', 'REPEAT');
        
  
        // Diffuse material 2 (WOOD)
        let wood=this.hexToRgbA("#b69b4c");
        this.diffuse2 = new CGFappearance(this);
        this.diffuse2.setAmbient(wood[0], wood[1], wood[2], 1.0);
        this.diffuse2.setDiffuse(wood[0], wood[1], wood[2], 1.0);
        this.diffuse2.setSpecular(wood[0]/3.0, wood[1]/3.0, wood[2]/3.0, 1.0);
        this.diffuse2.setShininess(10.0);
        this.diffuse2.loadTexture('images/tree/mineTrunk.jpg');
        this.diffuse2.setTextureWrap('REPEAT', 'REPEAT');

        //TODO : add texture
        
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

        // day-time skybox texture
        this.day = new CGFappearance(this);
        this.day.setAmbient(0.1, 0.1, 0.1, 1);
        this.day.setDiffuse(0.9, 0.9, 0.9, 1);
        this.day.setSpecular(0.1, 0.1, 0.1, 1);
        this.day.setEmission(1, 1, 1, 1);
        this.day.setShininess(10.0);
        this.day.loadTexture('images/skybox/day.png');
        this.day.setTextureWrap('REPEAT', 'REPEAT');

        // night-time skybox texture
        this.night = new CGFappearance(this);
        this.night.setAmbient(0.1, 0.1, 0.1, 1);
        this.night.setDiffuse(0.9, 0.9, 0.9, 1);
        this.night.setSpecular(0.1, 0.1, 0.1, 1);
        this.night.setEmission(1, 1, 1, 1);
        this.night.setShininess(10.0);
        this.night.loadTexture('images/skybox/night.jpg');
        this.night.setTextureWrap('REPEAT', 'REPEAT');
        
        /*
        this.exemplo = new CGFappearance(this);
        this.exemplo.setAmbient(0.1, 0.1, 0.1, 1);
        this.exemplo.setDiffuse(0.9, 0.9, 0.9, 1);
        this.exemplo.setSpecular(0.1, 0.1, 0.1, 1);
        this.exemplo.setShininess(10.0);
        this.exemplo.loadTexture('textures/test.jpg');
        this.exemplo.setTextureWrap('REPEAT', 'REPEAT');
        */

        //yellow texture for lantern
        this.yellow = new CGFappearance(this);
        this.yellow.setAmbient(0.1, 0.1, 0.1, 1);
        this.yellow.setDiffuse(0.9, 0.9, 0.9, 1);
        this.yellow.setSpecular(0.1, 0.1, 0.1, 1);
        this.yellow.setShininess(10.0);
        this.yellow.loadTexture('images/lantern/yellow.jpg');
        this.yellow.setTextureWrap('REPEAT', 'REPEAT');

        //green texture for lantern
        this.green = new CGFappearance(this);
        this.green.setAmbient(0.1, 0.1, 0.1, 1);
        this.green.setDiffuse(0.9, 0.9, 0.9, 1);
        this.green.setSpecular(0.1, 0.1, 0.1, 1);
        this.green.setShininess(10.0);
        this.green.loadTexture('images/lantern/green.jpg');
        this.green.setTextureWrap('REPEAT', 'REPEAT');

        //house roof texture
        this.rooft = new CGFappearance(this);
        this.rooft.setAmbient(0.1, 0.1, 0.1, 1);
        this.rooft.setDiffuse(0.9, 0.9, 0.9, 1);
        this.rooft.setSpecular(0.1, 0.1, 0.1, 1);
        this.rooft.setShininess(10.0);
        this.rooft.loadTexture('images/house/roof.jpg');
        this.rooft.setTextureWrap('REPEAT', 'REPEAT');

        //house texture
        this.houset = new CGFappearance(this);
        this.houset.setAmbient(0.1, 0.1, 0.1, 1);
        this.houset.setDiffuse(0.9, 0.9, 0.9, 1);
        this.houset.setSpecular(0.1, 0.1, 0.1, 1);
        this.houset.setShininess(10.0);
        this.houset.loadTexture('images/house/wall.jpg');
        this.houset.setTextureWrap('REPEAT', 'REPEAT');

        //house pillar texture
        this.pillart = new CGFappearance(this);
        this.pillart.setAmbient(0.1, 0.1, 0.1, 1);
        this.pillart.setDiffuse(0.9, 0.9, 0.9, 1);
        this.pillart.setSpecular(0.1, 0.1, 0.1, 1);
        this.pillart.setShininess(10.0);
        this.pillart.loadTexture('images/house/pillar.jpg');
        this.pillart.setTextureWrap('REPEAT', 'REPEAT');

        //tree top
        this.topT = new CGFappearance(this);
        this.topT.setAmbient(0.1, 0.1, 0.1, 1);
        this.topT.setDiffuse(0.9, 0.9, 0.9, 1);
        this.topT.setSpecular(0.1, 0.1, 0.1, 1);
        this.topT.setShininess(10.0);
        this.topT.loadTexture('images/tree/treeTop.jpg');
        this.topT.setTextureWrap('REPEAT', 'REPEAT');
        
        //tree trunk
        this.trunkT = new CGFappearance(this);
        this.trunkT.setAmbient(0.1, 0.1, 0.1, 1);
        this.trunkT.setDiffuse(0.9, 0.9, 0.9, 1);
        this.trunkT.setSpecular(0.1, 0.1, 0.1, 1);
        this.trunkT.setShininess(10.0);
        this.trunkT.loadTexture('images/tree/mineTrunk.jpg');
        this.trunkT.setTextureWrap('REPEAT', 'REPEAT');

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
        this.grassTop.apply();
        this.ground.display();
        this.popMatrix();

        // display house
        this.pushMatrix();
        this.scale(4,2.5,4);
        this.house.display();
        this.popMatrix();
        
        // display small hill
        this.pushMatrix();
        this.translate(18, 0, 12);
        this.rotate(Math.PI/3, 0, 1, 0);
        this.smallHill.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(10, 0, 6);
        this.rotate(Math.PI/3, 0, 1, 0);
        this.bigHill.display();
        this.popMatrix();

        // display big hill
        this.pushMatrix();
        this.translate(-15, 0, -20);
        this.bigHill.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(-17, 0, -10);
        this.smallHill.display();
        this.popMatrix();
        
        // display treeGroup1
        this.pushMatrix();
        this.translate(-7, 0, 18);
        this.rotate(Math.PI/4, 0, 1, 0);
        this.scale(1.5, 2, 1.5);
        this.treeGroup1.display();
        this.popMatrix();

        // display treeGroup2
        this.pushMatrix();
        this.translate(-22, 0, 12);
        this.rotate(Math.PI/4, 0, 1, 0);
        this.scale(1.5, 2, 1.5);
        this.treeGroup2.display();
        this.popMatrix();

        // display treeRow1
        this.pushMatrix();
        this.translate(-10, 0, 22);
        this.rotate(0.9 * Math.PI, 0, 1, 0);
        this.scale(1.5, 2, 1.5);
        this.treeRow1.display();
        this.popMatrix();

        // display treeRow1
        this.pushMatrix();
        this.translate(23, 0, -19);
        this.rotate(-Math.PI/2, 0, 1, 0);
        this.scale(2, 2.5, 2);
        this.treeRow2.display();
        this.popMatrix();
        
        // display lantern 1
        this.pushMatrix();
        this.translate(-12, 0, 17);
        this.scale(0.5, 0.5, 0.5);
        this.lantern.display();
        this.popMatrix();

        // display lantern 2
        this.pushMatrix();
        this.translate(11.5, 0.5, -14.5);
        this.scale(0.5, 0.5, 0.5);
        this.lantern.display();
        this.popMatrix();

        // display pool
        this.pushMatrix();
        this.translate(11, 0, -15);
        this.pool.display();
        this.popMatrix();

        this.pushMatrix();
        this.translate(5, 0, -22);
        this.scale(2, 2.5, 2);
        this.treeRow1.display();
        this.popMatrix();


        // ---- END Primitive drawing section
    }
}