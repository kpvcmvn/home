import React, { useState } from 'react';
import type { FeastType, MultilingualString, MainSection, LanguageConfig, SectionConfig, AboutContent } from '../types';
import type { AppSettings } from '../App';
import { getMultilingualText } from '../utils/multilingual';


interface AdminPanelModalProps {
    onClose: () => void;
    onSave: (settings: Partial<AppSettings>) => void;
    currentSettings: AppSettings;
}

const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
    onClose,
    onSave,
    currentSettings,
}) => {
    // Security
    const [password, setPassword] = useState(currentSettings.adminPassword);
    const [confirmPassword, setConfirmPassword] = useState(currentSettings.adminPassword);
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Language
    const [languages, setLanguages] = useState<LanguageConfig[]>(currentSettings.languages);
    const [defaultLanguage, setDefaultLanguage] = useState(currentSettings.defaultLanguage);

    // General
    const [footerContent, setFooterContent] = useState<MultilingualString>(currentSettings.footerContent);
    const [logoUrl, setLogoUrl] = useState(currentSettings.logoUrl);
    const [headerTitle, setHeaderTitle] = useState<MultilingualString>(currentSettings.headerTitle);
    const [headerSubtitle, setHeaderSubtitle] = useState<MultilingualString>(currentSettings.headerSubtitle);
    const [supportEmail, setSupportEmail] = useState(currentSettings.supportEmail);
    const [aboutContent, setAboutContent] = useState<AboutContent>(currentSettings.aboutContent);

    // Content
    const [feastTypes, setFeastTypes] = useState<FeastType[]>(currentSettings.feastTypes);
    const [mainSections, setMainSections] = useState<MainSection[]>(currentSettings.mainSections);
    const [sectionsConfig, setSectionsConfig] = useState<SectionConfig[]>(currentSettings.sectionsConfig);

    // UI State
    const [activeLang, setActiveLang] = useState<string>(currentSettings.language);
    const [activeTab, setActiveTab] = useState<'general' | 'content' | 'languages' | 'security'>('general');
    
    const getML = (textObj: MultilingualString | undefined) => getMultilingualText(textObj, activeLang, defaultLanguage);

    const handleTypeNameChange = (index: number, langCode: string, value: string) => {
        setFeastTypes(prev => {
            const newFeastTypes = [...prev];
            newFeastTypes[index] = {
                ...newFeastTypes[index],
                name: { ...newFeastTypes[index].name, [langCode]: value }
            };
            return newFeastTypes;
        });
    };

    const handleAddType = () => {
        setFeastTypes(prev => [...prev, { name: { vi: 'Loại Mới', en: 'New Type' } }]);
    };

    const handleRemoveType = (index: number) => {
        setFeastTypes(prev => prev.filter((_, i) => i !== index));
    };
    
    const handleMultilingualChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      setter: React.Dispatch<React.SetStateAction<MultilingualString>>
    ) => {
      const { value } = e.target;
      setter(prev => ({ ...prev, [activeLang]: value }));
    };

    const handleMainSectionTitleChange = (index: number, langCode: string, value: string) => {
        setMainSections(prev => {
            const newSections = [...prev];
            newSections[index] = {
                ...newSections[index],
                title: { ...newSections[index].title, [langCode]: value }
            };
            return newSections;
        });
    };
    
    const handleMainSectionIdChange = (index: number, value: string) => {
        setMainSections(prev => {
            const newSections = [...prev];
            newSections[index] = { ...newSections[index], id: value.trim().replace(/\s+/g, '-') };
            return newSections;
        });
    };

    const handleMainSectionIconChange = (index: number, value: string) => {
        setMainSections(prev => {
            const newSections = [...prev];
            newSections[index] = { ...newSections[index], icon: value };
            return newSections;
        });
    };

    const handleAddMainSection = () => {
        const newSection: MainSection = {
            id: `new-section-${Date.now()}`,
            title: { vi: 'Mục Mới', en: 'New Section' },
            icon: 'fa-star'
        };
        setMainSections(prev => [...prev, newSection]);
    };

    const handleRemoveMainSection = (indexToRemove: number) => {
        if (window.confirm(getML({vi: 'Bạn có chắc muốn xóa mục này không? Nội dung liên quan cũng có thể bị ảnh hưởng.', en:'Are you sure you want to delete this section? Related content may also be affected.'}))) {
            setMainSections(prev => prev.filter((_, index) => index !== indexToRemove));
        }
    };
    
    const handleSectionConfigTitleChange = (index: number, langCode: string, value: string) => {
        setSectionsConfig(prev => {
            const newConfigs = [...prev];
            newConfigs[index] = {
                ...newConfigs[index],
                title: { ...newConfigs[index].title, [langCode]: value }
            };
            return newConfigs;
        });
    };

    const handleAboutContentChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      field: keyof AboutContent
    ) => {
      const { value } = e.target;
      setAboutContent(prev => ({
        ...prev,
        [field]: {
          ...(prev[field]),
          [activeLang]: value
        }
      }));
    };

    const handleLanguageToggle = (codeToToggle: string) => {
        setLanguages(prev => prev.map(l => 
            l.code === codeToToggle ? { ...l, enabled: !l.enabled } : l
        ));
    };

    const handleLanguageNameChange = (code: string, newName: string) => {
        setLanguages(prev => prev.map(l => l.code === code ? { ...l, name: newName } : l));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError(getML({ vi: 'Mật khẩu xác nhận không khớp.', en: 'Confirmation password does not match.' }));
            setActiveTab('security');
            return;
        }
        if (password && password.length < 6) {
            setPasswordError(getML({vi: 'Mật khẩu phải có ít nhất 6 ký tự.', en: 'Password must be at least 6 characters long.' }));
            setActiveTab('security');
            return;
        }
        setPasswordError('');
        
        onSave({
            adminPassword: password,
            footerContent,
            feastTypes,
            logoUrl,
            headerTitle,
            headerSubtitle,
            mainSections,
            supportEmail,
            languages,
            defaultLanguage,
            sectionsConfig,
            aboutContent,
        });
    };
    
    const tabButtonStyle = (tabName: typeof activeTab) => 
        `px-4 py-3 font-semibold transition-colors duration-200 border-b-2 outline-none focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] focus:ring-offset-0 ${
            activeTab === tabName 
            ? 'border-[var(--border-accent)] text-[var(--text-accent)]' 
            : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        }`;
    
    const renderLanguageTabs = () => (
        <div className="mb-4 border-b border-[var(--bg-tertiary)]">
            <div className="flex items-center overflow-x-auto scrollbar-hide space-x-2" role="tablist">
                {currentSettings.languages.map(lang => (
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
    );

    const renderGeneralSettings = () => (
      <div className="space-y-6">
        {renderLanguageTabs()}
        <div className="border border-[var(--bg-tertiary)] p-4 rounded-lg">
            <h4 className="font-semibold text-lg mb-2 text-[var(--text-accent)]">{getML({ vi: 'Cài Đặt Giao Diện', en: 'Appearance Settings' })}</h4>
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium text-[var(--text-secondary)]">{getML({ vi: 'URL Logo (để trống nếu không có)', en: 'Logo URL (leave blank for none)' })}</label>
                    <input type="text" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className="input-style" placeholder="https://example.com/logo.png" />
                </div>
                <div>
                    <label className="text-sm font-medium text-[var(--text-secondary)]">{getML({ vi: 'Tiêu Đề Chính', en: 'Main Title' })}</label>
                    <input type="text" value={headerTitle[activeLang] || ''} onChange={(e) => handleMultilingualChange(e, setHeaderTitle)} className="input-style" />
                </div>
                <div>
                    <label className="text-sm font-medium text-[var(--text-secondary)]">{getML({ vi: 'Tiêu Đề Phụ', en: 'Subtitle' })}</label>
                    <input type="text" value={headerSubtitle[activeLang] || ''} onChange={(e) => handleMultilingualChange(e, setHeaderSubtitle)} className="input-style" />
                </div>
                 <div>
                    <label className="text-sm font-medium text-[var(--text-secondary)]">{getML({ vi: 'Email Hỗ Trợ', en: 'Support Email' })}</label>
                    <input type="email" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} className="input-style" placeholder="your-email@example.com" />
                    <p className="text-xs text-[var(--text-secondary)] mt-1">{getML({ vi: 'Email này sẽ nhận yêu cầu khi admin quên mật khẩu.', en: 'This email will receive requests when an admin forgets their password.' })}</p>
                </div>
            </div>
        </div>
        <div className="border border-[var(--bg-tertiary)] p-4 rounded-lg">
             <h4 className="font-semibold text-lg mb-2 text-[var(--text-accent)]">{getML({ vi: 'Chỉnh Sửa Chân Trang', en: 'Edit Footer' })}</h4>
             <textarea value={footerContent[activeLang] || ''} onChange={(e) => handleMultilingualChange(e, setFooterContent)} rows={3} className="input-style" placeholder={getML({ vi: 'Nội dung HTML cho chân trang...', en: 'HTML content for footer...' })}></textarea>
        </div>
      </div>
    );
    
    const renderContentSettings = () => (
       <div className="space-y-6">
            {renderLanguageTabs()}
            <div className="border border-[var(--bg-tertiary)] p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                     <h4 className="font-semibold text-lg text-[var(--text-accent)]">{getML({ vi: 'Quản Lý Loại Lễ', en: 'Manage Feast Types' })}</h4>
                     <button type="button" onClick={handleAddType} className="px-3 py-1 text-sm rounded-md bg-blue-500/20 text-blue-300 hover:bg-blue-500/30">+</button>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mb-3">{getML({ vi: 'Sửa tên cho các loại lễ.', en: 'Edit names for feast types.' })}</p>
                <div className="space-y-2">
                {feastTypes.map((type, index) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-[1fr_auto] items-center gap-2">
                        <input type="text" value={type.name[activeLang] || ''} placeholder={getML({ vi: `Tên ${activeLang}`, en: `Name ${activeLang}`})} onChange={(e) => handleTypeNameChange(index, activeLang, e.target.value)} className="input-style" />
                        <button type="button" onClick={() => handleRemoveType(index)} className="px-3 py-2 rounded-md bg-red-500/20 text-red-300 hover:bg-red-500/30">{getML({ vi: 'Xóa', en: 'Delete' })}</button>
                    </div>
                ))}
                </div>
            </div>
             <div className="border border-[var(--bg-tertiary)] p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-lg text-[var(--text-accent)]">{getML({ vi: 'Quản Lý Mục Chính', en: 'Manage Main Sections' })}</h4>
                    <button type="button" onClick={handleAddMainSection} className="px-3 py-1 text-sm rounded-md bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 flex items-center">
                        <i className="fas fa-plus mr-1"></i>{getML({ vi: 'Thêm Mục', en: 'Add Section' })}
                    </button>
                </div>
                 <p className="text-xs text-[var(--text-secondary)] mb-3">{getML({ vi: 'Quản lý các nút chức năng chính trên trang chủ.', en: 'Manage the main function buttons on the homepage.' })}</p>
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                    {mainSections.length > 0 ? mainSections.map((section, index) => (
                        <div key={index} className="border border-[var(--bg-tertiary)] p-3 rounded-md bg-[var(--bg-tertiary)]/50 space-y-3 relative">
                            <button type="button" onClick={() => handleRemoveMainSection(index)} className="absolute top-2 right-2 px-2 py-1 text-xs rounded-md bg-red-500/20 text-red-300 hover:bg-red-500/30">
                                <i className="fas fa-trash"></i>
                            </button>
                            <div>
                                <label className="text-sm font-medium text-[var(--text-secondary)]">{getML({ vi: 'ID (duy nhất, không dấu cách)', en: 'ID (unique, no spaces)' })}</label>
                                <input type="text" value={section.id} onChange={(e) => handleMainSectionIdChange(index, e.target.value)} className="input-style" placeholder="e.g., prayers" />
                                <p className="text-xs text-amber-400/80 mt-1">{getML({ vi: 'Lưu ý: Thay đổi ID sẽ tách rời mục này khỏi nội dung đã có.', en: 'Note: Changing the ID will disconnect this section from its existing content.' })}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-[var(--text-secondary)]">{getML({ vi: 'Tiêu đề', en: 'Title' })}</label>
                                <input type="text" value={section.title[activeLang] || ''} onChange={(e) => handleMainSectionTitleChange(index, activeLang, e.target.value)} className="input-style" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-[var(--text-secondary)]">{getML({ vi: 'Icon (vd: fa-book-pray)', en: 'Icon (e.g., fa-book-pray)' })}</label>
                                <input type="text" value={section.icon} onChange={(e) => handleMainSectionIconChange(index, e.target.value)} className="input-style" placeholder="fa-book-pray" />
                            </div>
                        </div>
                    )) : (
                        <p className="text-sm text-center text-[var(--text-secondary)] py-2">{getML({ vi: 'Không có mục chính nào.', en: 'No main sections.' })}</p>
                    )}
                </div>
            </div>
            <div className="border border-[var(--bg-tertiary)] p-4 rounded-lg">
                <h4 className="font-semibold text-lg text-[var(--text-accent)] mb-2">{getML({ vi: 'Quản Lý Tên Mục Phụng Vụ', en: 'Manage Liturgical Section Names' })}</h4>
                <p className="text-xs text-[var(--text-secondary)] mb-3">{getML({ vi: 'Sửa tên cho các mục hiển thị trong chi tiết ngày lễ.', en: 'Edit the names for sections shown in feast details.' })}</p>
                <div className="space-y-2">
                    {sectionsConfig.map((config, index) => (
                        <div key={config.key} className="grid grid-cols-[auto_1fr] items-center gap-3">
                            <i className={`fas ${config.icon} text-[var(--text-secondary)] w-6 text-center`}></i>
                            <input
                                type="text"
                                value={config.title[activeLang] || ''}
                                placeholder={getML({ vi: `Tên mục (${activeLang})`, en: `Section name (${activeLang})`})}
                                onChange={(e) => handleSectionConfigTitleChange(index, activeLang, e.target.value)}
                                className="input-style m-0"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="border border-[var(--bg-tertiary)] p-4 rounded-lg">
                <h4 className="font-semibold text-lg text-[var(--text-accent)] mb-2">{getML({ vi: 'Chỉnh Sửa Trang "Về Ứng Dụng"', en: 'Edit "About" Page' })}</h4>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {(Object.keys(aboutContent) as Array<keyof AboutContent>).map(key => (
                        <div key={key}>
                            <label className="text-sm font-medium text-[var(--text-secondary)] capitalize">{key.replace('_', ' ')}</label>
                            {key === 'p1' || key === 'p3' ? (
                                <textarea value={aboutContent[key][activeLang] || ''} onChange={(e) => handleAboutContentChange(e, key)} className="input-style" rows={4}></textarea>
                            ) : (
                                <input type="text" value={aboutContent[key][activeLang] || ''} onChange={(e) => handleAboutContentChange(e, key)} className="input-style" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
       </div>
    );
    
     const renderLanguageSettings = () => (
        <div className="space-y-6">
            <div className="border border-[var(--bg-tertiary)] p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-2 text-[var(--text-accent)]">{getML({vi: "Ngôn Ngữ Mặc Định", en: "Default Language"})}</h4>
                <select value={defaultLanguage} onChange={(e) => setDefaultLanguage(e.target.value)} className="input-style">
                    {languages.map(l => <option key={l.code} value={l.code}>{l.name} ({l.code})</option>)}
                </select>
                <p className="text-xs text-[var(--text-secondary)] mt-1">{getML({vi: "Đây là ngôn ngữ sẽ được hiển thị nếu bản dịch không tồn tại.", en: "This is the language that will be shown if a translation is missing."})}</p>
            </div>
            <div className="border border-[var(--bg-tertiary)] p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-lg text-[var(--text-accent)]">{getML({ vi: 'Quản Lý Ngôn Ngữ', en: 'Manage Languages' })}</h4>
                </div>
                <div className="space-y-2">
                    {languages.map(lang => (
                        <div key={lang.code} className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
                            <span className="font-mono text-sm bg-[var(--bg-tertiary)] px-2 py-1 rounded">{lang.code}</span>
                            <input type="text" value={lang.name} onChange={(e) => handleLanguageNameChange(lang.code, e.target.value)} className="input-style m-0" />
                            <label className="switch" title={lang.code === defaultLanguage ? getML({vi: "Không thể tắt ngôn ngữ mặc định", en: "Cannot disable default language"}) : (lang.enabled ? getML({vi: 'Bật', en: 'Enabled'}) : getML({vi: 'Tắt', en: 'Disabled'}))}>
                                <input 
                                    type="checkbox"
                                    checked={lang.enabled}
                                    onChange={() => handleLanguageToggle(lang.code)}
                                    disabled={lang.code === defaultLanguage}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderSecuritySettings = () => (
      <div className="space-y-6">
         <div className="border border-[var(--bg-tertiary)] p-4 rounded-lg">
            <h4 className="font-semibold text-lg mb-2 text-[var(--text-accent)]">{getML({ vi: 'Đổi Mật Khẩu', en: 'Change Password' })}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <label className="text-sm font-medium text-[var(--text-secondary)]">{getML({ vi: 'Mật Khẩu Mới', en: 'New Password' })}</label>
                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="input-style pr-10" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 top-5 px-3 flex items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]" aria-label={showPassword ? getML({ vi: "Ẩn mật khẩu", en: "Hide password" }) : getML({ vi: "Hiện mật khẩu", en: "Show password" })}>
                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                </div>
                <div className="relative">
                    <label className="text-sm font-medium text-[var(--text-secondary)]">{getML({ vi: 'Xác Nhận Mật Khẩu', en: 'Confirm Password' })}</label>
                    <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-style pr-10" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 top-5 px-3 flex items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]" aria-label={showConfirmPassword ? getML({ vi: "Ẩn mật khẩu", en: "Hide password" }) : getML({ vi: "Hiện mật khẩu", en: "Show password" })}>
                        <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                </div>
            </div>
            {passwordError && <p className="text-red-400 text-sm mt-2">{passwordError}</p>}
        </div>
      </div>
    );

    return (
        <>
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 print:hidden" onClick={onClose}>
            <div className="relative bg-[var(--bg-secondary)] rounded-xl shadow-2xl p-6 w-full max-w-3xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                <button type="button" onClick={onClose} className="absolute top-3 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-3xl h-10 w-10 flex items-center justify-center rounded-full hover:bg-[var(--bg-tertiary)] transition-colors z-10" aria-label={getML({ vi: 'Đóng', en: 'Close' })}>
                    &times;
                </button>
                <h3 className="text-xl font-semibold text-center mb-2 text-[var(--text-primary)]">{getML({ vi: 'Bảng Điều Khiển Admin', en: 'Admin Panel' })}</h3>
                
                {/* Tabs */}
                <div className="flex border-b border-[var(--bg-tertiary)] mb-6">
                    <button type="button" onClick={() => setActiveTab('general')} className={tabButtonStyle('general')}>{getML({ vi: 'Giao Diện', en: 'Appearance' })}</button>
                    <button type="button" onClick={() => setActiveTab('content')} className={tabButtonStyle('content')}>{getML({ vi: 'Nội Dung', en: 'Content' })}</button>
                    <button type="button" onClick={() => setActiveTab('languages')} className={tabButtonStyle('languages')}>{getML({ vi: 'Ngôn Ngữ', en: 'Languages' })}</button>
                    <button type="button" onClick={() => setActiveTab('security')} className={tabButtonStyle('security')}>{getML({ vi: 'Bảo Mật', en: 'Security' })}</button>
                </div>

                <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto pr-2">
                    {activeTab === 'general' && renderGeneralSettings()}
                    {activeTab === 'content' && renderContentSettings()}
                    {activeTab === 'languages' && renderLanguageSettings()}
                    {activeTab === 'security' && renderSecuritySettings()}
                    
                    <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-[var(--bg-tertiary)]">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition-colors">{getML({ vi: 'Hủy', en: 'Cancel' })}</button>
                        <button type="submit" className="px-4 py-2 rounded-lg bg-[var(--text-accent)] text-[var(--bg-primary)] font-bold hover:opacity-90 transition-opacity">{getML({ vi: 'Lưu Cài Đặt', en: 'Save Settings' })}</button>
                    </div>
                </form>
            </div>
            
        </div>
        <style>{`
        .input-style { margin-top: 4px; display: block; width: 100%; background-color: var(--bg-tertiary); color: var(--text-primary); border: 1px solid #4b5563; border-radius: 0.375rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); padding: 0.5rem 0.75rem; font-size: 0.875rem; } 
        .input-style:focus { outline: none; ring: 1px; ring-color: var(--border-accent); border-color: var(--border-accent); }
        .switch { position: relative; display: inline-block; width: 44px; height: 24px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--bg-tertiary); transition: .4s; }
        .slider.round { border-radius: 34px; }
        .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 4px; bottom: 4px; background-color: var(--text-primary); transition: .4s; }
        .slider.round:before { border-radius: 50%; }
        input:checked + .slider { background-color: var(--text-accent); }
        input:focus + .slider { box-shadow: 0 0 1px var(--text-accent); }
        input:checked + .slider:before { transform: translateX(20px); }
        input:disabled + .slider { cursor: not-allowed; opacity: 0.5; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </>
    );
};

export default AdminPanelModal;