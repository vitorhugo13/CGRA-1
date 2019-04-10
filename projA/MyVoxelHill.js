/**
 * MyVoxelHill
 * 
 */
class MyVoxelHill extends CGFobject{
    constructor(scene,levels){
        super(scene);

        this.levels=levels;
        this.initBuffers();
    }

    initBuffers() {
        this.cube = new MyUnitCubeQuad(this.scene);
    }

    display(){
        //brincar com as transformações e com o nº de levels
        for(var i=0; i<levels; i++){
            this.cube.display();
        }
    }
}