import React, { useState } from 'react';
import type { MultilingualString, LanguageConfig } from '../types';
import SimpleRichTextEditor from './SimpleRichTextEditor';


interface EditSectionModalProps {
  title: MultilingualString;
  content: MultilingualString;
  onClose: () => void;
  onSave: (newContent: MultilingualString) => void;
  languages: LanguageConfig[];
}

const EditSectionModal: React.FC<EditSectionModalProps> = ({ title, content, onClose, onSave, languages }) => {
  const [newContent, setNewContent] = useState<MultilingualString>(content);
  const [activeLang, setActiveLang] = useState<string>(languages[0]?.code || 'vi');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(newContent);
  };
  
  const handleContentChange = (value: string) => {
      setNewContent(prev => ({
          ...prev,
          [activeLang]: value,
      }))
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 print:hidden" onClick={onClose}>
      <div className="relative bg-[var(--bg-secondary)] rounded-xl shadow-2xl p-6 w-full max-w-4xl h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-3xl h-10 w-10 flex items-center justify-center rounded-full hover:bg-[var(--bg-tertiary)] transition-colors z-10" aria-label="Đóng">
            &times;
        </button>
        <h3 className="text-xl font-semibold text-center mb-2 text-[var(--text-primary)]">
            Sửa Mục: {title[activeLang] || title['vi']}
        </h3>

        <div className="mb-4 border-b border-[var(--bg-tertiary)]">
            <div className="flex items-center overflow-x-auto scrollbar-hide space-x-2" role="tablist">
                {languages.map(lang => (
                    <button 
                        key={lang.code}
                        type="button" 
                        role="tab"
                        aria-selected={activeLang === lang.code}
                        onClick={() => setActiveLang(lang.code)} 
                        className={`whitespace-nowrap px-4 py-3 border-b-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-[var(--border-accent)] ${
                            activeLang === lang.code 
                            ? 'border-[var(--border-accent)] text-[var(--text-accent)]' 
                            : 'border-transparent text-[var(--text-secondary)] hover:border-gray-500 hover:text-[var(--text-primary)]'
                        }`}
                    >
                        {lang.name}
                    </button>
                ))}
            </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-grow flex flex-col space-y-4">
          <div className="flex-grow flex flex-col">
              <SimpleRichTextEditor
                value={newContent[activeLang] || ''}
                onChange={handleContentChange}
                language={activeLang}
                height="100%"
                placeholder={'Nội dung HTML...'}
              />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition-colors">Hủy</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-[var(--text-accent)] text-[var(--bg-primary)] font-bold hover:opacity-90 transition-opacity">Lưu</button>
          </div>
        </form>
      </div>
      <style>{`
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default EditSectionModal;