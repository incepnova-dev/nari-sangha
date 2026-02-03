export const STORAGE_KEYS = {
    USER_STAGE: 'ns_user_stage', // { type: 'pregnancy' | 'postpartum', week: number }
    PROGRESS: 'ns_journey_progress', // { journeyId: string, sectionId: string, timestamp: number }[]
    MOOD_LOGS: 'ns_mood_logs', // { mood: string, date: string, note?: string }[]
};

export const phase2Storage = {
    get: <T>(key: string, defaultValue: T): T => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error(`Error reading from localStorage key "${key}":`, e);
            return defaultValue;
        }
    },
    set: <T>(key: string, value: T): void => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error(`Error writing to localStorage key "${key}":`, e);
        }
    },
    clear: (): void => {
        Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    }
};
