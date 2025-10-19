import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { Feast, SectionKey, FeastType, MultilingualString, LanguageConfig, SectionConfig } from '../types';
import SimpleRichTextEditor from './SimpleRichTextEditor';

interface EditFeastModalProps {
  feast: Partial<Feast> | null;
  onClose: () => void;
  onSave: (feast: Feast) => void;
  feastTypes: FeastType[];
  languages: LanguageConfig[];
  sectionsConfig: SectionConfig[];
}

const sectionKeys: SectionKey[] = [
  'biography', 'massReadings', 'officeOfReadings', 'lauds', 'middayPrayer', 'vespers', 'compline'
];

const emptyMultilingualString: MultilingualString = {};

const EditFeastModal: React.FC<EditFeastModalProps> = ({ feast, onClose, onSave, feastTypes, languages, sectionsConfig }) => {
  const [formData, setFormData] = useState<Partial<Feast>>({});
  const [activeLang, setActiveLang] = useState<string>(languages[0]?.code || 'vi');
  
  const DRAFT_SAVE_INTERVAL = 3000;
  const initialFormDataRef = useRef<string | null>(null);
  const draftKey = useMemo(() => `feast-draft-${feast?.id || 'new'}`, [feast?.id]);

  useEffect(() => {
    const defaultFeastTypeName = feastTypes.length > 0 ? feastTypes[0].name.vi : 'Lễ nhớ'; // Keep vi name as key
    const initialData: Partial<Feast> = {
        id: feast?.id,
        date: feast?.date || '',
        title: feast?.title || { ...emptyMultilingualString },
        subtitle: feast?.subtitle || { ...emptyMultilingualString },
        type: feast?.type || defaultFeastTypeName,
        sections: feast?.sections || {
            biography: { ...emptyMultilingualString },
            massReadings: { ...emptyMultilingualString },
            officeOfReadings: { ...emptyMultilingualString },
            lauds: { ...emptyMultilingualString },
            middayPrayer: { ...emptyMultilingualString },
            vespers: { ...emptyMultilingualString },
            compline: { ...emptyMultilingualString },
        },
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
                console.error("Failed to parse draft", e);
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
  }, [feast, feastTypes, draftKey, languages]);
  
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

  const handleMultilingualChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'title' | 'subtitle') => {
    const { value } = e.target;
    setFormData(prev => ({ 
        ...prev, 
        [field]: {
            ...prev[field],
            [activeLang]: value
        }
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSectionContentChange = (sectionKey: SectionKey, value: string) => {
    setFormData(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [sectionKey]: {
            ...(prev.sections?.[sectionKey] || emptyMultilingualString),
            [activeLang]: value,
        }
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.['vi'] || !formData.date) {
      alert('Vui lòng nhập Tiêu đề (Tiếng Việt) và Ngày.');
      return;
    }

    const finalFeast: Feast = {
      id: formData.id || formData.title['vi'].toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
      date: formData.date!,
      title: formData.title,
      subtitle: formData.subtitle || { ...emptyMultilingualString },
      type: formData.type || (feastTypes.length > 0 ? feastTypes[0].name.vi : 'Lễ nhớ'),
      // FIX: The empty object `{}` is not assignable to type 'Record<SectionKey, MultilingualString>'. 
      // Provided a valid default object to ensure type correctness if formData.sections is falsy.
      sections: (formData.sections as Record<SectionKey, MultilingualString>) || {
        biography: { ...emptyMultilingualString },
        massReadings: { ...emptyMultilingualString },
        officeOfReadings: { ...emptyMultilingualString },
        lauds: { ...emptyMultilingualString },
        middayPrayer: { ...emptyMultilingualString },
        vespers: { ...emptyMultilingualString },
        compline: { ...emptyMultilingualString },
      },
    };
    onSave(finalFeast);
    localStorage.removeItem(draftKey);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 print:hidden" onClick={handleClose}>
      <div className="relative bg-[var(--bg-secondary)] rounded-xl shadow-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={handleClose} className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-3xl h-10 w-10 flex items-center justify-center rounded-full hover:bg-[var(--bg-tertiary)] transition-colors z-10" aria-label="Đóng">
            &times;
        </button>
        <h3 className="text-xl font-semibold text-center mb-6 text-[var(--text-primary)]">{feast?.id ? 'Sửa Lễ' : 'Thêm Lễ Mới'}</h3>
        
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="text-sm font-medium text-[var(--text-secondary)]">Tiêu đề</label>
              <input id="title" name="title" type="text" value={formData.title?.[activeLang] || ''} onChange={(e) => handleMultilingualChange(e, 'title')} required className="input-style" />
            </div>
            <div>
              <label htmlFor="subtitle" className="text-sm font-medium text-[var(--text-secondary)]">Phụ đề</label>
              <input id="subtitle" name="subtitle" type="text" value={formData.subtitle?.[activeLang] || ''} onChange={(e) => handleMultilingualChange(e, 'subtitle')} className="input-style" />
            </div>
            <div>
              <label htmlFor="date" className="text-sm font-medium text-[var(--text-secondary)]">Ngày (MM-DD)</label>
              <input id="date" name="date" type="text" pattern="\\d{2}-\\d{2}" placeholder="01-04" value={formData.date || ''} onChange={handleChange} required className="input-style" />
            </div>
            <div>
              <label htmlFor="type" className="text-sm font-medium text-[var(--text-secondary)]">Loại Lễ</label>
              <select id="type" name="type" value={formData.type || ''} onChange={handleChange} className="input-style">
                {feastTypes.map(ft => (
                  <option key={ft.name.vi} value={ft.name.vi}>{ft.name[activeLang] || ft.name.vi}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4 border-t border-[var(--bg-tertiary)] pt-4">
            {sectionKeys.map(key => {
               const sectionConfig = sectionsConfig.find(sc => sc.key === key);
               const sectionTitle = sectionConfig ? (sectionConfig.title[activeLang] || sectionConfig.title['vi']) : 'Mục';
               return (
                  <div key={key}>
                    <label htmlFor={key} className="text-sm font-medium text-[var(--text-secondary)]">{sectionTitle}</label>
                     <SimpleRichTextEditor
                        value={formData.sections?.[key]?.[activeLang] || ''}
                        onChange={(newValue) => handleSectionContentChange(key, newValue)}
                        language={activeLang}
                        height="400px"
                        placeholder={`Nội dung HTML cho phần ${sectionTitle}...`}
                      />
                  </div>
              )
            })}
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

export default EditFeastModal;