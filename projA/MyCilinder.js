/**
 * MyCilinder
 * 
 */

class MyCilinder extends CGFobject {
    constructor(scene, slices, height) {
        super(scene);
        
        this.slices = slices;
        this.height = height;

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

        for (var i = 0; i <= this.slices; i++) {
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var ca=Math.cos(ang);
            
            // add the first edge two times, first and last run of the cycle
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(ca, this.height, -sa);
            
            this.texCoords.push(sCoord + sDelta, 1);
            this.texCoords.push(sCoord + sDelta, 0);
            
            var normal = [ ca, 0, -sa ];

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
            
            if (i != this.slices) {
                this.indices.push(2 * i, (2 * i + 2), (2 * i + 1));
                this.indices.push((2 * i + 1), (2 * i + 2), (2 * i + 3));
            }
            
            ang += alphaAng;
            sCoord += sDelta;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}