
class MyHouse extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initMaterials();
        this.initBuffers();
    }

    initMaterials() {
        let baseColor = this.scene.hexToRgbA("#003312");
		this.lightTexture = new CGFappearance(this.scene);
        this.lightTexture.setAmbient(baseColor[0], baseColor[1], baseColor[2], 1.0);
        this.lightTexture.setDiffuse(baseColor[0]/3.0, baseColor[1]/3.0, baseColor[2]/3.0, 1.0);
        this.lightTexture.setSpecular(baseColor[0], baseColor[1], baseColor[2], 1.0);
        this.lightTexture.setShininess(10.0);
    }

    initBuffers() {
        this.cube = new MyUnitCubeQuad(this.scene, this.lightTexture, this.lightTexture, this.lightTexture);
        this.roof = new MyPyramid(this.scene, 4);
        this.pillar = new MyCilinder(this.scene, 10);
    }

    display() {

        this.cube.display();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.scene.translate(0, 1, 0);
        this.scene.scale(1.15, 0.45, 1.15);
        this.roof.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.605, 0, 0.605);
        this.scene.scale(0.10, 1, 0.10);
        this.pillar.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.605, 0, -0.605);
        this.scene.scale(0.10, 1, 0.10);
        this.pillar.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.605, 0, 0.605);
        this.scene.scale(0.10, 1, 0.10);
        this.pillar.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.605, 0, -0.605);
        this.scene.scale(0.10, 1, 0.10);
        this.pillar.display();
        this.scene.popMatrix();

    }

    enableNormalViz() {
        this.cube.enableNormalViz();
        this.roof.enableNormalViz();
        this.pillar.enableNormalViz();
    }

    disableNormalViz() {
        this.cube.disableNormalViz();
        this.roof.disableNormalViz();
        this.pillar.disableNormalViz();
    }
}