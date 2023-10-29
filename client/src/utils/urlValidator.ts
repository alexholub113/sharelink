import supportedWebsites from '../constants/supportedWebsites.ts';

export const validateUrl = (url?: string): { valid: boolean, error?: 'invalid-url' | 'not-support' } => {
    try {
        if (!url) {
            return {
                valid: false,
                error: 'invalid-url',
            };
        }

        const urlObj = new URL(url);

        if (!supportedWebsites.includes(urlObj.origin)) {
            return {
                valid: false,
                error: 'not-support',
            };
        }

        return {
            valid: true,
        };
    } catch (e) {
        return {
            valid: false,
            error: 'invalid-url',
        };
    }
};