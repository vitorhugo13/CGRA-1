
class MyHouse extends CGFobject {
    constructor(scene,roofT,houseT,pillarT) {
        super(scene);
        this.roofT=roofT;
        this.houseT=houseT;
        this.pillarT=pillarT;
        
        this.initBuffers();
    }

    initBuffers() {
        this.cube = new MyUnitCubeQuad(this.scene);
        this.roof = new MyPyramid(this.scene, 4);
        this.pillar = new MyCilinder(this.scene, 10);


    }


    display() {
        
        this.houseT.apply();
        this.cube.display();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 4, 0, 1, 0);
        this.scene.translate(0, 1, 0);
        this.scene.scale(1.15, 0.45, 1.15);
        this.roofT.apply();
        this.roof.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.605, 0, 0.605);
        this.scene.scale(0.10, 1, 0.10);
        this.pillarT.apply();
        this.pillar.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.605, 0, -0.605);
        this.scene.scale(0.10, 1, 0.10);
        this.pillarT.apply();
        this.pillar.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.605, 0, 0.605);
        this.scene.scale(0.10, 1, 0.10);
        this.pillarT.apply();
        this.pillar.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.605, 0, -0.605);
        this.scene.scale(0.10, 1, 0.10);
        this.pillarT.apply();
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