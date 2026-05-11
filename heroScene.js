import * as THREE from 'three';
import { gsap } from 'gsap';

let renderer,
  scene,
  camera,
  frameId,
  dragonGroup,
  embers,
  resizeHandler;

export function initHeroScene(canvas) {
  const width = canvas.clientWidth || window.innerWidth;
  const height = canvas.clientHeight || window.innerHeight;

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.outputEncoding = THREE.sRGBEncoding;

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2('#020208', 0.03);

  camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
  camera.position.set(0, 1.5, 7);

  const ambient = new THREE.AmbientLight(0xffe0b3, 0.4);
  scene.add(ambient);

  const lavaLight = new THREE.PointLight(0xff3b3b, 1.8, 20);
  lavaLight.position.set(0, -1, 3);
  scene.add(lavaLight);

  const rimLight = new THREE.DirectionalLight(0xb347ff, 0.9);
  rimLight.position.set(-4, 5, -2);
  scene.add(rimLight);

  dragonGroup = new THREE.Group();
  scene.add(dragonGroup);

  const dragonMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    emissive: 0xff3b3b,
    emissiveIntensity: 0.7,
    metalness: 0.6,
    roughness: 0.3,
  });

  const bodyGeo = new THREE.TorusKnotGeometry(0.9, 0.25, 256, 32, 1, 3);
  const dragonBody = new THREE.Mesh(bodyGeo, dragonMaterial);
  dragonBody.castShadow = true;
  dragonBody.rotation.set(0.6, 0.2, 0);
  dragonGroup.add(dragonBody);

  const wingGeo = new THREE.PlaneGeometry(2.6, 1.1, 16, 16);
  const wingMat = new THREE.MeshBasicMaterial({
    color: 0xffb84d,
    transparent: true,
    opacity: 0.65,
    side: THREE.DoubleSide,
  });

  const leftWing = new THREE.Mesh(wingGeo, wingMat);
  leftWing.position.set(-1.3, 0.4, 0);
  leftWing.rotation.set(0, 0, 0.7);
  dragonGroup.add(leftWing);

  const rightWing = leftWing.clone();
  rightWing.position.x *= -1;
  rightWing.rotation.z *= -1;
  dragonGroup.add(rightWing);

  const headGeo = new THREE.SphereGeometry(0.35, 32, 32);
  const head = new THREE.Mesh(headGeo, dragonMaterial);
  head.position.set(1.4, 0.4, 0.1);
  dragonGroup.add(head);

  const eyeGeo = new THREE.SphereGeometry(0.07, 16, 16);
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0xfff1c2 });
  const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
  leftEye.position.set(0.1, 0.05, 0.17);
  const rightEye = leftEye.clone();
  rightEye.position.z *= -1;
  head.add(leftEye, rightEye);

  const emberGeo = new THREE.BufferGeometry();
  const emberCount = 220;
  const positions = new Float32Array(emberCount * 3);
  const colors = new Float32Array(emberCount * 3);

  for (let i = 0; i < emberCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = Math.random() * 5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

    colors[i * 3] = 1;
    colors[i * 3 + 1] = 0.5 + Math.random() * 0.4;
    colors[i * 3 + 2] = 0.3;
  }

  emberGeo.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3),
  );
  emberGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const emberMat = new THREE.PointsMaterial({
    size: 0.06,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
  });

  embers = new THREE.Points(emberGeo, emberMat);
  scene.add(embers);

  gsap.to(wingMat, {
    opacity: 0.35,
    yoyo: true,
    repeat: -1,
    duration: 1.2,
    ease: 'sine.inOut',
  });

  gsap.to(dragonBody.rotation, {
    y: '+=0.9',
    duration: 6,
    repeat: -1,
    ease: 'none',
  });

  const lavaColor = { intensity: 1.8 };
  gsap.to(lavaColor, {
    intensity: 0.6,
    duration: 1.4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    onUpdate: () => {
      lavaLight.intensity = lavaColor.intensity;
    },
  });

  const clock = new THREE.Clock();

  const animate = () => {
    frameId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (dragonGroup) {
      dragonGroup.position.y = Math.sin(t * 0.9) * 0.25;
      dragonGroup.position.x = Math.sin(t * 0.2) * 0.4;
      dragonGroup.rotation.y = Math.sin(t * 0.3) * 0.15;
    }

    if (embers) {
      const pos = embers.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        let y = pos.getY(i) + 0.015;
        if (y > 4.5) y = 0;
        pos.setY(i, y);
      }
      pos.needsUpdate = true;
    }

    renderer.render(scene, camera);
  };
  animate();

  resizeHandler = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener('resize', resizeHandler);

  return () => disposeHeroScene();
}

export function disposeHeroScene() {
  cancelAnimationFrame(frameId);
  window.removeEventListener('resize', resizeHandler);
  if (renderer) renderer.dispose();
  if (scene) {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.geometry?.dispose?.();
        obj.material?.dispose?.();
      }
    });
  }
  renderer = null;
  scene = null;
  camera = null;
  dragonGroup = null;
  embers = null;
}