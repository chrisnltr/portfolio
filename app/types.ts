// Global type definitions for the portfolio app

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link?: string;
}

export interface Skill {
  name: string;
  percentage: number;
  category: 'frontend' | 'backend' | 'design' | 'other';
}

export interface ContactInfo {
  email: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}
