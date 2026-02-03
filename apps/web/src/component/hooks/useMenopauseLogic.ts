import { useState, useMemo } from 'react';

export type MenopauseSeason = 'spring' | 'summer' | 'autumn' | 'winter' | 'unknown';
export type ScannerPhase = 'repro' | 'peri' | 'post';
export type OrganType = 'brain' | 'heart' | 'bones' | 'skin' | 'vagina' | 'none';

interface StagingInput {
    ageRange: string;
    periodPattern: string;
    mainSymptom: string;
}

export const useMenopauseLogic = () => {
    // Staging / Seasonal Checker State
    const [stagingInput, setStagingInput] = useState<StagingInput>({
        ageRange: '',
        periodPattern: '',
        mainSymptom: ''
    });
    const [showResult, setShowResult] = useState(false);

    // Scanner State
    const [scannerPhase, setScannerPhase] = useState<ScannerPhase>('repro');
    const [activeOrgan, setActiveOrgan] = useState<OrganType>('none');

    // Journey State
    const [activeJourneyStage, setActiveJourneyStage] = useState('lateRepro');

    const updateStagingInput = (field: keyof StagingInput, value: string) => {
        setStagingInput(prev => ({ ...prev, [field]: value }));
        setShowResult(false);
    };

    const revealSeason = () => {
        if (stagingInput.ageRange && stagingInput.periodPattern && stagingInput.mainSymptom) {
            setShowResult(true);
        }
    };

    const seasonResult = useMemo(() => {
        const { ageRange: age, periodPattern: periods } = stagingInput;

        if (periods === 'regular' && (age === '35-40' || age === '41-45')) {
            return {
                title: "Late Reproductive (Stage -3a/b)",
                season: "Early Autumn",
                description: "Your hormone climate is shifting. Cycles are regular, but you may notice subtle changes in sleep or mood.",
                weather: "🌥️",
                forecast: ["Subtle sleep shifts", "Hormonal 'wobbles'", "Good time for baseline checks"]
            };
        } else if (periods === 'irregular' || periods === 'skipped_brief') {
            return {
                title: "Early Transition (Perimenopause)",
                season: "Late Autumn",
                description: "The 'Hormone Rollercoaster'. Estrogen rises and falls unpredictably, often leading to peak symptoms.",
                weather: "⛈️",
                forecast: ["Cycle skipping begins", "Hot flashes may onset", "Focus on stress & sleep"]
            };
        } else if (periods === 'skipped_long') {
            return {
                title: "Late Transition (Stage -1)",
                season: "Early Winter",
                description: "Approaching the final peak. You may go months without a period. Hot flashes and night sweats often peak here.",
                weather: "❄️",
                forecast: ["Longer gaps in periods", "Peak systemic symptoms", "Assess heart & bone risk"]
            };
        } else if (periods === 'none_12') {
            return {
                title: "Postmenopause (Stage +1/2)",
                season: "Winter Solstice",
                description: "A new baseline. Focus shifts from symptom management to long-term heart, bone, and brain protection.",
                weather: "☀️",
                forecast: ["Bone density monitoring", "GSM (Vaginal health) focus", "Protective lifestyle habits"]
            };
        }

        return {
            title: "Analyzing Micro-Climate",
            season: "Variable",
            description: "Your pattern is unique. A clinician can combine this with FSH/AMH labs for precise staging.",
            weather: "🌈",
            forecast: ["Diverse symptom profile", "Individualized care needed", "Discuss labs with provider"]
        };
    }, [stagingInput]);

    return {
        stagingInput,
        updateStagingInput,
        showResult,
        revealSeason,
        seasonResult,
        scannerPhase,
        setScannerPhase,
        activeOrgan,
        setActiveOrgan,
        activeJourneyStage,
        setActiveJourneyStage
    };
};
