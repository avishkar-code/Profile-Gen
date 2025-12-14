import {
    SiReact, SiTypescript, SiJavascript, SiNodedotjs, SiPython, SiRust, SiGo, SiCplusplus,
    SiHtml5, SiCss3, SiTailwindcss, SiNextdotjs, SiVite, SiPostgresql, SiMongodb,
    SiDocker, SiKubernetes, SiAmazon, SiGit, SiGithub, SiAndroid, SiApple,
    SiFlutter, SiFirebase, SiSupabase
} from 'react-icons/si';

import type { IconType } from 'react-icons';

export interface IconDef {
    component: IconType;
    label: string;
    brandColor: string;
    category: 'Languages' | 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Mobile';
}

export const ICON_MAP: Record<string, IconDef> = {
    react: { component: SiReact, label: 'React', brandColor: '#61DAFB', category: 'Frontend' },
    typescript: { component: SiTypescript, label: 'TypeScript', brandColor: '#3178C6', category: 'Languages' },
    javascript: { component: SiJavascript, label: 'JavaScript', brandColor: '#F7DF1E', category: 'Languages' },
    node: { component: SiNodedotjs, label: 'Node.js', brandColor: '#339933', category: 'Backend' },
    python: { component: SiPython, label: 'Python', brandColor: '#3776AB', category: 'Languages' },
    rust: { component: SiRust, label: 'Rust', brandColor: '#000000', category: 'Languages' },
    go: { component: SiGo, label: 'Go', brandColor: '#00ADD8', category: 'Languages' },
    cpp: { component: SiCplusplus, label: 'C++', brandColor: '#00599C', category: 'Languages' },
    html: { component: SiHtml5, label: 'HTML5', brandColor: '#E34F26', category: 'Frontend' },
    css: { component: SiCss3, label: 'CSS3', brandColor: '#1572B6', category: 'Frontend' },
    tailwind: { component: SiTailwindcss, label: 'Tailwind', brandColor: '#06B6D4', category: 'Frontend' },
    next: { component: SiNextdotjs, label: 'Next.js', brandColor: '#000000', category: 'Frontend' },
    vite: { component: SiVite, label: 'Vite', brandColor: '#646CFF', category: 'Frontend' },
    postgres: { component: SiPostgresql, label: 'PostgreSQL', brandColor: '#4169E1', category: 'Database' },
    mongo: { component: SiMongodb, label: 'MongoDB', brandColor: '#47A248', category: 'Database' },
    docker: { component: SiDocker, label: 'Docker', brandColor: '#2496ED', category: 'DevOps' },
    k8s: { component: SiKubernetes, label: 'Kubernetes', brandColor: '#326CE5', category: 'DevOps' },
    aws: { component: SiAmazon, label: 'AWS', brandColor: '#232F3E', category: 'DevOps' },
    git: { component: SiGit, label: 'Git', brandColor: '#F05032', category: 'DevOps' },
    github: { component: SiGithub, label: 'GitHub', brandColor: '#181717', category: 'DevOps' },
    android: { component: SiAndroid, label: 'Android', brandColor: '#3DDC84', category: 'Mobile' },
    ios: { component: SiApple, label: 'iOS', brandColor: '#000000', category: 'Mobile' },
    flutter: { component: SiFlutter, label: 'Flutter', brandColor: '#02569B', category: 'Mobile' },
    firebase: { component: SiFirebase, label: 'Firebase', brandColor: '#FFCA28', category: 'Backend' },
    supabase: { component: SiSupabase, label: 'Supabase', brandColor: '#3ECF8E', category: 'Database' },
};

export const ICON_KEYS = Object.keys(ICON_MAP);
