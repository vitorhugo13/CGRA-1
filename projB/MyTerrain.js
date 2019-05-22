/*
* MyTerrain
* @constructor
*/

class MyTerrain extends CGFobject{

    constructor(scene) {

		super(scene);
        this.initBuffers();
        
    }
    
    initBuffers(){
        this.plane = new Plane(this,32);

        this.terrainTex = new CGFtexture(this.scene, "images/terrain.jpg");
        this.terrainMap = new CGFtexture(this.scene, "images/heightmap.jpg");
        
        this.terrainShader = new CGFshader(this.gl, "shaders/terrain.vert", "shaders/terrain.frag");
    }

    display(){
        plane.display();
    }
}