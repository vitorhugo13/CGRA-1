
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
        this.wing3= new MyTriangle(this.scene);
        this.wing4= new MyTriangle(this.scene);
        this.eye1=new MyUnitCubeQuad(this.scene,this.topT,this.sideT,this.bottomT);
        this.eye2=new MyUnitCubeQuad(this.scene,this.topT,this.sideT,this.bottomT);

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

        this.scene.pushMatrix();
        this.scene.translate(0.7,0.5,0);
        this.scene.rotate(Math.PI/6,0,0,1);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(1,0.65,0);
        this.wing1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.7,0.5,0);
        this.scene.rotate(-Math.PI/6,0,0,1);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(1,0.65,0);
        this.wing2.display();
        this.scene.popMatrix();
/*

        this.scene.pushMatrix();
        this.scene.translate(-0.35,1.3,0.55);
        this.scene.scale(0.2,0.2,0.2);
        this.eye1.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0.35,1.3,0.55);
        this.scene.scale(0.2,0.2,0.2);
        this.eye2.display();
        this.scene.popMatrix();
        */


/*
        this.scene.pushMatrix();
        this.scene.translate(1.5,0.5,0);
       // this.scene.rotate(Math.PI/2,1,0,0);
        this.wing3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.5,0.5,0);
        //this.scene.rotate(Math.PI/2,1,0,0);
        this.wing4.display();
        this.scene.popMatrix();
    */
    }

    enableNormalViz() {
        this.head.enableNormalViz();
        this.body.enableNormalViz();
        this.wing1.enableNormalViz();
        this.wing2.enableNormalViz();
        this.nose.enableNormalViz();
        this.eye1.enableNormalViz();
        this.eye2.enableNormalViz();
        
    }

    disableNormalViz() {
        this.head.disableNormalViz();
        this.body.disableNormalViz();
        this.wing1.disableNormalViz();
        this.wing2.disableNormalViz();
        this.nose.disableNormalViz();
        this.eye1.disableNormalViz();
        this.eye2.disableNormalViz();
        
    }
}