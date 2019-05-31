/**
 * MyLightning
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLightning extends MyLSystem {

    constructor(scene) {
        super(scene);
        this.initValues();
    }

    initValues() {
        this.axiom = "X";
        this.angle = 25;
        this.iterations = 3;
        this.scale = 0.5;
        // TODO: create more rules
        this.rulesX = [
            "F[-X][X]F[-X]+FX",
            "[X-X-X]FF+X--X[+X+F]"
        ];
        this.rulesF = [
            "FF"
        ];
    }

    initGrammar() {
        this.grammar = {
            "F": new MyLightningSegment(this.scene),
            "X": new MyLightningSegment(this.scene)
        }
    }

    doGenerate() {
        this.initValues();
        super.generate(
            this.axiom,
            {   "X": this.rulesX,
                "F": this.rulesF
            },
            this.angle,
            this.iterations,
            this.scale
        );
    }

    update(t) {
        if (t - this.startTime >= 1000) {
            this.scene.displayLightning = false;
            return;
        }

        this.depth = (t - this.startTime) / 1000 * this.axiom.length;   
    }

    startAnimation(t) {
        this.startTime = t;
        this.doGenerate();
        this.depth = 0;
  
        this.lX = this.scene.randomNumber(-20, 20);
        this.lY = 15;
        this.lZ = this.scene.randomNumber(-20, 20);
        this.lAngle = this.scene.randomNumber(0, 360) * Math.PI / 180;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.lX, this.lY, this.lZ);
        this.scene.rotate(this.lAngle, 0, 1, 0);
        this.scene.scale(this.scale, -this.scale, this.scale);

        var i;

        // percorre a cadeia de caracteres
        for (i = 0; i < this.depth; ++i){

            // verifica se sao caracteres especiais
            switch(this.axiom[i]){
                case "+":
                    // roda a esquerda
                    this.scene.rotate(this.angle, 0, 0, 1);
                    break;

                case "-":
                    // roda a direita
                    this.scene.rotate(-this.angle, 0, 0, 1);
                    break;

                case "[":
                    // push
                    this.scene.pushMatrix();
                    break;

                case "]":
                    // pop
                    this.scene.popMatrix();
                    break;

                case "\\":
                    // roda no sentido positivo dos XX
                    this.scene.rotate(this.angle, 1, 0, 0);
                    break;

                case "/":
                    // roda no sentido negativo dos XX
                    this.scene.rotate(-this.angle, 1, 0, 0);
                    break;

                case "^":
                    // roda no sentido positivo dos YY
                    this.scene.rotate(this.angle, 0, 1, 0);
                    break;

                case "&":
                    // roda no sentido negativo dos YY
                    this.scene.rotate(-this.angle, 0, 1, 0);
                    break;

                // processa primitiva definida na gramatica, se existir
                default:
                    var primitive=this.grammar[this.axiom[i]];

                    if ( primitive )
                    {
                        primitive.display();
                        this.scene.translate(0, 1, 0);
                    }
                    break;
            }
        }
        this.scene.popMatrix();
    }
}