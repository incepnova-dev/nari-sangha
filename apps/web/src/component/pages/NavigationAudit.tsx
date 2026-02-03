import React from 'react';
import { ROUTES } from '../routes/Routes';

interface PageAuditItem {
    name: string;
    path: string;
    route: string | null;
    isRegistered: boolean;
    isReachable: boolean;
    suggestedParent: string;
}

const NavigationAudit: React.FC = () => {
    const PAGE_INVENTORY: PageAuditItem[] = [
        { name: 'About', path: 'About.tsx', route: ROUTES.ABOUT, isRegistered: true, isReachable: true, suggestedParent: 'Navbar' },
        { name: 'AdolescentHealthJourney', path: 'AdolescentHealthJourney.tsx', route: ROUTES.ADOLESCENT_HEALTH, isRegistered: true, isReachable: true, suggestedParent: 'Journeys' },
        { name: 'Appointments', path: 'Appointments.tsx', route: ROUTES.APPOINTMENTS, isRegistered: true, isReachable: true, suggestedParent: 'Navbar' },
        { name: 'ChronicConditionsJourney', path: 'ChronicConditionsJourney.tsx', route: ROUTES.CHRONIC_CONDITIONS, isRegistered: true, isReachable: true, suggestedParent: 'Journeys' },
        { name: 'Community', path: 'Community.tsx', route: ROUTES.COMMUNITY, isRegistered: true, isReachable: true, suggestedParent: 'Navbar' },
        { name: 'CosmeticSurgeryGuide', path: 'CosmeticSurgeryGuide.tsx', route: ROUTES.COSMETIC_SURGERY, isRegistered: true, isReachable: true, suggestedParent: 'Services' },
        { name: 'Dashboard', path: 'Dashboard.tsx', route: ROUTES.DASHBOARD, isRegistered: true, isReachable: true, suggestedParent: 'Navbar (Profile)' },
        { name: 'FertilityJourney', path: 'FertilityJourney.tsx', route: ROUTES.FERTILITY, isRegistered: true, isReachable: true, suggestedParent: 'Journeys' },
        { name: 'FindDoctors', path: 'FindDoctors.tsx', route: ROUTES.FIND_DOCTORS, isRegistered: true, isReachable: true, suggestedParent: 'Journeys Hero' },
        { name: 'GovernmentSchemes', path: 'GovernmentSchemes.tsx', route: ROUTES.GOVERNMENT_SCHEMES, isRegistered: true, isReachable: true, suggestedParent: 'Landing' },
        { name: 'InsuranceGuide', path: 'InsuranceGuide.tsx', route: ROUTES.INSURANCE_GUIDE, isRegistered: true, isReachable: true, suggestedParent: 'Products' },
        { name: 'JourneyFlow', path: 'JourneyFlow.tsx', route: null, isRegistered: false, isReachable: true, suggestedParent: 'Journeys (Component)' },
        { name: 'JourneyHeroAnimation', path: 'JourneyHeroAnimation.tsx', route: null, isRegistered: false, isReachable: true, suggestedParent: 'Journeys (Component)' },
        { name: 'Journeys', path: 'Journeys.tsx', route: ROUTES.JOURNEYS, isRegistered: true, isReachable: true, suggestedParent: 'Navbar' },
        { name: 'MenopauseJourney', path: 'MenopauseJourney.tsx', route: ROUTES.MENOPAUSE, isRegistered: true, isReachable: true, suggestedParent: 'Journeys' },
        { name: 'MenstrualHealthJourney', path: 'MenstrualHealthJourney.tsx', route: ROUTES.MENSTRUAL_HEALTH, isRegistered: true, isReachable: true, suggestedParent: 'Journeys' },
        { name: 'MentalWellnessJourney', path: 'MentalWellnessJourney.tsx', route: ROUTES.MENTAL_WELLNESS, isRegistered: true, isReachable: true, suggestedParent: 'Journeys' },
        { name: 'PerinatalFamilyGuide', path: 'PerinatalFamilyGuide.tsx', route: ROUTES.PERINATAL_FAMILY, isRegistered: true, isReachable: true, suggestedParent: 'Pregnancy Journey' },
        { name: 'PerinatalJourney', path: 'PerinatalJourney.tsx', route: ROUTES.PERINATAL, isRegistered: true, isReachable: true, suggestedParent: 'Journeys' },
        { name: 'PostpartumJourney', path: 'PostpartumJourney.tsx', route: ROUTES.POSTPARTUM, isRegistered: true, isReachable: true, suggestedParent: 'Journeys' },
        { name: 'PregnancyJourney', path: 'PregnancyJourney.tsx', route: ROUTES.PREGNANCY, isRegistered: true, isReachable: true, suggestedParent: 'Journeys' },
        { name: 'PreventiveHealthJourney', path: 'PreventiveHealthJourney.tsx', route: ROUTES.PREVENTIVE_HEALTH, isRegistered: true, isReachable: true, suggestedParent: 'Journeys' },
        { name: 'Products', path: 'Products.tsx', route: ROUTES.PRODUCTS, isRegistered: true, isReachable: true, suggestedParent: 'Navbar' },
        { name: 'ResearchHub', path: 'ResearchHub.tsx', route: ROUTES.RESEARCH, isRegistered: true, isReachable: true, suggestedParent: 'Landing' },
        { name: 'Safety', path: 'Safety.tsx', route: ROUTES.SAFETY, isRegistered: true, isReachable: true, suggestedParent: 'Navbar' },
        { name: 'ScreeningGuide', path: 'ScreeningGuide.tsx', route: ROUTES.SCREENING, isRegistered: true, isReachable: true, suggestedParent: 'Preventive Health' },
        { name: 'Services', path: 'Services.tsx', route: ROUTES.SERVICES, isRegistered: true, isReachable: true, suggestedParent: 'Navbar' },
        // { name: 'Stories', path: 'Stories.tsx', route: ROUTES.STORIES, isRegistered: true, isReachable: true, suggestedParent: 'Navbar' },
        { name: 'Support', path: 'Support.tsx', route: ROUTES.SUPPORT, isRegistered: true, isReachable: true, suggestedParent: 'Navbar' },
        { name: 'SymptomChecker', path: 'SymptomChecker.tsx', route: ROUTES.SYMPTOM_CHECKER, isRegistered: true, isReachable: true, suggestedParent: 'Navbar' },
        { name: 'Teleconsultation', path: 'Teleconsultation.tsx', route: ROUTES.TELECONSULTATION, isRegistered: true, isReachable: true, suggestedParent: 'Appointments' },
        { name: 'VaccinationGuide', path: 'VaccinationGuide.tsx', route: ROUTES.VACCINATION, isRegistered: true, isReachable: true, suggestedParent: 'Preventive Health' },
    ];

    return (
        <div style={{ padding: '40px', fontFamily: 'monospace', color: '#333', background: '#f5f5f5', minHeight: '100vh' }}>
            <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>🔍 Internal Navigation Audit</h1>
            <p style={{ marginBottom: '30px', color: '#666' }}>Note: This is a developer-only tool. Data is based on static analysis of src/component/pages.</p>

            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <thead>
                    <tr style={{ background: '#333', color: 'white', textAlign: 'left' }}>
                        <th style={{ padding: '12px' }}>Page Name</th>
                        <th style={{ padding: '12px' }}>File Path</th>
                        <th style={{ padding: '12px' }}>Registered?</th>
                        <th style={{ padding: '12px' }}>Reachable via UI?</th>
                        <th style={{ padding: '12px' }}>Suggested Parent</th>
                    </tr>
                </thead>
                <tbody>
                    {PAGE_INVENTORY.map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '12px', fontWeight: 'bold' }}>{item.name}</td>
                            <td style={{ padding: '12px' }}>{item.path}</td>
                            <td style={{ padding: '12px', color: item.isRegistered ? '#2e7d32' : '#c62828' }}>
                                {item.isRegistered ? '✅ Yes' : '❌ No'}
                            </td>
                            <td style={{ padding: '12px', color: item.isReachable ? '#2e7d32' : '#c62828' }}>
                                {item.isReachable ? '✅ Yes' : '❌ No'}
                            </td>
                            <td style={{ padding: '12px', fontStyle: 'italic' }}>{item.suggestedParent}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NavigationAudit;
