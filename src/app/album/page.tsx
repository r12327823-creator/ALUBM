'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface AlbumData {
  groomName: string;
  brideName: string;
  date: string;
  template: string;
  photos: string[];
}

const defaultData: AlbumData = {
  groomName: 'Rahul',
  brideName: 'Priya',
  date: '15th January 2026',
  template: 'royal',
  photos: [],
};

export default function AlbumPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [albumData, setAlbumData] = useState<AlbumData>(defaultData);
  const initialized = useRef(false);

  useEffect(() => {
    setIsClient(true);

    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('weddingAlbumData');
      if (savedData) {
        try {
          const data = JSON.parse(savedData);
          setAlbumData(data);
        } catch (e) {
          console.log('Using default data');
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current || initialized.current) return;
    initialized.current = true;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    const point1 = new THREE.PointLight(0xfff5e6, 1);
    point1.position.set(10, 10, 10);
    scene.add(point1);

    const point2 = new THREE.PointLight(0xe6f0ff, 0.5);
    point2.position.set(-10, 10, -10);
    scene.add(point2);

    // Background sphere
    const bgGeom = new THREE.SphereGeometry(50, 32, 32);
    const bgMat = new THREE.MeshBasicMaterial({ color: 0x1a1a2e, side: THREE.BackSide });
    const bg = new THREE.Mesh(bgGeom, bgMat);
    bg.scale.x = -1;
    scene.add(bg);

    // Particles
    const particleCount = 200;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ size: 0.05, color: 0xc9a227, transparent: true, opacity: 0.6 });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // Load photos
    const photos = albumData.photos?.length > 0 ? albumData.photos : [];
    const frameCount = Math.max(photos.length, 7);

    // Calculate positions
    const positions2D: [number, number, number][] = [];
    const cols = 4;
    const spacingX = 3.5;

    for (let i = 0; i < frameCount; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x = (col - (cols - 1) / 2) * spacingX;
      const y = row * -1.2;
      const z = row * -1.5;
      positions2D.push([x, y, z]);
    }

    // Create frames
    const frames: THREE.Group[] = [];
    const placeholderColors = ['#ff9a9e', '#a18cd1', '#84fab0', '#ffecd2', '#f093fb', '#4facfe', '#f6d365'];

    positions2D.forEach((pos, i) => {
      const group = new THREE.Group();
      group.position.set(pos[0], pos[1], pos[2]);

      // Frame
      const frameGeom = new THREE.BoxGeometry(2.4, 3.2, 0.1);
      const frameMat = new THREE.MeshStandardMaterial({ color: 0x8b7355, metalness: 0.3, roughness: 0.7 });
      const frame = new THREE.Mesh(frameGeom, frameMat);
      group.add(frame);

      // Photo
      const photoGeom = new THREE.PlaneGeometry(2.2, 3);
      let photoMat;

      if (photos[i]) {
        const loader = new THREE.TextureLoader();
        try {
          const texture = loader.load(photos[i]);
          photoMat = new THREE.MeshStandardMaterial({ map: texture });
        } catch {
          photoMat = new THREE.MeshStandardMaterial({ color: placeholderColors[i % placeholderColors.length] });
        }
      } else {
        photoMat = new THREE.MeshStandardMaterial({ color: placeholderColors[i % placeholderColors.length] });
      }

      const photo = new THREE.Mesh(photoGeom, photoMat);
      photo.position.z = 0.06;
      group.add(photo);

      // Border
      const edges = new THREE.EdgesGeometry(frameGeom);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xc9a227 }));
      group.add(line);

      scene.add(group);
      frames.push(group);
    });

    // Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationY = 0;
    let targetRotationX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      targetRotationY += deltaX * 0.005;
      targetRotationX += deltaY * 0.005;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => { isDragging = false; };

    const onWheel = (e: WheelEvent) => {
      camera.position.z += e.deltaY * 0.01;
      camera.position.z = Math.max(5, Math.min(25, camera.position.z));
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('wheel', onWheel);

    // Animation
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      particles.rotation.y = time * 0.02;

      frames.forEach((frame, i) => {
        frame.position.y = positions2D[i][1] + Math.sin(time * 0.5 + i) * 0.1;
      });

      camera.rotation.y += (targetRotationY - camera.rotation.y) * 0.1;
      camera.rotation.x += (targetRotationX - camera.rotation.x) * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('wheel', onWheel);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [isClient, albumData]);

  if (!isClient) {
    return (
      <div style={{ minHeight: '100vh', background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="album-page" ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <div className="album-overlay">
        <h1 className="album-title">Wedding Album</h1>
        <p className="album-subtitle">
          {albumData.groomName} & {albumData.brideName} - {albumData.date}
        </p>
      </div>
      <div className="album-controls">
        <button onClick={() => window.location.href = '/admin'}>Create New</button>
        <button onClick={() => window.location.href = '/'}>Home</button>
        <button>Music</button>
      </div>
    </div>
  );
}
