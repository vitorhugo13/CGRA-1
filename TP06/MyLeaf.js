class MyLeaf extends CGFobject {

    constructor(scene) {
		super(scene);
		this.initBuffers();
    }
    
	initBuffers() {
		this.vertices = [
            0, 0, 0,    // 0
            1, 1, 0,    // 1
            3, 1, 0,    // 2
		2, 0, 0,     // 3
		
		0, 0, 0,    // 0
            1, 1, 0,    // 1
            3, 1, 0,    // 2
            2, 0, 0     // 3
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

		this.indices = [
            0, 3, 2,
            2, 1, 0,
            2, 3, 0,
            0, 1, 2
		];

		this.texCoords = [
			0.25, 0.75,
			0.50, 1.00,
			1.00, 1.00,
			0.75, 0.75,
	
			0.25, 0.75,
			0.50, 1.00,
			1.00, 1.00,
			0.75, 0.75
		]
		this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    display() {
        this.scene.leaf.apply();
        super.display();
    }
}