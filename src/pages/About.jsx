import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { Helmet } from "react-helmet";
import CountUp from "react-countup";

gsap.registerPlugin(ScrollTrigger);

// 3D Book Model Component
const BookModel = () => {
   return (
      <Float
         speed={1}
         rotationIntensity={0.5}
         floatIntensity={0.5}
      >
         <mesh>
            <boxGeometry args={[2, 3, 0.3]} />
            <meshStandardMaterial
               color="#5a77de"
               roughness={0.4}
               metalness={0.2}
            />
            <Text
               position={[0, 0, 0.16]}
               fontSize={0.3}
               color="#c4d4ff"
               anchorX="center"
               anchorY="middle"
            >
               Holy Bible
            </Text>
         </mesh>
         <pointLight
            position={[5, 5, 5]}
            intensity={1}
         />
      </Float>
   );
};

export const About = () => {
   const containerRef = useRef(null);
   const titleRef = useRef(null);
   const cardsRef = useRef(null);
   const heroRef = useRef(null);
   const bgElements = useRef([]);
   const statsRef = useRef(null);

   useEffect(() => {
      // Main timeline for entrance animation
      const mainTl = gsap.timeline();

      // Hero section animation
      mainTl.fromTo(
         ".hero-content",
         {
            opacity: 0,
            y: 50,
         },
         {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
         },
         0
      );

      // Animate title with staggered text reveal
      mainTl.fromTo(
         ".about-title .char",
         {
            opacity: 0,
            y: 100,
            rotate: 5,
         },
         {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 1.2,
            stagger: 0.03,
            ease: "back.out(1.7)",
         },
         0.2
      );

      // Split title text into individual characters
      const title = titleRef.current;
      if (title) {
         const text = title.innerText;
         title.innerHTML = "";
         [...text].forEach((char) => {
            const span = document.createElement("span");
            span.className = "char inline-block";
            span.innerText = char === " " ? "\u00A0" : char;
            title.appendChild(span);
         });
      }

      // Cards stagger animation
      gsap.fromTo(
         ".about-card",
         {
            y: 100,
            opacity: 0,
            scale: 0.9,
         },
         {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
               trigger: cardsRef.current,
               start: "top 80%",
               end: "bottom 60%",
               toggleActions: "play none none reverse",
            },
         }
      );

   

      // Floating background elements
      bgElements.current.forEach((el, index) => {
         gsap.to(el, {
            y: -30 - index * 10,
            x: index % 2 === 0 ? 20 : -20,
            rotation: index % 2 === 0 ? 10 : -10,
            duration: 5 + index,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.5,
         });
      });

      // Parallax scroll effect
      gsap.to(".parallax-bg", {
         y: -150,
         ease: "none",
         scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
         },
      });

      return () => {
         ScrollTrigger.getAll().forEach((t) => t.kill());
      };
   }, []);

   const addToRefs = (el) => {
      if (el && !bgElements.current.includes(el)) {
         bgElements.current.push(el);
      }
   };

   return (
      <>
         <Helmet>
            <meta charSet="utf-8" />
            <title>About | VerseVault</title>
            <meta
               name="description"
               content="Explore the Bible in a new, immersive 3D experience designed for modern readers."
            />
         </Helmet>
         <div
            ref={containerRef}
            className="bg-gradient-to-b from-[#3A59D1] to-[#253380] text-white relative overflow-hidden"
         >
            {/* Decorative Background Elements */}
            <div
               ref={addToRefs}
               className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-br from-[#5a77de]/30 to-[#7dabff]/30 rounded-full filter blur-3xl opacity-50"
            ></div>
            <div
               ref={addToRefs}
               className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-br from-[#7dabff]/30 to-[#5a77de]/30 rounded-full filter blur-3xl opacity-50"
            ></div>

            {/* Grid Pattern Background */}
            <div className="parallax-bg absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>

            {/* Hero Section with 3D Model */}
            <section
               ref={heroRef}
               className="min-h-screen flex items-center justify-center relative z-10"
            >
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center">
                  <div className="hero-content md:w-1/2 text-center md:text-left">
                     <h1
                        ref={titleRef}
                        className="about-title text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#c4d4ff]"
                     >
                        About VerseVault
                     </h1>
                     <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                        Your digital companion for exploring Bible scriptures
                        with modern technology, featuring an AI chat at{" "}
                        <a
                           href="/ai-chat"
                           className="text-[#7dabff] hover:underline"
                        >
                           /ai-chat
                        </a>{" "}
                        and advanced Bible search at{" "}
                        <a
                           href="/bible-search"
                           className="text-[#7dabff] hover:underline"
                        >
                           /bible-search
                        </a>
                        .
                     </p>
                     <a
                        href="/bible-search"
                        className="inline-block bg-gradient-to-r from-[#5a77de] to-[#7dabff] text-white font-semibold py-3 px-8 rounded-full hover:scale-105 transition-transform duration-300"
                     >
                        Explore Now
                     </a>
                  </div>
                  <div className="md:w-1/2 h-96">
                     <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight
                           position={[5, 5, 5]}
                           intensity={1}
                        />
                        <BookModel />
                        <OrbitControls
                           enableZoom={false}
                           enablePan={false}
                        />
                     </Canvas>
                  </div>
               </div>
            </section>

            {/* Features Section */}
            <section className="py-20 relative z-10">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div
                     ref={cardsRef}
                     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                     <div className="about-card bg-gradient-to-br from-[#253380]/80 to-[#1c2761]/90 border border-white/10 p-8 rounded-lg backdrop-blur-sm hover:shadow-lg transition-all duration-500 hover:border-[#5a77de]/30">
                        <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c4d4ff]">
                           Our Mission
                        </h2>
                        <p className="text-gray-200">
                           VerseVault makes Bible study accessible and engaging
                           through innovative technology, enabling everyone to
                           explore scripture interactively.
                        </p>
                     </div>

                     <div className="about-card bg-gradient-to-br from-[#253380]/80 to-[#1c2761]/90 border border-white/10 p-8 rounded-lg backdrop-blur-sm hover:shadow-lg transition-all duration-500 hover:border-[#5a77de]/30">
                        <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c4d4ff]">
                           AI-Powered Features
                        </h2>
                        <ul className="text-gray-200 space-y-3">
                           <li className="flex items-center">
                              <span className="text-[#7dabff] mr-2">•</span>
                              AI Chat at /ai-chat for scripture insights
                           </li>
                           <li className="flex items-center">
                              <span className="text-[#7dabff] mr-2">•</span>
                              Advanced Bible Search at /bible-search
                           </li>
                           <li className="flex items-center">
                              <span className="text-[#7dabff] mr-2">•</span>
                              Interactive 3D Bible book experience
                           </li>
                        </ul>
                     </div>

                     <div className="about-card bg-gradient-to-br from-[#253380]/80 to-[#1c2761]/90 border border-white/10 p-8 rounded-lg backdrop-blur-sm hover:shadow-lg transition-all duration-500 hover:border-[#5a77de]/30">
                        <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c4d4ff]">
                           Technology Stack
                        </h2>
                        <p className="text-gray-200">
                           Built with React, Three.js, and Tailwind CSS,
                           VerseVault offers a seamless, responsive experience
                           with stunning 3D visualizations.
                        </p>
                     </div>
                  </div>
               </div>
            </section>

            {/* Stats Section */}
            <section
               ref={statsRef}
               className="py-20 bg-[#253380]/50"
            >
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#c4d4ff]">
                     Our Impact
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                     <div>
                        <p className="text-4xl font-bold text-[#7dabff]">
                           <CountUp
                              end={31102}
                              duration={2.5}
                              separator=","
                              enableScrollSpy
                              scrollSpyDelay={200}
                           />
                        </p>
                        <p className="text-gray-200 mt-2">Verses Explored</p>
                     </div>
                     <div>
                        <p className="text-4xl font-bold text-[#7dabff]">
                           <CountUp
                              end={50000}
                              duration={2.5}
                              separator=","
                              enableScrollSpy
                              scrollSpyDelay={200}
                           />
                        </p>
                        <p className="text-gray-200 mt-2">Active Users</p>
                     </div>
                     <div>
                        <p className="text-4xl font-bold text-[#7dabff]">
                           <CountUp
                              end={66}
                              duration={2.5}
                              enableScrollSpy
                              scrollSpyDelay={200}
                           />
                        </p>
                        <p className="text-gray-200 mt-2">Books Covered</p>
                     </div>
                  </div>
               </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-20 relative z-10">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#c4d4ff]">
                     Join the VerseVault Community
                  </h2>
                  <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                     Experience the Bible like never before with our interactive
                     tools, AI-powered insights, and beautiful interface.
                  </p>
                  <div className="flex justify-center gap-4">
                     <a
                        href="/ai-chat"
                        className="inline-block bg-gradient-to-r from-[#5a77de] to-[#7dabff] text-white font-semibold py-3 px-8 rounded-full hover:scale-105 transition-transform duration-300"
                     >
                        Try AI Chat
                     </a>
                     <a
                        href="/bible-search"
                        className="inline-block border border-[#7dabff] text-[#7dabff] font-semibold py-3 px-8 rounded-full hover:bg-[#7dabff]/10 transition-colors duration-300"
                     >
                        Search Scriptures
                     </a>
                  </div>
               </div>
            </section>

            {/* Additional Background Decorations */}
            <div
               ref={addToRefs}
               className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-[#c4d4ff]/30 to-[#5a77de]/30 rounded-full filter blur-3xl opacity-50"
            ></div>
            <div
               ref={addToRefs}
               className="absolute bottom-1/4 left-1/4 w-36 h-36 bg-gradient-to-br from-[#7dabff]/30 to-[#5a77de]/30 rounded-full filter blur-3xl opacity-50"
            ></div>
         </div>
      </>
   );
};
