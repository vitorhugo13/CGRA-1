/**
 * MyLightning
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLightning extends MyLSystem {

    constructor(scene) {
        super(scene);

        this.axiom = "X";
        this.angle = 25 * Math.PI / 180;
        this.iterations = 3;
        this.scale = 0.5;
        this.rulesX = ["F[-X][X]F[-X]+FX"];
        this.rulesF = ["FF"];
    }

    initGrammar() {
        this.grammar = {
            "F": new MyQuad()
        }
    }

}