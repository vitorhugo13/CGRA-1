
/**
 * MyBird
 * @constructor
 */
class MyBird extends CGFobject {

    constructor(scene, body, eyes, nose) {
        super(scene);

        this.orientation = 0;
        this.speed = 0;
        this.position = [0, 3, 0];
        this.wingAngle = 0;

        this.bodyT = body;
        this.eyesT = eyes;
        this.noseT = nose;

        this.BirdState = {
            NORMAL : 0,
            DESCENDING : 1,
            ASCENDING : 2,
        };
        this.state = this.BirdState.NORMAL;
        
        // variables connected to MyInterface
        this.speedFactor = 1;
        this.scaleFactor = 1;
        
        this.initBuffers();
    }

    descend() {
        this.state = this.BirdState.DESCENDING;
    }

    turn(angle) {
        this.orientation += angle;
    }

    accelerate(speedIncrement) {
        this.speed += speedIncrement * this.speedFactor;
    }

    reset() {
        this.orientation = 0;
        this.speed = 0;
        this.position = [0, 3, 0];
    }

    update(time) {
        this.timeFactor = 200;

        switch (this.state) {
            case this.BirdState.NORMAL:
                this.position[0] = this.position[0] + this.speed * Math.cos(-this.orientation);
                this.position[2] = this.position[2] + this.speed * Math.sin(-this.orientation);
    
                this.verticalRange = 0.1;
                this.position[1] = this.position[1] + Math.sin(time / this.timeFactor * this.speedFactor) * this.verticalRange;
                break;
            case this.BirdState.ASCENDING:
                break;
            case this.BirdState.DESCENDING:
                break;
        }

        this.wingAngle = Math.sin(time / this.timeFactor * this.speedFactor) * Math.PI / 8;
    }

    initBuffers() {

        this.head  = new MyUnitCubeQuad(this.scene,this.bodyT,this.bodyT,this.bodyT);
        this.body  = new MyUnitCubeQuad(this.scene,this.bodyT,this.bodyT,this.bodyT);
        this.wing1 = new MyQuad(this.scene);
        this.wing2 = new MyQuad(this.scene);
        this.nose  = new MyPyramid(this.scene, 4);
        this.wing3 = new MyTriangle(this.scene);
        this.wing4 = new MyTriangle(this.scene);
        this.eye1  = new MyUnitCubeQuad(this.scene,this.eyesT,this.eyesT,this.eyesT);
        this.eye2  = new MyUnitCubeQuad(this.scene,this.eyesT,this.eyesT,this.eyesT);
        this.tail  = new MyTriangle(this.scene);
        this.esfera1 = new MySphere(this.scene,20,20);
        this.esfera2 = new MySphere(this.scene,20,20);

    } 

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            
        


        this.scene.pushMatrix();
        this.body.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.esfera1.display();
        this.scene.popMatrix();
       
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,1,0,0);
        this.esfera2.display();
        this.scene.popMatrix();





        this.scene.pushMatrix();
        this.scene.translate(0,1,0.5);
        this.scene.scale(0.7,0.7,0.7);
        this.head.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,1.35,0.85);
        this.scene.scale(0.2,0.2,0.2);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.noseT.apply();
        this.nose.display();
        this.scene.popMatrix();

        
        // TODO: change position of the wings so the quad is not inside the birds body
        this.scene.pushMatrix();
        this.scene.rotate(this.wingAngle, 0, 0, 1);

        this.scene.pushMatrix();
        this.scene.translate(0.7,0.5,0.08);
        this.scene.rotate(Math.PI/6,0,0,1);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(1,0.5,0);
        this.bodyT.apply();
        this.wing1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.5,0.5,0.085);
        this.scene.rotate(-Math.PI/6,0,0,1);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.5,0.25,1);
        this.bodyT.apply();
        this.wing3.display();
        this.scene.popMatrix();
        
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.rotate(this.wingAngle, 0, 0, -1);

        this.scene.pushMatrix();
        this.scene.translate(-0.7,0.5,0.08);
        this.scene.rotate(-Math.PI/6,0,0,1);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(1,0.5,0);
        this.bodyT.apply();
        this.wing2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.5,0.5,0.085);
        this.scene.rotate(Math.PI/6,0,0,1);
        this.scene.rotate(Math.PI,0,0,1);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.5,0.25,1);
        this.bodyT.apply();
        this.wing4.display();
        this.scene.popMatrix();

        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(-0.35,1.3,0.55);
        this.scene.scale(0.2,0.2,0.2);
        this.eye1.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0.35,1.3,0.55);
        this.scene.scale(0.2,0.2,0.2);
        this.eye2.display();
        this.scene.popMatrix();

    
        this.scene.pushMatrix();
        this.scene.translate(0,0.7,-0.7);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.scale(0.5,0.5,0.5);
        this.noseT.apply();
        this.tail.display();
        this.scene.popMatrix();
    
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.head.enableNormalViz();
        this.body.enableNormalViz();
        this.wing1.enableNormalViz();
        this.wing2.enableNormalViz();
        this.nose.enableNormalViz();
        this.eye1.enableNormalViz();
        this.eye2.enableNormalViz();
        this.wing3.enableNormalViz();
        this.wing4.enableNormalViz();
        this.tail.enableNormalViz();    
    }

    disableNormalViz() {
        this.head.disableNormalViz();
        this.body.disableNormalViz();
        this.wing1.disableNormalViz();
        this.wing2.disableNormalViz();
        this.nose.disableNormalViz();
        this.eye1.disableNormalViz();
        this.eye2.disableNormalViz();
        this.wing3.disableNormalViz();
        this.wing4.disableNormalViz();
        this.tail.disableNormalViz(); 
    }
}