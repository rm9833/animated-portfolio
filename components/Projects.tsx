import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

const projectData: Project[] = [
  {
    id: 1,
    title: "Chatbot",
    description: "An intelligent chatbot built to provide conversational capabilities and tool integrations.",
    techStack: ["HTML/CSS", "Python"],
    imageUrl: "https://picsum.photos/id/4/600/400",
    link: ""
  },
  {
    id: 2,
    title: "Railway Tracking & Arrival Time Prediction System",
    description: "Railway Schedule Tracking and Arrival Time Prediction System using Database and Time Prediction Algorithms.",
    techStack: ["MySQL", "HTML", "Java"],
    imageUrl: "https://picsum.photos/id/180/600/400",
    link: ""
  },
  {
    id: 3,
    title: "Student Performance Prediction",
    description: "Student Response Analysis and Performance Prediction using Machine Learning techniques.",
    techStack: ["Python"],
    imageUrl: "https://picsum.photos/id/119/600/400",
    link: ""
  },
  {
    id: 4,
    title: "Personality Prediction",
    description: "Personality Prediciton System using Machine Learning based on User Response.",
    techStack: ["Python"],
    imageUrl: "https://picsum.photos/id/119/600/400",
    link: ""
  },
  {
    id: 5,
    title: "DJango Business Website",
    description: "Business Website for Small Scale Business.",
    techStack: ["Python", "Django", "HTML/CSS"],
    imageUrl: "https://picsum.photos/id/119/600/400",
    link: ""
  }
];

// Images removed from project cards per request

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here are some of the key projects where I've applied my skills in Web Development and AI.
          </p>
        </div>

        {/* Responsive layouts: horizontal scroller on small screens, grid on large */}
        {/* Vertical: show when <=999px (handled via CSS). */}
        <div className="projects-vertical scroll-3 hide-scrollbar space-y-6">
          {projectData.map((project) => (
            <div key={project.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg h-52 snap-start overflow-hidden">
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech, index) => (
                  <span key={index} className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-500/10 rounded-full border border-blue-500/20">
                    {tech}
                  </span>
                ))}
              </div>
              {project.link && project.link !== '#' && project.link.trim() !== '' && (
                <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                  <a href={project.link} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                    <Github className="w-4 h-4" /> Code
                  </a>
                  <a href={project.link} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    Live Demo <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Small -> Medium: horizontal scroller showing 2 cards per view (visible between 1000px and lg breakpoint) */}
        <div className="projects-carousel-small lg:hidden overflow-x-auto -mx-4 px-4 pb-4 hide-scrollbar" aria-label="Projects carousel">
          <div role="list" className="flex gap-6 snap-x snap-mandatory">
            {projectData.map((project) => (
              <div
                role="listitem"
                key={project.id}
                tabIndex={0}
                aria-labelledby={`project-${project.id}-title`}
                className="snap-start flex-none w-1/2 min-w-[50%] group bg-slate-800 rounded-xl overflow-hidden h-80 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className="p-6 h-full flex flex-col">
                  <h3 id={`project-${project.id}-title`} className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1 overflow-hidden">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech, index) => (
                      <span key={index} className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-500/10 rounded-full border border-blue-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.link && project.link !== '#' && project.link.trim() !== '' && (
                    <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                      <a href={project.link} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                        <Github className="w-4 h-4" /> Code
                      </a>
                      <a href={project.link} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                        Live Demo <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Large and up: horizontal scroller showing 3 cards per view */}
        <div className="projects-carousel-large hidden lg:block overflow-x-auto -mx-4 px-4 pb-4 hide-scrollbar" aria-label="Projects carousel large">
          <div role="list" className="flex gap-6 snap-x snap-mandatory">
            {projectData.map((project) => (
              <article key={project.id} tabIndex={0} aria-labelledby={`project-lg-${project.id}-title`} className="snap-start flex-none w-1/3 min-w-[33.333%] group bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col h-80 overflow-hidden">
                <h3 id={`project-lg-${project.id}-title`} className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3 overflow-hidden">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="px-3 py-1 text-xs font-medium text-blue-300 bg-blue-500/10 rounded-full border border-blue-500/20">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.link && project.link !== '#' && project.link.trim() !== '' && (
                  <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                    <a href={project.link} className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                      <Github className="w-4 h-4" /> Code
                    </a>
                    <a href={project.link} className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                      Live Demo <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;