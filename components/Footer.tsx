import React from 'react';
import { Linkedin, Twitter, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Rahul Maurya. All rights reserved.
        </div>
        
        <div className="flex space-x-6">
          <a href="https://github.com/rm9833" className="text-gray-500 hover:text-white transition-colors">
            <span className="sr-only">GitHub</span>
            <Github className="h-5 w-5" />
          </a>
          <a href="https://www.linkedin.com/in/rahul-maurya-9864891b0" className="text-gray-500 hover:text-white transition-colors">
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-5 w-5" />
          </a>
          {/* <a href="" className="text-gray-500 hover:text-white transition-colors">
            <span className="sr-only">Twitter</span>
            <Twitter className="h-5 w-5" />
          </a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;