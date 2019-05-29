/**
 * MyTreeBranch
 * @constructor
 * 
 */


class MyTreeBranch extends CGFobject{

    constructor(scene, topT,sideT) {
        super(scene);

        this.topT = topT;
        this.sideT = sideT;

        this.initBuffers();  
    }

    initBuffers(){
        this.stick = new MyUnitCubeQuad(this.scene,this.topT,this.sideT,this.topT);
        this.stick2 = new MyUnitCubeQuad(this.scene,this.topT,this.sideT,this.topT);
    }

    display(){

        this.scene.pushMatrix();
        this.scene.translate(-1.5,0.3,0);
        this.scene.rotate(-Math.PI/6,0,0,1);
        this.scene.scale(1,0.1,0.05);
        this.stick2.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.scale(3.5,0.2,0.1);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.stick.display();
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