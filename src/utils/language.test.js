import { describe, it, expect } from 'vitest';
import { translations, detectLanguage, t } from '../utils/language';

describe('language utility', () => {
    describe('detectLanguage', () => {
        it('should return "bn" if browser language starts with "bn"', () => {
            // Mock navigator.language
            const originalLanguage = navigator.language;
            Object.defineProperty(navigator, 'language', {
                value: 'bn-BD',
                configurable: true
            });
            expect(detectLanguage()).toBe('bn');
            Object.defineProperty(navigator, 'language', {
                value: originalLanguage,
                configurable: true
            });
        });

        it('should return "en" for other languages', () => {
            const originalLanguage = navigator.language;
            Object.defineProperty(navigator, 'language', {
                value: 'fr-FR',
                configurable: true
            });
            expect(detectLanguage()).toBe('en');
            Object.defineProperty(navigator, 'language', {
                value: originalLanguage,
                configurable: true
            });
        });
    });

    describe('t (translation function)', () => {
        it('should return the correct translation for a top-level key', () => {
            expect(t('welcome', 'en')).toBe(translations.en.welcome);
            expect(t('welcome', 'bn')).toBe(translations.bn.welcome);
        });

        it('should return the key if translation is missing', () => {
            expect(t('nonexistent_key', 'en')).toBe('nonexistent_key');
        });

        it('should handle nested keys if they existed (test-driven design check)', () => {
            // Currently no nested keys in translations except deeds, but t supports it
            // Let's test current behavior with deeds as they are arrays
            expect(t('deeds.0', 'en')).toBe(translations.en.deeds[0]);
        });
    });
});
