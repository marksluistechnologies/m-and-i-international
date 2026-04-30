"use client";
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Stars, PresentationControls } from '@react-three/drei';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// --- 3D Background Component (Enhanced Visibility) ---
function AnimatedLeatherSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  // Custom texture effect using standard material for more detail
  useFrame((state) => {
    if (sphereRef.current) {
      // Slower, more impactful rotation
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.08;
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
    }
  });

  return (
    <PresentationControls global zoom={0.9} rotation={[0, -Math.PI / 6, 0]} polar={[0, Math.PI / 4]} azimuth={[-Math.PI / 4, Math.PI / 4]}>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
        {/* Main, detailed polished leather sphere */}
        <mesh ref={sphereRef} scale={2.8} position={[4, 0, -2]}>
          <sphereGeometry args={[1, 100, 100]} />
          <meshStandardMaterial 
            color="#6F4E37" 
            roughness={0.7} 
            metalness={0.3} 
            envMapIntensity={1.5}
          />
        </mesh>
        
        <mesh scale={1.8} position={[-5, 3, -5]}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial 
            color="#D4AF37" 
            roughness={0.4} 
            metalness={0.9} 
            transparent={true} 
            opacity={0.3} 
          />
        </mesh>
      </Float>
    </PresentationControls>
  );
}

// --- Main Page Component (Light Theme & Mobile Fixed) ---
export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation Variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 70 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
  };

  const navVariants: Variants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, delay: 0.2 } }
  };

  if (!mounted) return <div className="bg-[#FAF8F1] min-h-screen"></div>;

  return (
    <div className="relative min-h-screen bg-[#FAF8F1] text-[#1F1F1F] font-sans overflow-x-hidden selection:bg-[#8B5A2B] selection:text-white">
      
      {/* 1. FIXED 3D BACKGROUND LAYER (Optimized Visibility) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 7] }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={2.5} />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <AnimatedLeatherSphere />
          <Environment preset="city" />
        </Canvas>
        {/* Reduced overlay opacity for better visibility on light background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F1]/30 via-[#FAF8F1]/60 to-[#FAF8F1] z-10" />
      </div>

      {/* 2. FOREGROUND UI LAYER */}
      <div className="relative z-20">
        
        {/* STICKY GLASS NAVBAR (Light Theme) */}
        <motion.nav 
          initial="hidden"
          animate="visible"
          variants={navVariants}
          className="fixed w-full flex justify-between items-center px-6 md:px-12 py-5 bg-[#FAF8F1]/90 backdrop-blur-2xl border-b border-[#1F1F1F]/5 z-50"
        >
          <h1 className="text-2xl md:text-3xl font-serif text-[#1F1F1F] tracking-[0.2em] font-bold">M & I INT.</h1>
          <div className="hidden lg:flex space-x-12 text-[10px] tracking-[0.3em] text-[#1F1F1F]/80 uppercase font-medium">
            <a href="#hero" className="hover:text-[#8B5A2B] transition">Home</a>
            <a href="#heritage" className="hover:text-[#8B5A2B] transition">Heritage</a>
            <a href="#catalog" className="hover:text-[#8B5A2B] transition">Catalog</a>
            <a href="#b2b" className="hover:text-[#8B5A2B] transition">B2B Portal</a>
          </div>
          <button className="bg-[#8B5A2B] text-white px-6 py-2 rounded-full text-[10px] font-bold tracking-widest hover:scale-105 transition-all">
            GET A QUOTE
          </button>
        </motion.nav>

        {/* SECTION 1: HERO (Mobile Fixed & Light Theme) */}
        <section id="hero" className="min-h-screen flex flex-col justify-center px-6 md:px-24">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl pt-24 pb-12 lg:pb-0 z-10">
            <div className="flex items-center space-x-4 mb-8">
              <div className="h-[1px] w-16 bg-[#8B5A2B]"></div>
              <p className="text-[#8B5A2B] tracking-[0.4em] uppercase text-[10px] md:text-xs font-bold whitespace-nowrap overflow-ellipsis">
                 Kanpur • India's Leather Capital
              </p>
            </div>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-serif leading-[1] mb-10 tracking-tight text-[#1F1F1F]">
              Equestrian <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5A2B] via-[#D4AF37] to-[#C5A059] italic">
                Mastery.
              </span>
            </h2>
            <p className="text-[#1F1F1F]/80 mb-12 text-lg md:text-2xl font-light tracking-wide max-w-2xl leading-relaxed">
              M & I International is a global leader in B2B manufacturing, delivering precision-engineered equestrian leather products to the world's most prestigious brands.
            </p>
            <div className="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-8">
              <motion.button whileHover={{ scale: 1.05 }} className="bg-[#8B5A2B] text-white px-12 py-5 rounded-full text-xs font-bold tracking-[0.2em] shadow-xl shadow-[#8B5A2B]/15">
                BROWSE COLLECTIONS
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} className="border border-[#1F1F1F]/15 text-[#1F1F1F] px-12 py-5 rounded-full text-xs font-bold tracking-[0.2em] hover:border-[#8B5A2B] transition-all">
                LEARN OUR PROCESS
              </motion.button>
            </div>
          </motion.div>
          {/* Main Hero Product Image (Top Right) */}
          <div className="hidden lg:block absolute top-[20%] right-[10%] w-[45%] h-[60%] rounded-[3rem] bg-[#FAF8F1] border border-[#1F1F1F]/5 shadow-2xl z-0 overflow-hidden">
             <div className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('/hero-saddle.jpg')" }}></div>
             <p className="absolute bottom-8 left-8 text-[#FAF8F1] tracking-widest text-[10px] uppercase group-hover:opacity-100 transition-opacity">Premium Dressage Saddle</p>
          </div>
        </section>

        {/* ANIMATED TICKER BAR (Fixed Colors) */}
        <div className="bg-[#8B5A2B] py-5 overflow-hidden flex whitespace-nowrap text-white font-black uppercase tracking-[0.2em] text-[10px] z-30 relative shadow-2xl">
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
            {/* Repeat */}
            <span>Premium B2B Manufacturing</span> <span>•</span> 
            <span>Global Export Legacy</span> <span>•</span> 
          </motion.div>
        </div>

        {/* SECTION 2: HERITAGE (Factory Image/Video Card) */}
        <section id="heritage" className="py-40 px-6 md:px-24 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
              <h3 className="text-4xl md:text-6xl font-serif text-[#1F1F1F] mb-8 leading-tight">Crafting Excellence <br/>Since Generations</h3>
              <p className="text-[#1F1F1F]/80 font-light leading-relaxed mb-8 text-xl">
                Situated in Kanpur, the world's most renowned leather hub, M & I International blends ancestral techniques with futuristic precision. 
              </p>
              <div className="grid grid-cols-2 gap-8 mt-12 border-t border-[#1F1F1F]/5 pt-12">
                <div>
                  <h4 className="text-[#8B5A2B] text-3xl font-serif mb-2 font-bold">100%</h4>
                  <p className="text-gray-600 text-xs uppercase tracking-widest">Ethical Sourcing</p>
                </div>
                <div>
                  <h4 className="text-[#8B5A2B] text-3xl font-serif mb-2 font-bold">Global</h4>
                  <p className="text-gray-600 text-xs uppercase tracking-widest">Supply Chain</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              className="h-[500px] w-full rounded-[3rem] bg-[#FAF8F1] border border-[#1F1F1F]/5 shadow-2xl relative overflow-hidden flex items-center justify-center group"
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/factory-stitch.jpg')" }}></div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700"></div>
              <div className="z-10 text-center">
                 <div className="w-20 h-20 rounded-full border border-[#FAF8F1] flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-[#FAF8F1] border-b-[8px] border-b-transparent ml-1"></div>
                 </div>
                 <p className="text-[#FAF8F1] tracking-[0.3em] text-[10px] font-bold uppercase">Experience Our Factory</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: CATALOG (Fixed Mobile Grid & Light Theme) */}
        <section id="catalog" className="py-40 px-6 md:px-24 relative z-20 bg-[#FAF8F1]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-32">
            <h3 className="text-5xl md:text-7xl font-serif text-[#1F1F1F] mb-8 tracking-tight">Our Product Lines</h3>
            <div className="h-[2px] w-32 bg-[#8B5A2B] mx-auto mb-8"></div>
            <p className="text-[#1F1F1F]/80 max-w-2xl mx-auto font-light text-lg">Engineered for endurance and aesthetic perfection.</p>
          </motion.div>

          {/* Changed mobile grid from too narrow to col-1 with better padding */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              { title: "Saddles", tags: ["Dressage", "Jumping", "Polo"], desc: "Ergonomically designed for peak performance and rider safety.", img: "/catalog-saddle.jpg" },
              { title: "Apparel", tags: ["Boots", "Jackets", "Chaps"], desc: "High-grade leather garments tailored for durability and style.", img: "/catalog-apparel.jpg" },
              { title: "Gear", tags: ["Bags", "Belts", "Halters"], desc: "Luxury leather accessories compliant with global trade standards.", img: "/catalog-gear.jpg" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial="hidden" whileInView="visible" viewport={{ once: true }} 
                variants={{ hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0, transition: { delay: index * 0.2, duration: 1 } } }}
                whileHover={{ y: -15 }}
                className="p-10 md:p-12 lg:p-16 rounded-[3rem] bg-white border border-[#1F1F1F]/5 flex flex-col items-start text-left group transition-all duration-500 hover:border-[#8B5A2B]/20 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-700 opacity-0 group-hover:opacity-100" style={{ backgroundImage: `url(${item.img})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0 opacity-0 group-hover:opacity-100" />

                <span className="text-[#8B5A2B] group-hover:text-[#FAF8F1] text-[10px] font-bold tracking-[0.4em] mb-4 uppercase z-10 transition-colors">Category 0{index + 1}</span>
                <h4 className="text-4xl font-serif text-[#1F1F1F] group-hover:text-[#FAF8F1] mb-6 transition-colors z-10">{item.title}</h4>
                <div className="flex flex-wrap gap-2 mb-8 z-10">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[9px] border border-[#1F1F1F]/15 group-hover:border-[#FAF8F1]/40 px-3 py-1 rounded-full text-gray-700 group-hover:text-[#FAF8F1] uppercase tracking-widest transition-colors">{tag}</span>
                  ))}
                </div>
                <p className="text-[#1F1F1F]/80 group-hover:text-[#FAF8F1]/90 font-light leading-relaxed mb-10 text-base z-10 transition-colors">{item.desc}</p>
                <button className="text-[#1F1F1F] group-hover:text-[#FAF8F1] text-[10px] font-bold tracking-widest uppercase border-b border-[#8B5A2B] group-hover:border-[#FAF8F1] pb-2 hover:border-[#8B5A2B] transition-all z-10">
                  Get Wholesale Specs
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 4: B2B PORTAL (Form Mobile Fixed & Light Theme) */}
        <section id="b2b" className="py-40 px-6 md:px-24 relative z-20">
          <div className="max-w-6xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-12 md:p-24 rounded-[4rem] bg-white border border-[#1F1F1F]/5backdrop-blur-3xl relative overflow-hidden shadow-2xl">
              <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#D4AF37] rounded-full blur-[200px] opacity-10 pointer-events-none"></div>
              
              {/* Added flex-col for mobile and made form full width */}
              <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">
                <div className="lg:w-1/2">
                  <h3 className="text-4xl md:text-6xl font-serif text-[#1F1F1F] mb-10 leading-tight">Global Trade <br/>Partnership</h3>
                  <p className="text-[#1F1F1F]/80 mb-12 text-xl font-light leading-relaxed">Connect with our export team to discuss bulk sourcing, OEM solutions, and factory visits.</p>
                  
                  <div className="space-y-10 border-t border-[#1F1F1F]/5 pt-12">
                    <div className="flex items-start space-x-6">
                       <div className="w-12 h-12 rounded-full border border-[#8B5A2B] flex-shrink-0 flex items-center justify-center text-[#8B5A2B] text-sm font-bold italic">M</div>
                       <div>
                          <h5 className="text-[#1F1F1F] font-bold text-sm tracking-widest uppercase mb-2">Direct Factory Pricing</h5>
                          <p className="text-gray-600 text-sm leading-relaxed">No middlemen. Full procurement direct from Kanpur's largest exporters.</p>
                       </div>
                    </div>
                    <div className="flex items-start space-x-6">
                       <div className="w-12 h-12 rounded-full border border-[#8B5A2B] flex-shrink-0 flex items-center justify-center text-[#8B5A2B] text-sm font-bold italic">I</div>
                       <div>
                          <h5 className="text-[#1F1F1F] font-bold text-sm tracking-widest uppercase mb-2">Bespoke White-Labeling</h5>
                          <p className="text-gray-600 text-sm leading-relaxed">Full OEM support with customized embossing and branding.</p>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Made form full width on mobile */}
                <form className="w-full lg:w-1/2 space-y-8 bg-white/30 p-8 md:p-12 rounded-[2rem] border border-[#1F1F1F]/5backdrop-blur-md">
                  <div className="space-y-6">
                    <input type="text" placeholder="Your Full Name" className="w-full bg-[#FAF8F1] border border-[#1F1F1F]/10 p-5 rounded-2xl text-[#1F1F1F] focus:border-[#8B5A2B] outline-none transition text-sm" />
                    <input type="text" placeholder="Company Name" className="w-full bg-[#FAF8F1] border border-[#1F1F1F]/10 p-5 rounded-2xl text-[#1F1F1F] focus:border-[#8B5A2B] outline-none transition text-sm" />
                    <input type="email" placeholder="Business Email" className="w-full bg-[#FAF8F1] border border-[#1F1F1F]/10 p-5 rounded-2xl text-[#1F1F1F] focus:border-[#8B5A2B] outline-none transition text-sm" />
                    <textarea placeholder="Specify product requirements, MOQ, and white-label interest..." rows={4} className="w-full bg-[#FAF8F1] border border-[#1F1F1F]/10 p-5 rounded-2xl text-[#1F1F1F] focus:border-[#8B5A2B] outline-none transition text-sm resize-none"></textarea>
                  </div>
                  <button type="button" className="w-full bg-[#8B5A2B] text-white font-black tracking-[0.3em] py-6 rounded-2xl hover:scale-[1.02] transition-all duration-500 text-xs shadow-xl shadow-[#8B5A2B]/15">
                    INITIATE TRADE INQUIRY
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: FOOTER (Developer Credit & Light Theme) */}
        <footer className="bg-[#1F1F1F] pt-32 pb-16 px-6 md:px-24 border-t border-[#1F1F1F]/5relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24 max-w-7xl mx-auto">
            <div className="md:col-span-5">
              <h1 className="text-4xl font-serif text-[#D4AF37] tracking-[0.3em] font-bold mb-8 italic">M & I.</h1>
              <p className="text-gray-400 font-light text-lg leading-relaxed max-w-sm">Crafting Kanpur's legacy into world-class equestrian leather. Redefining global B2B sourcing standards.</p>
            </div>
            <div className="md:col-span-3">
              <h5 className="text-[#FAF8F1] font-bold mb-10 text-[10px] uppercase tracking-[0.3em]">Quick Navigation</h5>
              <ul className="space-y-5 text-gray-500 font-light text-sm uppercase tracking-widest">
                <li><a href="#hero" className="hover:text-[#D4AF37] transition">The Start</a></li>
                <li><a href="#catalog" className="hover:text-[#D4AF37] transition">Our Products</a></li>
                <li><a href="#heritage" className="hover:text-[#D4AF37] transition">The Heritage</a></li>
                <li><a href="#b2b" className="hover:text-[#D4AF37] transition">Trade Portal</a></li>
              </ul>
            </div>
            <div className="md:col-span-4">
              <h5 className="text-[#FAF8F1] font-bold mb-10 text-[10px] uppercase tracking-[0.3em]">Global Headquarters</h5>
              <p className="text-gray-500 font-light text-sm leading-loose mb-6">
                Kanpur Industrial Area, <br/>Uttar Pradesh, 208001, India
              </p>
              <p className="text-[#D4AF37] font-bold text-sm tracking-widest">export@mandi-international.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-12 flex flex-col md:flex-row justify-between items-center text-[9px] text-gray-600 tracking-[0.4em] uppercase font-bold">
            <p>© 2026 M & I INTERNATIONAL TRADE CO.</p>
            
            {/* Malik Innovations Developer Credit */}
            <div className="flex space-x-10 mt-8 md:mt-0 items-center">
               <a href="#" className="hover:text-[#FAF8F1] transition">Privacy</a>
               <a href="#" className="hover:text-[#FAF8F1] transition">compliance</a>
               <div className="h-4 w-[1px] bg-gray-800"></div>
               <div className="flex space-x-2 text-gray-600">
                   <span>Made with ❤️ by</span>
                   <a href="https://malik-innovations.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[#8B5A2B] hover:text-[#D4AF37] transition-all font-black">Malik Innovations</a>
               </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}