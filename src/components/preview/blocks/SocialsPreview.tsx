import type { SocialsData } from '../../../types';
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe, FaEnvelope } from 'react-icons/fa';

interface SocialsPreviewProps {
    data: SocialsData;
}

export function SocialsPreview({ data }: SocialsPreviewProps) {
    const hasLinks = data.github || data.linkedin || data.twitter || data.website || data.email;

    if (!hasLinks) return null;

    const linkClass = "text-slate-600 hover:text-primary-600 transition-colors text-2xl";

    return (
        <div className="flex flex-wrap justify-center gap-6 py-4">
            {data.github && (
                <a href={`https://github.com/${data.github}`} target="_blank" rel="noreferrer" className={linkClass}>
                    <FaGithub />
                </a>
            )}
            {data.linkedin && (
                <a href={data.linkedin} target="_blank" rel="noreferrer" className={linkClass}>
                    <FaLinkedin />
                </a>
            )}
            {data.twitter && (
                <a href={data.twitter} target="_blank" rel="noreferrer" className={linkClass}>
                    <FaTwitter />
                </a>
            )}
            {data.website && (
                <a href={data.website} target="_blank" rel="noreferrer" className={linkClass}>
                    <FaGlobe />
                </a>
            )}
            {data.email && (
                <a href={`mailto:${data.email}`} className={linkClass}>
                    <FaEnvelope />
                </a>
            )}
        </div>
    );
}
