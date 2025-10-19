import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { GenericContent, MultilingualString, LanguageConfig } from '../types';
import SimpleRichTextEditor from './SimpleRichTextEditor';

interface EditGenericContentModalProps {
  item: Partial<GenericContent> | null;
  onClose: () => void;
  onSave: (item: GenericContent) => void;
  title: string;
  languages: LanguageConfig[];
}

const emptyMultilingualString: MultilingualString = {};

const EditGenericContentModal: React.FC<EditGenericContentModalProps> = ({ item, onClose, onSave, title, languages }) => {
  const [formData, setFormData] = useState<Partial<GenericContent>>({});
  const [activeLang, setActiveLang] = useState<string>(languages[0]?.code || 'vi');

  const DRAFT_SAVE_INTERVAL = 3000;
  const initialFormDataRef = useRef<string | null>(null);
  const draftKey = useMemo(() => `generic-content-draft-${item?.id || 'new'}`, [item?.id]);

  useEffect(() => {
    const initialData: Partial<GenericContent> = {
      id: item?.id,
      title: item?.title || { ...emptyMultilingualString },
      content: item?.content || { ...emptyMultilingualString },
    };

    const savedDraft = localStorage.getItem(draftKey);
    if (savedDraft) {
        const confirmMsg = 'Tìm thấy một bản nháp chưa lưu. Bạn có muốn khôi phục không? / Unsaved draft found. Do you want to restore it?';
        if (confirm(confirmMsg)) {
            try {
                const parsedDraft = JSON.parse(savedDraft);
                setFormData(parsedDraft);
                initialFormDataRef.current = JSON.stringify(parsedDraft);
            } catch (e) {
                console.error("Failed to parse generic content draft", e);
                setFormData(initialData);
                initialFormDataRef.current = JSON.stringify(initialData);
            }
        } else {
            localStorage.removeItem(draftKey);
            setFormData(initialData);
            initialFormDataRef.current = JSON.stringify(initialData);
        }
    } else {
        setFormData(initialData);
        initialFormDataRef.current = JSON.stringify(initialData);
    }
  }, [item, draftKey, languages]);

  useEffect(() => {
    const stringifiedFormData = JSON.stringify(formData);
    if (Object.keys(formData).length === 0 || stringifiedFormData === initialFormDataRef.current) {
        return;
    }

    const handler = setTimeout(() => {
        localStorage.setItem(draftKey, stringifiedFormData);
    }, DRAFT_SAVE_INTERVAL);

    return () => clearTimeout(handler);
  }, [formData, draftKey]);

  const hasUnsavedChanges = () => {
      if (!initialFormDataRef.current) return false;
      return JSON.stringify(formData) !== initialFormDataRef.current;
  };

  const handleClose = () => {
      if (hasUnsavedChanges()) {
          const confirmMsg = 'Bạn có các thay đổi chưa lưu. Bạn có chắc chắn muốn đóng không? / You have unsaved changes. Are you sure you want to close?';
          if (!confirm(confirmMsg)) {
              return;
          }
      }
      localStorage.removeItem(draftKey);
      onClose();
  };


  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ 
        ...prev, 
        title: {
            ...(prev['title'] as MultilingualString || emptyMultilingualString),
            [activeLang]: value
        }
    }));
  };

  const handleContentChange = (newValue: string) => {
    setFormData(prev => ({
        ...prev,
        content: {
            ...(prev.content as MultilingualString || emptyMultilingualString),
            [activeLang]: newValue
        }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formTitle = formData.title as MultilingualString;
    if (!formTitle?.['vi']) {
      alert('Vui lòng nhập Tiêu đề (Tiếng Việt).');
      return;
    }

    const finalItem: GenericContent = {
      id: formData.id || formTitle['vi'].toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') + Date.now(),
      title: formTitle,
      content: formData.content as MultilingualString || { ...emptyMultilingualString },
    };
    onSave(finalItem);
    localStorage.removeItem(draftKey);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4 print:hidden" onClick={handleClose}>
      <div className="relative bg-[var(--bg-secondary)] rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={handleClose} className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-3xl h-10 w-10 flex items-center justify-center rounded-full hover:bg-[var(--bg-tertiary)] transition-colors z-10" aria-label="Đóng">
            &times;
        </button>
        <h3 className="text-xl font-semibold text-center mb-6 text-[var(--text-primary)]">
            {item?.id ? `Sửa Mục '${title}'` : `Thêm Mục Mới cho '${title}'`}
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

        <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col">
          <div>
            <label htmlFor="title" className="text-sm font-medium text-[var(--text-secondary)]">Tiêu đề</label>
            <input id="title" name="title" type="text" value={formData.title?.[activeLang] || ''} onChange={handleTitleChange} required className="input-style" />
          </div>
          
          <div className="flex-grow flex flex-col">
            <label className="text-sm font-medium text-[var(--text-secondary)] mb-1">Nội dung</label>
            <SimpleRichTextEditor
              value={formData.content?.[activeLang] || ''}
              onChange={handleContentChange}
              language={activeLang}
              height="100%"
              placeholder={'Nội dung HTML...'}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={handleClose} className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition-colors">Hủy</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-[var(--text-accent)] text-[var(--bg-primary)] font-bold hover:opacity-90 transition-opacity">Lưu</button>
          </div>
        </form>
      </div>
      <style>{`
      .input-style { margin-top: 4px; display: block; width: 100%; background-color: var(--bg-tertiary); color: var(--text-primary); border: 1px solid #4b5563; border-radius: 0.375rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); padding: 0.5rem 0.75rem; font-size: 0.875rem; } 
      .input-style:focus { outline: none; ring: 1px; ring-color: var(--border-accent); border-color: var(--border-accent); }
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default EditGenericContentModal;