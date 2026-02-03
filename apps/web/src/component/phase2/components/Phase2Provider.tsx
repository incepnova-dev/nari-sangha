import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { useJourneyWeekContext, UserStage } from '../hooks/useJourneyWeekContext';
import { useJourneyProgress, JourneyProgress } from '../hooks/useJourneyProgress';
import { useMoodLog, MoodEntry } from '../hooks/useMoodLog';

interface Phase2ContextType {
    stage: UserStage;
    updateStage: (stage: UserStage) => void;
    progress: JourneyProgress[];
    saveProgress: (journeyId: string, sectionId?: string) => void;
    getLastProgress: (journeyId: string) => JourneyProgress | undefined;
    moodLogs: MoodEntry[];
    addMoodLog: (mood: MoodEntry['mood'], note?: string) => void;
}

const Phase2Context = createContext<Phase2ContextType | undefined>(undefined);

export const Phase2Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const weekContext = useJourneyWeekContext();
    const progressContext = useJourneyProgress();
    const moodContext = useMoodLog();

    const value: Phase2ContextType = useMemo(() => ({
        stage: weekContext.stage,
        updateStage: weekContext.updateStage,
        progress: progressContext.progress,
        saveProgress: progressContext.saveProgress,
        getLastProgress: progressContext.getLastProgress,
        moodLogs: moodContext.logs,
        addMoodLog: moodContext.addLog,
    }), [weekContext, progressContext, moodContext]);

    return (
        <Phase2Context.Provider value={value}>
            {children}
        </Phase2Context.Provider>
    );
};

export const usePhase2 = () => {
    const context = useContext(Phase2Context);
    if (!context) throw new Error('usePhase2 must be used within a Phase2Provider');
    return context;
};
