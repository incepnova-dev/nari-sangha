import { useState, useEffect, useCallback, useRef } from 'react';

export interface BioState {
    running: boolean;
    milk: number;           // 0-100
    capacity: number;       // 100
    hunger: number;         // 0-100
    hydration: number;      // 0-100
    hormones: number;       // 0-100
    energy: number;         // 0-100
    stash: number;          // oz
    isBusy: boolean;
    clockTime: string;
}

export const useBreastfeedingLogic = () => {
    const [state, setState] = useState<BioState>({
        running: false,
        milk: 30,
        capacity: 100,
        hunger: 20,
        hydration: 80,
        hormones: 50,
        energy: 80,
        stash: 0,
        isBusy: false,
        clockTime: '08:00 AM'
    });

    const [activeTheme, setActiveTheme] = useState('physical');
    const [narrator, setNarrator] = useState({
        main: 'Simulation Paused',
        sub: 'Click Play to start your journey.',
        type: 'normal'
    });
    const [overlayText, setOverlayText] = useState('');
    const [pumpActive, setPumpActive] = useState(false);
    const [babyActive, setBabyActive] = useState(false);
    const [sleepActive, setSleepActive] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const tick = useCallback(() => {
        setState(prev => {
            if (!prev.running) return prev;

            const newHunger = Math.min(100, prev.hunger + 0.3);
            const newHydration = Math.max(0, prev.hydration - 0.1);
            const newEnergy = Math.max(0, prev.energy - 0.05);
            const newHormones = Math.max(20, prev.hormones - 0.1);

            let rate = 0.2 * (newHydration / 100) * (newHormones / 50);
            let newMilk = prev.milk;
            if (prev.milk < 98) {
                newMilk = Math.min(prev.capacity, prev.milk + rate);
            }

            return {
                ...prev,
                hunger: newHunger,
                hydration: newHydration,
                energy: newEnergy,
                hormones: newHormones,
                milk: newMilk
            };
        });
    }, []);

    useEffect(() => {
        if (state.running) {
            timerRef.current = setInterval(tick, 200);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [state.running, tick]);

    const toggleSim = () => {
        setState(prev => {
            const newRunning = !prev.running;
            setNarrator({
                main: newRunning ? 'Simulation Running' : 'Paused',
                sub: newRunning ? 'Monitor stats and take action.' : 'Click play to resume.',
                type: 'normal'
            });

            return { ...prev, running: newRunning };
        });
    };

    const setBusy = (busy: boolean) => {
        setState(prev => ({ ...prev, isBusy: busy }));
    };

    const actNurse = () => {
        if (state.isBusy || !state.running) return;
        setBusy(true);
        setBabyActive(true);
        setOverlayText('Oxytocin Release!');
        setNarrator({ main: 'Nursing Started...', sub: 'Baby latched. Signaling brain to release milk.', type: 'success' });

        setTimeout(() => {
            setOverlayText('Let-down Reflex: Milk Flowing');
            setState(prev => {
                const milkRemoved = Math.min(prev.milk, 40);
                return {
                    ...prev,
                    milk: prev.milk - milkRemoved,
                    hunger: Math.max(0, prev.hunger - (milkRemoved * 3)),
                    hormones: Math.min(100, prev.hormones + 25),
                    energy: Math.max(0, prev.energy - 5)
                };
            });
        }, 1500);

        setTimeout(() => {
            setBabyActive(false);
            setOverlayText('');
            setBusy(false);
            setNarrator({
                main: 'Feed Complete',
                sub: 'Baby is full and sleepy. Hindmilk received.',
                type: 'normal'
            });

        }, 3000);
    };

    const actPump = () => {
        if (state.isBusy || !state.running) return;
        setBusy(true);
        setPumpActive(true);
        setOverlayText('Vacuum Suction Active');
        setNarrator({ main: 'Pumping...', sub: 'Extracting milk for storage.', type: 'normal' });

        setTimeout(() => {
            setOverlayText('Draining Ducts...');
            setState(prev => {
                const pumpedAmount = prev.milk;
                let ounces = Math.floor(pumpedAmount / 10);
                if (pumpedAmount > 10 && ounces === 0) ounces = 1;

                return {
                    ...prev,
                    milk: 0,
                    stash: prev.stash + ounces,
                    hormones: Math.min(100, prev.hormones + 15)
                };
            });
        }, 1500);

        setTimeout(() => {
            setPumpActive(false);
            setOverlayText('');
            setBusy(false);
            setNarrator({ main: 'Pumping Done', sub: "Breasts emptied. Feedback loop set to 'Produce'.", type: 'success' });
        }, 3000);
    };

    const actHydrate = () => {
        if (state.isBusy || !state.running) return;
        setNarrator({ main: 'Gulp Gulp!', sub: 'Hydration restored. Production rate increased.', type: 'success' });
        setState(prev => ({
            ...prev,
            hydration: Math.min(100, prev.hydration + 40)
        }));
    };

    const actSleep = () => {
        if (state.isBusy || !state.running) return;
        setBusy(true);
        setSleepActive(true);
        setNarrator({ main: 'Sleeping...', sub: 'Time passing... Body recovering.', type: 'normal' });

        const ffInterval = setInterval(() => {
            setState(prev => ({
                ...prev,
                energy: Math.min(100, prev.energy + 2),
                hormones: Math.min(100, prev.hormones + 0.5),
                milk: Math.min(prev.capacity, prev.milk + 1.5),
                hunger: Math.min(100, prev.hunger + 1.5)
            }));
        }, 100);

        setTimeout(() => {
            clearInterval(ffInterval);
            setSleepActive(false);
            setBusy(false);
            setNarrator({ main: 'Good Morning', sub: 'Energy restored.', type: 'normal' });
        }, 3000);
    };

    return {
        state,
        toggleSim,
        actNurse,
        actPump,
        actHydrate,
        actSleep,
        activeTheme,
        setActiveTheme,
        narrator,
        overlayText,
        pumpActive,
        babyActive,
        sleepActive
    };
};
