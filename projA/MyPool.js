class MyPool extends CGFobject{
    constructor(scene, length, width, borderTopTexture, borderBottomTexture, borderSideTexture, waterTexture) {
        super(scene);

        this.x = length;
        this.z = width;
        this.borderTopTexture = borderTopTexture;
        this.borderBottomTexture = borderBottomTexture;
        this.borderSideTexture = borderSideTexture;
        this.waterTexture = waterTexture;

        this.initBuffers();
    }

    initBuffers() {
        this.slab = new MyUnitCubeQuad(this.scene, this.borderTopTexture, this.borderSideTexture, this.borderBottomTexture);
        this.water = new MyQuad(this.scene, this.x, this.z);

        this.coords = [];

        for (var i = 0; i < this.x; i++) {
            if (i == 0 || i == this.x - 1) {
                for (var j = 0; j < this.z; j++)
                    this.coords.push(i + 0.5, 0, j + 0.5);
            }
            else {
                this.coords.push(i + 0.5, 0, 0.5);
                this.coords.push(i + 0.5, 0, this.z - 0.5);
            }
        }
    }

    display() {
        for (var i = 0; i < this.coords.length/3; i++) {
            this.scene.pushMatrix();
            this.scene.translate(this.coords[i * 3], this.coords[i * 3 + 1], this.coords[i * 3 + 2]);
            this.scene.scale(1, 0.5, 1);
            this.slab.display();
            this.scene.popMatrix();
        }

        this.scene.pushMatrix();
        this.scene.translate(this.x/2, 0.25, this.z/2);
        this.scene.scale(this.x, 0, this.z);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.waterTexture.apply();
        this.water.display();
        this.scene.popMatrix();
    }

}