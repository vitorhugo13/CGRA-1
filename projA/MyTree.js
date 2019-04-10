/**
 * MyTree
 * 
 */

class MyTree extends CGFobject {
    constructor(scene, trunkHeight, trunkRadius, topHeight, topRadius, trunkTexture, topTexture) {
        super(scene);

        this.trunkHeight = trunkHeight;
        this.trunkRadius = trunkRadius;
        this.trunkTexture = trunkTexture;

        this.topHeight = topHeight;
        this.topRadius = topRadius;
        this.topTexture = topTexture;

        this.initBuffers()
    }

    initBuffers() {
        this.trunk = new MyCilinder(this.scene, 10);
        this.top = new MyCone(this.scene, 10);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.trunkRadius, this.trunkHeight, this.trunkRadius);
        //this.trunkTexture.apply();
        this.trunk.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, this.trunkHeight, 0);
        this.scene.scale(this.topRadius, this.topHeight, this.topRadius);
        //this.topTexture.apply();
        this.top.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.trunk.enableNormalViz();
        this.top.enableNormalViz();
    }

    disableNormalViz() {
        this.trunk.disableNormalViz();
        this.top.disableNormalViz();
    }
}