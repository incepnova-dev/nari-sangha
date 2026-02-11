/**
 * Preeclampsia Education - Enhanced Simulator Logic
 * Provides missing functions for 3D simulator, layer toggling, and auto-journey.
 */

// Global state for auto-journey
let journeyTimer = null;
let journeyPaused = false;
let journeyDuration = 60; // seconds
let journeyCurrentTime = 0;

/**
 * Update the disease severity based on slider value
 * @param {number} value - Severity value (0-100)
 */
function updateSeverityLevel(value) {
    const severity = parseInt(value);
    const display = document.getElementById('severityDisplay');
    if (!display) return;

    let text = 'Normal';
    let severityClass = 'normal';

    if (severity > 75) {
        text = 'Severe Preeclampsia';
        severityClass = 'severe';
    } else if (severity > 50) {
        text = 'Moderate Preeclampsia';
        severityClass = 'moderate';
    } else if (severity > 25) {
        text = 'Mild Preeclampsia';
        severityClass = 'mild';
    }

    display.textContent = text;
    display.className = `severity-value ${severityClass}`;

    // Update vital signs (from education.js if available)
    updateVitals(severity);

    // Update organ glows
    updateOrganGlows(severity);
}

/**
 * Update pregnancy week display
 * @param {number} value - Week (20-40)
 */
function updatePregnancyWeek(value) {
    const week = parseInt(value);
    const display = document.getElementById('weekDisplay');
    if (display) display.textContent = `Week ${week}`;

    // Update baby size/placenta visuals if needed
    const placenta = document.querySelector('[data-organ="placenta"]');
    if (placenta) {
        const scale = 1 + (week - 20) * 0.02;
        placenta.style.transform = `scale(${scale})`;
        placenta.style.transformOrigin = '160px 310px';
    }
}

/**
 * Update organ glows based on severity
 */
function updateOrganGlows(severity) {
    const zones = document.querySelectorAll('.glow-zone');
    zones.forEach(zone => {
        const threshold = zone.dataset.organ === 'placenta' ? 20 : 40;
        const opacity = severity > threshold ? (severity - threshold) / 100 : 0;
        zone.style.opacity = opacity;
    });
}

/**
 * Update vital signs displays
 */
function updateVitals(severity) {
    const sys = 120 + (severity * 0.6);
    const dia = 80 + (severity * 0.4);

    const sysEl = document.getElementById('vitalSystolic');
    const diaEl = document.getElementById('vitalDiastolic');

    if (sysEl) sysEl.textContent = Math.round(sys);
    if (diaEl) diaEl.textContent = Math.round(dia);

    // Update emergency alert
    const alert = document.getElementById('emergencyAlert');
    if (alert) alert.style.display = severity > 80 ? 'block' : 'none';
}

/**
 * Switch between different view modes (3D, Comparison, Journey)
 * @param {string} mode - '3d', 'comparison', or 'journey'
 */
function switchViewMode(mode) {
    console.log(`Switching view mode to: ${mode}`);

    // Update button states
    document.querySelectorAll('.view-mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === mode);
    });

    // Toggle sections visibility
    const viewerSection = document.querySelector('.body-3d-viewer');
    const comparisonSection = document.getElementById('comparisonView');
    const journeySection = document.getElementById('journeyControls');

    if (mode === '3d') {
        if (viewerSection) viewerSection.style.display = 'block';
        if (comparisonSection) comparisonSection.style.display = 'none';
        if (journeySection) journeySection.style.display = 'none';
        resetJourney();
    } else if (mode === 'comparison') {
        if (viewerSection) viewerSection.style.display = 'none';
        if (comparisonSection) {
            comparisonSection.style.display = 'block';
            initializeComparisonView();
        }
        if (journeySection) journeySection.style.display = 'none';
        resetJourney();
    } else if (mode === 'journey') {
        if (viewerSection) viewerSection.style.display = 'block';
        if (comparisonSection) comparisonSection.style.display = 'none';
        if (journeySection) journeySection.style.display = 'block';
    }

    showToast(`Switched to ${mode.toUpperCase()} mode`, 'info');
}

/**
 * Initialize and populate the comparison view
 */
function initializeComparisonView() {
    const container = document.getElementById('comparisonView');
    if (!container) return;

    // Repopulate to ensure latest SVGs and animations are applied
    // if (container.innerHTML.trim() !== '') return;

    container.innerHTML = `
        <div class="comparison-view-grid">
            <!-- LEFT: NORMAL PREGNANCY -->
            <div class="comparison-panel normal-panel">
                <div class="panel-header-comparison">
                    <div class="status-badge status-normal">
                        <span class="badge-icon">✅</span>
                        <span class="badge-text">NORMAL PREGNANCY</span>
                    </div>
                    <p class="panel-subtitle">Healthy organ function • BP: 120/80 mmHg</p>
                </div>
                
                <div class="body-comparison-container body-fixed-size">
                    <svg class="body-svg-comparison body-normal" viewBox="0 0 320 600">
                        <!-- Head -->
                        <ellipse cx="160" cy="62" rx="42" ry="48" fill="#f5c6a0" stroke="#e0a882" stroke-width="2"/>
                        <!-- Hair -->
                        <ellipse cx="160" cy="38" rx="44" ry="30" fill="#5c3d2e"/>
                        <rect x="116" y="30" width="12" height="55" rx="6" fill="#5c3d2e"/>
                        <rect x="192" y="30" width="12" height="55" rx="6" fill="#5c3d2e"/>
                        <!-- Eyes -->
                        <circle cx="143" cy="65" r="4" fill="#3a2520"/>
                        <circle cx="177" cy="65" r="4" fill="#3a2520"/>
                        <!-- Smile -->
                        <path d="M148 78 Q160 86 172 78" fill="none" stroke="#3a2520" stroke-width="2" stroke-linecap="round"/>
                        <!-- Torso -->
                        <path d="M100 134 Q100 128 130 128 L190 128 Q220 128 220 134 L220 280 Q220 285 215 285 L105 285 Q100 285 100 280 Z" fill="#e8a0b8" stroke="#d47a9a" stroke-width="2"/>
                        <!-- Belly -->
                        <ellipse cx="160" cy="300" rx="65" ry="75" fill="#e8a0b8" stroke="#d47a9a" stroke-width="2"/>
                        <!-- Legs -->
                        <rect x="118" y="488" width="34" height="90" rx="10" fill="#f5c6a0" stroke="#e0a882" stroke-width="2"/>
                        <rect x="168" y="488" width="34" height="90" rx="10" fill="#f5c6a0" stroke="#e0a882" stroke-width="2"/>
                        
                        <!-- Healthy Glows -->
                        <circle class="healthy-glow" cx="160" cy="62" r="50" fill="url(#healthyGlowBrain)" opacity="0.6"/>
                        <circle class="healthy-glow" cx="160" cy="190" r="45" fill="url(#healthyGlowHeart)" opacity="0.6"/>
                        <ellipse class="healthy-glow" cx="160" cy="310" rx="70" ry="80" fill="url(#healthyGlowPlacenta)" opacity="0.6"/>

                        <defs>
                            <radialGradient id="healthyGlowBrain"><stop offset="0%" stop-color="#4ade80" stop-opacity="0.5"/><stop offset="100%" stop-color="#4ade80" stop-opacity="0"/></radialGradient>
                            <radialGradient id="healthyGlowHeart"><stop offset="0%" stop-color="#4ade80" stop-opacity="0.5"/><stop offset="100%" stop-color="#4ade80" stop-opacity="0"/></radialGradient>
                            <radialGradient id="healthyGlowPlacenta"><stop offset="0%" stop-color="#4ade80" stop-opacity="0.5"/><stop offset="100%" stop-color="#4ade80" stop-opacity="0"/></radialGradient>
                        </defs>
                    </svg>
                </div>

                <div class="stats-grid-comparison">
                    <div class="stat-item-comparison">
                        <div class="stat-icon-mini">❤️</div>
                        <div class="stat-details-mini">
                            <span class="stat-label-mini">BP</span>
                            <span class="stat-value-mini">120/80</span>
                        </div>
                    </div>
                    <div class="stat-item-comparison">
                        <div class="stat-icon-mini">💓</div>
                        <div class="stat-details-mini">
                            <span class="stat-label-mini">Pulse</span>
                            <span class="stat-value-mini">80 BPM</span>
                        </div>
                    </div>
                    <div class="stat-item-comparison">
                        <div class="stat-icon-mini">🫘</div>
                        <div class="stat-details-mini">
                            <span class="stat-label-mini">Kidney</span>
                            <span class="stat-value-mini">Normal</span>
                        </div>
                    </div>
                    <div class="stat-item-comparison">
                        <div class="stat-icon-mini">🫀</div>
                        <div class="stat-details-mini">
                            <span class="stat-label-mini">Liver</span>
                            <span class="stat-value-mini">Healthy</span>
                        </div>
                    </div>
                    <div class="stat-item-comparison">
                        <div class="stat-icon-mini">🤰</div>
                        <div class="stat-details-mini">
                            <span class="stat-label-mini">Placenta</span>
                            <span class="stat-value-mini">Optimal</span>
                        </div>
                    </div>
                    <div class="stat-item-comparison">
                        <div class="stat-icon-mini">🧠</div>
                        <div class="stat-details-mini">
                            <span class="stat-label-mini">Brain</span>
                            <span class="stat-value-mini">Clear</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- RIGHT: PREECLAMPSIA -->
            <div class="comparison-panel pe-panel">
                <div class="panel-header-comparison">
                    <div class="status-badge status-warning">
                        <span class="badge-icon">⚠️</span>
                        <span class="badge-text">PREECLAMPSIA</span>
                    </div>
                    <p class="panel-subtitle">Multiple organs affected</p>
                </div>
                
                <div class="body-comparison-container body-fixed-size">
                    <svg class="body-svg-comparison body-preeclampsia" viewBox="0 0 320 600">
                        <!-- Head -->
                        <ellipse cx="160" cy="62" rx="42" ry="48" fill="#f5c6a0" stroke="#e0a882" stroke-width="2"/>
                        <!-- Eyes (Red) -->
                        <circle cx="143" cy="65" r="4" fill="#ef4444"/>
                        <circle cx="177" cy="65" r="4" fill="#ef4444"/>
                        <!-- Frown -->
                        <path d="M148 82 Q160 78 172 82" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
                        <!-- Torso -->
                        <path d="M100 134 Q100 128 130 128 L190 128 Q220 128 220 134 L220 280 Q220 285 215 285 L105 285 Q100 285 100 280 Z" fill="#e8a0b8" stroke="#d47a9a" stroke-width="2"/>
                        <!-- Belly -->
                        <ellipse cx="160" cy="300" rx="65" ry="75" fill="#e8a0b8" stroke="#d47a9a" stroke-width="2"/>
                        
                        <!-- Swelling Indicators -->
                        <ellipse cx="160" cy="62" rx="50" ry="56" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="6,4" opacity="0.4" class="swollen-part"/>
                        <circle cx="74" cy="298" r="18" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4" opacity="0.6" class="swollen-part"/>
                        <circle cx="246" cy="298" r="18" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4" opacity="0.6" class="swollen-part"/>
                        <rect x="114" y="488" width="42" height="90" rx="10" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4" opacity="0.5" class="swollen-part"/>
                        <rect x="164" y="488" width="42" height="90" rx="10" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4" opacity="0.5" class="swollen-part"/>

                        <!-- Danger Glows -->
                        <circle class="danger-glow pulsing-glow" cx="160" cy="62" r="50" fill="url(#dangerGlowBrain)" opacity="0.8"/>
                        <circle class="danger-glow pulsing-glow" cx="160" cy="190" r="45" fill="url(#dangerGlowHeart)" opacity="0.8"/>
                        <ellipse class="danger-glow pulsing-glow" cx="160" cy="310" rx="70" ry="80" fill="url(#dangerGlowPlacenta)" opacity="0.8"/>

                        <defs>
                            <radialGradient id="dangerGlowBrain"><stop offset="0%" stop-color="#ef4444" stop-opacity="0.6"/><stop offset="100%" stop-color="#ef4444" stop-opacity="0"/></radialGradient>
                            <radialGradient id="dangerGlowHeart"><stop offset="0%" stop-color="#ef4444" stop-opacity="0.6"/><stop offset="100%" stop-color="#ef4444" stop-opacity="0"/></radialGradient>
                            <radialGradient id="dangerGlowPlacenta"><stop offset="0%" stop-color="#ef4444" stop-opacity="0.6"/><stop offset="100%" stop-color="#ef4444" stop-opacity="0"/></radialGradient>
                        </defs>
                    </svg>
                </div>

                <div class="stats-grid-comparison">
                    <div class="stat-item-comparison">
                        <div class="stat-icon-mini">❤️</div>
                        <div class="stat-details-mini">
                            <span class="stat-label-mini">BP</span>
                            <span class="stat-value-mini" style="color: #ef4444">160/110</span>
                        </div>
                    </div>
                    <div class="stat-item-comparison">
                        <div class="stat-icon-mini">💓</div>
                        <div class="stat-details-mini">
                            <span class="stat-label-mini">Pulse</span>
                            <span class="stat-value-mini" style="color: #ef4444">110 BPM</span>
                        </div>
                    </div>
                    <div class="stat-item-comparison">
                        <div class="stat-icon-mini">🫘</div>
                        <div class="stat-details-mini">
                            <span class="stat-label-mini">Kidney</span>
                            <span class="stat-value-mini" style="color: #ef4444">Restricted</span>
                        </div>
                    </div>
                    <div class="stat-item-comparison">
                        <div class="stat-icon-mini">🫀</div>
                        <div class="stat-details-mini">
                            <span class="stat-label-mini">Liver</span>
                            <span class="stat-value-mini" style="color: #ef4444">Inflamed</span>
                        </div>
                    </div>
                    <div class="stat-item-comparison">
                        <div class="stat-icon-mini">🤰</div>
                        <div class="stat-details-mini">
                            <span class="stat-label-mini">Placenta</span>
                            <span class="stat-value-mini" style="color: #ef4444">Restricted</span>
                        </div>
                    </div>
                    <div class="stat-item-comparison">
                        <div class="stat-icon-mini">🧠</div>
                        <div class="stat-details-mini">
                            <span class="stat-label-mini">Brain</span>
                            <span class="stat-value-mini" style="color: #ef4444">Edema</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Toggle visibility of organ systems (layers)
 * @param {string} layer - The layer ID (cardiovascular, nervous, renal, hepatic, placental, respiratory)
 */
function toggleLayer(layer) {
    console.log(`Toggling layer: ${layer} `);

    // Map layer names to data-organ attributes
    const layerMap = {
        'cardiovascular': 'heart',
        'nervous': 'brain',
        'renal': 'kidneys',
        'hepatic': 'liver',
        'placental': 'placenta',
        'respiratory': 'lungs'
    };

    const organName = layerMap[layer];
    const checkbox = document.getElementById(`layer${layer.charAt(0).toUpperCase() + layer.slice(1)} `);
    const isVisible = checkbox ? checkbox.checked : true;

    // Find all icons and hotspots for this organ
    const elements = document.querySelectorAll(`[data - organ= "${organName}"]`);
    elements.forEach(el => {
        el.style.display = isVisible ? 'block' : 'none';
        el.style.opacity = isVisible ? (el.classList.contains('glow-zone') ? el.getAttribute('data-opacity') || '0' : '1') : '0';
    });

    showToast(`${layer.charAt(0).toUpperCase() + layer.slice(1)} system ${isVisible ? 'shown' : 'hidden'} `, 'info');
}

/**
 * Apply quick presets for organ views
 * @param {string} preset - all, critical, affected
 */
function applyPreset(preset) {
    console.log(`Applying preset: ${preset} `);

    const layers = ['cardiovascular', 'nervous', 'renal', 'hepatic', 'placental', 'respiratory'];

    layers.forEach(layer => {
        const checkbox = document.getElementById(`layer${layer.charAt(0).toUpperCase() + layer.slice(1)} `);
        if (!checkbox) return;

        let shouldShow = true;
        if (preset === 'critical') {
            shouldShow = ['cardiovascular', 'nervous', 'placental'].includes(layer);
        } else if (preset === 'affected') {
            // Only show strictly "affected" organs (simplified logic)
            shouldShow = ['cardiovascular', 'renal', 'hepatic'].includes(layer);
        }

        checkbox.checked = shouldShow;
        toggleLayer(layer);
    });

    showToast(`Applied ${preset} view preset`, 'success');
}

/**
 * Play the automatic "Disease Journey" animation
 */
function playJourney() {
    if (journeyTimer && !journeyPaused) return;

    journeyPaused = false;
    document.getElementById('playBtn').style.display = 'none';
    document.getElementById('pauseBtn').style.display = 'inline-block';

    const slider = document.getElementById('severitySlider');
    const fill = document.getElementById('journeyProgressFill');
    const timeDisplay = document.getElementById('journeyTime');

    if (!slider) return;

    journeyTimer = setInterval(() => {
        if (journeyPaused) return;

        journeyCurrentTime += 0.1;
        if (journeyCurrentTime > journeyDuration) {
            clearInterval(journeyTimer);
            journeyTimer = null;
            journeyCurrentTime = 0;
            document.getElementById('playBtn').style.display = 'inline-block';
            document.getElementById('pauseBtn').style.display = 'none';
            showToast('Disease journey complete', 'success');
            return;
        }

        // Update progress bar
        const progress = (journeyCurrentTime / journeyDuration) * 100;
        if (fill) fill.style.width = progress + '%';

        // Update time display
        const minutes = Math.floor(journeyCurrentTime / 60);
        const seconds = Math.floor(journeyCurrentTime % 60);
        if (timeDisplay) timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds} / 1:00`;

        // Update severity slider (0-100 over 60s)
        const severityValue = Math.min(100, (journeyCurrentTime / journeyDuration) * 100);
        slider.value = severityValue;

        // Trigger the severity update logic from main script
        if (typeof updateSeverityLevel === 'function') {
            updateSeverityLevel(severityValue);
        }
    }, 100);
}

/**
 * Pause the automatic journey
 */
function pauseJourney() {
    journeyPaused = true;
    document.getElementById('playBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
    showToast('Journey paused', 'info');
}

/**
 * Reset the journey
 */
function resetJourney() {
    clearInterval(journeyTimer);
    journeyTimer = null;
    journeyPaused = false;
    journeyCurrentTime = 0;

    document.getElementById('playBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';

    const fill = document.getElementById('journeyProgressFill');
    if (fill) fill.style.width = '0%';

    const timeDisplay = document.getElementById('journeyTime');
    if (timeDisplay) timeDisplay.textContent = '0:00 / 1:00';

    const slider = document.getElementById('severitySlider');
    if (slider) {
        slider.value = 0;
        if (typeof updateSeverityLevel === 'function') {
            updateSeverityLevel(0);
        }
    }

    showToast('Journey reset', 'info');
}

/**
 * Enhance the organ modal with dynamic content
 * (Overrides existing openOrganModal if present)
 */
const originalOpenOrganModal = typeof openOrganModal === 'function' ? openOrganModal : null;
window.openOrganModal = function (organName) {
    console.log(`Opening detailed modal for: ${organName}`);

    // Call original if it exists
    if (originalOpenOrganModal) {
        originalOpenOrganModal(organName);
        return;
    }

    // Fallback if original not found
    showToast(`Information for ${organName} loading...`, 'info');
};

/**
 * showToast utility for feedback
 */
window.showToast = function (message, type = 'info') {
    console.log(`Toast [${type}]: ${message}`);
    const toast = document.createElement('div');
    toast.className = `simulator-toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
            <span class="toast-message">${message}</span>
        </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
};

// Expose functions to window for onclick handlers
window.switchViewMode = switchViewMode;
window.toggleLayer = toggleLayer;
window.applyPreset = applyPreset;
window.playJourney = playJourney;
window.pauseJourney = pauseJourney;
window.resetJourney = resetJourney;
window.updateSeverityLevel = updateSeverityLevel;
window.updatePregnancyWeek = updatePregnancyWeek;
window.updateVitals = updateVitals;
window.updateOrganGlows = updateOrganGlows;

/**
 * Initialize enhanced features
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Enhanced Simulator Logic Initialized');
    // Ensure all checkboxes match SVG visibility
    const layers = ['cardiovascular', 'nervous', 'renal', 'hepatic', 'placental', 'respiratory'];
    layers.forEach(l => {
        const idMap = {
            'cardiovascular': 'layerCardio',
            'nervous': 'layerNervous',
            'renal': 'layerRenal',
            'hepatic': 'layerHepatic',
            'placental': 'layerPlacental',
            'respiratory': 'layerRespiratory'
        };
        const cb = document.getElementById(idMap[l]);
        if (cb && !cb.checked) toggleLayer(l);
    });
});
