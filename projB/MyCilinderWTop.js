/**
 * MyTreeBranch
 * @constructor
 * 
 */

class MyCilinderWTop extends CGFobject {
    
    constructor(scene, slices) {
        super(scene);
        
        this.slices = slices;

        this.initBuffers();
    }
}