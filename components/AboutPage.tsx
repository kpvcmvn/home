import React from 'react';
import { getMultilingualText } from '../utils/multilingual';
import type { AboutContent } from '../types';

interface AboutPageProps {
  onGoBack: () => void;
  language: string;
  defaultLanguage: string;
  content: AboutContent;
}

const AboutPage: React.FC<AboutPageProps> = ({ onGoBack, language, defaultLanguage, content }) => {
    
  const getML = (textObj: any) => getMultilingualText(textObj, language, defaultLanguage);

  return (
    <div className="bg-[var(--bg-secondary)] p-6 rounded-lg shadow-2xl animate-fade-in">
        <div className="flex justify-between items-center mb-6 border-b border-[var(--bg-tertiary)] pb-4">
            <h2 className="text-2xl font-bold text-[var(--text-accent)]">
                {getML(content.title)}
            </h2>
            <button onClick={onGoBack} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-2xl h-10 w-10 flex items-center justify-center rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors">
                &times;
            </button>
        </div>

      <div className="prose prose-sm md:prose-base prose-invert max-w-none text-[var(--text-primary)] leading-relaxed space-y-4">
        <p dangerouslySetInnerHTML={{ __html: getML(content.p1) }} />
        <p>{getML(content.p2_title)}</p>
        <ul>
            <li>{getML(content.li1)}</li>
            <li>{getML(content.li2)}</li>
            <li>{getML(content.li3)}</li>
            <li>{getML(content.li4)}</li>
        </ul>
        <p>{getML(content.p3)}</p>
        <p>{getML(content.p4)}</p>
      </div>

       <div className="mt-8 pt-4 border-t border-[var(--bg-tertiary)] flex justify-center">
            <button
                onClick={onGoBack}
                className="px-6 py-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors font-semibold"
            >
                {getML(content.go_back)}
            </button>
        </div>
    </div>
  );
};

export default AboutPage;