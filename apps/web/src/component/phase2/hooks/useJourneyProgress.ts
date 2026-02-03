import { useState, useEffect, useCallback } from 'react';
import { phase2Storage, STORAGE_KEYS } from '../utils/storage';

export interface JourneyProgress {
    journeyId: string;
    sectionId?: string;
    timestamp: number;
}

export const useJourneyProgress = () => {
    const [progress, setProgress] = useState<JourneyProgress[]>(() =>
        phase2Storage.get(STORAGE_KEYS.PROGRESS, [])
    );

    // Persistence Effect
    useEffect(() => {
        phase2Storage.set(STORAGE_KEYS.PROGRESS, progress);
    }, [progress]);

    const saveProgress = useCallback((journeyId: string, sectionId?: string) => {
        setProgress(prev => {
            const newEntry: JourneyProgress = {
                journeyId,
                sectionId,
                timestamp: Date.now(),
            };
            // Keep specific journeyId unique (latest one), limit to 10
            return [newEntry, ...prev.filter(p => p.journeyId !== journeyId)].slice(0, 10);
        });
    }, []);

    const getLastProgress = useCallback((journeyId: string) => {
        return progress.find(p => p.journeyId === journeyId);
    }, [progress]);

    return { progress, saveProgress, getLastProgress };
};
