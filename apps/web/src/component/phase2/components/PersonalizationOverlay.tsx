import React, { useEffect } from 'react';
import { usePhase2 } from './Phase2Provider';
import { useLocation } from 'react-router-dom';
import './Phase2Styles.css';

export const PersonalizationOverlay: React.FC = () => {
    const { stage, saveProgress } = usePhase2();
    const location = useLocation();

    useEffect(() => {
        // Track journey progress automatically
        const pathParts = location.pathname.split('/');
        const journeyId = pathParts[pathParts.length - 1];
        if (journeyId && location.pathname.includes('journeys')) {
            saveProgress(journeyId);
        }

        if (stage.type === 'none') return;

        const highlightStage = () => {
            const isPregnancyPage = location.pathname.includes('pregnancy');
            const isPostpartumPage = location.pathname.includes('postpartum');

            // Cleanup previous highlights
            document.querySelectorAll('.phase2-highlight').forEach(el => {
                el.classList.remove('phase2-highlight');
                el.querySelector('.phase2-badge')?.remove();
            });

            if (isPostpartumPage && stage.type === 'postpartum') {
                const cards = document.querySelectorAll('div[style*="background"] h3');
                cards.forEach(h3 => {
                    const text = h3.textContent?.toLowerCase() || '';
                    let match = false;

                    if (stage.week <= 1 && text.includes('first week')) match = true;
                    else if (stage.week > 1 && stage.week <= 6 && text.includes('weeks 2-6')) match = true;
                    else if (stage.week > 6 && stage.week <= 12 && text.includes('6 weeks - 3 months')) match = true;
                    else if (stage.week > 12 && stage.week <= 24 && text.includes('3-6 months')) match = true;
                    else if (stage.week > 24 && text.includes('6-12 months')) match = true;

                    if (match) {
                        const card = h3.parentElement;
                        if (card) {
                            card.classList.add('phase2-highlight');
                            const badge = document.createElement('div');
                            badge.className = 'phase2-badge';
                            badge.textContent = 'Current Stage';
                            card.appendChild(badge);
                        }
                    }
                });
            }

            if (isPregnancyPage && stage.type === 'pregnancy') {
                // Highlighting logic for Pregnancy Timeline items or sections
                const flowSteps = document.querySelectorAll('.flow-step, h3, h4');
                flowSteps.forEach(el => {
                    const text = el.textContent?.toLowerCase() || '';
                    if (text.includes(`week ${stage.week}`) || (stage.week <= 13 && text.includes('first trimester'))) {
                        const target = el.closest('div[style*="background"]') || el.parentElement;
                        if (target) {
                            target.classList.add('phase2-highlight');
                            const badge = document.createElement('div');
                            badge.className = 'phase2-badge';
                            badge.textContent = 'You are here';
                            target.appendChild(badge);
                        }
                    }
                });
            }
        };

        const timer = setTimeout(highlightStage, 500);
        return () => clearTimeout(timer);
    }, [stage, location.pathname, saveProgress]);

    return null;
};
