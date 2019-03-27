class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
        this.initMaterials();
    }

    initBuffers() {
        this.scene.quad = new MyQuad(this.scene);
    }

    initMaterials() {
        this.scene.cubeSideMT = new CGFappearance(this.scene);
        this.scene.cubeSideMT.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.cubeSideMT.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.cubeSideMT.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.cubeSideMT.setShininess(10.0);
        this.scene.cubeSideMT.loadTexture('images/mineSide.png');
        this.scene.cubeSideMT.setTextureWrap('REPEAT', 'REPEAT');
        
        this.scene.cubeTopMT = new CGFappearance(this.scene);
        this.scene.cubeTopMT.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.cubeTopMT.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.cubeTopMT.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.cubeTopMT.setShininess(10.0);
        this.scene.cubeTopMT.loadTexture('images/mineTop.png');
        this.scene.cubeTopMT.setTextureWrap('REPEAT', 'REPEAT');
        
        this.scene.cubeBottomMT = new CGFappearance(this.scene);
        this.scene.cubeBottomMT.setAmbient(0.1, 0.1, 0.1, 1);
        this.scene.cubeBottomMT.setDiffuse(0.9, 0.9, 0.9, 1);
        this.scene.cubeBottomMT.setSpecular(0.1, 0.1, 0.1, 1);
        this.scene.cubeBottomMT.setShininess(10.0);
        this.scene.cubeBottomMT.loadTexture('images/mineBottom.png');
		this.scene.cubeBottomMT.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {

        // SIDE FACES
        this.scene.cubeSideMT.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, 0.5);
        this.scene.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.0, 0.0);
        this.scene.rotate(Math.PI / 2.0, 0, 1, 0);
        this.scene.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.0, 0.0);
        this.scene.rotate(-Math.PI / 2.0, 0, 1, 0);
        this.scene.quad.display();
        this.scene.popMatrix();


        // TOP FACE
        this.scene.cubeTopMT.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.5, 0.0);
        this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
        this.scene.quad.display();
        this.scene.popMatrix();

        // BOTTOM FACE
        this.scene.cubeBottomMT.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.translate(0.0, -0.5, 0.0);
        this.scene.rotate(Math.PI / 2.0, 1, 0, 0);
        this.scene.quad.display();
        this.scene.popMatrix();
    }
}