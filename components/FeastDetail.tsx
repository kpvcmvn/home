import React from 'react';
import type { Feast, SectionKey, MultilingualString, SectionConfig } from '../types';
import { getMultilingualText } from '../utils/multilingual';

interface FeastDetailProps {
  feast: Feast;
  onSelectSection: (section: SectionKey) => void;
  isAdmin: boolean;
  onEditFeast: () => void;
  onDeleteFeast: () => void;
  getML: (textObj: MultilingualString | undefined) => string;
  getSectionTitle: (sectionKey: SectionKey) => MultilingualString;
  sectionsConfig: SectionConfig[];
}

const FeastDetail: React.FC<FeastDetailProps> = ({ feast, onSelectSection, isAdmin, onEditFeast, onDeleteFeast, getML, getSectionTitle, sectionsConfig }) => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center border-b border-[var(--bg-tertiary)] pb-4">
        <h2 className="text-3xl font-bold text-[var(--text-accent)]">{getML(feast.title)}</h2>
        {feast.subtitle && getML(feast.subtitle) && <p className="text-[var(--text-secondary)] mt-1">{getML(feast.subtitle)}</p>}
        {/* The type is stored as Vietnamese, so we need a lookup similar to the list */}
        {/* This part is simplified, assuming the type display is less critical here or handled by parent */}
         {isAdmin && (
          <div className="mt-4 flex justify-center space-x-4">
            <button 
              onClick={onEditFeast}
              className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-colors duration-300 font-semibold flex items-center"
            >
              <i className="fas fa-edit mr-2"></i>{getML({ vi: 'Sửa', en: 'Edit' })}
            </button>
            <button 
              onClick={onDeleteFeast}
              className="bg-red-500/20 text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors duration-300 font-semibold flex items-center"
            >
              <i className="fas fa-trash-alt mr-2"></i>{getML({ vi: 'Xóa', en: 'Delete' })}
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sectionsConfig.map(({ key, icon }) => {
          const sectionTitle = getML(getSectionTitle(key));
          const hasContent = feast.sections[key] && getML(feast.sections[key]).trim() !== '';

          return (
            <button
              key={key}
              onClick={() => onSelectSection(key)}
              disabled={!hasContent}
              className="bg-[var(--bg-secondary)] p-6 rounded-lg shadow-lg hover:bg-[var(--bg-tertiary)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center text-center space-y-2"
            >
              <i className={`fas ${icon} text-3xl text-[var(--text-accent)]`}></i>
              <span className="text-lg font-semibold text-[var(--text-primary)]">{sectionTitle}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Add a simple fade-in animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);


export default FeastDetail;
