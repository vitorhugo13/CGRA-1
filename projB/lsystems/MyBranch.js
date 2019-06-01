class MyBranch extends CGFobject {
    
    constructor(scene) {
        super(scene);

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2 * Math.PI / 4;
        var sCoord = 0;
        var sDelta = 1 / 4;

        for (var i = 0; i <= 4; i++) {
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa = Math.sin(ang);
            var ca = Math.cos(ang);
            
            // add the first edge two times, first and last run of the cycle
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(ca, 1, -sa);
            
            this.texCoords.push(sCoord, 1);
            this.texCoords.push(sCoord, 0);
            
            var normal = [ca, 0, -sa];

            // normalization
            var nsize=Math.sqrt(
                normal[0] * normal[0] +
                normal[1] * normal[1] +
                normal[2] * normal[2]
                );
            normal[0] /= nsize;
            normal[1] /= nsize;
            normal[2] /= nsize;

            // push normal once for each vertex of this rectangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            
            if (i != 4) {
                this.indices.push(2 * i, (2 * i + 2), (2 * i + 1));
                this.indices.push((2 * i + 1), (2 * i + 2), (2 * i + 3));
            }
            
            ang += alphaAng;
            sCoord += sDelta;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.25, 2.5, 0.1);
        this.scene.stickSide.apply();
        super.display();
        this.scene.popMatrix();
    }

}