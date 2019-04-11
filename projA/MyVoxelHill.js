/**
 * MyVoxelHill
 * 
 * 
 * 
 */
class MyVoxelHill extends CGFobject{
    constructor(scene,levels,texture){
        super(scene);
        this.levels=levels;
        this.texture=texture;

        this.initBuffers();
    }


    initBuffers() {
        this.cube = new MyUnitCubeQuad(this.scene);
    }


    display(){
                

                this.scene.pushMatrix();
                this.scene.translate(0,this.levels-0.5,0); //centrar a hill
                this.texture.apply();
                this.cube.display(); //display do cubo que ficará no topo independentemente do nº de levels
                

                //parede frontal
                this.scene.pushMatrix();
				for(var i = 1; i <= this.levels; i++) {
					for(var j = 0; j <  2*i-2; j++){
                        this.scene.translate(1,0,0);
                        this.texture.apply();
					    this.cube.display();
                    }
                    
					this.scene.translate(-2*i+1,-1,1);     
                }
                this.scene.popMatrix();


                //parede lateral direita
               this.scene.pushMatrix();
				for(var i = 1; i <= this.levels; i++) {
					for(var j = 0; j < 2*i-2; j++){
                        this.scene.translate(0,0,-1);
                        this.texture.apply();
                        this.cube.display();
                    }
					this.scene.translate(1,-1,2*i-1);
                }
               this.scene.popMatrix();
    

                //parede traseira
				this.scene.pushMatrix();
				for(var i = 1; i <= this.levels; i++) {
					for(var j = 0; j <  2*i-2; j++){
                        this.scene.translate(-1,0,0);
                        this.texture.apply();
						this.cube.display();
					}
					this.scene.translate(2*i-1,-1,-1);
                }            
                this.scene.popMatrix();
                

                //parede lateral esquerda
                this.scene.pushMatrix();
				for(var i = 1; i <= this.levels; i++) {
					for(var j = 0; j <  2*i-2; j++){
                        this.scene.translate(0,0,1);
                        this.texture.apply();
					    this.cube.display();
				    }
				    this.scene.translate(-1,-1,-2*i+1);
				}
                this.scene.popMatrix();
                

	this.scene.popMatrix(); //fecha o primeiro pushMatrix()

    }



    //ENABLE E DISABLE DAS NORMAIS
    enableNormalViz() {
        this.cube.enableNormalViz();
    }


    disableNormalViz() {
        this.cube.disableNormalViz();
    }
    
}