import * as THREE from 'three';
// Import OrbitControls addon
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// Import post-processing addons
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

console.log("Imports completed. Defining shaders...");

console.log("SoulSpark initializing Three.js...");

// --- Shader Definitions ---
// Fresnel Vertex Shader (COMMENTED OUT FOR DEBUGGING)
/*
const fresnelVertexShader = `
    varying vec3 vNormal;
    varying vec3 vViewDir;

    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        vNormal = normalize(normalMatrix * normal);
        vViewDir = normalize(-mvPosition.xyz); // View direction from vertex towards camera
    }
`;
*/

// Fresnel Fragment Shader (COMMENTED OUT FOR DEBUGGING)
/*
const fresnelFragmentShader = `
    uniform vec3 uBaseColor;
    uniform vec3 uGlowColor;
    uniform float uFresnelPower; // Controls the sharpness of the glow edge
    uniform float uGlowIntensity; // Controls the brightness of the glow

    varying vec3 vNormal;
    varying vec3 vViewDir;

    void main() {
        float fresnelTerm = dot(vNormal, vViewDir);
        fresnelTerm = clamp(1.0 - fresnelTerm, 0.0, 1.0);
        fresnelTerm = pow(fresnelTerm, uFresnelPower);

        vec3 finalColor = uBaseColor + uGlowColor * fresnelTerm * uGlowIntensity;

        gl_FragColor = vec4(finalColor, 1.0);
    }
`;
*/

// Simple Terrain Vertex Shader (RESTORED)
const groundVertexShader = `
varying vec2 vUv;
varying float vElevation;
uniform float uTime; // For potential animation

// 2D Simplex noise function (as defined before)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= (1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h ));
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

void main() {
    vUv = uv;
    vec4 modelPos = modelMatrix * vec4(position, 1.0);
    
    float displacementScale = 1.5; 
    float noiseFrequency = 0.05;
    float elevation = snoise(modelPos.xz * noiseFrequency) * displacementScale;
    modelPos.y += elevation;
    
    vElevation = elevation; 
    
    gl_Position = projectionMatrix * viewMatrix * modelPos;
}
`;

// Procedural Ground Fragment Shader (RESTORED)
const groundFragmentShader = `
varying vec2 vUv;
varying float vElevation;
uniform float uTime; // Use time for subtle animation

// 2D Simplex noise function (needs to be here or included)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= (1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h ));
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

void main() {
    // Define colors
    vec3 grassColor = vec3(0.2, 0.6, 0.1); // Greenish
    vec3 dirtColor = vec3(0.4, 0.25, 0.1); // Brownish
    
    // Calculate noise based on world position (UV tiling affects this)
    float noiseFrequency = 5.0; // Controls patch size
    float noiseValue = snoise(vUv * noiseFrequency + uTime * 0.05); // Animate slightly
    noiseValue = (noiseValue + 1.0) * 0.5; // Map noise from [-1, 1] to [0, 1]

    // Mix colors based on noise
    vec3 finalColor = mix(dirtColor, grassColor, smoothstep(0.4, 0.6, noiseValue));
    
    // Darken slightly based on elevation (optional)
    // float shadow = smoothstep(-1.0, 1.0, vElevation * 0.5 + 0.5); // Adjust factors as needed
    // finalColor *= shadow * 0.3 + 0.7;

    gl_FragColor = vec4(finalColor, 1.0);
}
`;

// --- Globals / Setup ---
// --- Gemini API (COMMENTED OUT FOR DEBUGGING) ---
/*
const GEMINI_API_KEY = "AIzaSyB2vul0OfYfA_M3wpgM1w9hObPG64WtqBw"; 
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
*/

// --- Minimal Globals ---
let scene;
let camera;
let renderer;
let controls;
const clock = new THREE.Clock();

function init() {
    console.log("init: Starting...");
    // Scene
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x333333); // Remove simple grey background
    console.log("init: Scene created.");

    // Add Skybox (COMMENTED OUT FOR DEBUGGING - Missing pz.png)
    /* 
    console.log("init: Loading Skybox...");
    // NOTE: User needs to provide 6 nature-themed images (px.png, nx.png, etc.)
    const loader = new THREE.CubeTextureLoader();
    const texture = loader
        .setPath('assets/textures/skybox/')
        .load([
            // Using established placeholders - ensure these files exist!
            'px.png', // Use real px 
            'nx.png',
            'py.png',
            'ny.png',
            'nz.png', 
            'px.png' // Temporarily using px.png as pz.png is missing
            // Ideally, provide the correct pz.png file
        ]);
    scene.background = texture;
    console.log("init: Skybox load attempt finished."); 
    */
   scene.background = new THREE.Color(0x333333); // Add simple grey background for testing
   console.log("init: Skybox skipped, using solid background color for testing.");

    // --- Camera Setup (Ensure it exists and is positioned) ---
    console.log("init: Setting up Camera...");
    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 1;
    const far = 1000;
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;
    camera.position.y = 1; 
    camera.lookAt(0, 0, 0);
    console.log("init: Camera created.");

    // --- Load Textures (COMMENTED OUT FOR MINIMAL TEST) ---
    /*
    const textureLoader = new THREE.TextureLoader();
    groundTexture = textureLoader.load(...);
    */

    // --- Renderer Setup (Restore ToneMapping, Shadows) ---
    console.log("init: Setting up Renderer...");
    renderer = new THREE.WebGLRenderer({ antialias: true });
    
    // --- Explicit WebGL Context Check ---
    if (!renderer.getContext()) {
        console.error("FATAL: WebGL rendering context could not be created.");
        alert("Error: Could not initialize WebGL...");
        return;
    }
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // --- Add Lights (RESTORED Nature Scene) ---
    console.log("init: Adding Lights...");
    scene.add( new THREE.HemisphereLight( 0xC1E1FF, 0xB97A20, 0.8 ) ); // Sky, Ground, Intensity
    const sunLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
    sunLight.position.set( 10, 20, 5 );
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;
    sunLight.shadow.camera.left = -20;
    sunLight.shadow.camera.right = 20;
    sunLight.shadow.camera.top = 20;
    sunLight.shadow.camera.bottom = -20;
    scene.add( sunLight );
    console.log("init: Lights added.");
    
    // --- Spark Setup (COMMENTED OUT FOR MINIMAL TEST) ---
    /*
    const geometry = new THREE.SphereGeometry(...);
    const shaderMaterial = new THREE.ShaderMaterial({ ... });
    sparkMesh = new THREE.Mesh(geometry, shaderMaterial); 
    scene.add(sparkMesh);
    */

    // --- Add Ground Plane (COMMENTED OUT FOR DEBUGGING) ---
    /*
    console.log("init: Creating Ground Plane...");
    const planeGeometry = new THREE.PlaneGeometry(100, 100, 100, 100); 
    const planeMaterial = new THREE.ShaderMaterial({
        vertexShader: groundVertexShader,
        fragmentShader: groundFragmentShader,
        uniforms: {
            uTime: { value: 0.0 } 
        },
        side: THREE.DoubleSide 
    });
    groundPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    groundPlane.rotation.x = -Math.PI / 2;
    groundPlane.position.y = -1.7; 
    scene.add(groundPlane);
    console.log("init: Ground Plane added.");
    */
    console.log("init: Ground Plane skipped for debugging.");

    // --- Add Minimal Test Cube (DEBUGGING) ---
    console.log("init: Adding Minimal Test Cube...");
    const testGeometry = new THREE.BoxGeometry(1, 1, 1);
    const testMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Bright red
    const testCube = new THREE.Mesh(testGeometry, testMaterial);
    testCube.position.y = 0; // Center it vertically for visibility
    scene.add(testCube);
    console.log("init: Minimal Test Cube added.");

    // --- Add Placeholders (COMMENTED OUT FOR MINIMAL TEST) ---
    /*
    const treeGroup = new THREE.Group(); 
    // ... tree setup ...
    for (let i = 0; i < 30; i++) { ... }
    */
    
    // --- StarSong Group (COMMENTED OUT FOR MINIMAL TEST) ---
    /*
    starSongGroup = new THREE.Group();
    scene.add(starSongGroup);
    */

    // --- Particles (COMMENTED OUT FOR MINIMAL TEST) ---
    /* setupParticleTrail(); */

    // --- Initialize OrbitControls (Keep this for navigation) ---
    console.log("init: Setting up OrbitControls...");
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; 
    controls.dampingFactor = 0.05;
    // ... (rest of controls setup) ...
    console.log("init: OrbitControls created.");

    // --- Post-processing Setup (COMMENTED OUT FOR MINIMAL TEST) ---
    /*
    composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    // bloomPass = new UnrealBloomPass(...);
    // composer.addPass(bloomPass);
    */

    // --- Append renderer to the container ---
    console.log("init: Appending renderer to container...");
    const container = document.getElementById('app-container');
    if (!container) {
        console.error("FATAL: App container not found!");
        return;
    }
    // Clear previous canvas if any (just in case)
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    console.log("init: Renderer appended.");

    // --- UI Refs (COMMENTED OUT FOR MINIMAL TEST - not needed) ---
    /*
    colorPicker = document.getElementById(...);
    // ... all other UI refs ...
    */

    // --- Event Listeners (Keep Resize, Comment out others) ---
    window.addEventListener('resize', onWindowResize, false);
    // renderer.domElement.addEventListener('click', onPointerClick, false);
    // setupEventListeners(); // UI listeners commented out
    console.log("init: Resize listener added.");

    // --- Logging Checkpoint --- 
    console.log("init() completed successfully. Starting animation loop...");
    
    // Start animation loop
    animate();
}


// --- Animation Loop (Simplified) ---
function animate() {
    // console.log("animate() loop started."); // Reduce console noise
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // --- Update Ground Shader Time (COMMENTED OUT) ---
    /*
    if (groundPlane && groundPlane.material.uniforms) { 
        groundPlane.material.uniforms.uTime.value = elapsedTime;
    }
    */

    // --- Rotate Test Cube (DEBUGGING FEEDBACK) ---
    const testCubeRef = scene.getObjectByProperty('type', 'Mesh'); // Simple way to find the cube
    if (testCubeRef) {
        testCubeRef.rotation.x += 0.01;
        testCubeRef.rotation.y += 0.01;
    }

    // Update controls if enabled
    if (controls) {
        controls.update();
    }

    // Render directly (NO COMPOSER)
    renderer.render(scene, camera); 
}

// --- Window Resize (Simplified) ---
function onWindowResize() {
   const width = window.innerWidth;
   const height = window.innerHeight;

   camera.aspect = width / height;
   camera.updateProjectionMatrix();

   renderer.setSize(width, height);
   // composer.setSize(width, height); // Composer not used
}

// ... (Rest of functions can remain, but many won't be called/used) ... 

// --- Initialization Trigger (RESTORED) ---
if (document.readyState === 'loading') { 
    document.addEventListener('DOMContentLoaded', () => {
        console.log("DOMContentLoaded event fired.");
        console.log("Type of init function:", typeof init); // Check if init is defined
        if (typeof init === 'function') {
             init(); // Call init explicitly
        } else {
             console.error("FATAL: init function is not defined!");
        }
    });
} else { 
    // DOMContentLoaded has already fired
    console.log("DOM already loaded. Running init directly.");
    console.log("Type of init function:", typeof init); // Check if init is defined
    if (typeof init === 'function') {
         init(); // Call init explicitly
    } else {
         console.error("FATAL: init function is not defined!");
    }
} 