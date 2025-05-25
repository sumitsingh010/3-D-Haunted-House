import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MapControls } from "three/examples/jsm/controls/MapControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import * as dat from "dat.gui";

// Scene
const scene = new THREE.Scene();

//Adding fog to the scene
const fog = new THREE.Fog("#262837", 1, 13);
scene.fog = fog;

// Initalizing Dat gui
const gui = new dat.GUI({ closed: true, width: 400 });

const parameter = {
  bushColor: "#89c854",
  doorLight: "#ff7d46",
  ghostLight1: "#ff00ff",
  ghostLight2: "#ffff00",
  ghostLight3: "#0000ff",
};

// Texture
const textureLoader = new THREE.TextureLoader();

// Loading textures for door
const doorColorTexture = textureLoader.load("textures/door/color.jpg");
const alphaColorTexture = textureLoader.load("textures/door/alpha.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("textures/door/height.jpg");
const normalTexture = textureLoader.load("textures/door/normal.jpg");
const metalnessTexture = textureLoader.load("textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("textures/door/roughness.jpg");

// Loading textures for walls
const brickAmbientOcclusionTexture = textureLoader.load(
  "textures/bricks/ambientOcclusion.jpg"
);
const brickColorTexture = textureLoader.load("textures/bricks/color.jpg");
const brickNormalTexture = textureLoader.load("textures/bricks/normal.jpg");
const brickRoughnessTexture = textureLoader.load(
  "textures/bricks/roughness.jpg"
);

// loading textures for grass
const grassAmbientOcclusionTexture = textureLoader.load(
  "textures/grass/ambientOcclusion.jpg"
);
const grassColorTexture = textureLoader.load("textures/grass/color.jpg");
const grassNormalTexture = textureLoader.load("textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load(
  "textures/grass/roughness.jpg"
);

// Font texture loading
const fontMatcapsTexture1 = textureLoader.load("/matcaps/1.png");
const fontMatcapsTexture2 = textureLoader.load("/matcaps/2.png");
const fontMatcapsTexture3 = textureLoader.load("/matcaps/3.png");
const fontMatcapsTexture4 = textureLoader.load("/matcaps/4.png");
const fontMatcapsTexture5 = textureLoader.load("/matcaps/5.png");
const fontMatcapsTexture6 = textureLoader.load("/matcaps/6.png");
const fontMatcapsTexture7 = textureLoader.load("/matcaps/7.png");
const fontMatcapsTexture8 = textureLoader.load("/matcaps/8.png");

grassAmbientOcclusionTexture.repeat.set(8, 8);
grassColorTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassColorTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassColorTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

// Font loader
const fontLoader = new FontLoader();
fontLoader.load("fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("HAUNTED HOUSE", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  const text = new THREE.Mesh(
    textGeometry,
    new THREE.MeshMatcapMaterial({ matcap: fontMatcapsTexture2 })
  );
  textGeometry.center();
  text.position.y = 4;
  scene.add(text);
});

// Group
const house = new THREE.Group();
scene.add(house);

//Walls of House
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: brickColorTexture,
    aoMap: brickAmbientOcclusionTexture,
    normalMap: brickNormalTexture,
    roughnessMap: brickRoughnessTexture,
  })
);
walls.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);

walls.position.y = 2.5 / 2;
house.add(walls);

//Roof of house
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof.position.y = 2.5 + 0.5;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

//Door of the house
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: alphaColorTexture,
    aoMap: ambientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: normalTexture,
    metalnessMap: metalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);

door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);

door.position.z = 2 + 0.01;
door.position.y = 1;
house.add(door);

//Bush for house
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  color: parameter.bushColor,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.2);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.2, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

const bush5 = new THREE.Mesh(bushGeometry, bushMaterial);
bush5.scale.set(0.9, 0.9, 0.9);
bush5.position.set(-1.6, 0, 1.8);
house.add(bush1, bush2, bush3, bush4, bush5);

//Graves for floor
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: brickColorTexture,
  aoMap: brickAmbientOcclusionTexture,
  normalMap: brickNormalTexture,
  roughnessMap: brickRoughnessTexture,
});

graveGeometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(graveGeometry.attributes.uv.array, 2)
);

for (let i = 0; i < 70; i++) {
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  graves.add(grave);
  grave.castShadow = true;

  const angle = Math.random() * Math.PI * 2;
  const radius = 3.5 + Math.random() * 6;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  grave.position.set(x, 0.3, z);

  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
}

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);

floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
scene.add(floor);

floor.rotation.x = -(Math.PI * 0.5);
floor.position.y = 0;

// Lights
const ambientLight = new THREE.AmbientLight(0xb9d5ff, 0.25);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xb9d5ff, 0.25);
scene.add(directionalLight);

const doorLight = new THREE.PointLight(parameter.doorLight, 5, 7);
doorLight.position.set(0, 2.5, 2.4);
house.add(doorLight);

// Ghosts
const ghost1 = new THREE.PointLight(parameter.ghostLight1, 2, 3);
scene.add(ghost1);

const ghost2 = new THREE.PointLight(parameter.ghostLight2, 2, 3);
scene.add(ghost2);

const ghost3 = new THREE.PointLight(parameter.ghostLight3, 2, 3);
scene.add(ghost3);

// Dat gui

//Intensity of AmbientLight
gui
  .add(ambientLight, "intensity")
  .min(0)
  .max(1)
  .step(0.01)
  .name("AmbientLight Intensity");

//Intensity of DirectionalLight
gui
  .add(directionalLight, "intensity")
  .min(0)
  .max(1)
  .step(0.01)
  .name("DirectionalLight Intensity");

//Intensity of DoorLight
gui
  .add(doorLight, "intensity")
  .min(0)
  .max(10)
  .step(0.01)
  .name("DoorLight Intensity");

gui
  .addColor(parameter, "doorLight")
  .onChange(() => {
    doorLight.color.set(parameter.doorLight);
  })
  .name("Door Light");

gui
  .addColor(parameter, "ghostLight1")
  .onChange(() => {
    ghost1.color.set(parameter.ghostLight1);
  })
  .name("Ghost Light 1");

gui
  .addColor(parameter, "ghostLight2")
  .onChange(() => {
    ghost2.color.set(parameter.ghostLight2);
  })
  .name("Ghost Light 2");

gui
  .addColor(parameter, "ghostLight3")
  .onChange(() => {
    ghost3.color.set(parameter.ghostLight3);
  })
  .name("Ghost Light 3");

gui
  .addColor(parameter, "bushColor")
  .onChange(() => {
    bushMaterial.color.set(parameter.bushColor);
  })
  .name("Bush Color");

// Sizes
const sizes = {
  height: window.innerHeight,
  width: window.innerWidth,
};

window.addEventListener("resize", () => {
  sizes.height = window.innerHeight;
  sizes.width = window.innerWidth;

  renderer.setSize(sizes.width, sizes.height);

  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
});

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);
camera.position.z = 6;
camera.position.y = 2;
camera.position.x = 5;

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGL1Renderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setClearColor("#262837");

//Shadows
renderer.shadowMap.enabled = true;

doorLight.castShadow = true;
directionalLight.castShadow = true;
walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;
bush5.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

floor.receiveShadow = true;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;

renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//OrbitControls
const control = new OrbitControls(camera, canvas);
control.enableDamping = true;

// const mapControl = new MapControls(camera, canvas);
// mapControl.enableDamping = true;

//Clock
const clock = new THREE.Clock();

// Animation
const tick = () => {
  //Upload ghosts
  const elapsedTime = clock.getElapsedTime();

  ghost1.position.x = Math.sin(elapsedTime * 0.5) * 4;
  ghost1.position.z = Math.cos(elapsedTime * 0.5) * 4;
  ghost1.position.y = Math.sin(elapsedTime * 3);

  ghost2.position.x = Math.sin(-elapsedTime * 0.3) * 6;
  ghost2.position.z = Math.cos(-elapsedTime * 0.3) * 6;
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  ghost3.position.x =
    Math.sin(elapsedTime * 0.18) * (7 + Math.sin(elapsedTime * 0.32));
  ghost3.position.z =
    Math.cos(elapsedTime * 0.18) * (7 + Math.cos(elapsedTime * 0.32));
  ghost3.position.y = Math.tan(elapsedTime * 3);

  control.update();
  // mapControl.update();
  requestAnimationFrame(tick);
  renderer.render(scene, camera);
};
tick();
