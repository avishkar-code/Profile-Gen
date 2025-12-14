import { create } from 'zustand';
import type { Block, BlockType } from '../types';

interface ProfileState {
    blocks: Block[];
    selectedBlockId: string | null;
    addBlock: (type: BlockType) => void;
    removeBlock: (id: string) => void;
    updateBlock: (id: string, data: any) => void;
    reorderBlocks: (activeId: string, overId: string) => void;
    selectBlock: (id: string | null) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
    blocks: [],
    selectedBlockId: null,

    addBlock: (type) => set((state) => {
        const id = crypto.randomUUID();
        const initialData = getInitialData(type);
        return {
            blocks: [...state.blocks, { id, type, data: initialData }],
            selectedBlockId: id
        };
    }),

    removeBlock: (id) => set((state) => ({
        blocks: state.blocks.filter((b) => b.id !== id),
        selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId
    })),

    updateBlock: (id, data) => set((state) => ({
        blocks: state.blocks.map((b) => b.id === id ? { ...b, data: { ...b.data, ...data } } : b)
    })),

    reorderBlocks: (activeId, overId) => set((state) => {
        const oldIndex = state.blocks.findIndex((b) => b.id === activeId);
        const newIndex = state.blocks.findIndex((b) => b.id === overId);

        if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return state;

        const newBlocks = [...state.blocks];
        const [moved] = newBlocks.splice(oldIndex, 1);
        newBlocks.splice(newIndex, 0, moved);

        return { blocks: newBlocks };
    }),

    selectBlock: (id) => set({ selectedBlockId: id }),
}));

function getInitialData(type: BlockType) {
    switch (type) {
        case 'header':
            return {
                content: `<div align="center">\n  <h1>Hi, I'm [Name] 👋</h1>\n  <h3>A Passionate Developer from ...</h3>\n  <p>I'm currently working on ...</p>\n</div>`
            };
        case 'about':
            return {
                content: `### About Me\n\n- 🔭 I’m currently working on ...\n- 🌱 I’m currently learning ...\n- 👯 I’m looking to collaborate on ...\n- 💬 Ask me about ...`
            };
        case 'tech-stack':
            return {
                selectedIcons: ['react', 'typescript', 'tailwind'],
                style: 'gradient',
                solidColor: '#007396',
                useBrandColor: true,
                gradientStart: '#8b5cf6',
                gradientEnd: '#ec4899',
                gradientAngle: 135,
                borderRadius: 8,
                paddingX: 12,
                paddingY: 6,
                gap: 8,
                iconSize: 20,
                fontSize: 14,
                showLabel: true,
                align: 'center',
                groupByCategory: false,
                centerCategoryHeaders: true,
                iconOverrides: {}
            };
        case 'stats':
            return {
                username: '',
                variant: 'dracula',
                showStats: true,
                showStreak: true,
                showLanguages: true,
                showIcons: true,
                showRank: true,
                includeAllCommits: false
            };
        case 'socials':
            return { github: '', linkedin: '', twitter: '', website: '', email: '' };
        default:
            return {};
    }
}
