
/**
 * MyBird
 * @constructor
 */
class MyBird extends CGFobject {

    constructor(scene, body, eyes, nose) {
        super(scene);

        this.orientation = 0;
        this.speed = 0;

        this.x = 0;
        this.y = 6;
        this.z = 0;

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

        this.hasBranch = false;
        this.branch = null;
        
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

        if (this.hasBranch)
            this.branch.updateOrientation(angle);
    }

    accelerate(speedIncrement) {
        this.speed += speedIncrement * this.speedFactor;
    }

    reset() {
        this.orientation = 0;
        this.speed = 0;
        this.x = 0;
        this.y = 6;
        this.z = 0;
    }

    getDistanceToBranch(branch) {
        return Math.sqrt(Math.pow(this.x - branch.x, 2) + Math.pow(this.z - branch.z, 2));
    }

    grabBranch() {
        for (var i = 0; i < this.scene.branches.length; i++) {
            if (this.getDistanceToBranch(this.scene.branches[i]) > 5)
                continue;
            
            this.hasBranch = true;
            this.branch = this.scene.branches[i];
            this.scene.branches.splice(i, 1);
            this.branch.setPosition(this.x, 2.8, this.z);
            this.branch.setOrientation(Math.PI / 2);
            
            console.log("Caught a branch\n");
            break;
        }
    }

    setPosition(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;

        if (!this.hasBranch)
            return;
        this.branch.updatePosition(x, y, z);
    }

    updatePosition(x, y, z) {
        this.x += x;
        this.y += y;
        this.z += z;

        if (!this.hasBranch)
            return;
        this.branch.updatePosition(x, y, z);
    }

    update(time) {

        this.updatePosition(this.speed * Math.cos(-this.orientation), 0, this.speed * Math.sin(-this.orientation));

        switch (this.state) {
            case this.BirdState.NORMAL:
                this.verticalRange = 0.1;
                this.timeFactor = 200;
                this.updatePosition(0, Math.sin(time / this.timeFactor * this.speedFactor) * this.verticalRange, 0);
                break;
            case this.BirdState.DESCENDING:
                if (this.y <= 2.9) {
                    this.state = this.BirdState.ASCENDING;

                    if (!this.hasBranch)
                        this.grabBranch();

                    break;
                }
                this.updatePosition(0, -0.2, 0);
                break;
            case this.BirdState.ASCENDING:
                if (this.y >= 6) {
                    this.state = this.BirdState.NORMAL;
                    break;
                }
                this.updatePosition(0, 0.2, 0);
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
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            
        

/*
        this.scene.pushMatrix();
        this.body.display();
        this.scene.popMatrix();
        */


        this.scene.pushMatrix();
        this.scene.scale(0.7,0.7,0.7);
        this.esfera1.display();
        this.scene.popMatrix();
       
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.scale(0.7,0.7,0.7);
        this.esfera2.display();
        this.scene.popMatrix();





        this.scene.pushMatrix();  
        this.scene.scale(0.7,0.7,0.7);
        this.scene.translate(0,0.9,0.5);
        this.head.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,1.15,0.85);
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
        this.scene.translate(-0.35,1,0.55);
        this.scene.scale(0.2,0.2,0.2);
        this.eye1.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0.35,1,0.55);
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

        if (!this.hasBranch)
            return;
        this.branch.display();
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