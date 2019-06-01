/*
 * MyNest
 *@constructor
 * 
 */

class MyNest extends CGFobject{

    constructor(scene, x, y, z, texture) {
        super(scene);

        this.x = x;
        this.y = y;
        this.z = z;

        this.branches = [];

        this.texture = texture;
        this.initBuffers();  
    }

    initBuffers() {
        this.straw = new MyNestFeature(this.scene,this.texture);
    }

    addBranch(branch) {
        branch.setPosition(this.x, this.y + 1.2, this.z);
        branch.setOrientation(this.branches.length * (40 * Math.PI / 180));
        this.branches.push(branch);
        
    }

    display(){
        
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(Math.PI / 4, -1, 0, 0);

        for (var i = 0; i < 100; i++){
            this.scene.pushMatrix();
            this.scene.rotate(i*Math.PI/30,0,1,1);
            this.straw.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();

        for (var i = 0; i < this.branches.length; i++) {
            this.branches[i].display();
        }
    }
}