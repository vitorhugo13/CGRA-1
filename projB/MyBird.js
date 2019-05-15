
/**
 * MyBird
 * @constructor
 */
class MyBird extends CGFobject {

    constructor(scene) {
        super(scene);

        this.initBuffers();
    }

    initBuffers() {
        this.head=new MyUnitCubeQuad(this.scene,0,0,0);
        this.body=new MyUnitCubeQuad(this.scene,0,0,0);
        this.wing1=new MyQuad(this.scene,1,1);
        this.wing2=new MyQuad(this.scne,1,1);
        this.nose= new MyPyramid(this.scene,10);
    }

    display(){

    }

    enableNormalViz() {
        this.head.enableNormalViz();
        this.body.enableNormalViz();
        this.wing1.enableNormalViz();
        this.wing2.enableNormalViz();
        this.nose.enableNormalViz();
        
    }

    disableNormalViz() {
        this.head.disableNormalViz();
        this.body.disableNormalViz();
        this.wing1.enableNormalViz();
        this.wing2.enableNormalViz();
        this.nose.enableNormalViz();
        
    }
}