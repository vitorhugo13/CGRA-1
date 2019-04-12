/**
 * MyVoxelHill
 * 
 */
class MyVoxelHill extends CGFobject{
    constructor(scene, levels, texture) {
        super(scene);

        this.levels=levels;
        this.texture=texture;

        this.initBuffers();
    }

    initBuffers() {

        this.cube = new MyUnitCubeQuad(this.scene);
        this.coords=[];

        var num = this.levels * 2 - 2;

        for (var y = 0; y < this.levels; y++) {
            for (var x = 0; x <= num; x++) {
                if (x % num == 0) {
                    for (var z = 0; z <= num; z++) {
                        this.coords.push(x + y, y, z + y);                    
                    }
                }
                else {
                    this.coords.push(x + y, y, y);
                    this.coords.push(x + y, y, y + num);
                }  
            }
            num = num - 2;
        }
        
    }

    display() {

        for (var i = 0; i < this.coords.length / 3; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.coords[i*3], this.coords[i*3+1],this.coords[i*3+2]);
            this.texture.apply();
            this.cube.display();
            this.scene.popMatrix();
        }

    }
    
    enableNormalViz() {
        this.cube.enableNormalViz();
    }

    disableNormalViz() {
        this.cube.disableNormalViz();
    }
    
}