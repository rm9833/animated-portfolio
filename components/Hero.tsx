import React, { useEffect, useState } from 'react';
import Cube from './Cube';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const RoleCycler: React.FC = () => {
    const roles = ['SAP ABAP & BTP Consultant', 'Web Developer', 'Python Developer', 'AI Enthusiast'];
    const [active, setActive] = useState(0);

    useEffect(() => {
      const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return; // do not auto-cycle when user prefers reduced motion

      const id = setInterval(() => setActive((s) => (s + 1) % roles.length), 1000);
      return () => clearInterval(id);
    }, []);

    return (
      <div className="text-xl md:text-2xl font-light h-20 md:h-auto">
        {roles.map((r, i) => (
          <p
            key={r}
            className={`transition-colors duration-300 ${i === active ? 'text-blue-400 font-bold' : 'text-gray-400 font-light'}`}>
            {r}
          </p>
        ))}
      </div>
    );
  };
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 home-compact bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between">
          
          <div className="flex-1 text-center md:text-left space-y-6 hero-content">
            <div className="inline-block px-4 py-1.5 bg-blue-500/10 rounded-full border border-blue-500/20 mb-4">
              <span className="text-blue-400 font-medium tracking-wide text-sm">WELCOME TO MY WORLD</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Hello, I am <span className="text-blue-500">Rahul Maurya</span>
            </h1>
            
            <RoleCycler />
            
            <p className="max-w-xl text-gray-500 text-lg leading-relaxed mx-auto md:mx-0">
              Bridging the gap between enterprise logic and modern business. 
              Passionate about integrating Generative AI into business workflows.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <a href="#projects" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
                View Work <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="px-8 py-3 bg-transparent border border-gray-600 hover:border-white rounded-full text-white font-semibold transition-all hover:bg-white/5 flex items-center justify-center">
                Contact Me
              </a>
            </div>
          </div>

          <div className="flex-1 flex justify-center items-center mt-12 md:mt-0">
            <Cube />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;