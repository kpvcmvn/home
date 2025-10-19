import React, { useRef } from 'react';

interface SimpleRichTextEditorProps {
  value: string;
  onChange: (newValue: string) => void;
  language: string; // Now a generic string for language code
  height?: string;
  placeholder?: string;
}

const SimpleRichTextEditor: React.FC<SimpleRichTextEditorProps> = ({ value, onChange, language, height = '300px', placeholder }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyTag = (tag: 'strong' | 'em' | 'u', selection: string) => {
    return `<${tag}>${selection}</${tag}>`;
  };

  const applyList = (tag: 'ul' | 'ol', selection: string) => {
    const listItems = selection.split('\n').map(line => `  <li>${line || ' '}</li>`).join('\n');
    return `\n<${tag}>\n${listItems}\n</${tag}>\n`;
  }

  const handleFormat = (type: 'strong' | 'em' | 'u' | 'ul' | 'ol' | 'a' | 'img') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = value.substring(start, end);

    let replacement = '';
    let insertedTextForSelection = '';
    
    const isVietnamese = language === 'vi';

    if (type === 'strong' || type === 'em' || type === 'u') {
      insertedTextForSelection = selection || (isVietnamese ? 'văn bản' : 'text');
      replacement = applyTag(type, insertedTextForSelection);
    } else if (type === 'ul' || type === 'ol') {
      insertedTextForSelection = selection || (isVietnamese ? 'mục danh sách' : 'list item');
      replacement = applyList(type, insertedTextForSelection);
    } else if (type === 'a') {
      const url = prompt(isVietnamese ? 'Nhập URL liên kết:' : 'Enter link URL:');
      if (!url) return;
      insertedTextForSelection = selection || (isVietnamese ? 'văn bản liên kết' : 'link text');
      replacement = `<a href="${url}" target="_blank" rel="noopener noreferrer">${insertedTextForSelection}</a>`;
    } else if (type === 'img') {
      const imgUrl = prompt(isVietnamese ? 'Nhập URL hình ảnh:' : 'Enter image URL:');
      if (!imgUrl) return;
      replacement = `\n<img src="${imgUrl}" alt="${isVietnamese ? 'Hình minh họa' : 'Illustration'}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 1rem 0; display: block;" />\n`;
    }

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);
    
    setTimeout(() => {
        textarea.focus();
        if (selection) {
          textarea.setSelectionRange(start + replacement.length, start + replacement.length);
        } else {
          const newCursorPos = start + replacement.indexOf(insertedTextForSelection);
          textarea.setSelectionRange(newCursorPos, newCursorPos + insertedTextForSelection.length);
        }
    }, 0);
  };
  
  const toolbarButtons = [
    { type: 'strong', icon: 'fa-bold', label: language === 'vi' ? 'In đậm' : 'Bold' },
    { type: 'em', icon: 'fa-italic', label: language === 'vi' ? 'In nghiêng' : 'Italic' },
    { type: 'u', icon: 'fa-underline', label: language === 'vi' ? 'Gạch chân' : 'Underline' },
    { type: 'separator' },
    { type: 'ul', icon: 'fa-list-ul', label: language === 'vi' ? 'Danh sách (không thứ tự)' : 'Unordered List' },
    { type: 'ol', icon: 'fa-list-ol', label: language === 'vi' ? 'Danh sách (có thứ tự)' : 'Ordered List' },
    { type: 'separator' },
    { type: 'a', icon: 'fa-link', label: language === 'vi' ? 'Chèn liên kết' : 'Insert Link' },
    { type: 'img', icon: 'fa-image', label: language === 'vi' ? 'Chèn hình ảnh' : 'Insert Image' },
  ] as const;

  return (
    <div className="simple-rte" style={{ height }}>
      <div className="rte-toolbar">
        {toolbarButtons.map((btn, index) => (
          btn.type === 'separator' ? (
            <div key={`sep-${index}`} className="rte-separator"></div>
          ) : (
            <button key={btn.type} type="button" onClick={() => handleFormat(btn.type)} className="rte-button" aria-label={btn.label} title={btn.label}>
              <i className={`fas ${btn.icon}`}></i>
            </button>
          )
        ))}
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      ></textarea>
      <style>{`
        .simple-rte {
          border: 1px solid var(--bg-tertiary);
          border-radius: 0.375rem;
          background-color: var(--bg-secondary);
          margin-top: 4px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          overflow: hidden;
        }
        .simple-rte:focus-within {
          border-color: var(--border-accent);
          box-shadow: 0 0 0 1px var(--border-accent);
        }
        .rte-toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          padding: 8px;
          border-bottom: 1px solid var(--bg-tertiary);
          flex-shrink: 0;
          align-items: center;
          background-color: var(--bg-secondary);
        }
        .rte-button {
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          border: none;
          border-radius: 4px;
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s, color 0.2s;
        }
        .rte-button:hover {
          background-color: var(--bg-tertiary);
          color: var(--text-primary);
        }
        .rte-separator {
          width: 1px;
          height: 20px;
          background-color: var(--bg-tertiary);
          margin: 0 4px;
        }
        .simple-rte textarea {
          background-color: var(--bg-primary);
          color: var(--text-primary);
          border: none;
          margin: 0;
          box-shadow: none;
          border-radius: 0 0 0.375rem 0.375rem;
          resize: vertical;
          flex-grow: 1;
          padding: 0.75rem;
          width: 100%;
          line-height: 1.5;
          font-family: inherit;
        }
        .simple-rte textarea:focus {
          outline: none;
        }
        .simple-rte textarea::placeholder {
            color: var(--text-secondary);
            opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

export default SimpleRichTextEditor;
