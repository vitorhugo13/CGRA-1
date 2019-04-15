/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        this.gui.add(this.scene, 'displayAxis').name("Display axis");
        this.gui.add(this.scene, 'displayTextures').name("Display textures");
        this.gui.add(this.scene, 'selectedTime', this.scene.timeID).name('Time of Day').onChange(this.scene.updateLights.bind(this.scene));

        return true;
    }
}