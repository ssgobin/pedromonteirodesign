import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

const container = document.querySelector("[data-hero-3d]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (container && !prefersReducedMotion) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    preserveDrawingBuffer: true,
    powerPreference: "high-performance"
  });
  const pointer = new THREE.Vector2(0, 0);
  const clock = new THREE.Clock();
  const objects = [];

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  renderer.setClearColor(0x000000, 0);
  container.append(renderer.domElement);

  camera.position.set(0, 0, 9);

  scene.add(new THREE.AmbientLight(0xffffff, 1.9));

  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(-3, 4, 6);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffca40, 1.1);
  fillLight.position.set(4, -2, 4);
  scene.add(fillLight);

  const palette = {
    yellow: new THREE.MeshStandardMaterial({ color: 0xffca40, roughness: 0.42, metalness: 0.08 }),
    pink: new THREE.MeshStandardMaterial({ color: 0xcc3366, roughness: 0.5, metalness: 0.04 }),
    cream: new THREE.MeshStandardMaterial({ color: 0xfceee3, roughness: 0.55, metalness: 0.02 }),
    ink: new THREE.MeshStandardMaterial({ color: 0x020100, roughness: 0.38, metalness: 0.18 })
  };

  addShape(new THREE.TorusGeometry(0.72, 0.18, 18, 56), palette.yellow, [3.25, 1.4, 0], [0.4, 0.8, 0.15], 1.18, [1.78, 2.18, 0]);
  addShape(new THREE.BoxGeometry(0.95, 0.95, 0.95), palette.pink, [4.1, -1.05, -0.35], [0.2, 0.4, -0.28], 0.92, [2.18, 0.94, -0.35]);
  addShape(new THREE.IcosahedronGeometry(0.72, 1), palette.cream, [2.2, -2.05, 0.3], [0.15, -0.55, 0.35], 0.88, [1.42, -2.82, 0.3]);
  addShape(new THREE.ConeGeometry(0.56, 1.32, 5), palette.ink, [5.15, 0.28, -1.1], [-0.15, 0.25, 0.3], 0.76, [2.45, -1.42, -1.1]);

  const ring = makeLineRing();
  ring.position.set(3.05, -0.08, -1.35);
  ring.userData.basePosition = ring.position.clone();
  scene.add(ring);

  function addShape(geometry, material, position, rotation, scale, mobilePosition) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.rotation.set(...rotation);
    mesh.scale.setScalar(scale);
    mesh.userData.basePosition = mesh.position.clone();
    mesh.userData.desktopPosition = mesh.position.clone();
    mesh.userData.mobilePosition = new THREE.Vector3(...mobilePosition);
    mesh.userData.rotationSpeed = new THREE.Vector3(
      0.14 + objects.length * 0.025,
      0.18 + objects.length * 0.022,
      0.08 + objects.length * 0.018
    );
    scene.add(mesh);
    objects.push(mesh);
  }

  function makeLineRing() {
    const group = new THREE.Group();
    const material = new THREE.MeshBasicMaterial({ color: 0x020100, transparent: true, opacity: 0.3 });

    for (let i = 0; i < 16; i += 1) {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), material);
      const angle = (i / 16) * Math.PI * 2;
      dot.position.set(Math.cos(angle) * 1.18, Math.sin(angle) * 1.18, 0);
      group.add(dot);
    }

    return group;
  }

  function resize() {
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    const isMobile = width < 720;
    scene.position.x = 0;
    scene.scale.setScalar(isMobile ? 0.62 : 1);

    objects.forEach((object) => {
      object.userData.basePosition.copy(isMobile ? object.userData.mobilePosition : object.userData.desktopPosition);
    });

    ring.userData.basePosition.set(isMobile ? 1.6 : 3.05, isMobile ? -0.9 : -0.08, -1.35);
    ring.position.copy(ring.userData.basePosition);
    ring.scale.setScalar(isMobile ? 0.74 : 1);
  }

  function animate() {
    const elapsed = clock.getElapsedTime();

    objects.forEach((object, index) => {
      const base = object.userData.basePosition;
      const speed = object.userData.rotationSpeed;
      object.rotation.x += speed.x * 0.008;
      object.rotation.y += speed.y * 0.008;
      object.rotation.z += speed.z * 0.006;
      object.position.y = base.y + Math.sin(elapsed * 0.8 + index * 0.9) * 0.16;
      object.position.x = base.x + pointer.x * (0.28 + index * 0.03);
      object.position.z = base.z + pointer.y * 0.18;
    });

    ring.rotation.z = elapsed * 0.18;
    ring.rotation.x = Math.sin(elapsed * 0.35) * 0.18;
    ring.position.x = ring.userData.basePosition.x + pointer.x * 0.18;
    ring.position.y = ring.userData.basePosition.y + pointer.y * 0.12;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (event) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = -(event.clientY / window.innerHeight - 0.5) * 2;
  });

  resize();
  animate();
}
