class MyUnitCubeQuad extends CGFobject {
    constructor(scene, topTexture, sideTexture, bottomTexture) {
        super(scene);
        this.initBuffers();

        this.topTexture = topTexture;
        this.sideTexture = sideTexture;
        this.bottomTexture = bottomTexture;
    }

    initBuffers() {
        this.quad = new MyQuad(this.scene);
    }

    display() {

        // SIDE FACES
        this.sideTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.5, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.5, 0.0);
        this.scene.rotate(Math.PI / 2.0, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.5, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.5, 0.0);
        this.scene.rotate(-Math.PI / 2.0, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();


        // TOP FACE
        this.topTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.translate(0.0, 1.0, 0.0);
        this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // BOTTOM FACE
        this.bottomTexture.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.translate(0.0, 0.0, 0.0);
        this.scene.rotate(Math.PI / 2.0, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.quad.enableNormalViz();
    }
    
    disableNormalViz() {
        this.quad.disableNormalViz();
    }
}