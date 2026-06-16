const container = document.querySelector("[data-hero-3d]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (container && !prefersReducedMotion) {
  if (window.THREE) {
    initThreeScene(window.THREE);
  } else {
    createCssFallback(container);
  }
}

function initThreeScene(THREE) {
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
  const scroll = {
    current: 0,
    target: 0,
    max: 1
  };

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

  const shapeGeometries = [
    new THREE.TorusKnotGeometry(0.42, 0.12, 96, 12),
    new THREE.IcosahedronGeometry(0.58, 1),
    new THREE.OctahedronGeometry(0.5, 1),
    new THREE.TetrahedronGeometry(0.52, 0),
    new THREE.DodecahedronGeometry(0.48, 0)
  ];

  addShape(shapeGeometries, palette.yellow, [4.35, 2.15, -0.6], [-4.45, 1.72, -0.7], [0.4, 0.8, 0.15], 0.58, [1.85, 2.72, -0.6], [-1.68, 2.46, -0.7]);
  addShape(shapeGeometries, palette.pink, [4.82, -0.2, -0.85], [-4.62, -0.95, -0.8], [0.2, 0.4, -0.28], 0.5, [2.16, 1.72, -0.85], [-1.82, 0.92, -0.8]);
  addShape(shapeGeometries, palette.cream, [3.62, -1.9, -0.2], [-3.82, -2.2, -0.25], [0.15, -0.55, 0.35], 0.46, [1.48, -2.66, -0.2], [-1.55, -2.38, -0.25]);
  addShape(shapeGeometries, palette.ink, [5.34, 1.1, -1.25], [-5.12, 0.38, -1.2], [-0.15, 0.25, 0.3], 0.38, [2.5, -0.84, -1.25], [-2.2, -1.2, -1.2]);

  const ring = makeLineRing();
  ring.position.set(3.05, -0.08, -1.35);
  ring.userData.basePosition = ring.position.clone();
  scene.add(ring);

  function addShape(geometries, material, position, alternatePosition, rotation, scale, mobilePosition, alternateMobilePosition) {
    const mesh = new THREE.Mesh(geometries[objects.length % geometries.length], material);
    mesh.position.set(...position);
    mesh.rotation.set(...rotation);
    mesh.scale.setScalar(scale);
    mesh.userData.geometries = geometries;
    mesh.userData.geometryIndex = objects.length % geometries.length;
    mesh.userData.baseScale = scale;
    mesh.userData.basePosition = mesh.position.clone();
    mesh.userData.desktopPosition = mesh.position.clone();
    mesh.userData.alternateDesktopPosition = new THREE.Vector3(...alternatePosition);
    mesh.userData.mobilePosition = new THREE.Vector3(...mobilePosition);
    mesh.userData.alternateMobilePosition = new THREE.Vector3(...alternateMobilePosition);
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
      object.userData.activeAlternatePosition = isMobile ? object.userData.alternateMobilePosition : object.userData.alternateDesktopPosition;
    });

    ring.userData.basePosition.set(isMobile ? 1.52 : 3.82, isMobile ? -0.82 : 0.38, -1.35);
    ring.position.copy(ring.userData.basePosition);
    ring.scale.setScalar(isMobile ? 0.46 : 0.68);
    updateScrollTarget();
  }

  function updateScrollTarget() {
    scroll.max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    scroll.target = window.scrollY / scroll.max;
  }

  function animate() {
    const elapsed = clock.getElapsedTime();
    scroll.current += (scroll.target - scroll.current) * 0.075;
    const scrollMorph = Math.sin(scroll.current * Math.PI);
    const phaseProgress = scroll.current * 4;
    const phase = Math.floor(phaseProgress);
    const phaseT = smoothstep(phaseProgress - phase);
    const sideMix = phase % 2 === 0 ? phaseT : 1 - phaseT;
    const scrollTravel = (scroll.current - 0.5) * 5.6;

    objects.forEach((object, index) => {
      const base = object.userData.basePosition;
      const alternate = object.userData.activeAlternatePosition;
      const speed = object.userData.rotationSpeed;
      const morph = 1 + scrollMorph * (0.08 + index * 0.018);
      const targetGeometryIndex = (phase + index) % object.userData.geometries.length;

      if (targetGeometryIndex !== object.userData.geometryIndex) {
        object.geometry = object.userData.geometries[targetGeometryIndex];
        object.userData.geometryIndex = targetGeometryIndex;
      }

      object.rotation.x += speed.x * 0.008;
      object.rotation.y += speed.y * 0.008;
      object.rotation.z += speed.z * 0.006;
      object.rotation.x += scroll.current * 0.002 * (index + 1);
      object.rotation.z += scroll.current * 0.0025 * (index + 1);
      object.position.x = lerp(base.x, alternate.x, sideMix) + pointer.x * (0.045 + index * 0.008);
      object.position.y = lerp(base.y, alternate.y, sideMix) + Math.sin(elapsed * 0.65 + index * 0.9) * 0.07 - scrollTravel * (0.08 + index * 0.018);
      object.position.z = lerp(base.z, alternate.z, sideMix) + pointer.y * 0.055 + scroll.current * (0.1 - index * 0.018);
      object.scale.set(
        object.userData.baseScale * morph * (1 - Math.abs(0.5 - phaseT) * 0.08),
        object.userData.baseScale * (1 - scrollMorph * 0.05),
        object.userData.baseScale * (1 + scrollMorph * 0.04)
      );
    });

    ring.rotation.z = elapsed * 0.12 + scroll.current * 1.1;
    ring.rotation.x = Math.sin(elapsed * 0.28) * 0.08;
    ring.position.x = ring.userData.basePosition.x + pointer.x * 0.05;
    ring.position.y = ring.userData.basePosition.y + pointer.y * 0.04 - scrollTravel * 0.28;
    ring.position.z = ring.userData.basePosition.z + scroll.current * 0.12;
    ring.scale.setScalar((window.innerWidth < 720 ? 0.46 : 0.68) * (1 + scrollMorph * 0.08));

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  function lerp(start, end, amount) {
    return start + (end - start) * amount;
  }

  function smoothstep(value) {
    const amount = Math.max(0, Math.min(1, value));
    return amount * amount * (3 - 2 * amount);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("scroll", updateScrollTarget, { passive: true });
  window.addEventListener("pointermove", (event) => {
    pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = -(event.clientY / window.innerHeight - 0.5) * 2;
  });

  resize();
  updateScrollTarget();
  animate();
}

function createCssFallback(target) {
  target.classList.add("hero-3d-fallback");
  target.innerHTML = `
    <span class="fallback-shape fallback-ring"></span>
    <span class="fallback-shape fallback-cube"></span>
    <span class="fallback-shape fallback-sphere"></span>
  `;
}
