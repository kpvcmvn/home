export type SectionKey = 
  | 'biography'
  | 'massReadings'
  | 'officeOfReadings'
  | 'lauds'
  | 'middayPrayer'
  | 'vespers'
  | 'compline';

export type MultilingualString = Record<string, string>;

export interface Feast {
  id: string;
  date: string; // "MM-DD" format
  title: MultilingualString;
  subtitle?: MultilingualString;
  type: string; // References FeastType.name in VIETNAMESE
  sections: Record<SectionKey, MultilingualString>;
}

export interface FeastType {
  name: MultilingualString;
}

export interface GenericContent {
  id: string;
  title: MultilingualString;
  content: MultilingualString;
}

export interface MainSection {
  id: string;
  title: MultilingualString;
  icon: string;
}

export interface LanguageConfig {
  code: string; // e.g., 'vi', 'en', 'fr'
  name: string; // e.g., 'Tiếng Việt', 'English', 'Français'
  enabled: boolean;
}

export interface SectionConfig {
  key: SectionKey;
  icon: string;
  title: MultilingualString;
}

export interface AboutContent {
  title: MultilingualString;
  p1: MultilingualString;
  p2_title: MultilingualString;
  li1: MultilingualString;
  li2: MultilingualString;
  li3: MultilingualString;
  li4: MultilingualString;
  p3: MultilingualString;
  p4: MultilingualString;
  go_back: MultilingualString;
}
