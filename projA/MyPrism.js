/**
 * MyPrism
 * 
 */

class MyPrism extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        
        this.slices = slices;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;
        var sCoord = 0;
        var sDelta = 1 / this.slices;

        /*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

        for (var i = 0; i < this.slices; i++) {
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(ca, 0, -sa);
            this.vertices.push(ca, 1, -sa);
            this.vertices.push(caa, 0, -saa);
            this.vertices.push(caa, 1, -saa);

            this.texCoords.push(sCoord, 1);
            this.texCoords.push(sCoord, 0);
            this.texCoords.push(sCoord + sDelta, 1);
            this.texCoords.push(sCoord + sDelta, 0);

            // triangle normal computed by cross product of two edges
            var normal = [ saa-sa, 0, caa-ca ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this rectangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(4 * i, (4 * i + 2), (4 * i + 1));
            this.indices.push((4 * i + 1), (4 * i + 2), (4 * i + 3));

            ang += alphaAng;
            sCoord += sDelta;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}