class MyTreeRowPatch extends CGFobject{
    constructor(scene) {
        super(scene);
        
        this.initBuffers();
    }

    initBuffers() {
        this.x_coord = [];
        this.z_coord = [];

        this.tree = new MyTree(this.scene, 0.3, 0.3, 1.2, 0.6, this.scene.exemplo, this.scene.exemplo);

        // generate positions
        for (var i = 0; i < 9; i++) {
            this.x_coord.push(i * 1.5);
            this.z_coord.push((Math.random() * 4) * 0.5);
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