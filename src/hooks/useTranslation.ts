'use client';

import { translations, TranslationType } from '@/constants/translations';

export const useTranslation = () => {
    const t: TranslationType = translations.en;
    return { t };
};
