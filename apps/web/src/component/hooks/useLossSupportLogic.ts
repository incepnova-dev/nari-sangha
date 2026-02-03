import { useState, useCallback, useEffect } from 'react';

export const useLossSupportLogic = () => {
    const [activeJournalTab, setActiveJournalTab] = useState('early-miscarriage');
    const [activeOrbitCategory, setActiveOrbitCategory] = useState('crisis');
    const [activeReadinessType, setActiveReadinessType] = useState('physical');
    const [activeScenario, setActiveScenario] = useState(3);
    const [activeRitual, setActiveRitual] = useState('candle');
    const [flippedStars, setFlippedStars] = useState<string[]>([]);
    const [openAccordions, setOpenAccordions] = useState<string[]>([]);

    const toggleStar = (id: string) => {
        setFlippedStars(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const toggleAccordion = (id: string) => {
        setOpenAccordions(prev =>
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const morph = document.querySelector('.gradient-morph') as HTMLElement;
        if (morph) {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            morph.style.setProperty('--mouse-x', `${x}%`);
            morph.style.setProperty('--mouse-y', `${y}%`);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    return {
        activeJournalTab,
        setActiveJournalTab,
        activeOrbitCategory,
        setActiveOrbitCategory,
        activeReadinessType,
        setActiveReadinessType,
        activeScenario,
        setActiveScenario,
        activeRitual,
        setActiveRitual,
        flippedStars,
        toggleStar,
        openAccordions,
        toggleAccordion,
        scrollToSection
    };
};
