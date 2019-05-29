/**
 * MyCilinderWTop
 * @constructor
 * 
 */

class MyCilinderWTop extends CGFobject {

    constructor(scene, slices,sideT,topT) {
        super(scene);
        
        this.slices = slices;
        this.sideT = sideT;
        this.topT =topT;

        this.initBuffers();
    }

    initBuffers(){
        this.cilinder = new MyCilinder(this.scene,this.slices);
        this.top = new TopOfCilinder(this.scene,this.slices);
        this.bottom = new TopOfCilinder(this.scene,this.slices);
    }

    display(){

        this.scene.pushMatrix();
        this.sideT.apply();
        this.cilinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,1,0);
        this.scene.rotate(-Math.PI/2, 1,0,0);
        this.topT.apply();
        this.top.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,0);
        this.scene.rotate(Math.PI/2, 1,0,0);
        this.topT.apply();
        this.top.display();
        this.scene.popMatrix();
    }
}