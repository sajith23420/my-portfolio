"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-expect-error - No types available for this specific path
import * as random from "maath/random/dist/maath-random.esm";
import { useState, useRef, Suspense, useEffect } from "react";
import * as THREE from "three";

function StarField(props: any) {
  const ref = useRef<THREE.Points>(null);
  // Spread particles further out for a starfield effect
  // 5000 points * 3 coordinates (x, y, z) = 15000 floats
  const [sphere] = useState(() => random.inSphere(new Float32Array(15000), { radius: 3 }));

  useFrame((state, delta) => {
    if (ref.current) {
      // Slower, subtle rotation
      ref.current.rotation.x -= delta / 30;
      ref.current.rotation.y -= delta / 40;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
      {/* Add a secondary layer of orange accent stars */}
      <Points positions={random.inSphere(new Float32Array(3000), { radius: 3 }) as Float32Array} stride={3} frustumCulled={false}>
         <PointMaterial
          transparent
          color="#F37512"
          size={0.004}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

export function HeroBackground() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device is mobile based on screen width
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for window resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Disable heavy 3D rendering on mobile devices for performance
  if (isMobile) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarField />
        </Suspense>
      </Canvas>
    </div>
  );
}
