/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);

		scene.diamond = new MyDiamond(scene);
		scene.triangle = new MyTriangle(scene);
		scene.triangleSmall = new MyTriangleSmall(scene);
		scene.triangleBig = new MyTriangleBig(scene);
		scene.parallelogram = new MyParallelogram(scene);

		//this.initBuffers();
	}

	initBuffers() {
		this.normals = this.scene.diamond.normals;

		//this.primitiveType = this.scene.gl.TRIANGLES;
		//this.initGLBuffers();
	}

	display() {

		/* display DIAMOND */
		var rot = [Math.cos(Math.PI / 4.0), Math.sin(Math.PI / 4.0), 0.0, 0.0,
		-Math.sin(Math.PI / 4.0), Math.cos(Math.PI / 4.0), 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0];
		var tra = [1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			-(Math.sqrt(2.0) / 2.0 + 2.0), 2.0 - Math.sqrt(2.0) / 2.0, 0.0, 1.0];
		this.scene.pushMatrix();
		this.scene.multMatrix(tra);
		this.scene.multMatrix(rot);
		this.scene.diamond.display();
		this.scene.popMatrix();

		/* display TRIANGLE */

		this.scene.pushMatrix();
		this.scene.translate(-1.0, 1.0, 0.0);
		this.scene.triangle.display();
		this.scene.popMatrix();

		/* display SMALL TRIANGLES */

		this.scene.pushMatrix();
		this.scene.translate(-(3.0 * Math.sqrt(2.0) / 2.0 + 2), 2.0 - Math.sqrt(2.0) / 2.0, 0.0);
		this.scene.rotate(-3.0 * Math.PI / 4.0, 0.0, 0.0, 1.0);
		this.scene.triangleSmall.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-(3.0 + Math.sqrt(2.0)), 2.0, 0.0);
		this.scene.scale(1.0, -1.0, 1.0);
		this.scene.triangleSmall.display();
		this.scene.popMatrix();

		/* display BIG TRIANGLES */

		this.scene.pushMatrix();
		this.scene.scale(1.0, -1.0, 1.0);
		this.scene.triangleBig.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(2.0, 0.0, 0.0);
		this.scene.triangleBig.display();
		this.scene.popMatrix();

		/* display PARALLELOGRAM */

		this.scene.pushMatrix();
		this.scene.scale(1.0, -1.0, 1.0);
		this.scene.translate(2.0, 0.0, 0.0);            
		this.scene.parallelogram.display();
		this.scene.popMatrix();
	}

}

