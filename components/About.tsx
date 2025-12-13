import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, Trophy } from 'lucide-react';
import SkillsChart from './SkillsChart';
import { SkillData, Experience } from '../types';

const skillsData: SkillData[] = [
  { subject: 'SAP ABAP', A: 90, fullMark: 100 },
  { subject: 'SAP BTP Automation', A: 95, fullMark: 100 },
  { subject: 'Node.js', A: 75, fullMark: 100 },
  { subject: 'Python/AI', A: 80, fullMark: 100 },
  { subject: 'SQL', A: 85, fullMark: 100 },
  { subject: 'HTML/CSS', A: 90, fullMark: 100 },
];

const experienceData: Experience[] = [
  {
    id: 1,
    role: "Digital Marketing Intern",
    company: "SuccessR HR Pvt Ltd",
    period: "Jun 2021 - Aug 2021",
    description: "Market Research and Digital Marketing intern, responsible for analyzing market trends and assisting in the development of marketing strategies."
  },
  {
    id: 2,
    role: "Associate Analyst",
    company: "Deloitte Consulting India Pvt Ltd (USI)",
    period: "Oct 2022 - Present",
    description: "SAP ABAP and BTP Developer working on enterprise solutions for various clients, focusing on custom development and system enhancements.",
    active: true
  },
];

const About: React.FC = () => {
  const SkillsLoaderContainer: React.FC<{ data: typeof skillsData }> = ({ data }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      if (!ref.current) return;
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        setVisible(true);
        return;
      }
      const obs = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      obs.observe(ref.current);
      return () => obs.disconnect();
    }, []);

    return (
      <div ref={ref} className="h-full skills-loader">
        {visible ? (
          <div className="animate-on-scroll in-view h-full">
            <SkillsChart data={data} />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-sm text-gray-500">Loading chart...</div>
        )}
      </div>
    );
  };
  return (
    <section id="about" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-12">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

          {/* Left Column: Image & Bio */}
          <div className="space-y-8">
            <div className="relative group mx-auto w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-slate-700 shadow-2xl">
              <img 
                src="Resources\profile-pic.jpg" 
                alt="Rahul Maurya" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Experience (Horizontal scrollable list under Who am I) */}

            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-4">Who am I?</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                I’m Rahul Maurya, an SAP Consultant at Deloitte, Web Developer, and AI Enthusiast. I work across multiple SAP client engagements, delivering enterprise solutions with a strong focus on SAP automation.
              </p>
              <p className="text-gray-400 leading-relaxed">
                I specialize in integrating SAP Automation with SAP BTP and Python-based services, building intelligent workflows, APIs, and automation pipelines that enhance efficiency and reduce manual effort. Alongside SAP, I actively develop modern web applications and AI-driven solutions to create scalable, future-ready systems.  
              </p>
            </div>
          </div>

          {/* Right Column: Skills */}
          <div className="flex flex-col h-full">
            
            {/* Skills Chart (lazy-load on scroll into view) */}
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-lg flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-bold text-white">Technical Proficiency</h3>
              </div>

              <div className="flex-1 flex">
                <div className="flex-1 mt-10">
                    <SkillsLoaderContainer data={skillsData} />
                  </div>
              </div>
            </div>
          </div>
          </div>

          {/* Second Container: Experience (full width) */}
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-bold text-white">Experience</h3>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-2">
              {experienceData.slice().reverse().map((exp) => (
                <article
                  key={exp.id}
                  aria-current={exp.active ? 'true' : undefined}
                  className={`flex-none min-w-[18rem] w-80 p-4 rounded border bg-slate-800 shadow hover:shadow-lg transition-shadow ${exp.active ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-700'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`flex items-center justify-center w-9 h-9 rounded-full border bg-slate-800 transition-colors shrink-0 ${exp.active ? 'border-blue-500 bg-blue-600' : 'border-slate-600'}`}>
                        <Briefcase className="w-4 h-4 text-gray-100" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 justify-between">
                        <div>
                          <h4 className="font-bold text-blue-400">{exp.role}</h4>
                          <div className="text-slate-200 font-medium text-sm">{exp.company}</div>
                        </div>
                        <div className="flex flex-col items-end">
                          <time className="text-xs text-gray-500 font-medium uppercase">{exp.period}</time>
                          {exp.active && (
                            <span className="mt-2 inline-block text-xs bg-green-600 text-white px-2 py-1 rounded-full font-medium">Active</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm">{exp.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;