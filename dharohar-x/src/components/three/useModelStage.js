import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// One WebGL context lives for the life of the mounted stage; swapping the
// `modelUrl` only swaps geometry, so switching between the five temples is
// instant and never tears down the renderer or loses the camera framing.
export function useModelStage({ mountRef, modelUrl, autoRotate }) {
  const stateRef = useRef({});
  const [status, setStatus] = useState('Loading model preview…');
  const [progress, setProgress] = useState(0);
  const [arReady, setArReady] = useState(false);
  const [arActive, setArActive] = useState(false);
  const startARRef = useRef(null);
  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  // Mount renderer once.
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / Math.max(1, mount.clientHeight), 0.01, 2000);
    camera.position.set(3.4, 2.4, 4.4);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(mount.clientWidth, Math.max(1, mount.clientHeight));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.xr.enabled = true;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xdce9ff, 0x1b2a3a, 1.9));
    const key = new THREE.DirectionalLight(0xfff2da, 2.5);
    key.position.set(5, 8, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x88aaff, 0.6);
    rim.position.set(-6, 3, -4);
    scene.add(rim);
    const grid = new THREE.GridHelper(10, 20, 0xb1592f, 0x27384a);
    grid.position.y = -0.001;
    grid.material.opacity = 0.35;
    grid.material.transparent = true;
    scene.add(grid);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 1.2;
    controls.maxDistance = 12;
    controls.target.set(0, 0.4, 0);

    const resize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / Math.max(1, mount.clientHeight);
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, Math.max(1, mount.clientHeight));
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    renderer.setAnimationLoop(() => {
      if (autoRotateRef.current && stateRef.current.object) {
        stateRef.current.object.rotation.y += 0.0035;
      }
      controls.update();
      renderer.render(scene, camera);
    });

    stateRef.current = { renderer, scene, camera, controls, mount, object: null, session: null, hitTestSource: null };

    return () => {
      ro.disconnect();
      try { stateRef.current.session?.end(); } catch {}
      renderer.setAnimationLoop(null);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      stateRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load / swap model.
  useEffect(() => {
    const st = stateRef.current;
    if (!st.scene || !modelUrl) return;
    let cancelled = false;
    setStatus('Loading model preview…');
    setProgress(0);
    setArReady(false);

    if (st.object) {
      st.scene.remove(st.object);
      st.object.traverse((c) => { if (c.isMesh) { c.geometry?.dispose?.(); } });
      st.object = null;
    }

    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        if (cancelled) return;
        const obj = gltf.scene;
        const box = new THREE.Box3().setFromObject(obj);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        obj.position.x -= center.x;
        obj.position.z -= center.z;
        obj.position.y -= box.min.y;
        const max = Math.max(size.x, size.y, size.z) || 1;
        obj.scale.setScalar(2.4 / max);
        obj.traverse((c) => {
          if (c.isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
            if (c.material) c.material.envMapIntensity = 0.6;
          }
        });
        st.scene.add(obj);
        st.object = obj;
        setStatus('Interactive 3D preview ready');
        setProgress(100);

        if (navigator.xr && window.isSecureContext && navigator.xr.isSessionSupported) {
          navigator.xr.isSessionSupported('immersive-ar')
            .then((supported) => setArReady(!!supported))
            .catch(() => setArReady(false));
        }
      },
      (evt) => {
        if (evt.total) setProgress(Math.min(99, Math.round((evt.loaded / evt.total) * 100)));
      },
      (err) => {
        console.error(err);
        if (!cancelled) setStatus('Model preview unavailable — check your connection and retry.');
      }
    );

    return () => { cancelled = true; };
  }, [modelUrl]);

  const startAR = useCallback(async () => {
    const st = stateRef.current;
    if (!st.renderer || !navigator.xr || !st.object || arActive) return;
    try {
      const session = await navigator.xr.requestSession('immersive-ar', {
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['dom-overlay'],
        domOverlay: { root: document.body },
      });
      st.session = session;
      st.renderer.xr.setReferenceSpaceType('local-floor');
      await st.renderer.xr.setSession(session);
      setArActive(true);
      const viewerSpace = await session.requestReferenceSpace('viewer');
      const hitTestSource = await session.requestHitTestSource({ space: viewerSpace });
      st.hitTestSource = hitTestSource;
      const refSpace = await session.requestReferenceSpace('local');
      const reticle = new THREE.Mesh(
        new THREE.RingGeometry(0.08, 0.1, 32).rotateX(-Math.PI / 2),
        new THREE.MeshBasicMaterial({ color: 0xf1c98c })
      );
      reticle.matrixAutoUpdate = false;
      reticle.visible = false;
      st.scene.add(reticle);
      st.object.visible = false;

      session.addEventListener('select', () => {
        if (reticle.visible && st.object) {
          st.object.visible = true;
          st.object.position.setFromMatrixPosition(reticle.matrix);
          st.object.quaternion.setFromRotationMatrix(reticle.matrix);
        }
      });

      st.renderer.setAnimationLoop((time, frame) => {
        if (frame && st.hitTestSource) {
          const hits = frame.getHitTestResults(st.hitTestSource);
          if (hits.length) {
            const pose = hits[0].getPose(refSpace);
            reticle.visible = true;
            reticle.matrix.fromArray(pose.transform.matrix);
          } else reticle.visible = false;
        }
        st.renderer.render(st.scene, st.camera);
      });

      session.addEventListener('end', () => {
        st.hitTestSource = null;
        setArActive(false);
        if (st.object) st.object.visible = true;
        st.renderer.setAnimationLoop(() => {
          if (autoRotateRef.current && st.object) st.object.rotation.y += 0.0035;
          st.controls?.update();
          st.renderer.render(st.scene, st.camera);
        });
      });
    } catch (e) {
      console.error(e);
      setStatus('AR could not start. Use Android Chrome on HTTPS/localhost with camera permission.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arActive]);

  startARRef.current = startAR;

  return { status, progress, arReady, arActive, startAR: () => startARRef.current?.() };
}
