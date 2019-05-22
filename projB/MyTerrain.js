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
        this.terrainShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.plane = new Plane(this.scene,32); 
        this.terrainShader.setUniformsValues({terrainMap: 1, terrainAltimetry: 2});
        //this.terrainShader.setUniformsValues({uSampler2: 1, uSampler3: 2});
    }

    initMaterials(){
        this.terrainTex = new CGFtexture(this.scene, "images/terrain.jpg");
        this.terrainMap = new CGFtexture(this.scene, "images/heightmap.jpg");
        this.terrainAltimetry = new CGFtexture(this.scene, "images/altimetry.png");
        

       
    }

    display(){
        
        this.terrainTex.bind(0);
        this.terrainMap.bind(1);
        this.terrainAltimetry.bind(2);
        this.scene.setActiveShaders(this.terrainShader);
        //don't know if transformation are needed;
        
        this.plane.display();

        this.scene.setActiveShaders(this.defaultShader);
    }
}