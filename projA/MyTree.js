/**
 * MyTree
 * 
 */

class MyPrism extends CGFobject {
    constructor(scene,trunkHeight,trunkRadius,treeTopHeight,treeTopRadius,trunkTexture,treeTopTexture) {
        super(scene);

        this.initBuffers()
    }

    initBuffers() {
        this.top = MyCone()
    }

    display() {

    }
}