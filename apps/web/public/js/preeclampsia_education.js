// Preeclampsia Education & Simulation Logic

// Global state
let currentSeverity = 0; // 0-100
let currentWeek = 20; // 20-40
let audioContext = null;
let activeBodyPart = null;

document.addEventListener('DOMContentLoaded', function () {
    console.log('Preeclampsia Education Module Loaded');

    initializeSliders();
    initialize3DViewer();
    initializeComparisonView();
    setupEventListeners();

    // Show welcome modal if first visit
    if (!localStorage.getItem('pe_intro_seen')) {
        // showIntroModal(); // Uncomment if we have an intro modal
        localStorage.setItem('pe_intro_seen', 'true');
    }

    // Initialize tooltips
    initTooltips();
});

function initializeSliders() {
    const severitySlider = document.getElementById('severitySlider');
    const timelineSlider = document.getElementById('timelineSlider');

    if (severitySlider) {
        severitySlider.addEventListener('input', function (e) {
            updateSeverityLevel(this.value);
        });
    }

    if (timelineSlider) {
        timelineSlider.addEventListener('input', function (e) {
            updatePregnancyWeek(this.value);
        });
    }
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            this.classList.add('active');
            const sectionId = this.getAttribute('data-section');
            // Scroll to section logic here
        });
    });

    // View Toggles
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const mode = this.getAttribute('data-mode');
            switchViewMode(mode);
        });
    });

    // Audio Toggle
    const audioBtn = document.getElementById('audioToggle');
    if (audioBtn) {
        audioBtn.addEventListener('click', toggleAudioSymptoms);
    }

    // Journey Controls
    const playBtn = document.getElementById('playBtn');
    const resetBtn = document.getElementById('resetBtn');

    if (playBtn) playBtn.addEventListener('click', playJourney);
    if (resetBtn) resetBtn.addEventListener('click', resetJourney);
}

// 3D Visualizer Logic (Simplified for 2D/SVG fallback)
function initialize3DViewer() {
    // Check if we have WebGL support, otherwise fallback to SVG
    const canvas = document.getElementById('bodyCanvas');
    if (canvas && window.WebGLRenderingContext) {
        // Initialize Three.js or similar here if needed
        // For now, we are using the enhanced SVG visualization
        console.log('Initializing visualization...');
    }
}

function initializeComparisonView() {
    // Setup the side-by-side comparison logic
}

// Initialize tooltips for interactive elements
function initTooltips() {
    const sensitiveAreas = document.querySelectorAll('.sensitive-area');

    sensitiveAreas.forEach(area => {
        area.addEventListener('mouseenter', function (e) {
            const tooltip = document.getElementById('tooltip');
            const info = this.getAttribute('data-info');
            if (tooltip && info) {
                tooltip.textContent = info;
                tooltip.style.display = 'block';
                tooltip.style.left = e.pageX + 10 + 'px';
                tooltip.style.top = e.pageY + 10 + 'px';
            }
        });

        area.addEventListener('mouseleave', function () {
            const tooltip = document.getElementById('tooltip');
            if (tooltip) tooltip.style.display = 'none';
        });
    });
}

// Severity update logic
function updateSeverityLevel(value) {
    const severityDisplay = document.getElementById('severityDisplay');
    const statusBadge = document.getElementById('currentStatusBadge');
    const badgeIcon = statusBadge ? statusBadge.querySelector('.badge-icon') : null;
    const badgeText = statusBadge ? statusBadge.querySelector('.badge-text') : null;

    let severity, icon, text, bgColor, borderColor;

    if (value < 25) {
        severity = 'normal';
        icon = '✅';
        text = 'Normal Pregnancy';
        if (severityDisplay) severityDisplay.textContent = 'Normal';
        bgColor = 'rgba(102, 187, 106, 0.15)';
        borderColor = '#66bb6a';
    } else if (value < 50) {
        severity = 'mild';
        icon = '🟢';
        text = 'Mild Preeclampsia';
        if (severityDisplay) severityDisplay.textContent = 'Mild';
        bgColor = 'rgba(255, 193, 7, 0.15)';
        borderColor = '#ffa726';
    } else if (value < 75) {
        severity = 'moderate';
        icon = '🟡';
        text = 'Moderate Preeclampsia';
        if (severityDisplay) severityDisplay.textContent = 'Moderate';
        bgColor = 'rgba(255, 152, 0, 0.15)';
        borderColor = '#ff9800';
    } else {
        severity = 'severe';
        icon = '🔴';
        text = 'Severe Preeclampsia';
        if (severityDisplay) severityDisplay.textContent = 'Severe';
        bgColor = 'rgba(244, 67, 54, 0.15)';
        borderColor = '#f44336';
    }

    if (statusBadge) {
        if (badgeIcon) badgeIcon.textContent = icon;
        if (badgeText) badgeText.textContent = text;
        statusBadge.style.backgroundColor = bgColor;
        statusBadge.style.borderColor = borderColor;
    }

    // Update SVG Body
    if (typeof updateSVGBodySeverity === 'function') {
        updateSVGBodySeverity(value);
    }

    // Update vital signs
    if (typeof updateVitalSigns === 'function') {
        updateVitalSigns(severity, value);
    }

    // Update info panel
    if (typeof updateInfoPanel === 'function') {
        updateInfoPanel(severity);
    }

    // Update waveforms
    if (typeof updateVitalWaveforms === 'function') {
        updateVitalWaveforms(severity);
    }

    // Trigger audio symptoms if enabled
    if (audioContext && value > 50) {
        // updateAudioIntensity(value); 
    }
}

// Pregnancy week update
function updatePregnancyWeek(week) {
    const weekDisplay = document.getElementById('weekDisplay');
    if (weekDisplay) weekDisplay.textContent = `Week ${week}`;

    const normalWeek = document.getElementById('normalWeek');
    const peWeek = document.getElementById('peWeek');

    if (normalWeek) normalWeek.textContent = week;
    if (peWeek) peWeek.textContent = week;
}

// Audio context handling
function toggleAudioSymptoms() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioContext.state === 'suspended') {
        audioContext.resume();
        this.textContent = '🔊 Audio On';
        this.classList.add('active');
    } else {
        audioContext.suspend();
        this.textContent = '🔇 Audio Off';
        this.classList.remove('active');
    }
}

function updateAudioIntensity(severity) {
    // Increase volume/pitch of tinnitus sound based on severity
    // (Implementation details omitted for brevity)
}

// Journey Animation
let journeyInterval;
function playJourney() {
    if (journeyInterval) return;

    let sev = 0;
    const slider = document.getElementById('severitySlider');

    journeyInterval = setInterval(() => {
        sev += 1;
        if (sev > 100) {
            clearInterval(journeyInterval);
            journeyInterval = null;
            return;
        }

        if (slider) {
            slider.value = sev;
            updateSeverityLevel(sev);
        }
    }, 100); // 10 seconds for full journey
}

function resetJourney() {
    if (journeyInterval) {
        clearInterval(journeyInterval);
        journeyInterval = null;
    }

    const slider = document.getElementById('severitySlider');
    if (slider) {
        slider.value = 0;
        updateSeverityLevel(0);
    }
}

// View mode switching
function switchViewMode(mode) {
    // Remove active class from all buttons
    document.querySelectorAll('.view-mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Add active to clicked button
    const activeBtn = document.querySelector(`[data-view="${mode}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    const mainView = document.querySelector('.main-visualization-grid');
    const comparisonView = document.getElementById('comparisonView');
    const journeyControls = document.getElementById('journeyControls');

    if (mainView) mainView.style.display = mode === '3d' ? 'grid' : 'none';
    if (comparisonView) comparisonView.style.display = mode === 'comparison' ? 'grid' : 'none';
    if (journeyControls) journeyControls.style.display = mode === 'journey' ? 'flex' : 'none';

    if (mode === 'journey') {
        resetJourney();
    } else if (mode === 'comparison') {
        animateComparison();
    }
}

// Animate comparison view on load
function animateComparison() {
    const panels = document.querySelectorAll('.comparison-panel');
    panels.forEach((panel, index) => {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(30px)';

        setTimeout(() => {
            panel.style.transition = 'all 0.6s ease';
            panel.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Organ modal
const organData = {
    brain: {
        icon: '🧠',
        name: 'Brain',
        normalDesc: 'Normal blood flow, no headaches or visual disturbances. Brain vessels functioning properly with optimal oxygen delivery.',
        affectedDesc: 'Constricted blood vessels cause severe headaches, vision changes, confusion, and increased risk of seizures (eclampsia). Cerebral edema may develop.',
        symptoms: [
            'Severe, persistent headache that doesn\'t respond to paracetamol',
            'Blurred vision or seeing spots/flashing lights',
            'Temporary vision loss or scotomas',
            'Light sensitivity (photophobia)',
            'Confusion or altered mental state',
            'Seizures (eclampsia - life-threatening emergency)'
        ],
        action: 'Severe headache or any vision changes require IMMEDIATE medical attention. Call 108/102 NOW. These are warning signs of severe preeclampsia or impending eclampsia.'
    },
    eyes: {
        icon: '👁️',
        name: 'Eyes & Vision',
        normalDesc: 'Clear, sharp vision with normal blood flow to retinal vessels. No visual disturbances.',
        affectedDesc: 'Retinal blood vessel spasms and swelling of the optic nerve cause blurred vision, scotomas (blind spots), flashing lights, or temporary blindness.',
        symptoms: [
            'Persistent blurred or double vision',
            'Seeing spots or "floaters"',
            'Flashing lights in peripheral vision',
            'Temporary loss of vision',
            'Sensitivity to bright lights',
            'Difficulty focusing'
        ],
        action: 'Vision changes are SEVERE symptoms indicating high blood pressure effects on the brain and eyes. Seek immediate emergency care.'
    },
    heart: {
        icon: '❤️',
        name: 'Heart & Circulation',
        normalDesc: 'Heart pumping efficiently at normal rate (70-90 BPM) with good blood pressure. Adequate blood supply to all organs.',
        affectedDesc: 'Heart works harder to pump against increased vascular resistance. Risk of cardiomyopathy, pulmonary edema (fluid in lungs), and heart failure.',
        symptoms: [
            'Rapid heartbeat or palpitations',
            'Chest pain or tightness',
            'Severe shortness of breath',
            'Difficulty breathing when lying flat',
            'Extreme fatigue and weakness',
            'Swelling in lungs (pulmonary edema)'
        ],
        action: 'Chest pain or severe difficulty breathing requires EMERGENCY care. Call 108/102 immediately. May indicate heart strain or pulmonary edema.'
    },
    liver: {
        icon: '🫀',
        name: 'Liver',
        normalDesc: 'Liver enzymes normal (ALT <40, AST <40). Processing nutrients, producing proteins, and filtering blood effectively.',
        affectedDesc: 'Liver swelling, hemorrhage, and damage. HELLP syndrome risk (Hemolysis, Elevated Liver enzymes, Low Platelets). Can lead to liver rupture.',
        symptoms: [
            'Severe pain in upper right abdomen (below ribs)',
            'Pain that may radiate to right shoulder blade',
            'Persistent nausea and vomiting',
            'Jaundice (yellowing of skin/eyes)',
            'Tenderness when pressing on liver area',
            'Dark urine from liver dysfunction'
        ],
        action: 'Upper right abdominal pain is a SEVERE EMERGENCY symptom indicating liver involvement (HELLP syndrome). Requires immediate hospitalization and may need emergency delivery.'
    },
    kidneys: {
        icon: '🫘',
        name: 'Kidneys',
        normalDesc: 'Kidneys filtering blood properly with intact glomerular basement membrane. No protein leakage. Normal urine output (1-2L/day).',
        affectedDesc: 'Damaged kidney filters (glomerular endotheliosis) allow protein to leak into urine. Reduced filtration rate. Risk of acute kidney injury and failure.',
        symptoms: [
            'Protein in urine (proteinuria) - detected by urine dipstick',
            'Decreased urine output (oliguria)',
            'Sudden severe swelling (face, hands, ankles)',
            'Foamy or bubbly urine from excess protein',
            'Dark-colored urine',
            'Elevated creatinine levels in blood'
        ],
        action: 'Proteinuria is a KEY diagnostic criterion for preeclampsia. Regular urine protein testing during pregnancy helps detect this early. Decreased urine output needs urgent evaluation.'
    },
    placenta: {
        icon: '🤰',
        name: 'Placenta & Baby',
        normalDesc: 'Placenta receiving optimal blood flow (500-700 mL/min), providing abundant oxygen and nutrients. Baby growing at expected rate for gestational age.',
        affectedDesc: 'Inadequate spiral artery remodeling causes reduced placental perfusion. Poor oxygen/nutrient transfer leads to fetal growth restriction, oligohydramnios, placental abruption risk.',
        symptoms: [
            'Decreased fetal movement (kick counts)',
            'Fundal height measuring small for dates',
            'Baby growing slower than expected (IUGR)',
            'Reduced amniotic fluid (oligohydramnios)',
            'Abnormal fetal heart rate patterns',
            'Placental insufficiency on Doppler ultrasound'
        ],
        action: 'Decreased fetal movement is URGENT. If baby is moving less than usual or you don\'t feel 10 kicks in 2 hours, contact doctor immediately. Baby may not be getting enough oxygen.'
    },
    hands: {
        icon: '✋',
        name: 'Hands',
        normalDesc: 'Normal circulation with minimal swelling. Mild ankle/foot swelling late in day is normal in pregnancy.',
        affectedDesc: 'SUDDEN severe swelling (edema) from fluid leaking into tissues due to low protein in blood and increased vascular permeability. Rings won\'t fit.',
        symptoms: [
            'Rapid swelling appearing within hours (not days)',
            'Rings become too tight or impossible to remove',
            'Hands feel puffy, tight, or numb',
            'Skin appears shiny or stretched',
            'Difficulty making a fist or bending fingers',
            'Pitting edema (finger pressure leaves indent)'
        ],
        action: 'SUDDEN swelling (within hours/overnight) of hands, especially with facial swelling, needs same-day evaluation. Gradual ankle swelling alone is usually normal pregnancy.'
    },
    feet: {
        icon: '🦶',
        name: 'Feet & Ankles',
        normalDesc: 'Mild dependent edema (ankle swelling) in late pregnancy is normal, improves with rest and elevation. No pain or tenderness.',
        affectedDesc: 'SEVERE pitting edema that doesn\'t improve with rest. Swelling extends up legs. Combined with hand/face swelling indicates severe fluid retention.',
        symptoms: [
            'Severe swelling that doesn\'t reduce after overnight rest',
            'Deep pitting edema (pressure indent lasts >10 seconds)',
            'Shoes suddenly don\'t fit or feel extremely tight',
            'Swelling extends above ankles to calves/thighs',
            'Accompanied by hand and/or facial swelling',
            'Skin feels tight, shiny, or painful'
        ],
        action: 'Some ankle swelling is normal. However, if sudden, severe, non-reducing, AND accompanied by facial/hand swelling, high BP, or headache - seek immediate medical evaluation.'
    }
};

function openOrganModal(organName) {
    const modal = document.getElementById('organModalOverlay');
    if (!modal) return;

    const data = organData[organName];
    if (!data) return;

    const elements = {
        icon: document.getElementById('modalOrganIcon'),
        name: document.getElementById('modalOrganName'),
        normalDesc: document.getElementById('normalOrganDesc'),
        affectedDesc: document.getElementById('affectedOrganDesc'),
        action: document.getElementById('organActionText'),
        symptoms: document.getElementById('organSymptomsList')
    };

    if (elements.icon) elements.icon.textContent = data.icon;
    if (elements.name) elements.name.textContent = data.name;
    if (elements.normalDesc) elements.normalDesc.textContent = data.normalDesc;
    if (elements.affectedDesc) elements.affectedDesc.textContent = data.affectedDesc;
    if (elements.action) elements.action.textContent = data.action;
    if (elements.symptoms) elements.symptoms.innerHTML = data.symptoms.map(s => `<li>${s}</li>`).join('');

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeOrganModal() {
    const modal = document.getElementById('organModalOverlay');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Comprehensive body part information
const bodyPartInfo = {
    brain: {
        normal: {
            title: "🧠 Brain - Normal Function",
            description: "Healthy blood flow ensures clear thinking, no headaches, normal sleep patterns, and proper neurological function.",
            details: [
                "Normal cerebral blood flow",
                "No visual disturbances",
                "Clear mental function",
                "Regular sleep patterns",
                "No seizure risk"
            ]
        },
        pe: {
            title: "🧠 Brain - Severely Affected",
            description: "Reduced blood flow causes severe headaches, vision problems, confusion, and seizure risk (eclampsia).",
            details: [
                "Severe persistent headaches",
                "Vision changes (blurry, spots, flashing lights)",
                "Confusion or altered consciousness",
                "Light sensitivity",
                "Risk of seizures (eclampsia)"
            ],
            warning: "IMMEDIATE MEDICAL ATTENTION REQUIRED"
        }
    },

    eyes: {
        normal: {
            title: "👁️ Eyes - Normal Vision",
            description: "Clear vision with healthy blood vessels in the retina. No visual disturbances.",
            details: [
                "Clear, sharp vision",
                "No light sensitivity",
                "Healthy retinal blood vessels",
                "No spots or floaters"
            ]
        },
        pe: {
            title: "👁️ Eyes - Vision Problems",
            description: "Blood vessel constriction causes blurry vision, seeing spots, or temporary vision loss.",
            details: [
                "Blurry or double vision",
                "Seeing spots or flashing lights",
                "Light sensitivity (photophobia)",
                "Temporary vision loss possible",
                "Retinal damage risk"
            ],
            warning: "Vision changes are a serious warning sign"
        }
    },

    heart: {
        normal: {
            title: "❤️ Heart - Healthy Blood Pressure",
            description: "Blood pressure at optimal 120/80 mmHg. Heart working efficiently without strain.",
            details: [
                "BP: 120/80 mmHg",
                "Normal cardiac output",
                "No chest pain",
                "Efficient blood circulation",
                "Low stroke risk"
            ]
        },
        pe: {
            title: "❤️ Heart - High Blood Pressure",
            description: "Dangerously elevated BP (≥140/90) forces heart to work much harder, increasing stroke and heart attack risk.",
            details: [
                "BP: 160/110 mmHg or higher",
                "Increased cardiac workload",
                "Chest pain or pressure possible",
                "Rapid heartbeat",
                "High stroke risk"
            ],
            warning: "Sustained high BP can cause permanent heart damage"
        }
    },

    liver: {
        normal: {
            title: "🫀 Liver - Normal Function",
            description: "Liver processing blood properly with normal enzyme levels and no inflammation.",
            details: [
                "Normal enzyme levels",
                "Proper blood protein production",
                "No pain or tenderness",
                "Healthy bile production"
            ]
        },
        pe: {
            title: "🫀 Liver - HELLP Syndrome Risk",
            description: "Liver enzymes elevated, causing upper right abdominal pain. Risk of HELLP syndrome.",
            details: [
                "Elevated liver enzymes",
                "Upper right abdominal pain",
                "Nausea and vomiting",
                "Risk of HELLP syndrome",
                "Possible liver damage"
            ],
            warning: "HELLP syndrome is life-threatening"
        }
    },

    kidneys: {
        normal: {
            title: "🫘 Kidneys - Healthy Filtering",
            description: "Kidneys filtering blood efficiently with no protein leakage into urine.",
            details: [
                "No protein in urine",
                "Normal urine output",
                "Proper waste removal",
                "Balanced electrolytes",
                "Clear, normal-colored urine"
            ]
        },
        pe: {
            title: "🫘 Kidneys - Proteinuria & Damage",
            description: "Kidneys leaking large amounts of protein into urine, reducing filtering capacity.",
            details: [
                "Protein in urine (4+)",
                "Reduced urine output",
                "Foamy urine appearance",
                "Fluid retention",
                "Risk of kidney failure"
            ],
            warning: "Kidney damage can be permanent"
        }
    },

    placenta: {
        normal: {
            title: "🤰 Placenta - Optimal Blood Flow",
            description: "Healthy blood vessels deliver oxygen and nutrients to baby efficiently.",
            details: [
                "Optimal blood flow",
                "Efficient nutrient transfer",
                "Normal baby growth",
                "Adequate amniotic fluid",
                "Strong fetal movements"
            ]
        },
        pe: {
            title: "🤰 Placenta - Restricted Flow",
            description: "Constricted blood vessels reduce oxygen and nutrients to baby, causing growth restriction.",
            details: [
                "Reduced blood flow",
                "Placental insufficiency",
                "Fetal growth restriction (FGR)",
                "Low amniotic fluid",
                "Reduced fetal movement",
                "Risk of placental abruption"
            ],
            warning: "Baby's growth and oxygen supply are compromised"
        }
    },

    hands: {
        normal: {
            title: "✋ Hands - Normal Size",
            description: "No swelling, normal sensation, proper circulation.",
            details: [
                "Normal size and shape",
                "No puffiness",
                "Can make fist easily",
                "Rings fit normally"
            ]
        },
        pe: {
            title: "✋ Hands - Swollen (Edema)",
            description: "Significant swelling due to fluid retention. Rings may not fit.",
            details: [
                "Visible swelling",
                "Puffy fingers",
                "Rings too tight or won't fit",
                "Difficulty making fist",
                "Shiny, stretched skin"
            ],
            warning: "Sudden hand swelling is a warning sign"
        }
    },

    feet: {
        normal: {
            title: "🦶 Feet - Normal Size",
            description: "No swelling, shoes fit comfortably.",
            details: [
                "Normal size",
                "No ankle swelling",
                "Shoes fit normally",
                "No pain or tightness"
            ]
        },
        pe: {
            title: "🦶 Feet - Severely Swollen",
            description: "Extreme swelling (edema) in feet and ankles. Shoes may not fit.",
            details: [
                "Significant swelling",
                "Puffy ankles",
                "Shoes too tight or won't fit",
                "Indentation when pressed (pitting edema)",
                "Heavy, uncomfortable feeling"
            ],
            warning: "Sudden severe swelling needs immediate attention"
        }
    },

    legs: {
        normal: {
            title: "🦵 Legs - Normal",
            description: "No swelling, normal mobility and circulation.",
            details: [
                "Normal size",
                "No visible swelling",
                "Full range of motion",
                "No pain or heaviness"
            ]
        },
        pe: {
            title: "🦵 Legs - Swollen & Heavy",
            description: "Fluid retention causes swelling and heaviness in legs.",
            details: [
                "Visible swelling",
                "Heavy, tired feeling",
                "Skin may be tight or shiny",
                "Indentation when pressed",
                "Difficulty walking"
            ],
            warning: "Check for deep vein thrombosis (DVT) if one leg more swollen"
        }
    },

    head: {
        normal: {
            title: "😊 Overall Health - Good",
            description: "Feeling well with no concerning symptoms.",
            details: [
                "No headaches",
                "Normal energy levels",
                "Good mood",
                "Sleeping well"
            ]
        },
        pe: {
            title: "😟 Overall Health - Multiple Symptoms",
            description: "Multiple concerning symptoms affecting wellbeing.",
            details: [
                "Persistent severe headaches",
                "Fatigue and weakness",
                "Anxiety about condition",
                "Sleep disturbances",
                "General feeling of being unwell"
            ],
            warning: "Listen to your body - multiple symptoms require medical care"
        }
    },

    neck: {
        normal: {
            title: "Neck - Normal",
            description: "No swelling or fluid retention in neck area.",
            details: ["Normal size", "No puffiness", "Full range of motion"]
        },
        pe: {
            title: "Neck - May Show Swelling",
            description: "Severe fluid retention can cause facial and neck puffiness.",
            details: ["Possible puffiness", "Facial swelling", "Uncomfortable feeling"],
            warning: "Facial swelling can indicate severe PE"
        }
    },

    chest: {
        normal: {
            title: "Chest - Normal",
            description: "Normal breathing, no chest pain, heart functioning well.",
            details: ["Easy breathing", "No chest pain", "Normal heart rate"]
        },
        pe: {
            title: "Chest - Breathing Issues",
            description: "Fluid in lungs (pulmonary edema) can cause shortness of breath.",
            details: [
                "Shortness of breath",
                "Chest pain possible",
                "Rapid breathing",
                "Fluid in lungs (severe cases)",
                "Low oxygen levels possible"
            ],
            warning: "Breathing difficulty requires immediate medical attention"
        }
    },

    belly: {
        normal: {
            title: "Belly - Healthy Pregnancy",
            description: "Growing baby with adequate amniotic fluid and normal movements.",
            details: [
                "Baby growing well",
                "Normal fetal movement",
                "Adequate amniotic fluid",
                "No abnormal pain"
            ]
        },
        pe: {
            title: "Belly - Baby At Risk",
            description: "Reduced placental blood flow affects baby's growth and movement.",
            details: [
                "Reduced fetal movement",
                "Growth restriction possible",
                "Low amniotic fluid risk",
                "Upper right pain (liver area)",
                "Increased contractions risk"
            ],
            warning: "Decreased fetal movement requires immediate check"
        }
    },

    arms: {
        normal: {
            title: "Arms - Normal",
            description: "Normal size and function with no swelling.",
            details: ["Normal size", "No swelling", "Full range of motion"]
        },
        pe: {
            title: "Arms - May Be Swollen",
            description: "Some swelling possible due to fluid retention.",
            details: [
                "Possible mild swelling",
                "Tight feeling",
                "May feel heavy"
            ],
            warning: "Sudden arm swelling should be checked"
        }
    },

    lungs: {
        normal: {
            title: "🫁 Lungs - Clear Breathing",
            description: "Normal oxygen exchange, no fluid accumulation, easy breathing.",
            details: [
                "Clear lungs",
                "Easy, comfortable breathing",
                "Normal oxygen levels",
                "No shortness of breath"
            ]
        },
        pe: {
            title: "🫁 Lungs - Pulmonary Edema Risk",
            description: "Severe preeclampsia can cause fluid to leak into lungs, making breathing difficult.",
            details: [
                "Shortness of breath",
                "Rapid, shallow breathing",
                "Chest tightness or pain",
                "Fluid in lungs (severe cases)",
                "Low oxygen levels possible"
            ],
            warning: "Breathing difficulty is a MEDICAL EMERGENCY - call 108 immediately"
        }
    },

    face: {
        normal: {
            title: "😊 Face - Normal Appearance",
            description: "No swelling, normal complexion, relaxed expression.",
            details: [
                "No puffiness",
                "Normal facial features",
                "Healthy skin tone"
            ]
        },
        pe: {
            title: "😟 Face - Swollen & Distressed",
            description: "Sudden facial swelling (especially around eyes) is a serious warning sign.",
            details: [
                "Puffy face, especially eyes",
                "Swollen cheeks",
                "Tight, stretched skin",
                "Facial distress visible"
            ],
            warning: "SUDDEN facial swelling requires immediate medical attention"
        }
    }
};

// Add click event listeners to all clickable parts
document.addEventListener('DOMContentLoaded', function () {
    // Wait for comparison view to be loaded
    setTimeout(function () {
        const clickableParts = document.querySelectorAll('.clickable-part');

        clickableParts.forEach(part => {
            part.addEventListener('click', function (e) {
                e.stopPropagation();
                const bodyPart = this.getAttribute('data-part');
                const isNormal = this.closest('.body-normal') !== null;
                const state = isNormal ? 'normal' : 'pe';

                showBodyPartDetail(bodyPart, state);
            });
        });
    }, 500);
});

// Show detailed information modal
function showBodyPartDetail(part, state) {
    const info = bodyPartInfo[part]?.[state];
    if (!info) return;

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'body-part-modal';
    modal.innerHTML = `
    <div class="modal-content-bodypart">
      <button class="modal-close" onclick="this.parentElement.parentElement.remove()">✕</button>
      
      <h2>${info.title}</h2>
      <p class="modal-description">${info.description}</p>
      
      <div class="details-section">
        <h3>${state === 'normal' ? '✅ Healthy Signs:' : '⚠️ Warning Signs:'}</h3>
        <ul class="details-list">
          ${info.details.map(detail => `<li>${detail}</li>`).join('')}
        </ul>
      </div>
      
      ${info.warning ? `
        <div class="warning-box">
          <div class="warning-icon">🚨</div>
          <div class="warning-text">
            <strong>Important:</strong> ${info.warning}
          </div>
        </div>
      ` : ''}
      
      <div class="modal-footer">
        <button class="btn-modal-action" onclick="this.parentElement.parentElement.parentElement.remove()">
          Got it
        </button>
      </div>
    </div>
  `;

    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

// Update SVG body visualization based on severity
function updateSVGBodySeverity(severityValue) {
    const bodySvg = document.getElementById('bodySvgPreeclampsia');
    if (!bodySvg) return;

    // Determine severity level
    let severityLevel = 'normal';
    if (severityValue >= 75) {
        severityLevel = 'severe';
    } else if (severityValue >= 50) {
        severityLevel = 'moderate';
    } else if (severityValue >= 25) {
        severityLevel = 'mild';
    }

    // Update data attribute
    bodySvg.setAttribute('data-severity', severityLevel);

    // Activate specific organ glows based on severity
    const glowZones = bodySvg.querySelectorAll('.glow-zone');
    glowZones.forEach(zone => {
        if (severityValue >= 25) {
            zone.classList.add('active');
        } else {
            zone.classList.remove('active');
        }
    });

    // Highlight specific organs at different severity levels
    if (severityValue >= 50) {
        // Moderate - show kidney and liver stress
        activateOrganGlow('kidneys');
        activateOrganGlow('liver');
    }

    if (severityValue >= 75) {
        // Severe - all organs affected
        activateOrganGlow('brain');
        activateOrganGlow('heart');
        activateOrganGlow('placenta');
        activateOrganGlow('hands');
        activateOrganGlow('feet');
    }
}

// Activate glow for specific organ
function activateOrganGlow(organName) {
    const bodySvg = document.getElementById('bodySvgPreeclampsia');
    if (!bodySvg) return;

    const glowZones = bodySvg.querySelectorAll(`.glow-zone[data-organ="${organName}"]`);
    glowZones.forEach(zone => {
        zone.classList.add('active');
        zone.style.opacity = '1';
    });
}

// Deactivate all glows
function deactivateAllGlows() {
    const bodySvg = document.getElementById('bodySvgPreeclampsia');
    if (!bodySvg) return;

    const glowZones = bodySvg.querySelectorAll('.glow-zone');
    glowZones.forEach(zone => {
        zone.classList.remove('active');
        zone.style.opacity = '0';
    });
}

// Update info panel text
function updateInfoPanel(severity) {
    const title = document.getElementById('currentStateTitle');
    const desc = document.getElementById('currentStateDescription');
    const changesList = document.getElementById('keyChangesList');
    const action = document.getElementById('actionRecommendation');

    const week = document.getElementById('timelineSlider').value;

    // Get info blocks
    const stateInfo = document.querySelector('.current-state-info');
    const changesInfo = document.querySelector('.key-changes-info');
    const actionInfo = document.querySelector('.action-info');

    // Remove all severity classes
    const allInfoBlocks = [stateInfo, changesInfo, actionInfo];
    allInfoBlocks.forEach(block => {
        if (block) {
            block.classList.remove('severity-normal', 'severity-mild', 'severity-moderate', 'severity-severe');
            block.classList.add(`severity-${severity}`);
        }
    });

    const content = {
        normal: {
            title: `Normal Pregnancy - Week ${week}`,
            desc: 'All organ systems functioning optimally with healthy blood pressure and proper blood flow to placenta and baby.',
            changes: [
                '✅ Blood pressure within normal range (120/80 mmHg)',
                '✅ No protein in urine',
                '✅ All organs functioning normally',
                '✅ Placental blood flow optimal'
            ],
            action: {
                icon: '✅',
                text: 'Continue regular prenatal checkups. Monitor blood pressure weekly at home if available.'
            }
        },
        mild: {
            title: `Mild Preeclampsia - Week ${week}`,
            desc: 'Blood pressure slightly elevated with possible trace protein in urine. Close monitoring required to prevent progression.',
            changes: [
                '🟡 Blood pressure mildly elevated (140-149/90-99 mmHg)',
                '🟡 Trace protein may be present in urine',
                '🟡 Mild swelling in hands and feet',
                '🟡 Occasional mild headaches'
            ],
            action: {
                icon: '⚠️',
                text: 'Schedule immediate doctor visit. Monitor BP twice daily at home. Report any severe symptoms immediately. Bed rest with left lateral position may be recommended.'
            }
        },
        moderate: {
            title: `Moderate Preeclampsia - Week ${week}`,
            desc: 'Blood pressure significantly elevated with protein in urine. Multiple organ systems showing stress. Requires close medical supervision.',
            changes: [
                '🟠 Blood pressure 150-159/100-109 mmHg',
                '🟠 Moderate protein in urine (2+ dipstick)',
                '🟠 Liver enzymes starting to elevate',
                '🟠 Platelet count may be dropping',
                '🟠 Significant swelling in face and hands'
            ],
            action: {
                icon: '🚨',
                text: 'URGENT medical care needed. Likely hospitalization for monitoring. Medications to lower BP and prevent seizures. Delivery may be considered depending on baby\'s maturity.'
            }
        },
        severe: {
            title: `Severe Preeclampsia - Week ${week}`,
            desc: 'CRITICAL CONDITION: Blood pressure dangerously high. Multiple organ damage. Immediate delivery often necessary to save mother and baby.',
            changes: [
                '🔴 Blood pressure ≥ 160/110 mmHg',
                '🔴 Heavy protein in urine (4+ dipstick, >5g/24hr)',
                '🔴 HELLP syndrome risk (liver damage, low platelets)',
                '🔴 Kidney function deteriorating',
                '🔴 Brain swelling risk - severe headache, vision changes',
                '🔴 Placental insufficiency - baby at risk'
            ],
            action: {
                icon: '🚑',
                text: 'MEDICAL EMERGENCY! Immediate hospitalization required. Magnesium sulfate to prevent seizures. Urgent delivery likely needed regardless of gestational age. Call 108/102 if at home.'
            }
        }
    };

    const severityContent = content[severity] || content['normal'];

    if (title) title.textContent = severityContent.title;
    if (desc) desc.textContent = severityContent.desc;
    if (changesList) {
        changesList.innerHTML = severityContent.changes.map(c => `<li>${c}</li>`).join('');
    }
    if (action) {
        action.innerHTML = `
      <span class="action-icon">${severityContent.action.icon}</span>
      <p>${severityContent.action.text}</p>
    `;
    }
}

// Update vital signs based on severity
function updateVitalSigns(severity, value) {
    const percentage = parseInt(value);

    // Calculate vital values based on severity percentage
    const systolic = Math.round(120 + (percentage * 0.5)); // 120 → 170
    const diastolic = Math.round(80 + (percentage * 0.3)); // 80 → 110
    const heartRate = Math.round(80 + (percentage * 0.45)); // 80 → 125
    const oxygen = Math.round(98 - (percentage * 0.06)); // 98 → 92
    const platelets = Math.round(250 - (percentage * 1.0)); // 250 → 150
    const alt = Math.round(25 + (percentage * 0.75)); // 25 → 100
    const ast = Math.round(22 + (percentage * 0.78)); // 22 → 100

    // Update BP
    const sysEl = document.getElementById('vitalSystolic');
    const diaEl = document.getElementById('vitalDiastolic');
    if (sysEl) sysEl.textContent = systolic;
    if (diaEl) diaEl.textContent = diastolic;
    updateVitalStatus('bp', systolic, diastolic);

    // Update Heart Rate
    const hrEl = document.getElementById('vitalHeartRate');
    if (hrEl) hrEl.textContent = heartRate;
    updateHeartBeatAnimation(heartRate);
    updateVitalStatus('hr', heartRate);

    // Update Oxygen
    const oxyEl = document.getElementById('vitalOxygen');
    const oxyBar = document.getElementById('oxygenBar');
    if (oxyEl) oxyEl.textContent = oxygen;
    if (oxyBar) oxyBar.style.width = oxygen + '%';
    updateVitalStatus('o2', oxygen);

    // Update Protein
    const proteinHeight = percentage; // 0% → 100%
    const proteinFluid = document.getElementById('proteinFluid');
    if (proteinFluid) proteinFluid.style.height = proteinHeight + '%';

    const proteinValue = percentage < 25 ? 'None' :
        percentage < 50 ? 'Trace (+)' :
            percentage < 75 ? '2+' : '4+ (High)';
    const proteinText = document.getElementById('vitalProtein');
    if (proteinText) proteinText.textContent = proteinValue;
    updateVitalStatus('protein', percentage);

    // Update Platelets
    const pltEl = document.getElementById('vitalPlatelets');
    if (pltEl) pltEl.textContent = platelets;
    updatePlateletCells(platelets);
    updateVitalStatus('platelet', platelets);

    // Update Liver Enzymes
    const altEl = document.getElementById('vitalALT');
    const astEl = document.getElementById('vitalAST');
    if (altEl) altEl.textContent = alt;
    if (astEl) astEl.textContent = ast;
    updateVitalStatus('liver', alt, ast);

    // Show/hide emergency alert
    const emergencyAlert = document.getElementById('emergencyAlert');
    if (emergencyAlert) {
        if (percentage >= 75) {
            emergencyAlert.style.display = 'block';
        } else {
            emergencyAlert.style.display = 'none';
        }
    }
}

// Update vital status indicators
function updateVitalStatus(vital, ...values) {
    const statusElement = document.getElementById(`${vital}StatusText`);
    if (!statusElement) return;

    let status, text;

    switch (vital) {
        case 'bp':
            const [sys, dias] = values;
            if (sys >= 160 || dias >= 110) {
                status = 'danger';
                text = 'SEVERE';
            } else if (sys >= 140 || dias >= 90) {
                status = 'warning';
                text = 'ELEVATED';
            } else {
                status = 'normal';
                text = 'Normal Range';
            }
            break;

        case 'hr':
            const hr = values[0];
            if (hr >= 110) {
                status = 'danger';
                text = 'TACHYCARDIA';
            } else if (hr >= 100) {
                status = 'warning';
                text = 'Elevated';
            } else {
                status = 'normal';
                text = 'Normal';
            }
            break;

        case 'o2':
            const o2 = values[0];
            if (o2 < 92) {
                status = 'danger';
                text = 'LOW';
            } else if (o2 < 95) {
                status = 'warning';
                text = 'Decreased';
            } else {
                status = 'normal';
                text = 'Optimal';
            }
            break;

        case 'protein':
            const protein = values[0];
            if (protein >= 75) {
                status = 'danger';
                text = '4+ (Critical)';
            } else if (protein >= 50) {
                status = 'warning';
                text = '2+ (Moderate)';
            } else if (protein >= 25) {
                status = 'warning';
                text = 'Trace';
            } else {
                status = 'normal';
                text = 'Negative';
            }
            break;

        case 'platelet':
            const plt = values[0];
            if (plt < 150) {
                status = 'danger';
                text = 'THROMBOCYTOPENIA';
            } else if (plt < 200) {
                status = 'warning';
                text = 'Low-Normal';
            } else {
                status = 'normal';
                text = 'Normal';
            }
            break;

        case 'liver':
            const [alt, ast] = values;
            if (alt > 70 || ast > 70) {
                status = 'danger';
                text = 'ELEVATED';
            } else if (alt > 40 || ast > 40) {
                status = 'warning';
                text = 'Mild Elevation';
            } else {
                status = 'normal';
                text = 'Normal';
            }
            break;
    }

    statusElement.className = `vital-status status-${status}`;
    statusElement.textContent = text;
}

// Update heart beat animation speed
function updateHeartBeatAnimation(heartRate) {
    const heartIcon = document.getElementById('heartBeatIcon');
    if (!heartIcon) return;

    // Calculate animation duration based on BPM
    // 60 BPM = 1s, 120 BPM = 0.5s
    const duration = 60 / heartRate;
    heartIcon.style.animationDuration = `${duration}s`;
}

// Update platelet cell visualization
function updatePlateletCells(count) {
    const container = document.getElementById('plateletCells');
    if (!container) return;

    container.innerHTML = '';

    // Show proportional number of cells (max 50 for visual)
    const cellCount = Math.min(Math.round(count / 5), 50);

    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div');
        cell.className = 'platelet-cell';
        cell.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(cell);
    }
}

// Update vital waveforms using Canvas
function updateVitalWaveforms(severity) {
    updateBPWaveform(severity);
    updateHRWaveform(severity);
    updateEnzymeChart(severity);
}

function updateBPWaveform(severity) {
    const canvas = document.getElementById('bpWaveform');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw BP waveform
    ctx.strokeStyle = severity === 'severe' ? '#f44336' :
        severity === 'moderate' ? '#ff9800' :
            severity === 'mild' ? '#ffa726' : '#66bb6a';
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin(x * 0.1) * (height / 4) *
            (severity === 'severe' ? 1.5 :
                severity === 'moderate' ? 1.2 : 1);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }

    ctx.stroke();
}

function updateHRWaveform(severity) {
    const canvas = document.getElementById('hrWaveform');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw ECG-style waveform
    ctx.strokeStyle = '#f48fb1';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const segments = severity === 'severe' ? 6 : 4;
    const segmentWidth = width / segments;

    for (let i = 0; i < segments; i++) {
        const x = i * segmentWidth;
        ctx.moveTo(x, height / 2);
        ctx.lineTo(x + 5, height / 2);
        ctx.lineTo(x + 10, height * 0.2);
        ctx.lineTo(x + 15, height * 0.8);
        ctx.lineTo(x + 20, height / 2);
        ctx.lineTo(x + segmentWidth, height / 2);
    }

    ctx.stroke();
}

function updateEnzymeChart(severity) {
    const canvas = document.getElementById('enzymeChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw bar chart for ALT and AST
    const altHeight = severity === 'severe' ? height * 0.8 :
        severity === 'moderate' ? height * 0.5 :
            severity === 'mild' ? height * 0.3 : height * 0.2;

    const astHeight = severity === 'severe' ? height * 0.75 :
        severity === 'moderate' ? height * 0.45 :
            severity === 'mild' ? height * 0.28 : height * 0.18;

    // ALT bar
    ctx.fillStyle = severity === 'severe' ? '#f44336' :
        severity === 'moderate' ? '#ff9800' : '#66bb6a';
    ctx.fillRect(width * 0.25, height - altHeight, width * 0.2, altHeight);

    // AST bar
    ctx.fillRect(width * 0.55, height - astHeight, width * 0.2, astHeight);
}


// ========================================
// BLOOD PRESSURE TRACKER FUNCTIONALITY
// ========================================

// BP Readings Storage
let bpReadings = [];

// Load readings from localStorage on page load
document.addEventListener('DOMContentLoaded', function () {
    loadBPReadings();
});

// Open BP Tracker Modal
function openBPTracker() {
    const modal = document.getElementById('bpTrackerModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Set current time
        const now = new Date();
        const timeInput = document.getElementById('timeInput');
        if (timeInput) {
            timeInput.value = now.toTimeString().slice(0, 5);
        }

        // Render existing readings
        renderBPReadings();
        renderBPChart();
    }
}

// Close BP Tracker Modal
function closeBPTracker() {
    const modal = document.getElementById('bpTrackerModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Save BP Reading
function saveBPReading() {
    const systolic = parseInt(document.getElementById('systolicInput').value);
    const diastolic = parseInt(document.getElementById('diastolicInput').value);
    const week = parseInt(document.getElementById('currentWeek').value);
    const time = document.getElementById('timeInput').value;
    const notes = document.getElementById('notesInput').value;

    // Validation
    if (!systolic || !diastolic || !week) {
        showToast('⚠️ Please fill in all required fields', 'warning');
        return;
    }

    if (systolic < 80 || systolic > 200 || diastolic < 40 || diastolic > 130) {
        showToast('⚠️ Please enter valid BP values', 'warning');
        return;
    }

    // Create reading object
    const reading = {
        id: Date.now(),
        date: new Date().toISOString(),
        week: week,
        systolic: systolic,
        diastolic: diastolic,
        time: time || 'Not specified',
        notes: notes || '',
        category: getBPCategory(systolic, diastolic)
    };

    // Add to array
    bpReadings.unshift(reading);

    // Save to localStorage
    saveBPReadings();

    // Render updated list
    renderBPReadings();
    renderBPChart();

    // Clear form
    document.getElementById('systolicInput').value = '';
    document.getElementById('diastolicInput').value = '';
    document.getElementById('notesInput').value = '';

    // Show success message
    showToast('✅ BP Reading saved successfully!', 'success');

    // Reflect latest reading on main hero BP widget if present
    const heroSys = document.getElementById('bpSystolic');
    const heroDia = document.getElementById('bpDiastolic');
    const heroStatus = document.getElementById('bpStatus');
    if (heroSys) heroSys.textContent = systolic;
    if (heroDia) heroDia.textContent = diastolic;
    if (heroStatus) {
        const category = getBPCategory(systolic, diastolic);
        heroStatus.textContent =
            category === 'crisis' ? 'CRISIS' :
            category === 'severe' ? 'SEVERE' :
            category === 'high' ? 'HIGH' :
            category === 'elevated' ? 'ELEVATED' : 'NORMAL';
    }

    // Check if reading is concerning
    if (systolic >= 140 || diastolic >= 90) {
        setTimeout(() => {
            showToast('⚠️ High reading detected! Contact your doctor if you have symptoms.', 'warning');
        }, 1500);
    }

    if (systolic >= 180 || diastolic >= 120) {
        setTimeout(() => {
            showToast('🚨 CRISIS LEVEL! Call emergency services (108/102) immediately!', 'error');
        }, 2000);
    }
}

// Determine BP Category
function getBPCategory(systolic, diastolic) {
    if (systolic >= 180 || diastolic >= 120) return 'crisis';
    if (systolic >= 140 || diastolic >= 90) return 'severe';
    if (systolic >= 130 || diastolic >= 80) return 'high';
    if (systolic >= 120 && diastolic < 80) return 'elevated';
    return 'normal';
}

// Render BP Readings List
function renderBPReadings() {
    const container = document.getElementById('bpReadingsList');
    if (!container) return;

    if (bpReadings.length === 0) {
        container.innerHTML = `
      <div class="bp-empty-state">
        <div class="empty-icon">📊</div>
        <p>No readings yet. Add your first BP reading above!</p>
      </div>
    `;
        return;
    }

    container.innerHTML = bpReadings.map(reading => {
        const date = new Date(reading.date);
        const formattedDate = date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        return `
      <div class="bp-reading-item">
        <div class="reading-header">
          <span class="reading-date">📅 ${formattedDate}</span>
          <span class="reading-week">Week ${reading.week}</span>
        </div>
        <div class="reading-values">
          <div class="bp-value ${reading.category}">
            <span>💓</span>
            <span>${reading.systolic}/${reading.diastolic}</span>
            <span style="font-size: 0.9rem; font-weight: 600;">mmHg</span>
          </div>
          <span class="reading-time">🕐 ${reading.time}</span>
          <button class="reading-delete" onclick="deleteBPReading(${reading.id})">🗑️ Delete</button>
        </div>
        ${reading.notes ? `<div class="reading-notes">📝 ${reading.notes}</div>` : ''}
      </div>
    `;
    }).join('');
}

// Render BP Chart (Simple Canvas Chart)
function renderBPChart() {
    const canvas = document.getElementById('bpChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    if (bpReadings.length === 0) {
        ctx.fillStyle = '#9333ea';
        ctx.font = '16px Poppins, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('No data to display', width / 2, height / 2);
        return;
    }

    // Reverse to show oldest first
    const sortedReadings = [...bpReadings].reverse().slice(-10); // Last 10 readings

    // Calculate chart dimensions
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Find min/max values
    const allBP = sortedReadings.flatMap(r => [r.systolic, r.diastolic]);
    const minBP = Math.min(...allBP, 60);
    const maxBP = Math.max(...allBP, 180);
    const bpRange = maxBP - minBP;

    // Draw axes
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Draw grid lines and labels
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#9333ea';
    ctx.font = '11px Poppins, sans-serif';
    ctx.textAlign = 'right';

    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight * i / 5);
        const value = Math.round(maxBP - (bpRange * i / 5));

        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();

        ctx.fillText(value, padding - 5, y + 4);
    }

    // Helper function to get Y coordinate
    const getY = (bp) => {
        return padding + chartHeight - ((bp - minBP) / bpRange * chartHeight);
    };

    // Draw lines
    const pointSpacing = chartWidth / (sortedReadings.length - 1 || 1);

    // Systolic line (pink)
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 3;
    ctx.beginPath();
    sortedReadings.forEach((reading, i) => {
        const x = padding + i * pointSpacing;
        const y = getY(reading.systolic);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Diastolic line (purple)
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 3;
    ctx.beginPath();
    sortedReadings.forEach((reading, i) => {
        const x = padding + i * pointSpacing;
        const y = getY(reading.diastolic);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw points
    sortedReadings.forEach((reading, i) => {
        const x = padding + i * pointSpacing;

        // Systolic point
        ctx.fillStyle = '#ec4899';
        ctx.beginPath();
        ctx.arc(x, getY(reading.systolic), 5, 0, Math.PI * 2);
        ctx.fill();

        // Diastolic point
        ctx.fillStyle = '#a855f7';
        ctx.beginPath();
        ctx.arc(x, getY(reading.diastolic), 5, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Delete BP Reading
function deleteBPReading(id) {
    if (confirm('Are you sure you want to delete this reading?')) {
        bpReadings = bpReadings.filter(r => r.id !== id);
        saveBPReadings();
        renderBPReadings();
        renderBPChart();
        showToast('🗑️ Reading deleted', 'info');
    }
}

// Clear All BP History
function clearBPHistory() {
    if (confirm('Are you sure you want to delete ALL readings? This cannot be undone!')) {
        bpReadings = [];
        saveBPReadings();
        renderBPReadings();
        renderBPChart();
        showToast('🗑️ All readings cleared', 'info');
    }
}

// Save to localStorage
function saveBPReadings() {
    try {
        localStorage.setItem('bpReadings', JSON.stringify(bpReadings));
    } catch (e) {
        console.error('Failed to save BP readings:', e);
        showToast('⚠️ Failed to save data', 'error');
    }
}

// Load from localStorage
function loadBPReadings() {
    try {
        const saved = localStorage.getItem('bpReadings');
        if (saved) {
            bpReadings = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Failed to load BP readings:', e);
        bpReadings = [];
    }
}

// Toast Notification System
function showToast(message, type = 'info') {
    let toast = document.getElementById('bpToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'bpToast';
        toast.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      color: white;
      font-weight: 600;
      font-size: 0.95rem;
      z-index: 999999;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    `;
        document.body.appendChild(toast);
    }

    const colors = {
        success: 'linear-gradient(135deg, #22c55e, #16a34a)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
    };

    toast.style.background = colors[type] || colors.info;
    toast.textContent = message;
    toast.style.display = 'block';

    setTimeout(() => {
        toast.style.display = 'none';
    }, 4000);
}

