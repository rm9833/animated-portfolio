export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  link: string;
}

export interface SkillData {
  subject: string;
  A: number; // Proficiency level (0-100)
  fullMark: number;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  active?: boolean;
}

export enum ContactStatus {
  IDLE = 'IDLE',
  SENDING = 'SENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
