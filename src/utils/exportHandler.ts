import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { toPng } from 'html-to-image';
import type { Block } from '../types';
import { generateMarkdown } from './markdownGenerator';

export const exportProfile = async (blocks: Block[]) => {
    const zip = new JSZip();
    const assets = zip.folder('assets');
    let generatedCount = 0;
    let expectedCount = 0;

    // 1. Generate Markdown
    const markdown = generateMarkdown(blocks);
    zip.file('README.md', markdown);

    // 2. Generate Images for Tech Stack
    const techStacks = blocks.filter(b => b.type === 'tech-stack');

    for (const block of techStacks) {
        const { selectedIcons } = block.data;
        expectedCount += selectedIcons.length;

        for (const iconKey of selectedIcons) {
            const elementId = `badge-${block.id}-${iconKey}`;
            const node = document.getElementById(elementId);

            if (node) {
                try {
                    // Force a small reflow/repaint check?
                    // Using a strict filter can sometimes help with SVG artifacts
                    const dataUrl = await toPng(node, {
                        pixelRatio: 2,
                        cacheBust: true,
                        skipAutoScale: true,
                        skipFonts: true
                    } as any);

                    if (dataUrl === 'data:,') {
                        throw new Error("Empty data URL generated");
                    }

                    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
                    assets?.file(`${iconKey}.png`, base64Data, { base64: true });
                    generatedCount++;
                } catch (err) {
                    console.error(`Failed to generate image for ${iconKey} (ID: ${elementId})`, err);
                    alert(`Error generating badge for ${iconKey}. Details: ${err}`);
                }
            } else {
                console.warn(`Node not found: ${elementId}`);
                // Attempt to verify if the block actually exists in the DOM by querying the parent
                const parent = document.getElementById('root');
                if (parent) {
                    console.log("Root exists, but specific badge not found. Is it rendered?");
                }
            }
        }
    }

    if (expectedCount > 0 && generatedCount === 0) {
        alert("Warning: No badge images were generated. Please ensure the Tech Stack badges are visible on screen before downloading.");
    } else if (expectedCount > 0 && generatedCount < expectedCount) {
        alert(`Warning: Only ${generatedCount}/${expectedCount} badges were generated.`);
    }

    // 3. Generate Zip Blob and Save
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'profile-readme.zip');
};
