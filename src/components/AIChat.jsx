import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated, config } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import { Brain, BookOpen, MessageSquare, Sparkles } from "lucide-react";

const AIChat = () => {
  // Animation references
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  // Main section animations
  const headerAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px)" : "translateY(50px)",
    config: config.gentle,
  });

  const imageAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "scale(1)" : "scale(0.9)",
    config: { mass: 1, tension: 280, friction: 60 },
    delay: 200,
  });

  // Feature cards animations with staggered delay
  const featureCards = [0, 1, 2, 3].map((i) =>
    useSpring({
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0px)" : "translateY(30px)",
      config: config.gentle,
      delay: 300 + i * 100,
    })
  );

  // Button animation
  const buttonAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px) scale(1)" : "translateY(20px) scale(0.95)",
    config: config.wobbly,
    delay: 800,
  });

  // Floating shapes animations
  const floatingShape1 = useSpring({
    loop: true,
    from: { transform: "translateY(0px)" },
    to: [
      { transform: "translateY(-20px)" },
      { transform: "translateY(0px)" },
    ],
    config: { duration: 3000, tension: 120, friction: 14 },
  });

  const floatingShape2 = useSpring({
    loop: true,
    from: { transform: "translateY(0px)" },
    to: [
      { transform: "translateY(20px)" },
      { transform: "translateY(0px)" },
    ],
    config: { duration: 4000, tension: 120, friction: 14 },
  });

  // Particle animations
  const particles = Array(6).fill().map((_, i) => {
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    const randomSize = 10 + Math.random() * 40;
    const randomDuration = 10000 + Math.random() * 20000;
    
    return useSpring({
      loop: true,
      from: { 
        opacity: 0.1,
        transform: `translate(${randomX}px, ${randomY}px) scale(0.8)` 
      },
      to: [
        { 
          opacity: 0.3,
          transform: `translate(${randomX + 50}px, ${randomY - 50}px) scale(1.2)` 
        },
        { 
          opacity: 0.1,
          transform: `translate(${randomX}px, ${randomY}px) scale(0.8)` 
        },
      ],
      config: { duration: randomDuration },
    });
  });

  return (
    <section 
      ref={ref}
      className="py-24 bg-gradient-to-b from-[#1c2761] to-[#0e1433] relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="bg-pattern absolute inset-0 bg-[url('/images/grid.svg')] opacity-10"></div>
      
      {/* Floating elements */}
      <animated.div 
        style={floatingShape1}
        className="absolute top-20 left-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
      />
      
      <animated.div 
        style={floatingShape2}
        className="absolute bottom-40 right-40 w-48 h-48 bg-blue-500/10 rounded-full blur-xl"
      />

      {/* Particles */}
      {particles.map((styles, i) => (
        <animated.div 
          key={i}
          style={styles}
          className={`absolute w-${5 + i * 3} h-${5 + i * 3} rounded-full bg-white/5 blur-md`}
        />
      ))}
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <animated.div style={headerAnimation} className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#c4d4ff]">
              AI Bible Assistant
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Elevate your spiritual journey with our AI-powered companion for guidance and insights
          </p>
          <div className="h-1 w-20 bg-white/30 mx-auto mt-4"></div>
        </animated.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side: Modern feature showcase */}
          <div className="space-y-10">
            <animated.div 
              style={imageAnimation}
              className="relative"
            >
              {/* 3D Card effect */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-gradient-to-br from-[#2a3e9d]/90 to-[#253380]/90 p-6 rounded-xl border border-white/10 shadow-2xl backdrop-blur-sm overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-xl"></div>
                  
                  <h3 className="text-2xl font-bold text-white mb-6">Experience Divine Wisdom</h3>
                  
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-white font-semibold">AI-Powered Spiritual Guide</p>
                      <p className="text-white/70 text-sm">Harnessing modern technology for timeless wisdom</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {["Scripture interpretation", "Spiritual guidance", "Faith questions answered", "Daily devotional support"].map((item, i) => (
                      <li key={i} className="flex items-center text-white/90">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="text-xs text-white/70 ml-2">Always available</span>
                    </div>
                    <span className="text-xs text-white/70">VerseVault AI</span>
                  </div>
                </div>
              </div>
            </animated.div>
            
            {/* CTA Button */}
            <animated.div style={buttonAnimation} className="text-center">
              <Link
                to="/ai-chat"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-10 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Start Your Spiritual Journey
              </Link>
            </animated.div>
          </div>
          
          {/* Right side: Features + Image (keeping this part) */}
          <div className="space-y-10">
            {/* Image placeholder */}
            <animated.div 
              style={imageAnimation}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-xl flex items-center justify-center group transition-transform duration-300"
            >
              <img 
                src="/images/bot.png" 
                alt="AI Bible Assistant" 
                className="w-20 h-20 object-cover md:w-32 md:h-32 lg:w-48 lg:h-48 rounded-xl transform transition-transform duration-300 group-hover:scale-105"
              />
            </animated.div>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <Brain className="w-6 h-6 text-blue-400" />,
                  title: "Spiritual Guidance",
                  description: "Get answers to your deepest spiritual questions"
                },
                {
                  icon: <BookOpen className="w-6 h-6 text-purple-400" />,
                  title: "Bible Insights",
                  description: "Discover deeper meanings in biblical texts"
                },
                {
                  icon: <MessageSquare className="w-6 h-6 text-green-400" />,
                  title: "24/7 Companion",
                  description: "Always available for conversation and support"
                },
                {
                  icon: <Sparkles className="w-6 h-6 text-amber-400" />,
                  title: "Growth Focus",
                  description: "Personalized guidance for your faith journey"
                }
              ].map((feature, index) => (
                <animated.div 
                  key={index} 
                  style={featureCards[index]}
                  className="bg-white/5 p-5 rounded-lg backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
                >
                  <div className="flex items-start">
                    <div className="bg-white/10 p-2 rounded-lg mr-3">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{feature.title}</h4>
                      <p className="text-white/70 text-xs mt-1">{feature.description}</p>
                    </div>
                  </div>
                </animated.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChat;