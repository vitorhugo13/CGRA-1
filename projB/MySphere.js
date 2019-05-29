/*
 * MySphere
 *@constructor
 * 
 */

class MySphere extends CGFobject{

    constructor(scene,slices,stacks) {
        super(scene);

        this.slices = slices;
        this.stacks=stacks;
        this.initBuffers();  
    }

    initBuffers(){

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 2 * Math.PI / this.slices;
        var ang2 = Math.PI /(2* this.stacks);

    for (let j = 0; j <= this.stacks; j++) {
        for (let i = 0; i <= this.slices; i++) {

            if( j != this.stacks && i!=this.slices){
                this.indices.push(j * (this.slices + 1) + i, j * (this.slices + 1) + 1 + i, (j + 1) * (this.slices + 1) + i);
                this.indices.push(j * (this.slices + 1) + 1 + i, (j + 1) * (this.slices + 1) + 1 + i, (j + 1) * (this.slices + 1) + i);
            }

            this.normals.push(Math.cos(ang * i) * Math.cos(ang2 * j), Math.sin(ang * i) * Math.cos(ang2 * j), Math.sin(ang2 * j));
            this.vertices.push(Math.cos(ang * i) * Math.cos(ang2 * j), Math.sin(ang * i) * Math.cos(ang2 * j), Math.sin(ang2 * j));
            this.texCoords.push(i * 1 / this.slices, j * 1 / this.stacks);
        }
    }



    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();


    }
}

