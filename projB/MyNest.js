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
        
        //var angle=0;

        for(var i =0; i<100;i++){
            this.scene.pushMatrix();
            this.scene.rotate(i*Math.PI/30,0,1,1);
            this.straw.display();
            this.scene.popMatrix();
        }
        
        
    }
}