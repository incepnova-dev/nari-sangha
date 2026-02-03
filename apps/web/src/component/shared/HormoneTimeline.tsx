import React, { useState, useEffect } from 'react';
import './HormoneTimeline.css';

interface HormoneData {
    estrogen: number;
    progesterone: number;
    cortisol: number;
    oxytocin: number;
    serotonin: number;
}

interface TimelineDescription {
    period: string;
    weekInfo: string;
    events: string[];
}

const HORMONE_DATA: Record<number, HormoneData> = {
    0: { estrogen: 20, progesterone: 25, cortisol: 40, oxytocin: 30, serotonin: 55 },
    8: { estrogen: 35, progesterone: 40, cortisol: 45, oxytocin: 35, serotonin: 50 },
    12: { estrogen: 50, progesterone: 55, cortisol: 50, oxytocin: 40, serotonin: 48 },
    16: { estrogen: 65, progesterone: 70, cortisol: 55, oxytocin: 45, serotonin: 52 },
    20: { estrogen: 75, progesterone: 80, cortisol: 58, oxytocin: 50, serotonin: 54 },
    24: { estrogen: 82, progesterone: 85, cortisol: 60, oxytocin: 55, serotonin: 56 },
    28: { estrogen: 88, progesterone: 90, cortisol: 62, oxytocin: 58, serotonin: 53 },
    32: { estrogen: 92, progesterone: 93, cortisol: 65, oxytocin: 60, serotonin: 50 },
    36: { estrogen: 95, progesterone: 95, cortisol: 68, oxytocin: 65, serotonin: 48 },
    40: { estrogen: 98, progesterone: 98, cortisol: 70, oxytocin: 95, serotonin: 45 },
    41: { estrogen: 20, progesterone: 22, cortisol: 85, oxytocin: 70, serotonin: 38 },
    42: { estrogen: 18, progesterone: 20, cortisol: 88, oxytocin: 65, serotonin: 35 },
    44: { estrogen: 22, progesterone: 23, cortisol: 82, oxytocin: 60, serotonin: 38 },
    46: { estrogen: 25, progesterone: 25, cortisol: 75, oxytocin: 58, serotonin: 42 },
    50: { estrogen: 28, progesterone: 28, cortisol: 68, oxytocin: 55, serotonin: 45 },
    52: { estrogen: 30, progesterone: 30, cortisol: 62, oxytocin: 52, serotonin: 48 },
    56: { estrogen: 33, progesterone: 32, cortisol: 58, oxytocin: 50, serotonin: 50 },
    64: { estrogen: 38, progesterone: 35, cortisol: 50, oxytocin: 48, serotonin: 52 }
};

const TIMELINE_DESCRIPTIONS: Record<number, TimelineDescription> = {
    0: {
        period: 'Conception & Early Pregnancy',
        weekInfo: 'Weeks 0-4',
        events: [
            'Conception occurs - hormonal cascade begins',
            'hCG rises rapidly to support corpus luteum',
            'Estrogen and progesterone start climbing',
            'Early pregnancy symptoms may begin'
        ]
    },
    8: {
        period: 'First Trimester',
        weekInfo: 'Week 8',
        events: [
            'Morning sickness peaks due to hCG surge',
            'Progesterone causes fatigue and mood changes',
            'Estrogen levels rising steadily',
            'Emotional sensitivity increases',
            'Risk period for prenatal depression begins'
        ]
    },
    12: {
        period: 'End of First Trimester',
        weekInfo: 'Week 12',
        events: [
            'Placenta takes over hormone production',
            'Morning sickness typically subsides',
            'Progesterone continues 10-fold increase',
            'Energy levels may improve slightly',
            'Mood stabilization for many women'
        ]
    },
    20: {
        period: 'Second Trimester - "Honeymoon Period"',
        weekInfo: 'Week 20',
        events: [
            'Peak energy and mood for many women',
            'Estrogen reaches 75% of maximum levels',
            'Quickening - first fetal movements felt',
            'Cortisol elevation continues gradually',
            'Improved serotonin function in many cases'
        ]
    },
    28: {
        period: 'Third Trimester Begins',
        weekInfo: 'Week 28',
        events: [
            'Physical discomfort increases significantly',
            'Sleep disruption worsens - affects cortisol',
            'Hormones near peak levels',
            'Anxiety about labor/motherhood intensifies',
            'Depression risk increases again'
        ]
    },
    36: {
        period: 'Late Third Trimester',
        weekInfo: 'Week 36',
        events: [
            'Maximum physical and emotional stress',
            'Estrogen and progesterone at 95% peak',
            'Severe sleep deprivation common',
            'Cortisol elevation affects mood regulation',
            'Body preparing for labor'
        ]
    },
    40: {
        period: 'Birth & Delivery',
        weekInfo: 'Week 40',
        events: [
            'Labor and delivery trigger massive hormonal shifts',
            'Estrogen drops 100-fold within 24 hours',
            'Progesterone crashes dramatically',
            'Oxytocin surges during delivery and breastfeeding',
            'Highest risk period for postpartum depression begins'
        ]
    },
    42: {
        period: '2 Weeks Postpartum',
        weekInfo: 'Week 42 (2 weeks postpartum)',
        events: [
            'Hormones at lowest point - critical danger zone',
            'Estrogen only 20% of pregnancy peak',
            '"Baby blues" affect 50-80% of mothers',
            'Severe sleep deprivation elevates cortisol to 88%',
            'Postpartum depression emerges in 10-20% of women',
            'Oxytocin fluctuates with breastfeeding'
        ]
    },
    46: {
        period: '6 Weeks Postpartum',
        weekInfo: 'Week 46 (6 weeks postpartum)',
        events: [
            'Hormones beginning slow recovery',
            'Physical healing mostly complete',
            'Cortisol remains elevated from sleep deprivation',
            'Serotonin still significantly suppressed',
            'Depression symptoms may persist or worsen',
            'First postpartum medical checkup typically occurs'
        ]
    },
    52: {
        period: '3 Months Postpartum',
        weekInfo: 'Week 52 (3 months postpartum)',
        events: [
            'Gradual hormonal stabilization continues',
            'Estrogen recovering to 30% baseline',
            'Sleep patterns may improve slightly',
            'Infant care routines becoming established',
            'Depression may persist without treatment',
            'Return to work stress for many mothers'
        ]
    },
    64: {
        period: '6 Months Postpartum',
        weekInfo: 'Week 64 (6 months postpartum)',
        events: [
            'Hormones approaching pre-pregnancy baseline',
            'Menstrual cycle may resume (if not breastfeeding)',
            'Cortisol levels normalizing',
            'Serotonin function improving',
            'Untreated depression can become chronic',
            'Bonding and maternal confidence strengthening'
        ]
    }
};

const HormoneTimeline: React.FC = () => {
    const [week, setWeek] = useState(40);
    const [values, setValues] = useState<HormoneData>(HORMONE_DATA[40]);
    const [description, setDescription] = useState<TimelineDescription>(TIMELINE_DESCRIPTIONS[40]);

    useEffect(() => {
        // Interpolation logic
        const weeks = Object.keys(HORMONE_DATA).map(Number).sort((a, b) => a - b);
        let lowerWeek = weeks[0];
        let upperWeek = weeks[weeks.length - 1];

        for (let i = 0; i < weeks.length - 1; i++) {
            if (week >= weeks[i] && week <= weeks[i + 1]) {
                lowerWeek = weeks[i];
                upperWeek = weeks[i + 1];
                break;
            }
        }

        if (HORMONE_DATA[week]) {
            setValues(HORMONE_DATA[week]);
        } else {
            const ratio = (week - lowerWeek) / (upperWeek - lowerWeek);
            const lowerData = HORMONE_DATA[lowerWeek];
            const upperData = HORMONE_DATA[upperWeek];
            setValues({
                estrogen: Math.round(lowerData.estrogen + (upperData.estrogen - lowerData.estrogen) * ratio),
                progesterone: Math.round(lowerData.progesterone + (upperData.progesterone - lowerData.progesterone) * ratio),
                cortisol: Math.round(lowerData.cortisol + (upperData.cortisol - lowerData.cortisol) * ratio),
                oxytocin: Math.round(lowerData.oxytocin + (upperData.oxytocin - lowerData.oxytocin) * ratio),
                serotonin: Math.round(lowerData.serotonin + (upperData.serotonin - lowerData.serotonin) * ratio)
            });
        }

        // Closest description
        const descWeeks = Object.keys(TIMELINE_DESCRIPTIONS).map(Number).sort((a, b) => a - b);
        let closestWeek = descWeeks[0];
        for (let i = 0; i < descWeeks.length; i++) {
            if (Math.abs(week - descWeeks[i]) <= Math.abs(week - closestWeek)) {
                closestWeek = descWeeks[i];
            }
        }
        setDescription(TIMELINE_DESCRIPTIONS[closestWeek]);
    }, [week]);

    const getHormoneDesc = (name: string, value: number) => {
        if (week <= 40) {
            switch (name) {
                case 'estrogen': return value > 80 ? 'Peak levels supporting fetal development' : 'Rising steadily to support pregnancy';
                case 'progesterone': return value > 80 ? 'Maximum levels - causes fatigue' : 'Increasing to maintain pregnancy';
                case 'cortisol': return value > 60 ? 'Elevated stress response' : 'Gradually rising stress response';
                case 'oxytocin': return week >= 36 ? 'Rising in preparation for labor' : 'Low levels during pregnancy';
                case 'serotonin': return value < 50 ? 'Suppressed - increases depression risk' : 'Relatively stable mood stabilizer';
                default: return '';
            }
        } else {
            switch (name) {
                case 'estrogen': return value < 30 ? 'CRASHED - disrupts mood regulation' : 'Slowly recovering from crash';
                case 'progesterone': return value < 30 ? 'CRASHED - increases anxiety' : 'Gradually stabilizing';
                case 'cortisol': return value > 75 ? 'SEVERELY ELEVATED - sleep deprivation' : 'Normalizing as sleep improves';
                case 'oxytocin': return value > 60 ? 'Fluctuating with breastfeeding' : 'Declining but present for bonding';
                case 'serotonin': return value < 45 ? 'CRITICALLY LOW - major factor in PPD' : 'Recovering as hormones stabilize';
                default: return '';
            }
        }
    };

    return (
        <div className="hormone-timeline-container">
            <div className="timeline-header">
                <div className="timeline-period-title">{description.period}</div>
                <div className="timeline-week-pill">{description.weekInfo}</div>
            </div>

            <div className="timeline-slider-box">
                <input
                    type="range"
                    min="0"
                    max="64"
                    value={week}
                    onChange={(e) => setWeek(parseInt(e.target.value))}
                    className="timeline-range-slider"
                />
                <div className="timeline-range-labels">
                    <span>Start</span>
                    <span>Birth (Wk 40)</span>
                    <span>6 Months</span>
                </div>
            </div>

            <div className="hormone-meters-grid">
                {[
                    { id: 'estrogen', label: 'Estrogen', color: '#4caf50', icon: '🍃' },
                    { id: 'progesterone', label: 'Progesterone', color: '#9c27b0', icon: '🌙' },
                    { id: 'cortisol', label: 'Cortisol', color: '#ff5722', icon: '🔥' },
                    { id: 'oxytocin', label: 'Oxytocin', color: '#e91e63', icon: '❤️' },
                    { id: 'serotonin', label: 'Serotonin', color: '#00bcd4', icon: '💎' }
                ].map(h => (
                    <div key={h.id} className="hormone-meter-card">
                        <div className="hormone-meter-label">
                            <span>{h.icon} {h.label}</span>
                            <span className="hormone-value">{values[h.id as keyof HormoneData]}%</span>
                        </div>
                        <div className="hormone-meter-track">
                            <div
                                className="hormone-meter-fill"
                                style={{
                                    height: `${values[h.id as keyof HormoneData]}%`,
                                    background: `linear-gradient(to top, ${h.color}88, ${h.color})`
                                }}
                            />
                        </div>
                        <p className="hormone-meter-desc">{getHormoneDesc(h.id, values[h.id as keyof HormoneData])}</p>
                    </div>
                ))}
            </div>

            <div className="timeline-events-box">
                <h4>💡 Key Events & Biological Impact</h4>
                <ul>
                    {description.events.map((event, i) => (
                        <li key={i}>{event}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HormoneTimeline;
