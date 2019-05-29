/*
 * MyNest
 *@constructor
 * 
 */

class MyNest extends CGFobject{

    constructor(scene,texture) {
        super(scene);

        this.texture = texture;
        this.initBuffers();  
    }

    initBuffers(){
        this.straw = new MyNestFeature(this.scene,this.texture);
    }

    display(){
        
    }
}