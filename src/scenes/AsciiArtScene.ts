import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene } from "@babylonjs/core/scene";
// import { CreateSphere } from "@babylonjs/core/Meshes/Builders/sphereBuilder";
// import { CreateGround } from "@babylonjs/core/Meshes/Builders/groundBuilder";
// import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { AsciiArtPostProcess } from '@babylonjs/post-processes/asciiArt';
import { CreateSceneClass } from "../createScene";
// If you don't need the standard material you will still need to import it since the scene requires it.
import "@babylonjs/core/Materials/standardMaterial";
// import { Texture } from "@babylonjs/core/Materials/Textures/texture";
// import grassTextureUrl from "../../assets/grass.jpg";
// import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
// import { ShadowGenerator } from "@babylonjs/core/Lights/Shadows/shadowGenerator";
import "@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import GUI from 'lil-gui';
import skully2 from "../../assets/glb/skully2.glb";

export class AsciiArtScene implements CreateSceneClass {
    createScene = async (
        engine: Engine,
        canvas: HTMLCanvasElement
    ): Promise<Scene> => {
        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new Scene(engine);

        void Promise.all([
            import("@babylonjs/core/Debug/debugLayer"),
            // import("@babylonjs/inspector"),
        ]).then((_values) => {
            console.log(_values);
            scene.debugLayer.show({
                handleResize: true,
                overlay: true,
                globalRoot: document.getElementById("#root") || undefined,
            });
        });

        // This creates and positions a free camera (non-mesh)
        const camera = new ArcRotateCamera(
            "my first camera",
            -1.55,
            0,
            6,
            new Vector3(0, 60, 0),
            scene);

        // // This targets the camera to scene origin
        camera.setTarget(Vector3.Zero());

        // // This attaches the camera to the canvas
        // camera.attachControl(canvas, true);

        // // Our built-in 'sphere' shape.
        // const sphere = CreateSphere(
        //     "sphere",
        //     { diameter: 2, segments: 32 },
        //     scene
        // );

        // Move the sphere upward 1/2 its height
        // sphere.position.y = 1;

        // Our built-in 'ground' shape.
        // const ground = CreateGround(
        //     "ground",
        //     { width: 6, height: 6 },
        //     scene
        // );

        //Load a texture to be used as the ground material
        // const groundMaterial = new StandardMaterial("ground material", scene);
        // groundMaterial.diffuseTexture = new Texture(grassTextureUrl, scene);
        // ground.material = groundMaterial;
        // ground.receiveShadows = true;

        // const light = new DirectionalLight(
        //     "light",
        //     new Vector3(0, -100, 0),
        //     scene
        // );
        // light.intensity = 0.8;
        // light.position.y = -50;

        // const shadowGenerator = new ShadowGenerator(512, light)
        // shadowGenerator.useBlurExponentialShadowMap = true;
        // shadowGenerator.blurScale = 2;
        // shadowGenerator.setDarkness(0.2);
        // shadowGenerator.getShadowMap()?.renderList?.push(sphere);
        const importResult = await SceneLoader.ImportMeshAsync(
            "",
            "",
            skully2,
            scene,
            undefined,
            ".glb"
        );


        const postProcess = new AsciiArtPostProcess("AsciiArt", camera, {
            font: "15px Monospace",
            //characterSet: " .-^=#@%&$:;<=>?[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
        });

        postProcess.mixToNormal = 0;
        postProcess.mixToTile = 0;
        // console.log(scene);
        const gui = new GUI();

        gui.add(postProcess, 'mixToNormal', 0, 1, 0.1);
        gui.add(postProcess, 'mixToTile', 0, 1, 0.1);
        gui.add(postProcess, 'enablePixelPerfectMode');



        // gui.add( postProcess, 'font', 1, 100, 1 );
        //gui.add( postProcess, 'characterSet', [' abcdefghij', ' .-=#@', ' abcdefghijklmnopqrstuvwxyz' ]);

        // const myObject = {
        //     myBoolean: true,
        //     myFunction: function() { ... },
        //     myString: 'lil-gui',
        //     myNumber: 1
        // };

        // gui.add( myObject, 'myBoolean' );  // Checkbox
        // gui.add( myObject, 'myFunction' ); // Button
        // gui.add( myObject, 'myString' );   // Text Field
        // gui.add( myObject, 'myNumber' );   // Number Field

        // Add sliders to number fields by passing min and max
        // gui.add( postProcess, 'scale', 0, 10 );
        // gui.add( myObject, 'myNumber', 0, 100, 2 ); // snap to even numbers

        // // Create dropdowns by passing an array or object of named values
        // gui.add( myObject, 'myNumber', [ 0, 1, 2 ] );
        // gui.add( myObject, 'myNumber', { Label1: 0, Label2: 1, Label3: 2 } );

        // // Chainable methods
        // gui.add( myObject, 'myProperty' )
        //     .name( 'Custom Name' )
        //     .onChange( value => {
        //         console.log( value );
        //     } );

        // // Create color pickers for multiple color formats
        // const colorFormats = {
        //     string: '#ffffff',
        //     int: 0xffffff,
        //     object: { r: 1, g: 1, b: 1 },
        //     array: [ 1, 1, 1 ]
        // };

        // gui.addColor( colorFormats, 'string' );

        return scene;


    };
}

export default new AsciiArtScene();
