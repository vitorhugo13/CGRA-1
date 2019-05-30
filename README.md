# CGRA

All code developed for the TP classes of the CGRA course

## Info
* **Date** : 2nd Year, 2nd Semester, 2018/2019
* **Course** : [Computação Gráfica](https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=419996) | [Computer Graphics](https://sigarra.up.pt/feup/en/UCURR_GERAL.FICHA_UC_VIEW?pv_ocorrencia_id=419996) (CGRA)
* **Contributors** : [Bernardo Santos](https://github.com/bernas670), [Vítor Gonçalves](https://github.com/torrinheira)

### Table of Contents
* [**TP01**](#tp01---setup-and-gui) - Setup and GUI
* [**TP02**](#tp02---geometry-and-transformations) - Geometry and Transformations
* [**TP03**](#tp03---ilumination-and-materials) - Ilumination and Materials
* [**TP04**](#tp04---texture) - Textures
* [**Project A**](#project-a) - *Application of the above*
* [**TP05**](#tp05---shaders) - Shaders
* [**TP06**](#tp06---procedural-modeling) - Procedural Modeling
* [**Project B**](#project-b) - *Application of the above*

#### TP01 - Setup and GUI
* **Specification** : [Portuguese](specifications/tp01.pdf)

#### TP02 - Geometry and Transformation
* **Specification** : [Portuguese](specifications/tp02.pdf)

#### TP03 - Ilumination and Materials
* **Specification** : [Portuguese](specifications/tp03.pdf)

#### TP04 - Textures
* **Specification** : [Portuguese](specifications/tp04.pdf)

#### Project A
* **Specification** : [Portuguese](specifications/projA.pdf)
* **Grade** : 17.8

#### TP05 - Shaders
* **Specification** : [Portuguese](specifications/tp05.pdf)

#### TP06 - Procedural Modeling
* **Specification** : [Portuguese](specifications/tp06.pdf)

#### Project B
* **Specification** : [Portuguese](specification/projB.pdf)
* **Grade** :
* **TODO**:
    * change the bird model (body, head, eyes, beak and wings) (dimensions: 2 units, wingspan: up to 3 units);
    * fix bird movement : 
        [ ] check if the bird is supposed to go back or just decrease its speed
        [ ] when the speedFactor is lower the oscilation has a bigger amplitude
        [X] the speedFactor does not change the current movement speed but only the increments
        [X] change the period of the up and down movement to 2 seconds
        [X] when the bird is reset, the position of the branch he is carrying is not reset
    * pick up and drop off branch:
        [X] pick up the branch
        [ ] generic location for the branch when the bird is holding it
        [X] drop off the branch at the nest
        [ ] generic location for when the branch is on the nest
    * improve house model and textures (side: at least 3 units, up to 8 units away from the origin);
    * improve skybox texture;
    * improve branch model;
    * place at least 4 branches on the scene;
    * lighting and animation
    * trees
