/**
 * Preeclampsia Education - Themes & Educational Content
 * Contains the 25 health themes, progress tracking, quick symptom checker, and myth card logic.
 */

// Global state for explored themes
let exploredThemes = new Set();
let mythsCompleted = new Set();
let quizModeActive = false;

/**
 * Scroll to themes section
 */
function scrollToThemes() {
    const el = document.getElementById('themesSection');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Open a specific health theme modal
 */
function openTheme(themeId) {
    const panel = document.getElementById('infoPanel');
    const backdrop = document.getElementById('backdrop');

    if (!panel || !backdrop) {
        console.error('Info panel or backdrop not found');
        return;
    }

    // Mark as explored
    exploredThemes.add(themeId);
    updateThemesProgress();

    // Mark card as explored
    const card = document.querySelector(`.theme-card-3d[data-theme="${themeId}"]`);
    if (card) {
        card.classList.add('explored');
    }

    // Get theme content
    const themeContent = getThemeContent(themeId);

    // Update panel content
    const iconEl = document.getElementById('panelIcon');
    const titleEl = document.getElementById('panelTitle');
    const subtitleEl = document.getElementById('panelSubtitle');
    const contentEl = document.getElementById('panelContent');

    if (iconEl) iconEl.textContent = themeContent.icon;
    if (titleEl) titleEl.textContent = themeContent.title;
    if (subtitleEl) subtitleEl.textContent = themeContent.subtitle;
    if (contentEl) contentEl.innerHTML = themeContent.content;

    // Show panel and backdrop
    panel.classList.add('active');
    backdrop.classList.add('active');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

/**
 * Close any active panel or checker
 */
function closePanel() {
    const panel = document.getElementById('infoPanel');
    const checker = document.getElementById('symptomChecker');
    const backdrop = document.getElementById('backdrop');

    if (panel) panel.classList.remove('active');
    if (checker) checker.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');

    document.body.style.overflow = 'auto';
}

/**
 * Update the educational themes progress tracker
 */
function updateThemesProgress() {
    const total = 25;
    const explored = exploredThemes.size;
    const percentage = Math.round((explored / total) * 100);

    const percentEl = document.getElementById('progressPercent');
    const countEl = document.getElementById('exploredCount');
    if (percentEl) percentEl.textContent = percentage + '%';
    if (countEl) countEl.textContent = `${explored} of ${total} themes explored`;

    const circle = document.getElementById('progressCircle');
    if (circle) {
        const circumference = 2 * Math.PI * 60;
        const offset = circumference - (percentage / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }
}

/**
 * Quick Symptom Checker Logic
 */
function openQuickCheck() {
    const modal = document.getElementById('symptomChecker');
    const backdrop = document.getElementById('backdrop');
    if (modal && backdrop) {
        modal.classList.add('active');
        backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeQuickCheck() {
    closePanel();
    // Reset checkboxes
    document.querySelectorAll('.symptom-item input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    const result = document.getElementById('symptomResult');
    if (result) {
        result.classList.remove('active', 'emergency', 'warning', 'normal');
        result.innerHTML = '';
    }
}

function analyzeSymptoms() {
    const checkboxes = document.querySelectorAll('.symptom-item input[type="checkbox"]:checked');
    const result = document.getElementById('symptomResult');
    if (!result) return;

    let hasSevere = false;
    let hasModerate = false;

    checkboxes.forEach(cb => {
        const severity = cb.dataset.severity;
        if (severity === 'severe') hasSevere = true;
        if (severity === 'moderate') hasModerate = true;
    });

    if (hasSevere) {
        result.className = 'symptom-result active emergency';
        result.innerHTML = `<h3>🚨 EMERGENCY - CALL 108/102 NOW</h3><p>Severe symptoms detected. Contact emergency services and go to the hospital immediately.</p>`;
    } else if (hasModerate) {
        result.className = 'symptom-result active warning';
        result.innerHTML = `<h3>⚠️ URGENT - Contact Doctor Today</h3><p>You have symptoms that need same-day medical attention.</p>`;
    } else if (checkboxes.length > 0) {
        result.className = 'symptom-result active normal';
        result.innerHTML = `<h3>📞 Contact Your Doctor</h3><p>Report these symptoms to your healthcare provider soon.</p>`;
    } else {
        result.className = 'symptom-result active normal';
        result.innerHTML = `<h3>✅ No Symptoms Checked</h3>`;
    }
}

/**
 * Myth Card Logic
 */
function flipCard(mythId) {
    const card = document.querySelector(`[data-myth-id="${mythId}"]`);
    if (!card) return;

    if (card.classList.contains('flipped')) {
        card.classList.remove('flipped');
    } else {
        card.classList.add('flipped');
        markMythCompleted(mythId);
    }
}

function toggleQuizMode() {
    quizModeActive = !quizModeActive;
    const btn = document.getElementById('quizModeBtn');
    const btnText = btn ? btn.querySelector('.btn-text') : null;

    document.querySelectorAll('.myth-card-flip').forEach(card => {
        const quizButtons = card.querySelector('.quiz-buttons');
        const flipButton = card.querySelector('.flip-trigger-btn');
        if (quizButtons) quizButtons.style.display = quizModeActive ? 'flex' : 'none';
        if (flipButton) flipButton.style.display = quizModeActive ? 'none' : 'flex';
    });

    if (btnText) btnText.textContent = quizModeActive ? 'Quiz Mode: ON' : 'Quiz Mode: OFF';
    if (btn) btn.classList.toggle('active', quizModeActive);
}

function submitQuizAnswer(mythId, userAnswer) {
    // All myths are FALSE
    const isCorrect = (userAnswer === false);
    const card = document.querySelector(`[data-myth-id="${mythId}"]`);
    if (!card) return;

    if (isCorrect) {
        setTimeout(() => {
            flipCard(mythId);
        }, 800);
    } else {
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 500);
    }
}

function markMythCompleted(mythId) {
    if (mythsCompleted.has(mythId)) return;
    mythsCompleted.add(mythId);

    const count = mythsCompleted.size;
    const percentage = (count / 8) * 100;

    const countEl = document.getElementById('mythsBusted');
    const barEl = document.getElementById('progressBarFill');
    if (countEl) countEl.textContent = count;
    if (barEl) barEl.style.width = `${percentage}%`;

    if (count === 8) {
        const celebration = document.getElementById('completionCelebration');
        if (celebration) celebration.style.display = 'block';
    }
}

/**
 * Theme Content Data (1-25)
 */
function getThemeContent(themeId) {
    const themes = {
        1: { title: "Understanding Preeclampsia", subtitle: "Definition & Overview", icon: "🔬", content: "<h3>What is Preeclampsia?</h3><ul><li><strong>Definition:</strong> A serious pregnancy complication characterized by high blood pressure and protein in urine.</li><li><strong>Timing:</strong> After 20 weeks of gestation.</li></ul>" },
        2: { title: "Root Causes & Pathophysiology", subtitle: "Why It Happens", icon: "🧬", content: "<h3>Primary Mechanisms</h3><ul><li><strong>Placental Problems:</strong> Abnormal development of blood vessels in the placenta.</li><li><strong>Systemic Stress:</strong> Inflammation affecting the mother's entire body.</li></ul>" },
        3: { title: "High-Risk Population Groups", subtitle: "Who Is Most Vulnerable", icon: "👥", content: "<h3>Risk Factors</h3><ul><li><strong>First Pregnancy:</strong> Higher risk for first-time mothers.</li><li><strong>Medical History:</strong> HTN, Diabetes, Kidney disease.</li></ul>" },
        4: { title: "Mild Preeclampsia - Early Warning", subtitle: "Recognizing Subtle Changes", icon: "🟢", content: "<h3>Mild Symptoms</h3><ul><li>BP 140/90 - 159/109.</li><li>Slight swelling, mild proteinuria.</li></ul>" },
        5: { title: "Moderate Preeclampsia", subtitle: "Increased Urgency", icon: "🟡", content: "<h3>Warning Symptoms</h3><ul><li>Persistent swelling, decreased urination.</li><li>Visual disturbances.</li></ul>" },
        6: { title: "Severe Preeclampsia - EMERGENCY", subtitle: "Life-Threatening Crisis", icon: "🔴", content: "<h3>🚨 EMERGENCY</h3><ul><li>BP ≥160/110.</li><li>Severe headache, chest pain, difficulty breathing.</li></ul>" },
        7: { title: "Eclampsia: Critical Stage", subtitle: "Life-Threatening Emergency", icon: "⚡", content: "<h3>What is Eclampsia?</h3><ul><li><strong>Definition:</strong> Seizures in a woman with preeclampsia.</li><li><strong>Action:</strong> Call 108/102 immediately.</li></ul>" },
        8: { title: "HELLP Syndrome", subtitle: "Severe Variant", icon: "🩸", content: "<h3>Labeling HELLP</h3><ul><li><strong>H</strong>emolysis, <strong>E</strong>levated <strong>L</strong>iver enzymes, <strong>L</strong>ow <strong>P</strong>latelets.</li><li>Severe abdominal pain and nausea.</li></ul>" },
        9: { title: "When to See Doctor Immediately", subtitle: "Emergency Triggers", icon: "🚑", content: "<h3>Red Flags</h3><ul><li>Visual changes, severe headache, abdominal pain.</li></ul>" },
        10: { title: "Regular Monitoring Schedule", subtitle: "Follow-Up Frequency", icon: "📅", content: "<h3>Frequency</h3><ul><li>Depends on severity; daily to weekly.</li></ul>" },
        11: { title: "Essential Questions for Doctor", subtitle: "Be Prepared", icon: "❓", content: "<h3>Critical Questions</h3><ul><li>Ask about BP trends, baby's health, and delivery plan.</li></ul>" },
        12: { title: "Prevention: Before Pregnancy", subtitle: "Primary Strategies", icon: "🛡️", content: "<h3>Optimization</h3><ul><li>Healthy BMI, BP control, and supplements.</li></ul>" },
        13: { title: "Prevention: During Pregnancy", subtitle: "Steps", icon: "💊", content: "<h3>Strategies</h3><ul><li>Low-dose aspirin for high-risk women.</li></ul>" },
        14: { title: "Nutritional Management", subtitle: "Diet Guidelines", icon: "🥗", content: "<h3>Diet</h3><ul><li>High protein, adequate calcium, hydrated.</li></ul>" },
        15: { title: "Physical Activity Guidelines", subtitle: "Safe Exercise", icon: "🚶‍♀️", content: "<h3>Exercise</h3><ul><li>Walking and prenatal yoga; avoid overexertion.</li></ul>" },
        16: { title: "Home Blood Pressure Monitoring", subtitle: "Self-Monitoring", icon: "🩺", content: "<h3>Technique</h3><ul><li>Rest, use arm cuff, record daily.</li></ul>" },
        17: { title: "Medication Management", subtitle: "Treatments", icon: "💊", content: "<h3>Meds</h3><ul><li>Antihypertensives and Magnesium Sulfate.</li></ul>" },
        18: { title: "Delivery Planning & Timing", subtitle: "When Delivery is Necessary", icon: "👶", content: "<h3>Timing</h3><ul><li>Depends on severity and gestational age.</li></ul>" },
        19: { title: "Postpartum Care", subtitle: "After Delivery", icon: "🍼", content: "<h3>Monitoring</h3><ul><li>Watch for symptoms up to 6 weeks postpartum.</li></ul>" },
        20: { title: "Long-Term Health Implications", subtitle: "Future Risk", icon: "❤️", content: "<h3>Implications</h3><ul><li>Increased lifetime risk of heart disease.</li></ul>" },
        21: { title: "Family Support & Caregiving", subtitle: "How Families Help", icon: "👨‍👩‍👧‍👦", content: "<h3>Family Role</h3><ul><li>Monitor signs, help with chores, support.</li></ul>" },
        22: { title: "Emotional & Mental Health", subtitle: "Psychological Support", icon: "🧠", content: "<h3>Coping</h3><ul><li>Identify anxiety, seek counseling if needed.</li></ul>" },
        23: { title: "Fetal Complications & Monitoring", subtitle: "Impact on Baby", icon: "👶", content: "<h3>Fetal Impacts</h3><ul><li>Growth restriction, premature birth.</li></ul>" },
        24: { title: "Cultural Considerations in India", subtitle: "Navigating Beliefs", icon: "🇮🇳", content: "<h3>Cultural Navigation</h3><ul><li>Involve family, address myths politely.</li></ul>" },
        25: { title: "Healthcare System Navigation", subtitle: "Accessing Care", icon: "🏥", content: "<h3>Resources</h3><ul><li>Govt schemes (JSY), high-risk clinics.</li></ul>" }
    };

    return themes[themeId] || { title: "Theme Information", subtitle: "Details", icon: "📚", content: "Details are being updated. Consult a professional." };
}

// Expose functions to window
window.openTheme = openTheme;
window.closePanel = closePanel;
window.scrollToThemes = scrollToThemes;
window.openQuickCheck = openQuickCheck;
window.closeQuickCheck = closeQuickCheck;
window.analyzeSymptoms = analyzeSymptoms;
window.flipCard = flipCard;
window.toggleQuizMode = toggleQuizMode;
window.submitQuizAnswer = submitQuizAnswer;

/**
 * Initialize components when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Backdrop click handler
    const backdrop = document.getElementById('backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', closePanel);
    }

    // Check if themes are present and update progress
    if (document.getElementById('themesSection')) {
        updateThemesProgress();
    }
});
