// Experience.jsx
import { Environment, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { Book, TexturePreloader } from "./Book";

// BookLoader component that shows a 3D loading animation
const BookLoader = () => {
   const { clock } = useThree();
   
   useEffect(() => {
      // Dummy cleanup function
      return () => {};
   }, []);
   
   return (
      <group>
         {/* Loading 3D animation - floating pages */}
         <group position={[0, 0, 0]}>
            {[...Array(5)].map((_, index) => (
               <mesh
                  key={index}
                  position={[
                     Math.sin(index * 0.5 + clock.elapsedTime * 0.5) * 0.3,
                     Math.cos(index * 0.7 + clock.elapsedTime * 0.6) * 0.2 + 0.2,
                     Math.sin(index * 0.3 + clock.elapsedTime * 0.3) * 0.3
                  ]}
                  rotation={[
                     Math.sin(clock.elapsedTime * 0.5 + index) * 0.5,
                     Math.cos(clock.elapsedTime * 0.5 + index) * 0.5,
                     Math.sin(clock.elapsedTime * 0.7 + index) * 0.5
                  ]}
                  scale={[0.5, 0.7, 0.01]}
               >
                  <boxGeometry />
                  <meshStandardMaterial
                     color="#ffffff"
                     roughness={0.5}
                     metalness={0.2}
                     emissive="#3A59D1"
                     emissiveIntensity={0.3}
                  />
               </mesh>
            ))}
            
            {/* Central glowing orb */}
            <mesh position={[0, 0, 0]}>
               <sphereGeometry args={[0.2, 32, 32]} />
               <meshStandardMaterial
                  color="#4e6adb"
                  emissive="#3A59D1"
                  emissiveIntensity={1.5}
                  roughness={0.1}
                  metalness={0.8}
               />
            </mesh>
         </group>
      </group>
   );
};

export const Experience = () => {
   const [isLoaded, setIsLoaded] = useState(false);
   
   // Listen for the book model loaded event
   useEffect(() => {
      const handleModelLoaded = () => {
         setIsLoaded(true);
      };
      
      window.addEventListener('bookModelLoaded', handleModelLoaded);
      
      return () => {
         window.removeEventListener('bookModelLoaded', handleModelLoaded);
      };
   }, []);

   return (
      <>
         <Suspense fallback={<BookLoader />}>
            <group
               position={[0, -0.3, 0]}
               rotation={[0, 0, 0]}
               scale={1.5}
            >
               <Book />
            </group>
         </Suspense>

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