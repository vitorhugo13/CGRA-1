
/**
 * MyBird
 * @constructor
 */
class MyBird extends CGFobject {

    constructor(scene, body, eyes, nose) {
        super(scene);

        this.orientation = 0;
        this.speed = 0;

        this.x0 = 0;
        this.y0 = 4;
        this.z0 = 0;

        this.x = this.x0;
        this.y = this.y0;
        this.z = this.z0;

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
        if (this.state != this.BirdState.NORMAL)
            return;

        this.state = this.BirdState.DESCENDING;
        this.yDecrement = - (this.y - 0.5) * this.scene.updatePeriod / 1000;
    }

    ascend() {
        if (this.state != this.BirdState.DESCENDING)
            return;

        this.state = this.BirdState.ASCENDING;
        this.yIncrement = (this.y0 - this.y) * this.scene.updatePeriod / 1000;
    }

    turn(angle) {
        this.orientation += angle;

        if (this.hasBranch)
            this.branch.updateOrientation(angle);
    }

    accelerate(speedIncrement) {
        this.speed += speedIncrement;
    }

    reset() {
        this.orientation = 0;
        this.speed = 0;
        this.x = this.x0;
        this.y = this.y0;
        this.z = this.z0;

        this.state = this.BirdState.NORMAL;

        if (!this.hasBranch)
            return;

        this.branch.setPosition(this.x0, this.y0, this.z0);
        this.branch.setOrientation(this.orientation + Math.PI / 2);
    }

    getDistanceToBranch(branch) {
        return Math.sqrt(Math.pow(this.x - branch.x, 2) + Math.pow(this.z - branch.z, 2));
    }

    grabBranch() {
        for (var i = 0; i < this.scene.branches.length; i++) {
            if (this.getDistanceToBranch(this.scene.branches[i]) > 3)
                continue;
            
            this.hasBranch = true;
            this.branch = this.scene.branches[i];
            this.scene.branches.splice(i, 1);
            this.branch.setPosition(this.x, this.y - 0.5 * this.scaleFactor, this.z);
            this.branch.setOrientation(this.orientation + Math.PI / 2);
            
            console.log("Caught a branch\n");
            break;
        }
    }

    getDistanceToNest() {
        return Math.sqrt(Math.pow(this.x - this.scene.nest.x, 2) + Math.pow(this.z - this.scene.nest.z, 2));
    }

    dropBranch() {
        if (this.getDistanceToNest() > 3)
            return;
        
        this.scene.nest.addBranch(this.branch);
        this.branch = null;
        this.hasBranch = false;
    }

    setPosition(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;

        if (!this.hasBranch)
            return;
        this.branch.setPosition(x, y - 0.5 * this.scaleFactor, z);
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

        this.updatePosition(this.speed * Math.cos(-this.orientation) * this.speedFactor, 0, this.speed * Math.sin(-this.orientation) * this.speedFactor);

        switch (this.state) {
            case this.BirdState.NORMAL:
                this.verticalRange = 0.3;
                this.timeFactor = 200;
                this.setPosition(this.x, this.y0 + Math.sin(time / 2 / Math.PI * 0.05) * this.verticalRange, this.z);   // FIXME: when the speedFactor is lower the oscilation has a bigger amplitude
                break;
            case this.BirdState.DESCENDING:
                if (this.y > 0.5) {
                    this.updatePosition(0, this.yDecrement, 0);
                    break;
                }

                if (!this.hasBranch)
                    this.grabBranch();
                else
                    this.dropBranch();
                
                this.ascend();
                break;
            case this.BirdState.ASCENDING:
                if (this.y >= this.y0) {
                    this.state = this.BirdState.NORMAL;
                    break;
                }
                this.updatePosition(0, this.yIncrement, 0);
                break;
        }

        this.wingAngle = Math.sin(time / 2 / Math.PI * 0.05 * this.speedFactor) * Math.PI / 8;
    }

    initBuffers() {

        this.wing1 = new MyQuad(this.scene);
        this.wing2 = new MyQuad(this.scene);
        this.nose  = new MyPyramid(this.scene, 4);
        this.wing3 = new MyTriangle(this.scene);
        this.wing4 = new MyTriangle(this.scene);
        this.eye1  = new MyUnitCubeQuad(this.scene,this.eyesT,this.eyesT,this.eyesT);
        this.eye2  = new MyUnitCubeQuad(this.scene,this.eyesT,this.eyesT,this.eyesT);
        this.tail  = new MyTriangleSmall(this.scene);
        this.esfera1 = new MySphere(this.scene,30,30);
        this.esfera2 = new MySphere(this.scene,30,30);
        this.esfera3 = new MySphere(this.scene,30,30);
        this.esfera4 = new MySphere(this.scene,30,30);

    } 

    display(){
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            
        
        //sphere that represents the body
        
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.7);
        this.bodyT.apply();
        this.esfera1.display();
        this.scene.popMatrix();
       
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.scale(0.5,0.5,0.7);
        this.bodyT.apply();
        this.esfera2.display();
        this.scene.popMatrix();
        

        //sphere that represents the head
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0.7);
        this.scene.scale(0.4,0.4,0.4);
        this.bodyT.apply();
        this.esfera3.display();
        this.scene.popMatrix();
       
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0.7);
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.scale(0.4,0.4,0.4);
        this.bodyT.apply();
        this.esfera4.display();
        this.scene.popMatrix();


        //beak
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,1.05);
        this.scene.scale(0.2,0.2,0.2);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.noseT.apply();
        this.nose.display();
        this.scene.popMatrix();

        
        this.scene.pushMatrix();
        this.scene.rotate(this.wingAngle, 0, 0, 1);

        
        this.scene.pushMatrix();
        this.scene.translate(0.9,0.3,0.08); 
        this.scene.rotate(Math.PI/6,0,0,1);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(1,0.5,1);
        this.bodyT.apply();
        this.wing1.display();
        this.scene.popMatrix();
    

        this.scene.pushMatrix();
        this.scene.translate(1.76,0.3,0.085);
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
        this.scene.translate(-0.9,0.3,0.08);
        this.scene.rotate(-Math.PI/6,0,0,1);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(1,0.5,1);
        this.bodyT.apply();
        this.wing2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.76,0.3,0.085);
        this.scene.rotate(Math.PI/6,0,0,1);
        this.scene.rotate(Math.PI,0,0,1);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.5,0.25,1);
        this.bodyT.apply();
        this.wing4.display();
        this.scene.popMatrix();

        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(-0.27,0.65,0.95);
        this.scene.scale(0.1,0.1,0.1);
        this.eye1.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0.27,0.65,0.95);
        this.scene.scale(0.1,0.1,0.1);
        this.eye2.display();
        this.scene.popMatrix();

    
        this.scene.pushMatrix();
        this.scene.translate(0,0.05,-1.2);
        this.scene.rotate(Math.PI/15,1,0,0);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.scale(0.5,1.5,0.5);
        this.noseT.apply();
        this.tail.display();
        this.scene.popMatrix();
    
        this.scene.popMatrix();

        if (!this.hasBranch)
            return;
        console.log("Displayed branch")
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