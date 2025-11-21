import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import { ACESFilmicToneMapping, SRGBColorSpace, Camera } from "three";
import { useTheme } from "./theme/ThemeContext";

interface ThreeSceneProps {
  modelUrl?: string;
}

export const DEFAULT_MODEL_URL = `${import.meta.env.BASE_URL}models/demo.glb`;

function LoadedModel({ url }: { url: string }) {
  const { scene, cameras } = useGLTF(url);
  const { camera, set } = useThree();

  useEffect(() => {
    // If the GLTF contains a camera, use it
    if (cameras && cameras.length > 0) {
      const modelCamera = cameras[0] as Camera;
      
      // Copy position/rotation to renderer camera
      camera.position.copy(modelCamera.position);
      camera.rotation.copy(modelCamera.rotation);
      
      // Optionally apply FOV settings
      if ("fov" in modelCamera) {
        // @ts-ignore
        camera.fov = modelCamera.fov;
        // @ts-ignore
        camera.updateProjectionMatrix();
      }

      // Set this camera as active
      set({ camera });
    }
  }, [cameras, camera, set]);

  return <primitive object={scene} />;
}

export default function ThreeScene({ modelUrl = DEFAULT_MODEL_URL }: ThreeSceneProps) {
  const { theme } = useTheme();
  const [backgroundColor, setBackgroundColor] = useState(() => {
    const cssValue = getComputedStyle(document.body)
      .getPropertyValue("--three-bg")
      .trim();
    return cssValue || "#111111";
  });

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const cssValue = getComputedStyle(document.body)
        .getPropertyValue("--three-bg")
        .trim();
      setBackgroundColor(cssValue || "#111111");
    });
    return () => cancelAnimationFrame(raf);
  }, [theme]);

  return (
    <Canvas
      shadows
      gl={{ antialias: true }}
      camera={{ position: [3, 2, 5], fov: 45 }} // Default, only used until model camera is applied
      onCreated={({ gl }) => {
        gl.toneMapping = ACESFilmicToneMapping;
        gl.outputColorSpace = SRGBColorSpace;
      }}
      style={{ width: "100%", height: "100%", borderRadius: "8px" }}
    >
      <color attach="background" args={[backgroundColor]} />

      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        
      />
      <directionalLight position={[-3, 5, -2]} intensity={1.2} />

      

      {/* Load model + apply camera if included */}
      <LoadedModel url={modelUrl} />

      <OrbitControls enableDamping dampingFactor={0.08} maxPolarAngle={Math.PI / 2.1} />
    </Canvas>
  );
}

useGLTF.preload(DEFAULT_MODEL_URL);
