import { useState, useEffect, useCallback } from 'react';
import { phase2Storage, STORAGE_KEYS } from '../utils/storage';

export interface MoodEntry {
    mood: '😊' | '😐' | '😔' | '😣';
    date: string;
    note?: string;
}

export const useMoodLog = () => {
    const [logs, setLogs] = useState<MoodEntry[]>(() =>
        phase2Storage.get(STORAGE_KEYS.MOOD_LOGS, [])
    );

    // Persistence Effect
    useEffect(() => {
        phase2Storage.set(STORAGE_KEYS.MOOD_LOGS, logs);
    }, [logs]);

    const addLog = useCallback((mood: MoodEntry['mood'], note?: string) => {
        setLogs(prev => {
            const newLog: MoodEntry = {
                mood,
                note,
                date: new Date().toISOString(),
            };
            return [newLog, ...prev].slice(0, 30); // Keep last 30 logs
        });
    }, []);

    return { logs, addLog };
};
