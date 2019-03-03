class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffer();
    }
    initBuffer() {
        this.vertices = [
            -0.5, -0.5,  0.5,   // 0
             0.5, -0.5,  0.5,   // 1
             0.5, -0.5, -0.5,   // 2
            -0.5, -0.5, -0.5,   // 3
            -0.5,  0.5,  0.5,   // 4
             0.5,  0.5,  0.5,   // 5
             0.5,  0.5, -0.5,   // 6
            -0.5,  0.5, -0.5,   // 7
		];

		/* Counter-clockwise reference of vertices
		   this is how we indicate the front of the figure */
		this.indices = [
            /* y = -0.5 // XZ */
            0, 2, 1,
            0, 3, 2,
            /* y =  0.5 // XZ */
            4, 5, 6,
            6, 7, 4,
            /* z =  0.5 // XY */
            0, 1, 5,
            5, 4, 0,
            /* z = -0.5 // XY */
            6, 2, 3,
            3, 7, 6,
            /* x =  0.5 // YZ */
            6, 5, 1,
            1, 2, 6,
            /* x = -0.5 // YZ */
            4, 7, 3,
            3, 0, 4
		];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }
}