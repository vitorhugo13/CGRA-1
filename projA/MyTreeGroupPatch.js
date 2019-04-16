class MyTreeGroupPatch extends CGFobject{
    constructor(scene,trunkT,topT) {
        super(scene);
        
        this.trunkT=trunkT;
        this.topT=topT;
        
        this.initBuffers();
    
    }

    initBuffers() {
        this.x_coord = [];
        this.z_coord = [];

        this.tree = new MyTree(this.scene, 0.3, 0.3, 1.2, 0.6, this.trunkT, this.topT);   // ADD TEXTURES HERE

        // generate positions
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                this.x_coord.push( i * 2 + (Math.random() * 100) / 100);
                this.z_coord.push( j * 2 + (Math.random() * 100) / 100);
            }
        }
    }

    display() {
        for (var i = 0; i < 9; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.x_coord[i], 0, this.z_coord[i]);
            this.tree.display();
            this.scene.popMatrix();
        }
    }

    enableNormalViz() {
        this.tree.enableNormalViz();
    }

    disableNormalViz() {
        this.tree.disableNormalViz();
    }

}