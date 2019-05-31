/**
 * MyLSPlant
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLSPlant extends MyLSystem {
    
    constructor(scene) {
        super(scene);
        this.initValues();
        this.doGenerate();
    }

    initValues() {
        this.axiom = "X";
        this.angle = 30;
        this.iterations = 4;
        this.scale = 0.5;
        this.rulesX = [
            "F[-X][X]F[-X]+X",
            "F[-X][X]+X",
            "F[+X]-X",
            "F[/X][X]F[\\X]+X",
            "F[\X][X]/X",
            "F[/X]\X",
            "F[^X][X]F[&X]^X",
            "F[^X]&X",
            "F[&X]^X"
        ];
        this.rulesF = [
            "FF"
        ];
    }

    initGrammar() {
        this.grammar = {
            "F": new MyBranch(this.scene),
            "X": new MyLeaf(this.scene)
        };
    }

    doGenerate() {
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
}