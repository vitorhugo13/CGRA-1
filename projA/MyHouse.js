
class MyHouse extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initBuffers();
    }

    initBuffers() {
        this.cube = new MyUnitCubeQuad(this.scene);
        this.roof = new MyPyramid(this.scene, 4);
        this.pillar = new MyCilinder(this.scene, 10);
    }

    display() {

        this.cube.display();

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