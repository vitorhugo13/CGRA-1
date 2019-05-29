/*
 * MyNestFeature
 *@constructor
 * 
 */

class MyNestFeature extends CGFobject{

    constructor(scene, texture) {
        super(scene);

        this.texture =texture;

        this.initBuffers();  
    }

    initBuffers(){
        this.straw1 = new MyCilinderWTop(this.scene,20, this.texture,this.texture);
        this.straw2 = new MyCilinderWTop(this.scene,20, this.texture,this.texture);
        this.straw3 = new MyCilinderWTop(this.scene,20, this.texture,this.texture);
        
    }

    display(){
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4,0,0,1);
        this.scene.scale(0.1,0.8,0.1);
        this.straw1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5,0.5,0);
        this.scene.rotate(Math.PI/6,0,0,1);
        this.scene.scale(0.1,0.8,0.1);
        this.straw2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.9,1.15,0);
        this.scene.rotate(Math.PI/10,0,0,1);
        this.scene.scale(0.1,0.8,0.1);
        this.straw3.display();
        this.scene.popMatrix();

    }
}