class MyLantern extends CGFobject {
    constructor(scene,yellowT,greenT) {
        super(scene);

        this.yellowT=yellowT;
        this.greenT=greenT;
      

        this.initBuffers();
    }

    initBuffers() {
        this.prism = new MyPrism(this.scene, 4);
        this.pyramid = new MyPyramid(this.scene, 4);
        this.base = new MyUnitCubeQuad(this.scene, this.greenT, this.greenT, this.greenT);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(1, 0.1, 1);
        this.base.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.scale(0.5, 1, 0.5);
        this.yellowT.apply();
        this.prism.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.translate(0, 0.9, 0);
        this.scene.scale(0.8, 0.4, 0.8);
        this.greenT.apply();
        this.pyramid.display();
        this.scene.popMatrix();
    }
}