/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyDiamond extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1,  0, 0,	//0
			 0, -1, 0,	//1
			 0,  1, 0,	//2
			 1,  0, 0,	//3

			-1,  0, 0,	//0
			 0, -1, 0,	//1
			 0,  1, 0,	//2
			 1,  0, 0	//3
		];

		/* Counter-clockwise reference of vertices
		   this is how we indicate the front of the figure */
		this.indices = [
			0, 1, 2,
			1, 3, 2,
			2, 1, 0,
			2, 3, 1
		];

		this.normals = [
			0.0, 0.0,  1.0,
			0.0, 0.0,  1.0,
			0.0, 0.0,  1.0,
			0.0, 0.0,  1.0,

			0.0, 0.0, -1.0,
			0.0, 0.0, -1.0,
			0.0, 0.0, -1.0,
			0.0, 0.0, -1.0
		];

		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */
		
	   this.texCoords = [
		0.25, 0.75,
		0.00, 0.50,
		0.25, 0.25,
		0.50, 0.50,

		0.25, 0.75,
		0.00, 0.50,
		0.25, 0.25,
		0.50, 0.50
		]

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

