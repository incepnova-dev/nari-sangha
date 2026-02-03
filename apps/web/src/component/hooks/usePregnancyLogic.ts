import { useState, useEffect, useCallback, useMemo } from 'react';

export interface WeekDetail {
    size: string;
    emoji: string;
    length: string;
    weight: string;
    heartRate: string;
    development: string[];
    tips: string[];
}

export const weekData: Record<number, WeekDetail> = {
    1: {
        size: "Poppy Seed", emoji: "•", length: "0.1 cm", weight: "0 g", heartRate: "N/A",
        development: ["Fertilization occurs", "Single cell divides rapidly", "Blastocyst forms", "Implantation begins"],
        tips: ["Start prenatal vitamins", "Avoid alcohol & smoking", "Track ovulation", "Healthy diet"]
    },
    5: {
        size: "Apple Seed", emoji: "🍎", length: "0.2 cm", weight: "0.1 g", heartRate: "100 bpm",
        development: ["Heart begins to beat", "Neural tube forms", "Arm and leg buds appear", "Placenta develops"],
        tips: ["First prenatal visit", "Confirm pregnancy", "Start folic acid", "Rest when tired"]
    },
    8: {
        size: "Raspberry", emoji: "🫐", length: "1.6 cm", weight: "1 g", heartRate: "150 bpm",
        development: ["Webbed fingers and toes", "Facial features form", "Major organs developing", "Eyelids form"],
        tips: ["Combat morning sickness", "Stay hydrated", "Eat small meals", "First ultrasound"]
    },
    12: {
        size: "Lime", emoji: "🍋", length: "5.4 cm", weight: "14 g", heartRate: "160 bpm",
        development: ["Reflexes develop", "Intestines in place", "Fingernails grow", "Vocal cords form"],
        tips: ["First trimester screening", "Discuss genetic testing", "Maternity clothes shopping", "Document bump"]
    },
    16: {
        size: "Avocado", emoji: "🥑", length: "11.6 cm", weight: "100 g", heartRate: "150 bpm",
        development: ["Facial expressions possible", "Circulatory system works", "Hearing develops", "Baby can hiccup"],
        tips: ["Amniocentesis if needed", "Feel first movements soon", "Pelvic floor exercises", "Sleep on side"]
    },
    20: {
        size: "Banana", emoji: "🍌", length: "25 cm", weight: "300 g", heartRate: "140 bpm",
        development: ["Can hear your voice", "Vernix caseosa forms", "Eyebrows visible", "Practices breathing"],
        tips: ["Anatomy scan scheduled", "Track baby movements", "Start prenatal yoga", "Stay hydrated"]
    },
    24: {
        size: "Corn", emoji: "🌽", length: "30 cm", weight: "600 g", heartRate: "140 bpm",
        development: ["Lungs develop", "Taste buds form", "Footprints visible", "Responds to sound"],
        tips: ["Glucose screening test", "Watch for swelling", "Braxton Hicks may start", "Childbirth classes"]
    },
    28: {
        size: "Eggplant", emoji: "🍆", length: "37 cm", weight: "1000 g", heartRate: "140 bpm",
        development: ["Eyes can open", "Can dream", "Billions of neurons", "Fat accumulates"],
        tips: ["Third trimester begins", "Tdap vaccine", "Kick counts daily", "Hospital tour"]
    },
    32: {
        size: "Jicama", emoji: "🥥", length: "42 cm", weight: "1700 g", heartRate: "140 bpm",
        development: ["Bones harden", "Lungs maturing", "Fingernails reach fingertips", "Practices breathing"],
        tips: ["Bi-weekly appointments", "Pack hospital bag", "Write birth plan", "Perineal massage"]
    },
    36: {
        size: "Romaine", emoji: "🥬", length: "47 cm", weight: "2600 g", heartRate: "140 bpm",
        development: ["Head engaged", "Digestive system ready", "Immune system works", "Ready for birth"],
        tips: ["Weekly appointments", "Group B strep test", "Finalize birth plan", "Rest as much as possible"]
    },
    40: {
        size: "Watermelon", emoji: "🍉", length: "51 cm", weight: "3400 g", heartRate: "140 bpm",
        development: ["Fully developed", "Ready for birth", "Strong reflexes", "Waiting for labor"],
        tips: ["Watch for labor signs", "Stay calm", "Walk to encourage labor", "Hospital bag ready"]
    }
};

export const trimesterData = {
    tri1: {
        kicker: "WEEKS 1-12",
        title: "First Trimester: Foundation Phase",
        description: "The incredible journey begins with rapid cell division and the formation of all major organs.",
        badges: ["12 weeks", "Morning sickness", "First ultrasound", "Neural tube forms"],
        phases: [
            {
                title: "Weeks 1-4: Conception & Implantation",
                content: "Fertilization occurs and the embryo implants in the uterine wall. The placenta begins to form."
            },
            {
                title: "Weeks 5-8: Organ Formation",
                content: "Heart begins beating around week 6. Brain, spinal cord, and all major organs start developing. Limb buds appear."
            },
            {
                title: "Weeks 9-12: Fetal Development",
                content: "Now called a fetus. Fingers and toes form. Baby can make small movements. Sex organs develop."
            }
        ]
    },
    tri2: {
        kicker: "WEEKS 13-26",
        title: "Second Trimester: The Golden Period",
        description: "Energy returns, nausea fades, and you'll feel your baby move! The most comfortable trimester for many.",
        badges: ["14 weeks", "Energy boost", "Anatomy scan", "Feel movements"],
        phases: [
            {
                title: "Weeks 13-16: Growing Stronger",
                content: "Baby's skeleton hardens. Facial features more defined. Can suck thumb and make facial expressions."
            },
            {
                title: "Weeks 17-20: Halfway Milestone",
                content: "Anatomy scan reveals baby's sex. You'll feel definite movements (quickening). Baby can hear sounds."
            },
            {
                title: "Weeks 21-26: Rapid Growth",
                content: "Baby gains weight rapidly. Lungs develop. Regular sleep-wake cycles. Eyelids can open."
            }
        ]
    },
    tri3: {
        kicker: "WEEKS 27-40",
        title: "Third Trimester: Final Countdown",
        description: "Baby gains weight, lungs mature, and you prepare for delivery. The finish line is in sight!",
        badges: ["14 weeks", "Braxton Hicks", "Hospital bag", "Birth plan"],
        phases: [
            {
                title: "Weeks 27-32: Preparing Systems",
                content: "Brain develops rapidly. Eyes can open. Baby can taste amniotic fluid. Bones fully developed but soft."
            },
            {
                title: "Weeks 33-36: Final Preparations",
                content: "Baby moves into head-down position. Lungs nearly mature. Fingernails reach fingertips. Weekly checkups begin."
            },
            {
                title: "Weeks 37-40: Full Term",
                content: "Baby is full term at 37 weeks. Gaining about 0.5 lbs per week. Ready for birth at any time. Watch for labor signs."
            }
        ]
    }
};

export const hospitalBagItems = {
    mom: [
        { id: 'mom-id', label: 'Insurance cards & ID', category: 'Documents' },
        { id: 'mom-birth-plan', label: 'Birth plan copies (3)', category: 'Documents' },
        { id: 'mom-medical', label: 'Medical records', category: 'Documents' },
        { id: 'mom-emergency', label: 'Emergency contacts', category: 'Documents' },
        { id: 'mom-gown', label: 'Comfortable nightgown (2)', category: 'Clothing' },
        { id: 'mom-robe', label: 'Robe & slippers', category: 'Clothing' },
        { id: 'mom-bra', label: 'Nursing bras (2-3)', category: 'Clothing' },
        { id: 'mom-underwear', label: 'Comfortable underwear (5-6)', category: 'Clothing' },
        { id: 'mom-home-outfit', label: 'Going-home outfit (loose)', category: 'Clothing' },
        { id: 'mom-socks', label: 'Warm socks', category: 'Clothing' },
        { id: 'mom-toothbrush', label: 'Toothbrush & toothpaste', category: 'Toiletries' },
        { id: 'mom-shampoo', label: 'Shampoo & conditioner', category: 'Toiletries' },
        { id: 'mom-soap', label: 'Body wash', category: 'Toiletries' },
        { id: 'mom-deodorant', label: 'Deodorant', category: 'Toiletries' },
        { id: 'mom-hairbrush', label: 'Hairbrush & hair ties', category: 'Toiletries' },
        { id: 'mom-lip-balm', label: 'Lip balm', category: 'Toiletries' },
        { id: 'mom-glasses', label: 'Glasses/contacts', category: 'Toiletries' },
        { id: 'mom-pads', label: 'Maternity pads (heavy flow)', category: 'Postpartum' },
        { id: 'mom-nipple-cream', label: 'Nipple cream', category: 'Postpartum' },
        { id: 'mom-nursing-pads', label: 'Nursing pads', category: 'Postpartum' },
        { id: 'mom-pain-relief', label: 'Pain relief (doctor approved)', category: 'Postpartum' },
        { id: 'mom-phone', label: 'Phone & charger', category: 'Comfort' },
        { id: 'mom-camera', label: 'Camera', category: 'Comfort' },
        { id: 'mom-pillow', label: 'Own pillow', category: 'Comfort' },
        { id: 'mom-music', label: 'Music player/headphones', category: 'Comfort' },
        { id: 'mom-snacks', label: 'Snacks & drinks', category: 'Comfort' }
    ],
    baby: [
        { id: 'baby-car-seat', label: 'Car seat (installed!)', category: 'Safety' },
        { id: 'baby-home-outfit', label: 'Going-home outfit', category: 'Clothing' },
        { id: 'baby-onesies-nb', label: 'Onesies - Newborn (3)', category: 'Clothing' },
        { id: 'baby-onesies-0-3', label: 'Onesies - 0-3 months (3)', category: 'Clothing' },
        { id: 'baby-sleepers', label: 'Sleepers with feet (2-3)', category: 'Clothing' },
        { id: 'baby-hat', label: 'Hat (2)', category: 'Clothing' },
        { id: 'baby-mittens', label: 'Mittens', category: 'Clothing' },
        { id: 'baby-socks', label: 'Socks (3-4 pairs)', category: 'Clothing' },
        { id: 'baby-burp-cloths', label: 'Burp cloths (4-5)', category: 'Feeding' },
        { id: 'baby-bib', label: 'Bibs (2)', category: 'Feeding' },
        { id: 'baby-nursing-pillow', label: 'Nursing pillow (optional)', category: 'Feeding' },
        { id: 'baby-bottles', label: 'Bottles (if not breastfeeding)', category: 'Feeding' },
        { id: 'baby-formula', label: 'Formula (if needed)', category: 'Feeding' },
        { id: 'baby-diapers-nb', label: 'Diapers - Newborn', category: 'Diapering' },
        { id: 'baby-wipes', label: 'Wipes (sensitive)', category: 'Diapering' },
        { id: 'baby-cream', label: 'Diaper cream', category: 'Diapering' },
        { id: 'baby-changing-pad', label: 'Portable changing pad', category: 'Diapering' },
        { id: 'baby-blankets', label: 'Receiving blankets (3-4)', category: 'Comfort' },
        { id: 'baby-swaddle', label: 'Swaddle blankets (2)', category: 'Comfort' },
        { id: 'baby-pacifiers', label: 'Pacifiers (if using)', category: 'Comfort' },
        { id: 'baby-lovey', label: 'Small comfort item', category: 'Comfort' }
    ],
    partner: [
        { id: 'partner-clothes', label: 'Change of clothes (2 days)', category: 'Essentials' },
        { id: 'partner-toiletries', label: 'Toiletries', category: 'Essentials' },
        { id: 'partner-phone', label: 'Phone & charger', category: 'Essentials' },
        { id: 'partner-id', label: 'ID & insurance', category: 'Essentials' },
        { id: 'partner-snacks', label: 'Snacks & drinks', category: 'Comfort' },
        { id: 'partner-pillow', label: 'Pillow & blanket', category: 'Comfort' },
        { id: 'partner-entertainment', label: 'Books/tablet', category: 'Comfort' }
    ],
    essentials: [
        { id: 'ess-wallet', label: 'Wallet with cash', category: 'Financial' },
        { id: 'ess-credit-cards', label: 'Credit cards', category: 'Financial' },
        { id: 'ess-insurance', label: 'Insurance information', category: 'Financial' },
        { id: 'ess-contact-list', label: 'List of people to call', category: 'Contacts' },
        { id: 'ess-ob-number', label: 'OB/GYN phone number', category: 'Contacts' },
        { id: 'ess-pediatrician', label: 'Pediatrician info', category: 'Contacts' },
        { id: 'ess-house-keys', label: 'House keys', category: 'Home Prep' },
        { id: 'ess-pet-plan', label: 'Pet care plan', category: 'Home Prep' },
        { id: 'ess-fridge-stocked', label: 'Fridge stocked', category: 'Home Prep' }
    ]
};

export const symptomsData = [
    {
        trimester: "FIRST TRIMESTER",
        title: "Morning Sickness",
        desc: "Nausea and vomiting, usually worse in morning",
        tips: ["Eat small, frequent meals", "Try ginger tea or crackers", "Avoid triggers", "Stay hydrated"],
        ask: "Ask your doctor if severe"
    },
    {
        trimester: "ALL TRIMESTERS",
        title: "Fatigue",
        desc: "Overwhelming tiredness and need for rest",
        tips: ["Get 8-9 hours of sleep", "Take short naps", "Light exercise helps", "Eat iron-rich foods"],
        ask: "Normal in first & third trimester"
    },
    {
        trimester: "THIRD TRIMESTER",
        title: "Back Pain",
        desc: "Lower back discomfort from weight gain",
        tips: ["Maintain good posture", "Use pregnancy support belt", "Prenatal massage", "Warm compress"],
        ask: "Consider physical therapy"
    },
    {
        trimester: "SECOND/THIRD TRIMESTER",
        title: "Heartburn",
        desc: "Burning sensation in chest after eating",
        tips: ["Eat smaller meals", "Avoid spicy/fatty foods", "Sleep with head elevated", "Antacids (doctor approved)"],
        ask: "Common due to hormones"
    },
    {
        trimester: "ALL TRIMESTERS",
        title: "Frequent Urination",
        desc: "Need to pee more often, especially at night",
        tips: ["Increased blood volume", "Uterus pressing on bladder", "Hormonal changes", "Baby's position"],
        ask: "Normal throughout pregnancy"
    },
    {
        trimester: "SECOND/THIRD TRIMESTER",
        title: "Swelling (Edema)",
        desc: "Puffy feet, ankles, and hands",
        tips: ["Elevate feet when sitting", "Wear compression socks", "Stay hydrated", "Reduce sodium intake"],
        ask: "⚠️ Call doctor if sudden/severe"
    },
    {
        trimester: "THIRD TRIMESTER",
        title: "Braxton Hicks",
        desc: "Practice contractions, irregular and painless",
        tips: ["Irregular timing", "Don't increase in intensity", "Stop with position change", "Felt in front, not back"],
        ask: "⚠️ Real labor = regular & painful"
    },
    {
        trimester: "ALL TRIMESTERS",
        title: "Mood Changes",
        desc: "Emotional ups and downs, anxiety",
        tips: ["Talk to loved ones", "Join support groups", "Practice mindfulness", "Get enough sleep"],
        ask: "⚠️ Seek help if depressed"
    }
];

export const usePregnancyLogic = () => {
    const [currentWeek, setCurrentWeek] = useState(20);
    const [activeTrimester, setActiveTrimester] = useState('tri1');
    const [isHudCollapsed, setIsHudCollapsed] = useState(false);
    const [activeBagCategory, setActiveBagCategory] = useState('mom');
    const [checkedBagItems, setCheckedBagItems] = useState<string[]>([]);
    const [checkedCareItems, setCheckedCareItems] = useState<string[]>([]);
    const [view, setView] = useState<'front' | 'side' | 'xray'>('front');
    const [layers, setLayers] = useState({ baby: true, organs: false, measures: true });
    const [isAnimating, setIsAnimating] = useState(false);

    const interpolateWeekData = useCallback((week: number): WeekDetail => {
        const knownWeeks = [1, 5, 8, 12, 16, 20, 24, 28, 32, 36, 40];
        if (weekData[week]) return weekData[week];
        let lower = knownWeeks[0];
        let upper = knownWeeks[knownWeeks.length - 1];
        for (let i = 0; i < knownWeeks.length - 1; i++) {
            if (week >= knownWeeks[i] && week <= knownWeeks[i + 1]) {
                lower = knownWeeks[i];
                upper = knownWeeks[i + 1];
                break;
            }
        }
        const lowerData = weekData[lower];
        const upperData = weekData[upper];
        const ratio = (week - lower) / (upper - lower);
        const lowerLength = parseFloat(lowerData.length);
        const upperLength = parseFloat(upperData.length);
        const length = (lowerLength + (upperLength - lowerLength) * ratio).toFixed(1);
        const lowerWeight = parseFloat(lowerData.weight);
        const upperWeight = parseFloat(upperData.weight);
        const weight = Math.round(lowerWeight + (upperWeight - lowerWeight) * ratio);
        return {
            size: lowerData.size,
            emoji: lowerData.emoji,
            length: `${length} cm`,
            weight: `${weight} g`,
            heartRate: lowerData.heartRate,
            development: lowerData.development,
            tips: lowerData.tips
        };
    }, []);

    const getTrimesterPhrase = (week: number) => {
        if (week <= 4) return "The Beginning";
        if (week <= 8) return "Rapid Development";
        if (week <= 12) return "Almost There!";
        if (week <= 16) return "Energy Returns";
        if (week <= 20) return "Halfway There!";
        if (week <= 24) return "Growing Strong";
        if (week <= 28) return "Third Trimester Begins";
        if (week <= 32) return "Preparing for Birth";
        if (week <= 36) return "Almost Ready";
        return "Full Term!";
    };

    const getUterusSize = (week: number) => {
        if (week < 6) return "Plum";
        if (week < 10) return "Orange";
        if (week < 12) return "Grapefruit";
        if (week < 16) return "Cantaloupe";
        if (week < 20) return "Papaya";
        if (week < 28) return "Basketball";
        if (week < 36) return "Watermelon";
        return "Full Size";
    };

    const currentTrimester = useMemo(() => {
        if (currentWeek >= 1 && currentWeek <= 12) return "First Trimester";
        if (currentWeek >= 13 && currentWeek <= 26) return "Second Trimester";
        return "Third Trimester";
    }, [currentWeek]);

    const currentWeekData = useMemo(() => interpolateWeekData(currentWeek), [currentWeek, interpolateWeekData]);

    const animateGrowth = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        let week = 1;
        const interval = setInterval(() => {
            setCurrentWeek(week);
            week++;
            if (week > 40) {
                clearInterval(interval);
                setIsAnimating(false);
                setCurrentWeek(20);
            }
        }, 200);
    }, [isAnimating]);

    const toggleBagItem = (itemId: string) => {
        setCheckedBagItems(prev =>
            prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
        );
    };

    const toggleCareItem = (itemId: string) => {
        setCheckedCareItems(prev =>
            prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
        );
    };

    const calculateNutrition = (preWeight: number, activityLevel: number, week: number) => {
        const bmr = 655 + (9.6 * preWeight) + (1.8 * 165) - (4.7 * 28);
        let tdee = bmr * activityLevel;
        if (week <= 12) tdee += 0;
        else if (week <= 26) tdee += 340;
        else tdee += 450;
        return {
            tdee: Math.round(tdee),
            protein: 71,
            carbs: Math.round((tdee * 0.45) / 4),
            fats: Math.round((tdee * 0.30) / 9),
            water: Math.round(preWeight * 0.033 + 1)
        };
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
        currentWeek,
        setCurrentWeek,
        activeTrimester,
        setActiveTrimester,
        isHudCollapsed,
        setIsHudCollapsed,
        activeBagCategory,
        setActiveBagCategory,
        checkedBagItems,
        toggleBagItem,
        checkedCareItems,
        toggleCareItem,
        view,
        setView,
        layers,
        setLayers,
        currentTrimester,
        currentWeekData,
        getTrimesterPhrase,
        getUterusSize,
        animateGrowth,
        isAnimating,
        calculateNutrition
    };
};
