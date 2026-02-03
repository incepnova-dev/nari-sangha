import { useState, useMemo } from 'react';

export type CyclePhase = 'Menstrual' | 'Follicular' | 'Ovulation' | 'Luteal';

interface PhaseInfo {
    name: CyclePhase;
    start: number;
    end: number;
    color: string;
    emoji: string;
    desc: string;
}

export const PHASES: PhaseInfo[] = [
    {
        name: "Menstrual",
        start: 1,
        end: 5,
        color: "#e74c3c",
        emoji: "🩸",
        desc: "Uterine lining sheds. Progesterone and estrogen are at their lowest. Focus on rest and iron-rich foods."
    },
    {
        name: "Follicular",
        start: 6,
        end: 12,
        color: "#3498db",
        emoji: "🥚",
        desc: "FSH stimulates egg-containing follicles to grow. Estrogen begins to rise, boosting energy and mood."
    },
    {
        name: "Ovulation",
        start: 13,
        end: 15,
        color: "#f39c12",
        emoji: "✨",
        desc: "Egg released! Peak fertility. Cervical mucus becomes stretchy. Highest chance of conception."
    },
    {
        name: "Luteal",
        start: 16,
        end: 28,
        color: "#27ae60",
        emoji: "🌿",
        desc: "Progesterone rises to prepare for possible pregnancy. You may experience PMS as the window closes."
    }
];

export const useFertilityLogic = () => {
    const [selectedDay, setSelectedDay] = useState(1);
    const [stressLevel, setStressLevel] = useState(20);
    const [temp, setTemp] = useState(36.5);
    const [mucus, setMucus] = useState(30);

    const currentPhase = useMemo(() => {
        return PHASES.find(p => selectedDay >= p.start && selectedDay <= p.end) || PHASES[0];
    }, [selectedDay]);

    const architectureStatus = useMemo(() => {
        const isIdeal = stressLevel < 30 && mucus > 60 && temp > 36.6;
        return {
            isIdeal,
            stressWarning: stressLevel > 70,
            mucusReady: mucus > 70,
            insight: isIdeal
                ? "Conditions are highly favorable for conception. Your body is in a calm, fertile state."
                : "Your body is currently preparing. Focus on reducing stress and tracking shifts in temperature and mucus."
        };
    }, [stressLevel, mucus, temp]);

    return {
        selectedDay,
        setSelectedDay,
        stressLevel,
        setStressLevel,
        temp,
        setTemp,
        mucus,
        setMucus,
        currentPhase,
        architectureStatus,
        PHASES
    };
};
