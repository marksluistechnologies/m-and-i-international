"use client";
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshDistortMaterial, Float, Stars, PresentationControls } from '@react-three/drei';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// --- 3D Background Component ---
function AnimatedLeatherSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <PresentationControls global zoom={0.8} rotation={[0, -Math.PI / 4, 0]} polar={[0, Math.PI / 4]} azimuth={[-Math.PI / 4, Math.PI / 4]}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={sphereRef} scale={2.5} position={[4, 0, -2]}>
          <sphereGeometry args={[1, 100, 100]} />
          <MeshDistortMaterial color="#2A1B0E" distort={0.4} speed={1.5} roughness={0.6} metalness={0.8} />
        </mesh>
        <mesh scale={1.5} position={[-5, 3, -5]}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial color="#C5A059" distort={0.3} speed={2} roughness={0.2} metalness={1} transparent={true} opacity={0.3} />
        </mesh>
      </Float>
    </PresentationControls>
  );
}

// --- Main Page Component ---
export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // TypeScript Variants Fix
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 70 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  const navVariants: Variants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  };

  if (!mounted) return <div className="bg-black min-h-screen"></div>;

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-[#C5A059] selection:text-black">
      
      {/* 1. FIXED 3D BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <AnimatedLeatherSphere />
          <Environment preset="city" />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black z-10" />
      </div>

      {/* 2. FOREGROUND UI LAYER */}
      <div className="relative z-20">
        
        {/* STICKY GLASS NAVBAR */}
        <motion.nav 
          initial="hidden"
          animate="visible"
          variants={navVariants}
          className="fixed w-full flex justify-between items-center px-6 md:px-12 py-5 bg-black/20 backdrop-blur-xl border-b border-white/5 z-50"
        >
          <h1 className="text-2xl md:text-3xl font-serif text-[#C5A059] tracking-[0.2em] font-bold">M & I INT.</h1>
          <div className="hidden md:flex space-x-12 text-[10px] tracking-[0.3em] text-gray-400 uppercase font-medium">
            <a href="#hero" className="hover:text-[#C5A059] transition">Home</a>
            <a href="#heritage" className="hover:text-[#C5A059] transition">Heritage</a>
            <a href="#catalog" className="hover:text-[#C5A059] transition">Catalog</a>
            <a href="#b2b" className="hover:text-[#C5A059] transition">B2B Portal</a>
          </div>
          <button className="border border-[#C5A059] text-[#C5A059] px-6 py-2 rounded-full text-[10px] font-bold tracking-widest hover:bg-[#C5A059] hover:text-black transition-all">
            GET A QUOTE
          </button>
        </motion.nav>

        {/* SECTION 1: HERO (IMPACTFUL START) */}
        <section id="hero" className="min-h-screen flex flex-col justify-center px-6 md:px-24">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-8">
              <div className="h-[1px] w-16 bg-[#C5A059]"></div>
              <p className="text-[#C5A059] tracking-[0.4em] uppercase text-[10px] md:text-xs font-bold">
                Kanpur • India's Leather Capital
              </p>
            </div>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-serif leading-[1] mb-10 tracking-tight">
              Equestrian <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#E2C275] to-[#8B6914] italic">
                Mastery.
              </span>
            </h2>
            <p className="text-gray-400 mb-12 text-lg md:text-2xl font-light tracking-wide max-w-2xl leading-relaxed">
              M & I International is a global leader in B2B manufacturing, delivering precision-engineered equestrian leather products to the world's most prestigious brands.
            </p>
            <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-8">
              <motion.button whileHover={{ scale: 1.05 }} className="bg-[#C5A059] text-black px-12 py-5 rounded-full text-xs font-bold tracking-[0.2em] shadow-2xl shadow-[#C5A059]/20">
                BROWSE COLLECTIONS
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} className="border border-white/20 text-white px-12 py-5 rounded-full text-xs font-bold tracking-[0.2em] hover:border-[#C5A059] transition-all">
                LEARN OUR PROCESS
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* ANIMATED TICKER BAR */}
        <div className="bg-[#C5A059] py-5 overflow-hidden flex whitespace-nowrap text-black font-black uppercase tracking-[0.2em] text-[10px] z-30 relative shadow-2xl">
          <motion.div 
            animate={{ x: [0, -1000] }} 
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="flex space-x-10 items-center"
          >
            <span>Premium B2B Manufacturing</span> <span>•</span> 
            <span>Global Export Legacy</span> <span>•</span> 
            <span>Genuine Vegetable Tanned Leather</span> <span>•</span> 
            <span>Kanpur's Finest Craftsmanship</span> <span>•</span>
            <span>ISO 9001 Certified Quality</span> <span>•</span>
            <span>Custom White-Label Solutions</span> <span>•</span>
            {/* Repeat for seamless loop */}
            <span>Premium B2B Manufacturing</span> <span>•</span> 
            <span>Global Export Legacy</span> <span>•</span> 
          </motion.div>
        </div>

        {/* SECTION 2: HERITAGE (STORYTELLING) */}
        <section id="heritage" className="py-40 px-6 md:px-24 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
              <h3 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">Crafting Excellence <br/>Since Generations</h3>
              <p className="text-gray-400 font-light leading-relaxed mb-8 text-xl">
                Situated in Kanpur, the world's most renowned leather hub, M & I International blends ancestral techniques with futuristic precision. 
              </p>
              <div className="grid grid-cols-2 gap-8 mt-12 border-t border-white/10 pt-12">
                <div>
                  <h4 className="text-[#C5A059] text-3xl font-serif mb-2 font-bold">100%</h4>
                  <p className="text-gray-500 text-xs uppercase tracking-widest">Ethical Sourcing</p>
                </div>
                <div>
                  <h4 className="text-[#C5A059] text-3xl font-serif mb-2 font-bold">Global</h4>
                  <p className="text-gray-500 text-xs uppercase tracking-widest">Supply Chain</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 100 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="h-[600px] w-full rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-md relative overflow-hidden flex items-center justify-center group"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700"></div>
              <div className="z-10 text-center">
                 <div className="w-20 h-20 rounded-full border border-[#C5A059] flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-[#C5A059] border-b-[8px] border-b-transparent ml-1"></div>
                 </div>
                 <p className="text-[#C5A059] tracking-[0.3em] text-[10px] font-bold uppercase">Experience Our Factory</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: CATALOG (DETAILED DISPLAY) */}
        <section id="catalog" className="py-40 px-6 md:px-24 relative z-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-32">
            <h3 className="text-5xl md:text-7xl font-serif text-white mb-8 tracking-tight">Our Product Lines</h3>
            <div className="h-[2px] w-32 bg-[#C5A059] mx-auto mb-8"></div>
            <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">Engineered for endurance and aesthetic perfection.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              { title: "Saddles", tags: ["Dressage", "Jumping", "Polo"], desc: "Ergonomically designed for peak performance and rider safety." },
              { title: "Apparel", tags: ["Boots", "Jackets", "Chaps"], desc: "High-grade leather garments tailored for durability and style." },
              { title: "Gear", tags: ["Bags", "Belts", "Halters"], desc: "Luxury leather accessories compliant with global trade standards." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial="hidden" whileInView="visible" viewport={{ once: true }} 
                variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0, transition: { delay: index * 0.2, duration: 1 } } }}
                whileHover={{ y: -20 }}
                className="p-16 rounded-[3rem] bg-white/[0.03] border border-white/5 backdrop-blur-2xl flex flex-col items-start text-left group transition-all duration-500 hover:border-[#C5A059]/40"
              >
                <span className="text-[#C5A059] text-[10px] font-bold tracking-[0.4em] mb-4 uppercase">Category 0{index + 1}</span>
                <h4 className="text-4xl font-serif text-white mb-6 group-hover:text-[#C5A059] transition-colors">{item.title}</h4>
                <div className="flex flex-wrap gap-2 mb-8">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[9px] border border-white/20 px-3 py-1 rounded-full text-gray-500 uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
                <p className="text-gray-400 font-light leading-relaxed mb-10 text-base">{item.desc}</p>
                <button className="text-white text-[10px] font-bold tracking-widest uppercase border-b border-[#C5A059] pb-2 hover:text-[#C5A059] transition-all">
                  Get Wholesale Specs
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 4: B2B LEAD GEN (DETAILED FORM) */}
        <section id="b2b" className="py-40 px-6 md:px-24 relative z-20">
          <div className="max-w-6xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-12 md:p-24 rounded-[4rem] bg-black/60 border border-white/10 backdrop-blur-3xl relative overflow-hidden shadow-2xl">
              <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#C5A059] rounded-full blur-[200px] opacity-10 pointer-events-none"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10">
                <div>
                  <h3 className="text-4xl md:text-6xl font-serif mb-10 leading-tight">Global Trade <br/>Partnership</h3>
                  <p className="text-gray-400 mb-12 text-xl font-light leading-relaxed">Discuss bulk procurement, OEM white-labeling, or visit our manufacturing site in Kanpur.</p>
                  
                  <div className="space-y-10">
                    <div className="flex items-start space-x-6">
                       <div className="w-12 h-12 rounded-full border border-[#C5A059] flex-shrink-0 flex items-center justify-center text-[#C5A059] text-sm font-bold italic">M</div>
                       <div>
                          <h5 className="text-white font-bold text-sm tracking-widest uppercase mb-2">Direct Factory Pricing</h5>
                          <p className="text-gray-500 text-sm leading-relaxed">No middlemen. Direct procurement from one of India's largest exporters.</p>
                       </div>
                    </div>
                    <div className="flex items-start space-x-6">
                       <div className="w-12 h-12 rounded-full border border-[#C5A059] flex-shrink-0 flex items-center justify-center text-[#C5A059] text-sm font-bold italic">I</div>
                       <div>
                          <h5 className="text-white font-bold text-sm tracking-widest uppercase mb-2">Customized Branding</h5>
                          <p className="text-gray-500 text-sm leading-relaxed">Full white-label support with custom embossing and hardware options.</p>
                       </div>
                    </div>
                  </div>
                </div>

                <form className="space-y-8 bg-white/[0.02] p-8 md:p-12 rounded-[2rem] border border-white/5 backdrop-blur-md">
                  <div className="space-y-6">
                    <input type="text" placeholder="Your Full Name" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white focus:border-[#C5A059] outline-none transition text-sm" />
                    <input type="text" placeholder="Company Name" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white focus:border-[#C5A059] outline-none transition text-sm" />
                    <input type="email" placeholder="Business Email" className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white focus:border-[#C5A059] outline-none transition text-sm" />
                    <textarea placeholder="Tell us about your requirements..." rows={4} className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white focus:border-[#C5A059] outline-none transition text-sm resize-none"></textarea>
                  </div>
                  <button type="button" className="w-full bg-gradient-to-r from-[#C5A059] to-[#8B6914] text-black font-black tracking-[0.3em] py-6 rounded-2xl hover:scale-[1.02] transition-all duration-500 text-xs shadow-xl shadow-[#C5A059]/20">
                    INITIATE TRADE INQUIRY
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: FOOTER (PREMIUM ENDING) */}
        <footer className="bg-[#050505] pt-32 pb-16 px-6 md:px-24 border-t border-white/5 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24 max-w-7xl mx-auto">
            <div className="md:col-span-5">
              <h1 className="text-4xl font-serif text-[#C5A059] tracking-[0.3em] font-bold mb-8 italic">M & I.</h1>
              <p className="text-gray-500 font-light text-lg leading-relaxed max-w-sm">Crafting Kanpur's legacy into world-class equestrian leather. Redefining global B2B sourcing standards.</p>
            </div>
            <div className="md:col-span-3">
              <h5 className="text-white font-bold mb-10 text-[10px] uppercase tracking-[0.3em]">Quick Navigation</h5>
              <ul className="space-y-5 text-gray-500 font-light text-sm uppercase tracking-widest">
                <li><a href="#hero" className="hover:text-[#C5A059] transition">The Start</a></li>
                <li><a href="#catalog" className="hover:text-[#C5A059] transition">Our Products</a></li>
                <li><a href="#heritage" className="hover:text-[#C5A059] transition">The Heritage</a></li>
                <li><a href="#b2b" className="hover:text-[#C5A059] transition">Trade Portal</a></li>
              </ul>
            </div>
            <div className="md:col-span-4">
              <h5 className="text-white font-bold mb-10 text-[10px] uppercase tracking-[0.3em]">Global Headquarters</h5>
              <p className="text-gray-500 font-light text-sm leading-loose mb-6">
                Kanpur Industrial Area, <br/>Uttar Pradesh, 208001, India
              </p>
              <p className="text-[#C5A059] font-bold text-sm tracking-widest">export@mandi-international.com</p>
            </div>
          </div>
          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-[9px] text-gray-600 tracking-[0.4em] uppercase font-bold">
            <p>© 2026 M & I INTERNATIONAL TRADE CO.</p>
            <div className="flex space-x-10 mt-8 md:mt-0">
               <a href="#" className="hover:text-white transition">Privacy</a>
               <a href="#" className="hover:text-white transition">Compliance</a>
               <a href="#" className="hover:text-white transition">Logistics</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}