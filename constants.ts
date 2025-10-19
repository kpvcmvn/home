import type { SectionConfig } from './types';

export const SECTIONS_CONFIG: SectionConfig[] = [
  { key: 'biography', icon: 'fa-book-open', title: { vi: 'Tiểu Sử', en: 'Biography' } },
  { key: 'massReadings', icon: 'fa-cross', title: { vi: 'Thánh Lễ', en: 'Mass Readings' } },
  { key: 'officeOfReadings', icon: 'fa-book-bible', title: { vi: 'Kinh Sách', en: 'Office of Readings' } },
  { key: 'lauds', icon: 'fa-sun', title: { vi: 'Kinh Sáng', en: 'Lauds' } },
  { key: 'middayPrayer', icon: 'fa-clock', title: { vi: 'Kinh Trưa', en: 'Midday Prayer' } },
  { key: 'vespers', icon: 'fa-moon', title: { vi: 'Kinh Chiều', en: 'Vespers' } },
  { key: 'compline', icon: 'fa-bed', title: { vi: 'Kinh Tối', en: 'Compline' } },
];
