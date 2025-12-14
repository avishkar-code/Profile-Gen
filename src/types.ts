export type BlockType = 'header' | 'about' | 'tech-stack' | 'stats' | 'socials';

export interface HeaderData {
    content: string;
}

export interface AboutData {
    content: string;
}

export interface TechStackData {
    selectedIcons: string[];
    style: 'solid' | 'gradient';
    solidColor: string;
    useBrandColor: boolean;
    gradientStart: string;
    gradientEnd: string;
    gradientAngle: number;
    gradientMiddle?: string;
    gradientMiddlePos?: number;
    borderRadius: number;
    paddingX: number;
    paddingY: number;
    gap: number;
    iconSize: number;
    fontSize: number;
    showLabel: boolean;
    align?: 'left' | 'center' | 'right';
    groupByCategory: boolean;
    centerCategoryHeaders: boolean;
    iconOverrides?: Record<string, any>; // Per-icon overrides for style/colors
}

export interface StatsData {
    username: string;
    variant: string;

    // Toggles for main cards
    showStats: boolean;
    showStreak: boolean;
    showLanguages: boolean;

    // Granular options for General Stats
    showIcons: boolean;
    showRank: boolean;
    includeAllCommits: boolean;
}

export interface SocialsData {
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
    email: string;
}

export interface Block {
    id: string;
    type: BlockType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}
