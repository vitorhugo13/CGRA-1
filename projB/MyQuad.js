/**
 * MyQuad
 * 
 */
class MyQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();

		//deleted s and t from arguments in the constructor
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0,	//0
			0.5, -0.5, 0,	//1
			-0.5, 0.5, 0,	//2
			0.5, 0.5, 0		//3
		];

		//Facing Z positive
		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2,

			2, 1 ,0,
			2, 3, 1

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
			0, 1,
			1, 1,
			0, 0,
			1, 0
		]
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	updateTexCoords(s, t) {

		for (var i = 0; i < 4; i++) {
			this.texCoords[i * 2] *= s;
			this.texCoords[i * 2 + 1] *= t;
			console.log(this.texCoords[i * 2]);
			console.log(this.texCoords[i * 2 + 1]);

		}
		this.updateTexCoordsGLBuffers();
	}

}

