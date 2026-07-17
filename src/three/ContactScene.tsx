import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingShape({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * speed * 0.4;
    ref.current.rotation.y = t * speed * 0.3;
    ref.current.position.y = position[1] + Math.sin(t * speed) * 0.3;
  });
  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.7, 0]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
    </mesh>
  );
}

export default function ContactScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ antialias: true }} onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}>
      <FloatingShape position={[-2.2, 0.6, 0]} color="#f2f2f2" speed={0.6} />
      <FloatingShape position={[2.4, -0.4, -1]} color="#b0b0b0" speed={0.45} />
      <FloatingShape position={[0.6, 1.4, -2]} color="#707070" speed={0.7} />
    </Canvas>
  );
}
