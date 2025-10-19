import React from 'react';
import type { MultilingualString } from '../types';

interface SectionViewProps {
  feastTitle: string;
  sectionTitle: string;
  content: string;
  isAdmin: boolean;
  onEdit: () => void;
  getML: (textObj: MultilingualString | undefined) => string;
  fontSize: number;
  onFontSizeChange: (newSize: number) => void;
  onNavigateSection: (direction: 'prev' | 'next') => void;
  canNavigatePrev: boolean;
  canNavigateNext: boolean;
}

const SectionView: React.FC<SectionViewProps> = ({
  feastTitle,
  sectionTitle,
  content,
  isAdmin,
  onEdit,
  getML,
  fontSize,
  onFontSizeChange,
  onNavigateSection,
  canNavigatePrev,
  canNavigateNext,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[var(--bg-secondary)] p-6 rounded-lg shadow-2xl animate-fade-in">
       <div className="flex justify-end items-center mb-4 print:hidden">
         <div className="flex items-center gap-1 bg-[var(--bg-tertiary)] p-1 rounded-full shadow-inner">
           <button 
             onClick={() => onFontSizeChange(fontSize - 1)} 
             disabled={fontSize <= 12} 
             className="toolbar-btn" 
             aria-label={getML({ vi: "Giảm cỡ chữ", en: "Decrease font size" })}
             title={getML({ vi: "Giảm cỡ chữ", en: "Decrease font size" })}
           >
             <i className="fas fa-minus text-xs"></i>
           </button>
           <span className="text-sm font-semibold w-8 text-center text-[var(--text-secondary)] select-none">{fontSize}</span>
           <button 
             onClick={() => onFontSizeChange(fontSize + 1)} 
             disabled={fontSize >= 28} 
             className="toolbar-btn" 
             aria-label={getML({ vi: "Tăng cỡ chữ", en: "Increase font size" })}
             title={getML({ vi: "Tăng cỡ chữ", en: "Increase font size" })}
           >
             <i className="fas fa-plus text-xs"></i>
           </button>
           
           <div className="w-px h-5 bg-[var(--bg-primary)]/50 mx-1"></div>

           {isAdmin && (
               <button
                 onClick={onEdit}
                 className="toolbar-btn hover:text-blue-400"
                 aria-label={getML({ vi: "Sửa mục này", en: "Edit this section" })}
                 title={getML({ vi: "Sửa mục này", en: "Edit this section" })}
               >
                 <i className="fas fa-pencil-alt text-sm"></i>
               </button>
           )}
           <button
             onClick={handlePrint}
             className="toolbar-btn hover:text-[var(--text-accent)]"
             aria-label={getML({ vi: "In", en: "Print" })}
             title={getML({ vi: "In", en: "Print" })}
           >
             <i className="fas fa-print text-sm"></i>
           </button>
         </div>
       </div>
      
      <div className="mb-6 border-b border-[var(--bg-tertiary)] pb-4 text-center">
        <h2 className="text-2xl font-bold text-[var(--text-accent)]">{sectionTitle}</h2>
        <p className="text-md text-[var(--text-secondary)] mt-1">{feastTitle}</p>
      </div>
      
      <div id="print-content">
        <div
          className="prose prose-sm md:prose-base prose-invert max-w-none text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap"
          dangerouslySetInnerHTML={{
            __html: content.replace(/<strong/g, '<strong class="text-[var(--text-accent)]"'),
          }}
          style={{fontSize: `${fontSize}px`, color: 'var(--text-primary)'}}
        />
      </div>
      
      <div className="mt-8 pt-4 border-t border-[var(--bg-tertiary)] flex justify-between items-center print:hidden">
        <button
          onClick={() => onNavigateSection('prev')}
          disabled={!canNavigatePrev}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors font-semibold"
        >
          <i className="fas fa-arrow-left"></i>
          <span>{getML({ vi: 'Mục Trước', en: 'Previous' })}</span>
        </button>
        <button
          onClick={() => onNavigateSection('next')}
          disabled={!canNavigateNext}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors font-semibold"
        >
          <span>{getML({ vi: 'Mục Kế', en: 'Next' })}</span>
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
       <style>{`
        .toolbar-btn {
          width: 32px; /* h-8 w-8 */
          height: 32px; /* h-8 w-8 */
          border-radius: 9999px; /* rounded-full */
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.2s ease-in-out;
        }
        .toolbar-btn:hover:not(:disabled) {
          background-color: var(--bg-secondary);
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
          transform: translateY(-1px);
        }
        .toolbar-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
       `}</style>
    </div>
  );
};

export default SectionView;
