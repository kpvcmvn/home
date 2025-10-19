import type { MultilingualString } from '../types';

/**
 * Gets the appropriate text string from a multilingual object.
 * It tries the current language, then falls back to the default language,
 * then to the first available language, and finally returns an empty string.
 * @param textObj The object containing language-keyed strings.
 * @param currentLang The desired language code.
 * @param defaultLang The default language code to fall back to.
 * @returns The best-matching string.
 */
export const getMultilingualText = (
  textObj: MultilingualString | undefined,
  currentLang: string,
  defaultLang: string
): string => {
  if (!textObj) {
    return '';
  }
  if (textObj[currentLang]) {
    return textObj[currentLang];
  }
  if (textObj[defaultLang]) {
    return textObj[defaultLang];
  }
  // Fallback to the first available translation if both current and default are missing
  const availableLangs = Object.keys(textObj);
  if (availableLangs.length > 0) {
      const firstLang = availableLangs[0];
      return textObj[firstLang] || '';
  }

  return '';
};
