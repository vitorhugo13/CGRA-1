/**
 * MyTreeBranch
 * @constructor
 * 
 */

class MyTreeBranch extends CGFobject{

    constructor(scene, x, y, z, orientation, topT, sideT) {
        super(scene);

        this.topT = topT;
        this.sideT = sideT;

        this.orientation = orientation;
        this.x = x;
        this.y = y;
        this.z = z;

        this.initBuffers();  
    }

    initBuffers(){
        this.stick = new MyCilinderWTop(this.scene,20,this.sideT,this.topT);
        this.stick2 = new MyCilinderWTop(this.scene,20,this.sideT,this.topT);
        
    }
    
    setPosition(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    updatePosition(x, y, z) {
        this.x += x;
        this.y += y;
        this.z += z;
    }
     
    setOrientation(angle) {
        this.orientation = angle;
    }

    updateOrientation(angle) {
        this.orientation += angle;
    }

    display(){

        
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.orientation, 0, 1, 0);

        this.scene.pushMatrix();
        this.scene.translate(-1.5,0.3,0);
        this.scene.rotate(-Math.PI/6,0,0,1);
        this.scene.scale(1,0.1,0.05);
        this.stick2.display();
        this.scene.popMatrix();
        
        
        this.scene.pushMatrix();
        this.scene.scale(3.5,0.05,0.1);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.stick.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        
    }

    enableNormalViz() {
        this.stick.enableNormalViz();
        this.stick2.enableNormalViz();
    }

    disableNormalViz() {
        this.stick.disableNormalViz();
        this.stick2.disableNormalViz();
    }
}