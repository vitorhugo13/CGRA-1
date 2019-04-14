class MyLantern extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initBuffers();
        this.initMaterials();
    }

    initBuffers() {
        this.prism = new MyPrism(this.scene, 4);
        this.pyramid = new MyPyramid(this.scene, 4);
        this.base = new MyUnitCubeQuad(this.scene);
    }

    initMaterials() {
        let baseColor = this.scene.hexToRgbA("#003312");
		this.baseTexture = new CGFappearance(this.scene);
        this.baseTexture.setAmbient(baseColor[0], baseColor[1], baseColor[2], 1.0);
        this.baseTexture.setDiffuse(baseColor[0]/3.0, baseColor[1]/3.0, baseColor[2]/3.0, 1.0);
        this.baseTexture.setSpecular(baseColor[0], baseColor[1], baseColor[2], 1.0);
        this.baseTexture.setShininess(10.0);
        
        baseColor = this.scene.hexToRgbA("#003312");
		this.lightTexture = new CGFappearance(this.scene);
        this.lightTexture.setAmbient(baseColor[0], baseColor[1], baseColor[2], 1.0);
        this.lightTexture.setDiffuse(baseColor[0]/3.0, baseColor[1]/3.0, baseColor[2]/3.0, 1.0);
        this.lightTexture.setSpecular(baseColor[0], baseColor[1], baseColor[2], 1.0);
        this.lightTexture.setShininess(10.0);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(1, 0.1, 1);
        this.baseTexture.apply();
        this.base.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.scale(0.5, 1, 0.5);
        this.lightTexture.apply();
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