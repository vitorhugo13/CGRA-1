
/**
 * MyBird
 * @constructor
 */
class MyBird extends CGFobject {

    constructor(scene,topT,sideT,bottomT) {
        super(scene);
        this.topT=topT;
        this.sideT=sideT;
        this.bottomT=bottomT;

        this.initBuffers();
    }

    initBuffers() {
        this.head=new MyUnitCubeQuad(this.scene,this.topT,this.sideT,this.bottomT);
        this.body=new MyUnitCubeQuad(this.scene,this.topT,this.sideT,this.bottomT);
        this.wing1=new MyQuad(this.scene);
        this.wing2=new MyQuad(this.scene);
        this.nose= new MyPyramid(this.scene,10);
    }

    display(){

        this.scene.pushMatrix();
        this.body.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,1,0.5);
        this.scene.scale(0.7,0.7,0.7);
        this.head.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,1.35,0.85);
        this.scene.scale(0.2,0.2,0.2);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.nose.display();
        this.scene.popMatrix();
/*
        this.scene.pushMatrix();
        this.scene.translate(0.5,0.5,0);
        this.wing1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5,0.5,0);
        this.wing2.display();
        this.scene.popMatrix();
        */

    }

    enableNormalViz() {
        this.head.enableNormalViz();
        this.body.enableNormalViz();
        this.wing1.enableNormalViz();
        this.wing2.enableNormalViz();
        this.nose.enableNormalViz();
        
    }

    disableNormalViz() {
        this.head.disableNormalViz();
        this.body.disableNormalViz();
        this.wing1.enableNormalViz();
        this.wing2.enableNormalViz();
        this.nose.enableNormalViz();
        
    }
}