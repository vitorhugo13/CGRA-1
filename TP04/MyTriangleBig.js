class MyTriangleBig extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			-2,  0, 0,	//0
			 0,  2, 0,	//1
			 2,  0, 0,	//2

			 -2,  0, 0,	//0
			 0,  2, 0,	//1
			 2,  0, 0	//2
		];

		this.normals = [
			0.0, 0.0,  1.0,
			0.0, 0.0,  1.0,
			0.0, 0.0,  1.0,

			0.0, 0.0, -1.0,
			0.0, 0.0, -1.0,
			0.0, 0.0, -1.0
		];

		/* Counter-clockwise reference of vertices
		   this is how we indicate the front of the figure */
		this.indices = [
			0, 2, 1,
			1, 2, 0
		];
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
