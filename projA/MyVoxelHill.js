/**
 * MyVoxelHill
 * 
 */
class MyVoxelHill extends CGFobject{
    constructor(scene, levels) {
        super(scene);

        this.levels=levels;

        this.initMaterials();
        this.initBuffers();
    }

    initMaterials() {
        this.cubeSideMT = new CGFappearance(this.scene);
        this.cubeSideMT.setAmbient(0.1, 0.1, 0.1, 1);
        this.cubeSideMT.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cubeSideMT.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeSideMT.setShininess(10.0);
        this.cubeSideMT.loadTexture('images/mineSide.png');
        this.cubeSideMT.setTextureWrap('REPEAT', 'REPEAT');
        
        this.cubeTopMT = new CGFappearance(this.scene);
        this.cubeTopMT.setAmbient(0.1, 0.1, 0.1, 1);
        this.cubeTopMT.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cubeTopMT.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeTopMT.setShininess(10.0);
        this.cubeTopMT.loadTexture('images/mineTop.png');
        this.cubeTopMT.setTextureWrap('REPEAT', 'REPEAT');
        
        this.cubeBottomMT = new CGFappearance(this.scene);
        this.cubeBottomMT.setAmbient(0.1, 0.1, 0.1, 1);
        this.cubeBottomMT.setDiffuse(0.9, 0.9, 0.9, 1);
        this.cubeBottomMT.setSpecular(0.1, 0.1, 0.1, 1);
        this.cubeBottomMT.setShininess(10.0);
        this.cubeBottomMT.loadTexture('images/mineBottom.png');
		this.cubeBottomMT.setTextureWrap('REPEAT', 'REPEAT');
    }

    initBuffers() {

        this.cube = new MyUnitCubeQuad(this.scene, this.cubeTopMT, this.cubeSideMT, this.cubeBottomMT);
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