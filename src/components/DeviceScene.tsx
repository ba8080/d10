import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import '../device-scene.css';

type DeviceSceneProps = {
  exploded?: boolean;
  scanning?: boolean;
  paused?: boolean;
  onReady?: () => void;
};

type SceneActions = { render: () => void; reset: () => void; rotate: (x: number, y: number) => void };

/** A lightweight procedural product illustration; no external model or environment downloads. */
export default function DeviceScene({ exploded = false, scanning = false, paused = false, onReady }: DeviceSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef({ exploded, scanning, paused });
  const readyCallbackRef = useRef(onReady);
  const actionsRef = useRef<SceneActions | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'fallback'>('loading');
  propsRef.current = { exploded, scanning, paused };
  readyCallbackRef.current = onReady;

  useEffect(() => { actionsRef.current?.render(); }, [exploded, scanning, paused]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let failed = false;
    let initialized = false;
    let frame = 0;
    let lastTime = 0;
    let phase = 0;
    let visible = true;
    let interacted = false;
    let reveal = propsRef.current.exploded ? 1 : 0;
    let keyboardYaw = 0;
    let keyboardPitch = 0;
    let renderer: THREE.WebGLRenderer | undefined;
    let controls: OrbitControls | undefined;
    let intersection: IntersectionObserver | undefined;
    let resize: ResizeObserver | undefined;
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    const textures = new Set<THREE.Texture>();
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motionPreference = () => media.matches || document.body.classList.contains('sc-a11y-reduced-motion');
    let reducedMotion = motionPreference();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 80);
    camera.position.set(4.65, 3.85, 6.4);
    const lookAt = new THREE.Vector3(0, 0.1, 0);

    const geo = <T extends THREE.BufferGeometry>(geometry: T): T => { geometries.add(geometry); return geometry; };
    const mat = <T extends THREE.Material>(material: T): T => { materials.add(material); return material; };
    const texture = (canvas: HTMLCanvasElement) => {
      const result = new THREE.CanvasTexture(canvas);
      result.colorSpace = THREE.SRGBColorSpace;
      textures.add(result);
      return result;
    };
    const rounded = (w: number, h: number, d: number, radius = 0.08) => geo(new RoundedBoxGeometry(w, h, d, 4, radius));
    const mesh = (geometry: THREE.BufferGeometry, material: THREE.Material, parent: THREE.Object3D, x = 0, y = 0, z = 0) => {
      const result = new THREE.Mesh(geometry, material);
      result.position.set(x, y, z);
      parent.add(result);
      return result;
    };
    const canvasFor = (width: number, height: number) => {
      const canvas = document.createElement('canvas');
      canvas.width = width; canvas.height = height;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas rendering is unavailable.');
      return { canvas, context };
    };

    const stop = () => { if (frame) cancelAnimationFrame(frame); frame = 0; lastTime = 0; };
    const fallback = () => {
      if (disposed || failed) return;
      failed = true;
      stop();
      setState('fallback');
    };
    const onContextLost = (event: Event) => { event.preventDefault(); fallback(); };

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
      renderer.setClearColor(0x080910, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.65;
      renderer.domElement.setAttribute('aria-hidden', 'true');
      renderer.domElement.addEventListener('webglcontextlost', onContextLost);
      mount.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.target.copy(lookAt);
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableDamping = false;
      controls.rotateSpeed = 0.48;
      controls.minPolarAngle = Math.PI * 0.14;
      controls.maxPolarAngle = Math.PI * 0.64;
      controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN };
      // Browser vertical gestures keep scrolling the page; horizontal gestures rotate.
      renderer.domElement.style.touchAction = 'pan-y pinch-zoom';
      controls.update();
      controls.saveState();

      scene.add(new THREE.HemisphereLight(0xcad5ff, 0x17282b, 3.8));
      const key = new THREE.DirectionalLight(0xe4e4ff, 5.2);
      key.position.set(-3, 7, 6); scene.add(key);
      const purple = new THREE.DirectionalLight(0x9865ff, 4.5);
      purple.position.set(-5, 2, -3); scene.add(purple);
      const mint = new THREE.DirectionalLight(0x77ffdd, 4.2);
      mint.position.set(4, 3, -4); scene.add(mint);
      const faceFill = new THREE.DirectionalLight(0xc4ddff, 2.1);
      faceFill.position.set(1, 1, 8); scene.add(faceFill);

      const graphite = mat(new THREE.MeshStandardMaterial({ color: 0x292d36, roughness: 0.33, metalness: 0.56 }));
      const baseGraphite = mat(new THREE.MeshStandardMaterial({ color: 0x171b24, roughness: 0.43, metalness: 0.38 }));
      const ridgeMaterial = mat(new THREE.MeshStandardMaterial({ color: 0x39424c, roughness: 0.37, metalness: 0.6 }));
      const black = mat(new THREE.MeshStandardMaterial({ color: 0x070a10, roughness: 0.64, metalness: 0.05 }));
      const gold = mat(new THREE.MeshStandardMaterial({ color: 0xdfbd75, roughness: 0.22, metalness: 0.88 }));
      const silver = mat(new THREE.MeshStandardMaterial({ color: 0x929ba4, roughness: 0.32, metalness: 0.87 }));
      const mintMaterial = mat(new THREE.MeshStandardMaterial({ color: 0x8effcf, emissive: 0x54ffb0, emissiveIntensity: 2.4, roughness: 0.2 }));

      const floatGroup = new THREE.Group(); scene.add(floatGroup);
      const product = new THREE.Group(); floatGroup.add(product);
      product.rotation.set(-0.04, -0.2, -0.09);
      const lower = new THREE.Group(); product.add(lower);
      const lid = new THREE.Group(); product.add(lid);
      const board = new THREE.Group(); product.add(board);
      const lidGeometry = rounded(3.4, 0.81, 2.1, 0.2);
      mesh(lidGeometry, graphite, lid, 0, 0.16, -0.16);
      mesh(rounded(3.33, 0.38, 2.05, 0.14), baseGraphite, lower, 0, -0.395, -0.16);
      // A recessed seam separates the two molded halves.
      mesh(rounded(3.34, 0.035, 2.06, 0.013), black, lower, 0, -0.218, -0.16);
      for (const side of [-1, 1]) {
        for (let i = 0; i < 7; i++) {
          mesh(rounded(0.025, 0.23, 0.055, 0.012), ridgeMaterial, lid, side * 1.694, 0.085, -0.75 + i * 0.17);
        }
      }

      // Branding is drawn locally so the scene never depends on remote fonts or textures.
      const branding = canvasFor(1024, 320);
      branding.context.textAlign = 'left'; branding.context.textBaseline = 'middle';
      branding.context.fillStyle = '#f2f5f7';
      branding.context.font = '700 160px Arial, sans-serif';
      branding.context.fillText('D10', 52, 113);
      branding.context.font = '400 105px Arial, sans-serif';
      branding.context.fillStyle = '#d9e4ee';
      branding.context.fillText('AI', 383, 128);
      branding.context.font = '400 36px Arial, sans-serif';
      branding.context.fillStyle = '#a6b2c5';
      branding.context.fillText('SMART DIAGNOSTICS', 57, 227);
      const logo = mesh(geo(new THREE.PlaneGeometry(2.18, 0.68)), mat(new THREE.MeshBasicMaterial({ map: texture(branding.canvas), transparent: true, depthWrite: false, toneMapped: false })), lid, 0.2, 0.57, -0.25);
      logo.rotation.x = -Math.PI / 2;
      mesh(rounded(0.25, 0.012, 0.105, 0.006), black, lid, 0.95, 0.575, 0.2);
      mesh(rounded(0.155, 0.018, 0.052, 0.008), mintMaterial, lid, 0.95, 0.585, 0.2);
      const ledGlow = new THREE.PointLight(0x6effc0, 0.35, 1.2, 2);
      ledGlow.position.set(0.95, 0.65, 0.2); lid.add(ledGlow);

      // The mouth is a true open trapezoid, with its 16 contacts recessed inside.
      const mouthOutline = [new THREE.Vector2(-1.22, 0.42), new THREE.Vector2(1.22, 0.42), new THREE.Vector2(1.36, 0.29), new THREE.Vector2(1.48, -0.32), new THREE.Vector2(1.38, -0.44), new THREE.Vector2(-1.38, -0.44), new THREE.Vector2(-1.48, -0.32), new THREE.Vector2(-1.36, 0.29)];
      const mouthShape = new THREE.Shape(mouthOutline);
      const innerPoints = mouthOutline.map(point => new THREE.Vector2(point.x * 0.915, point.y * 0.76));
      mouthShape.holes.push(new THREE.Path([...innerPoints].reverse()));
      const mouthGeometry = geo(new THREE.ExtrudeGeometry(mouthShape, { depth: 0.58, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.035, bevelThickness: 0.035, curveSegments: 12 }));
      mesh(mouthGeometry, baseGraphite, lower, 0, -0.075, 0.86);
      const backPlate = geo(new THREE.ShapeGeometry(new THREE.Shape(innerPoints)));
      mesh(backPlate, black, lower, 0, -0.075, 0.866);
      // A narrow satin edge makes the connector shape legible in the dark.
      const lip = new THREE.LineLoop(geo(new THREE.BufferGeometry().setFromPoints(mouthOutline.map(p => new THREE.Vector3(p.x, p.y, 0)))), mat(new THREE.LineBasicMaterial({ color: 0x737e91, transparent: true, opacity: 0.76 })));
      lip.position.set(0, -0.075, 1.48); lower.add(lip);
      mesh(rounded(2.39, 0.06, 0.36, 0.025), ridgeMaterial, lower, 0, -0.075, 1.04);
      mesh(rounded(0.48, 0.12, 0.36, 0.04), baseGraphite, lower, 0, 0.39, 1.11);
      const pinGeometry = geo(new THREE.CylinderGeometry(0.028, 0.032, 0.45, 10));
      const pinSeatGeometry = geo(new THREE.CylinderGeometry(0.067, 0.067, 0.05, 10));
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 8; col++) {
          const x = (col - 3.5) * 0.307;
          const y = row === 0 ? 0.15 : -0.3;
          const seat = mesh(pinSeatGeometry, black, lower, x, y, 0.94); seat.rotation.x = Math.PI / 2;
          const pin = mesh(pinGeometry, gold, lower, x, y, 1.15); pin.rotation.x = Math.PI / 2;
        }
      }

      // The reveal illustrates the inner assembly without claiming an exact circuit layout.
      const pcbMaterial = mat(new THREE.MeshStandardMaterial({ color: 0x164840, metalness: 0.32, roughness: 0.47 }));
      mesh(rounded(2.92, 0.05, 1.7, 0.024), pcbMaterial, board, 0, -0.165, -0.15);
      const circuit = canvasFor(1024, 640);
      const pcb = circuit.context;
      pcb.strokeStyle = '#80bca059'; pcb.lineWidth = 3;
      for (let i = 0; i < 16; i++) {
        const start = 45 + i * 61;
        pcb.beginPath(); pcb.moveTo(start, 40); pcb.lineTo(start, 150 + (i % 4) * 22); pcb.lineTo(512 + (i < 8 ? -70 : 70), 240 + i * 5); pcb.stroke();
        pcb.beginPath(); pcb.moveTo(start, 600); pcb.lineTo(start, 490 - (i % 3) * 22); pcb.lineTo(512 + (i < 8 ? -80 : 80), 380 - i * 3); pcb.stroke();
      }
      pcb.fillStyle = '#b3d4b4'; pcb.font = '22px monospace'; pcb.fillText('D10 / OBD INTERFACE', 50, 560);
      for (const x of [38, 986]) for (const y of [35, 605]) { pcb.beginPath(); pcb.arc(x, y, 14, 0, Math.PI * 2); pcb.strokeStyle = '#c9bc76'; pcb.lineWidth = 8; pcb.stroke(); }
      const traces = mesh(geo(new THREE.PlaneGeometry(2.88, 1.65)), mat(new THREE.MeshBasicMaterial({ map: texture(circuit.canvas), transparent: true, depthWrite: false, toneMapped: false })), board, 0, -0.138, -0.15);
      traces.rotation.x = -Math.PI / 2;
      const chipMaterial = mat(new THREE.MeshStandardMaterial({ color: 0x10151d, roughness: 0.64, metalness: 0.18 }));
      mesh(rounded(0.73, 0.12, 0.56, 0.035), chipMaterial, board, -0.06, -0.07, -0.1);
      for (const side of [-1, 1]) for (let i = 0; i < 8; i++) mesh(geo(new THREE.BoxGeometry(0.07, 0.026, 0.026)), silver, board, side * 0.4 - 0.06, -0.1, -0.31 + i * 0.06);
      const smallChipGeometry = rounded(0.23, 0.085, 0.15, 0.012);
      for (let i = 0; i < 9; i++) mesh(smallChipGeometry, chipMaterial, board, -1.1 + (i % 3) * 0.95, -0.085, -0.68 + Math.floor(i / 3) * 0.55);
      for (let i = 0; i < 6; i++) {
        mesh(geo(new THREE.BoxGeometry(0.08, 0.055, 0.15)), gold, board, 1.11, -0.11, -0.68 + i * 0.21);
      }
      const capacitorMaterial = mat(new THREE.MeshStandardMaterial({ color: 0x8cabb0, roughness: 0.34, metalness: 0.7 }));
      for (let i = 0; i < 3; i++) mesh(geo(new THREE.CylinderGeometry(0.09, 0.09, 0.17, 14)), capacitorMaterial, board, -1.06 + i * 0.25, -0.065, 0.48);
      for (const x of [-1.3, 1.3]) for (const z of [-0.84, 0.51]) {
        mesh(geo(new THREE.CylinderGeometry(0.055, 0.055, 0.18, 12)), silver, lower, x, -0.21, z);
      }

      const hologramMaterial = mat(new THREE.LineBasicMaterial({ color: 0x83ffe0, transparent: true, opacity: 0.25, depthWrite: false }));
      const wireframe = new THREE.LineSegments(geo(new THREE.EdgesGeometry(lidGeometry, 18)), hologramMaterial);
      wireframe.position.set(0, 0.16, -0.16); wireframe.scale.setScalar(1.012); lid.add(wireframe);
      const beamCanvas = canvasFor(128, 128);
      const beamGradient = beamCanvas.context.createRadialGradient(64, 64, 10, 64, 64, 64);
      beamGradient.addColorStop(0, 'rgba(126,255,216,0.24)'); beamGradient.addColorStop(0.78, 'rgba(126,255,216,0.10)'); beamGradient.addColorStop(1, 'rgba(126,255,216,0)');
      beamCanvas.context.fillStyle = beamGradient; beamCanvas.context.fillRect(0, 0, 128, 128);
      const beam = mesh(geo(new THREE.PlaneGeometry(4.1, 3.1)), mat(new THREE.MeshBasicMaterial({ map: texture(beamCanvas.canvas), transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, toneMapped: false })), product);
      beam.rotation.x = -Math.PI / 2;
      const scanLine = mesh(geo(new THREE.BoxGeometry(3.55, 0.012, 0.025)), mat(new THREE.MeshBasicMaterial({ color: 0x8affd7, transparent: true, opacity: 0.8, toneMapped: false })), product, 0, 0, 1.16);

      const stage = new THREE.Group(); stage.position.y = -1.23; scene.add(stage);
      const haloCanvas = canvasFor(128, 128);
      const haloGradient = haloCanvas.context.createRadialGradient(64, 64, 2, 64, 64, 64);
      haloGradient.addColorStop(0, 'rgba(71,92,109,0.35)'); haloGradient.addColorStop(0.5, 'rgba(70,51,128,0.13)'); haloGradient.addColorStop(1, 'rgba(30,22,53,0)');
      haloCanvas.context.fillStyle = haloGradient; haloCanvas.context.fillRect(0, 0, 128, 128);
      const shadow = mesh(geo(new THREE.PlaneGeometry(6.2, 5)), mat(new THREE.MeshBasicMaterial({ map: texture(haloCanvas.canvas), transparent: true, depthWrite: false, toneMapped: false })), stage);
      shadow.rotation.x = -Math.PI / 2;
      const ringMaterials: THREE.MeshBasicMaterial[] = [];
      for (const [radius, color, opacity] of [[2.22, 0x9470ff, 0.35], [2.36, 0x82e4d1, 0.19], [1.96, 0x7e72ff, 0.13]] as const) {
        const ringMaterial = mat(new THREE.MeshBasicMaterial({ color, transparent: true, opacity, depthWrite: false, toneMapped: false })); ringMaterials.push(ringMaterial);
        const ring = mesh(geo(new THREE.TorusGeometry(radius, 0.009, 6, 100)), ringMaterial, stage, 0, 0, 0); ring.rotation.x = -Math.PI / 2;
      }
      for (let i = 0; i < 32; i++) {
        const angle = i / 32 * Math.PI * 2;
        const tick = mesh(geo(new THREE.BoxGeometry(0.012, 0.005, i % 4 === 0 ? 0.14 : 0.06)), mat(new THREE.MeshBasicMaterial({ color: 0x8986b4, transparent: true, opacity: i % 4 === 0 ? 0.4 : 0.17 })), stage, Math.sin(angle) * 2.49, 0, Math.cos(angle) * 2.49);
        tick.rotation.y = angle;
      }

      let seed = 41;
      const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
      const coordinates: number[] = [];
      for (let i = 0; i < 42; i++) coordinates.push((random() - 0.5) * 8, (random() - 0.2) * 4.6, (random() - 0.65) * 6);
      const particleGeometry = geo(new THREE.BufferGeometry()); particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(coordinates, 3));
      const particleCanvas = canvasFor(32, 32);
      const particleGradient = particleCanvas.context.createRadialGradient(16, 16, 0, 16, 16, 16);
      particleGradient.addColorStop(0, '#dbffef'); particleGradient.addColorStop(0.25, '#bdffeab0'); particleGradient.addColorStop(1, '#bdffea00');
      particleCanvas.context.fillStyle = particleGradient; particleCanvas.context.fillRect(0, 0, 32, 32);
      const particles = new THREE.Points(particleGeometry, mat(new THREE.PointsMaterial({ color: 0xb6beec, size: 0.045, map: texture(particleCanvas.canvas), transparent: true, opacity: 0.65, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false })));
      scene.add(particles);

      const canRender = () => !disposed && !failed && visible && !document.hidden;
      const schedule = () => { if (!frame && canRender()) frame = requestAnimationFrame(draw); };
      const draw = (time: number) => {
        frame = 0;
        if (!canRender() || !renderer) return;
        const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 1 / 60;
        lastTime = time;
        const current = propsRef.current;
        const motionAllowed = !current.paused && !reducedMotion;
        const target = current.exploded ? 1 : 0;
        if (motionAllowed) { phase += dt; reveal = THREE.MathUtils.damp(reveal, target, 5.5, dt); }
        else reveal = target;
        if (Math.abs(reveal - target) < 0.001) reveal = target;
        lid.position.set(0, reveal * 0.93, -reveal * 0.085);
        lid.rotation.x = -reveal * 0.095;
        board.position.y = reveal * 0.22;
        // Settles after interaction; pausing freezes the current floating pose.
        if (motionAllowed && !interacted) {
          floatGroup.position.y = Math.sin(phase * 0.75) * 0.06;
          product.rotation.set(-0.04 + Math.sin(phase * 0.34) * 0.018, -0.2 + Math.sin(phase * 0.25) * 0.11, -0.09 + Math.sin(phase * 0.4) * 0.012);
        } else if (interacted) product.rotation.set(-0.04 + keyboardPitch, -0.2 + keyboardYaw, -0.09);
        beam.visible = current.scanning;
        scanLine.visible = current.scanning;
        wireframe.visible = current.scanning;
        const scanPosition = -0.48 + ((Math.sin(phase * 1.8) + 1) / 2) * (1.1 + reveal * 0.93);
        beam.position.y = scanPosition; scanLine.position.y = scanPosition;
        if (motionAllowed) {
          particles.rotation.y = phase * 0.017;
          ringMaterials[0].opacity = 0.29 + Math.sin(phase * 0.9) * 0.06;
          mintMaterial.emissiveIntensity = 2 + Math.sin(phase * 1.1) * 0.3;
        }
        renderer.render(scene, camera);
        if (!initialized) {
          initialized = true;
          setState('ready');
          readyCallbackRef.current?.();
        }
        if (motionAllowed) schedule();
      };
      const onControlStart = () => { interacted = true; schedule(); };
      const onControlChange = () => schedule();
      controls.addEventListener('start', onControlStart);
      controls.addEventListener('change', onControlChange);
      actionsRef.current = {
        render: schedule,
        reset: () => { interacted = false; keyboardPitch = 0; keyboardYaw = 0; controls?.reset(); product.rotation.set(-0.04, -0.2, -0.09); floatGroup.position.y = 0; schedule(); },
        rotate: (x, y) => { interacted = true; keyboardYaw += x; keyboardPitch = THREE.MathUtils.clamp(keyboardPitch + y, -0.6, 0.6); schedule(); },
      };
      const fit = () => {
        if (disposed || !renderer) return;
        const width = mount.clientWidth || 600;
        const height = mount.clientHeight || 520;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 600 ? 1.5 : 2));
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        // Keep the entire adapter and the modest reveal inside narrow mobile viewports.
        camera.fov = width / height < 0.92 ? 43 : 35;
        camera.updateProjectionMatrix();
        schedule();
      };
      resize = new ResizeObserver(fit); resize.observe(mount);
      intersection = new IntersectionObserver(entries => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible) schedule(); else stop();
      }, { rootMargin: '0px' });
      intersection.observe(mount);
      fit();
    } catch {
      fallback();
    }

    const onVisibility = () => { if (document.hidden) stop(); else actionsRef.current?.render(); };
    const onMotionChange = () => { reducedMotion = motionPreference(); actionsRef.current?.render(); };
    const preferenceObserver = new MutationObserver(onMotionChange);
    preferenceObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    document.addEventListener('visibilitychange', onVisibility);
    media.addEventListener('change', onMotionChange);

    return () => {
      disposed = true;
      stop();
      actionsRef.current = null;
      document.removeEventListener('visibilitychange', onVisibility);
      media.removeEventListener('change', onMotionChange);
      preferenceObserver.disconnect();
      intersection?.disconnect(); resize?.disconnect();
      controls?.dispose();
      renderer?.domElement.removeEventListener('webglcontextlost', onContextLost);
      geometries.forEach(item => item.dispose());
      materials.forEach(item => item.dispose());
      textures.forEach(item => item.dispose());
      scene.clear();
      renderer?.renderLists.dispose();
      renderer?.dispose();
      renderer?.forceContextLoss();
      renderer?.domElement.remove();
    };
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || state !== 'ready') return;
    const rotations: Record<string, [number, number]> = { ArrowLeft: [-0.16, 0], ArrowRight: [0.16, 0], ArrowUp: [0, -0.12], ArrowDown: [0, 0.12] };
    if (rotations[event.key]) { event.preventDefault(); actionsRef.current?.rotate(...rotations[event.key]); }
    else if (event.key.toLowerCase() === 'r' || event.key === 'Home') { event.preventDefault(); actionsRef.current?.reset(); }
  };

  return <div className={`device-scene device-scene--${state}`} data-state={state} data-exploded={exploded} data-scanning={scanning}>
    <div ref={mountRef} className="device-scene-viewport" tabIndex={state === 'ready' ? 0 : -1} role="group" aria-label="המחשה תלת־ממדית של מתאם D10. גררו לסיבוב, או השתמשו במקשי החצים. מקש R מאפס את התצוגה." onKeyDown={onKeyDown} />
    {state === 'loading' && <div className="device-scene-loading" role="status"><span />טוענים את ה־D10 שלכם</div>}
    {state === 'fallback' && <div className="device-scene-fallback"><img src="/images/d10-hero.jpg" alt="מתאם D10 AI — המחשת המוצר" width="1536" height="1024" /><span>המחשת המוצר</span></div>}
    {state === 'ready' && <div className="device-scene-caption" dir="rtl"><span><i aria-hidden="true" />גררו כדי לגלות עוד זווית<span className="device-scene-caption-separator"> · </span><small>המחשת מוצר</small></span><button type="button" onClick={() => actionsRef.current?.reset()} aria-label="איפוס זווית מודל המוצר">איפוס זווית <span aria-hidden="true">↺</span></button></div>}
  </div>;
}
