/**
 * MyTreeBranch
 * @constructor
 * 
 */


class MyTreeBranch extends CGFobject{

    constructor(scene) {
        super(scene);
        this.initBuffers();  
    }

    initBuffers(){
        this.stick = new MyUnitCubeQuad(this.scene,);
    }

    display(){

        this.scene.pushMatrix();
        this.scene.popMatrix();
    }
}