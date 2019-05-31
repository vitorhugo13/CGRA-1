class MyLightningSegment extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initBuffers();
    }

    initBuffers() {
        this.square = new MyQuad(this.scene);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.3, 1.5, 1);
        this.scene.translate(0, 0.5, 0);
        this.square.display();
        this.scene.popMatrix();
    }
}