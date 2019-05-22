
/**
 * MyBird
 * @constructor
 */
class MyBird extends CGFobject {

    constructor(scene) {
        super(scene);

        this.orientation = 0;
        this.speed = 0;
        this.position = [0, 3, 0];

        this.speedFactor = 1;
        this.scaleFactor = 1;

        this.initBuffers();
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
        this.position[0] = this.position[0] + this.speed * Math.cos(this.orientation);
        this.position[2] = this.position[2] + this.speed * Math.sin(this.orientation);
    }

    initBuffers() {
        this.head = new MyUnitCubeQuad(this.scene, this.scene.yellow, this.scene.yellow, this.scene.yellow);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.position[0], this.position[1], this.position[2]);
        this.scene.rotate(this.orientation, 0, 1, 0);
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.head.display();
        this.scene.popMatrix();

    }
}