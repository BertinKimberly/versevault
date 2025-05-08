// Experience.jsx
import { Environment, OrbitControls, Html } from "@react-three/drei";
import { Suspense } from "react";
import { Book } from "./Book";

const LoadingScreen = () => (
   <Html center>
      <div className="flex flex-col items-center justify-center">
         <div className="w-32 h-32 mb-8 relative">
            <div className="absolute inset-0 flex justify-center items-center">
               <div className="w-16 h-24 bg-white rounded-r-lg shadow-lg animate-page-flip relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-200" />
               </div>
               <div className="w-16 h-24 bg-[#e8e8e8] rounded-l-lg shadow-xl -ml-1 z-10" />
            </div>
         </div>
         <div className="text-white text-xl">Loading Bible Scriptures...</div>
      </div>
   </Html>
);

export const Experience = () => {
   return (
      <>
         <Suspense fallback={<LoadingScreen />}>
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
