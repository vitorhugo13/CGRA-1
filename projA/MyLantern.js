class MyLantern extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initMaterials();
        this.initBuffers();
    }

    initMaterials() {
        this.baseTexture = new CGFappearance(this.scene);
        this.baseTexture.setAmbient(0.1, 0.1, 0.1, 1);
        this.baseTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.baseTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.baseTexture.setShininess(10.0);
    }

    initBuffers() {
        this.prism = new MyPrism(this.scene, 4);
        this.pyramid = new MyPyramid(this.scene, 4);
        this.base = new MyUnitCubeQuad(this.scene, this.baseTexture, this.baseTexture, this.baseTexture);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(1, 0.1, 1);
        this.base.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.scale(0.5, 1, 0.5);
        this.prism.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.translate(0, 0.9, 0);
        this.scene.scale(0.8, 0.4, 0.8);
        this.pyramid.display();
        this.scene.popMatrix();
    }
}