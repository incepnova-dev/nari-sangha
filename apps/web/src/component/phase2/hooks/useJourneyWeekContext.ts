import { useState } from 'react';
import { phase2Storage, STORAGE_KEYS } from '../utils/storage';

export interface UserStage {
    type: 'pregnancy' | 'postpartum' | 'none';
    week: number;
}

export const useJourneyWeekContext = () => {
    const [stage, setStage] = useState<UserStage>(
        phase2Storage.get(STORAGE_KEYS.USER_STAGE, { type: 'none', week: 1 })
    );

    const updateStage = (newStage: UserStage) => {
        setStage(newStage);
        phase2Storage.set(STORAGE_KEYS.USER_STAGE, newStage);
    };

    return { stage, updateStage };
};
