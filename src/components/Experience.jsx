import { Environment, OrbitControls } from "@react-three/drei";
import { Book } from "./Book";

export const Experience = () => {
   return (
      <>
         <group
            position={[0, -0.3, 0]}
            rotation={[0, 0, 0]}
            scale={1.5}
         >
            <Book />
         </group>
         <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.2}
            autoRotate
            autoRotateSpeed={0.5}
            target={[0, -0.3, 0]}
         />
         <Environment preset="sunset" />
         <directionalLight
            position={[2, 5, 2]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0001}
         />
         <ambientLight intensity={0.5} />
         <spotLight
            position={[0, 10, 0]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
            
         />
         <mesh
            position-y={-1.5}
            rotation-x={-Math.PI / 2}
            receiveShadow
         >
            <planeGeometry args={[100, 100]} />
            <shadowMaterial
               transparent
               opacity={0.2}
            />
         </mesh>
      </>
   );
};
