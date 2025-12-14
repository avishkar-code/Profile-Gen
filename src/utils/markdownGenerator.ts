import type { Block } from '../types';
import { ICON_MAP } from '../data/icons';

export function generateMarkdown(blocks: Block[]): string {
    let markdown = '';

    blocks.forEach((block) => {
        switch (block.type) {
            case 'header':
            case 'about':
                markdown += `${block.data.content}\n\n`;
                break;

            case 'tech-stack':
                const { selectedIcons, align, gap, groupByCategory, centerCategoryHeaders } = block.data;
                const badgeHeight = (block.data.iconSize || 20) + ((block.data.paddingY || 8) * 2);

                markdown += `### Tech Stack\n\n`;

                if (groupByCategory) {
                    const groups: Record<string, string[]> = {};
                    selectedIcons.forEach((key: string) => {
                        const def = ICON_MAP[key];
                        if (def) {
                            if (!groups[def.category]) groups[def.category] = [];
                            groups[def.category].push(key);
                        }
                    });

                    const categoryOrder = ['Languages', 'Frontend', 'Backend', 'Mobile', 'Database', 'DevOps'];

                    categoryOrder.forEach(cat => {
                        if (groups[cat] && groups[cat].length > 0) {
                            if (centerCategoryHeaders) {
                                markdown += `<h3 align="center">${cat}</h3>\n`;
                            } else {
                                markdown += `### ${cat}\n`;
                            }
                            markdown += `<div align="${align || 'center'}" style="display: flex; gap: ${gap}px; flex-wrap: wrap; justify-content: ${align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'}; margin-bottom: 20px;">\n`;
                            groups[cat].forEach((icon: string) => {
                                markdown += `  <img src="./assets/${icon}.png" alt="${icon}" height="${badgeHeight}" />\n`;
                            });
                            markdown += `</div>\n\n`;
                        }
                    });

                } else {
                    markdown += `<div align="${align || 'center'}" style="display: flex; gap: ${gap}px; flex-wrap: wrap; justify-content: ${align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'};">\n`;
                    selectedIcons.forEach((icon: string) => {
                        markdown += `  <img src="./assets/${icon}.png" alt="${icon}" height="${badgeHeight}" />\n`;
                    });
                    markdown += `</div>\n\n`;
                }
                break;

            case 'stats':
                const { variant, showIcons, includeAllCommits, username, showRank, showStats, showStreak, showLanguages } = block.data;
                const user = (username || 'yourusername').trim();
                markdown += `### GitHub Stats\n\n`;
                markdown += `<div align="center">\n`;
                if (showStats) markdown += `  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=${showIcons}&show_rank=${showRank}&theme=${variant}&hide_border=true&include_all_commits=${includeAllCommits}&custom_title=GitHub%20Stats" alt="GitHub Stats" />\n`;
                if (showStreak) markdown += `  <br/>\n  <img src="https://streak-stats.demolab.com/?user=${user}&theme=${variant}&hide_border=true" alt="Streak" />\n`;
                if (showLanguages) markdown += `  <br/>\n  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=compact&theme=${variant}&hide_border=true" alt="Top Langs" />\n`;
                markdown += `</div>\n\n`;
                break;

            case 'socials':
                const { github, linkedin, twitter, website, email } = block.data;
                markdown += `<p align="center">\n`;
                if (github) markdown += `  <a href="https://github.com/${github}" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank" /></a>\n`;
                if (linkedin) markdown += `  <a href="${linkedin}" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank" /></a>\n`;
                if (twitter) markdown += `  <a href="${twitter}" target="_blank"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" target="_blank" /></a>\n`;
                if (website) markdown += `  <a href="${website}" target="_blank"><img src="https://img.shields.io/badge/Website-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white" target="_blank" /></a>\n`;
                if (email) markdown += `  <a href="mailto:${email}"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank" /></a>\n`;
                markdown += `</p>\n\n`;
                break;

            default:
                markdown += `<!-- ${block.type} block -->\n\n`;
        }
    });

    return markdown;
}
