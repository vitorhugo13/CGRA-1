/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);

		scene.diamond = new MyDiamond(scene);	
		scene.triangle = new MyTriangle(scene);	
		scene.triangleSmall = new MyTriangleSmall(scene);
		scene.triangleBig = new MyTriangleBig(scene);
		scene.parallelogram = new MyParallelogram(scene);
		this.initMaterials();
	}

	initMaterials(){
		//red colour for triangle small 1
		let red=this.scene.hexToRgbA("#ff0000");
		this.triangleSmall1 = new CGFappearance(this.scene);
        this.triangleSmall1.setAmbient(red[0], red[1], red[2], 1.0);
        this.triangleSmall1.setDiffuse(red[0]/3.0, red[1]/3.0, red[2]/3.0, 1.0);
        this.triangleSmall1.setSpecular(red[0], red[1], red[2], 1.0);
		this.triangleSmall1.setShininess(10.0);

		//purple colour for triangle small 2
		let purple=this.scene.hexToRgbA("#ba55d3");
		this.triangleSmall2 = new CGFappearance(this.scene);
        this.triangleSmall2.setAmbient(purple[0], purple[1], purple[2], 1.0);
        this.triangleSmall2.setDiffuse(purple[0]/3.0, purple[1]/3.0, purple[2]/3.0, 1.0);
        this.triangleSmall2.setSpecular(purple[0], purple[1], purple[2], 1.0);
		this.triangleSmall2.setShininess(10.0);

		//Green colour for diamond
		let green=this.scene.hexToRgbA("#00ff00");
		this.diamondColour = new CGFappearance(this.scene);
        this.diamondColour.setAmbient(green[0], green[1], green[2], 1.0);
        this.diamondColour.setDiffuse(green[0]/3.0, green[1]/3.0, green[2]/3.0, 1.0);
        this.diamondColour.setSpecular(green[0], green[1], green[2], 1.0);
		this.diamondColour.setShininess(10.0);

		//pink colour for triangle 
		let pink=this.scene.hexToRgbA("#ffc0cb");
		this.triangleColour = new CGFappearance(this.scene);
        this.triangleColour.setAmbient(pink[0], pink[1], pink[2], 1.0);
        this.triangleColour.setDiffuse(pink[0]/3.0, pink[1]/3.0, pink[2]/3.0, 1.0);
        this.triangleColour.setSpecular(pink[0], pink[1], pink[2], 1.0);
		this.triangleColour.setShininess(10.0);
	
		//orange colour for triangle big 1
		let orange=this.scene.hexToRgbA("#ffa500");
		this.triangleBig1 = new CGFappearance(this.scene);
        this.triangleBig1.setAmbient(orange[0], orange[1], orange[2], 1.0);
        this.triangleBig1.setDiffuse(orange[0]/3.0, orange[1]/3.0, orange[2]/3.0, 1.0);
        this.triangleBig1.setSpecular(orange[0],orange[1], orange[2], 1.0);
		this.triangleBig1.setShininess(10.0);


		//blue colour for triangle big 2
		let blue=this.scene.hexToRgbA("#00ffff");
		this.triangleBig2 = new CGFappearance(this.scene);
        this.triangleBig2.setAmbient(blue[0],blue[1], blue[2], 1.0);
        this.triangleBig2.setDiffuse(blue[0]/3.0, blue[1]/3.0, blue[2]/3.0, 1.0);
        this.triangleBig2.setSpecular(blue[0],blue[1], blue[2], 1.0);
		this.triangleBig2.setShininess(10.0);

		//yellow colour for triangle big 2
		let yellow=this.scene.hexToRgbA("#ffff00");
		this.parallellogramColour = new CGFappearance(this.scene);
        this.parallellogramColour.setAmbient(yellow[0],yellow[1], yellow[2], 1.0);
        this.parallellogramColour.setDiffuse(yellow[0]/3.0, yellow[1]/3.0, yellow[2]/3.0, 1.0);
        this.parallellogramColour.setSpecular(yellow[0],yellow[1], yellow[2], 1.0);
		this.parallellogramColour.setShininess(10.0);

	}

	enableNormalViz(){
		this.scene.diamond.enableNormalViz();
		this.scene.triangle.enableNormalViz();
		this.scene.triangleBig.enableNormalViz();
		this.scene.triangleSmall.enableNormalViz();
		this.scene.parallelogram.enableNormalViz();
	}

	disableNormalViz(){
		this.scene.diamond.disableNormalViz();
		this.scene.triangle.disableNormalViz();
		this.scene.triangleBig.disableNormalViz();
		this.scene.triangleSmall.disableNormalViz();
		this.scene.parallelogram.disableNormalViz();
	}

	display() {

		/* display DIAMOND */
		var rot = [Math.cos(Math.PI / 4.0), Math.sin(Math.PI / 4.0), 0.0, 0.0,
		-Math.sin(Math.PI / 4.0), Math.cos(Math.PI / 4.0), 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0];
		var tra = [1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			-(Math.sqrt(2.0) / 2.0 + 2.0), 2.0 - Math.sqrt(2.0) / 2.0, 0.0, 1.0];
		this.scene.pushMatrix();
		this.scene.multMatrix(tra);
		this.scene.multMatrix(rot);
		
		this.scene.customMaterial.apply();	
		//this.diamondColour.apply();
		
		this.scene.diamond.display();
		this.scene.popMatrix();

		/* display TRIANGLE */

		this.scene.pushMatrix();
		this.scene.translate(-1.0, 1.0, 0.0);
		this.triangleColour.apply();
		this.scene.triangle.display();
		this.scene.popMatrix();

		/* display SMALL TRIANGLES */

		this.scene.pushMatrix();
		this.scene.translate(-(3.0 * Math.sqrt(2.0) / 2.0 + 2), 2.0 - Math.sqrt(2.0) / 2.0, 0.0);
		this.scene.rotate(-3.0 * Math.PI / 4.0, 0.0, 0.0, 1.0);
		this.triangleSmall1.apply();
		this.scene.triangleSmall.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(-(3.0 + Math.sqrt(2.0)), 2.0, 0.0);
		this.scene.scale(1.0, -1.0, 1.0);
		this.triangleSmall2.apply();
		this.scene.triangleSmall.display();
		this.scene.popMatrix();

		/* display BIG TRIANGLES */

		this.scene.pushMatrix();
		this.scene.scale(1.0, -1.0, 1.0);
		this.triangleBig1.apply();
		this.scene.triangleBig.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.scene.translate(2.0, 0.0, 0.0);
		this.triangleBig2.apply();
		this.scene.triangleBig.display();
		this.scene.popMatrix();

		/* display PARALLELOGRAM */

		this.scene.pushMatrix();
		this.scene.scale(1.0, -1.0, 1.0);
		this.scene.translate(2.0, 0.0, 0.0);   
		this.parallellogramColour.apply();         
		this.scene.parallelogram.display();
		this.scene.popMatrix();
	}

}

