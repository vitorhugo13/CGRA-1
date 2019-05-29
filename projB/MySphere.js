/*
 * MySphere
 *@constructor
 * 
 */

class MySphere extends CGFobject{

    constructor(scene,slices) {
        super(scene);

        this.slices = slices;
        this.initBuffers();  
    }

    initBuffers(){

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();


    }
}

