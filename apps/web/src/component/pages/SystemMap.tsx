import React from 'react';
import { ROUTES } from '../routes/Routes';

const SystemMap: React.FC = () => {
    const routeMap = [
        { route: ROUTES.LANDING, parent: 'Entry Point' },
        { route: ROUTES.JOURNEYS, parent: 'Navbar / Footer' },
        { route: ROUTES.PRODUCTS, parent: 'Navbar / Footer' },
        { route: ROUTES.APPOINTMENTS, parent: 'Navbar' },
        { route: ROUTES.COMMUNITY, parent: 'Navbar' },
        { route: ROUTES.SYMPTOM_CHECKER, parent: 'Navbar / Footer' },
        { route: ROUTES.ABOUT, parent: 'Navbar' },
        // { route: ROUTES.STORIES, parent: 'Navbar / Footer' },
        { route: ROUTES.SAFETY, parent: 'Navbar' },
        { route: ROUTES.SUPPORT, parent: 'Navbar' },
        { route: ROUTES.DASHBOARD, parent: 'Profile Dropdown' },
        { route: '/navigation-tasks', parent: 'Manual Entry Only' },
        { route: '/system-map', parent: 'Manual Entry Only' },
        { route: ROUTES.PREGNANCY, parent: 'Journeys' },
        { route: ROUTES.FERTILITY, parent: 'Journeys' },
        { route: ROUTES.PREVENTIVE_HEALTH, parent: 'Journeys' },
        { route: ROUTES.MENSTRUAL_HEALTH, parent: 'Journeys' },
        { route: ROUTES.CHRONIC_CONDITIONS, parent: 'Journeys' },
        { route: ROUTES.MENTAL_WELLNESS, parent: 'Journeys' },
        { route: ROUTES.POSTPARTUM, parent: 'Journeys' },
        { route: ROUTES.ADOLESCENT_HEALTH, parent: 'Journeys' },
        { route: ROUTES.MENOPAUSE, parent: 'Journeys' },
        { route: ROUTES.PERINATAL, parent: 'Journeys' },
        { route: ROUTES.COSMETIC_SURGERY, parent: 'Services' },
        { route: ROUTES.PERINATAL_FAMILY, parent: 'Pregnancy Journey' },
        { route: ROUTES.RESEARCH, parent: 'Landing Hub' },
        { route: ROUTES.GOVERNMENT_SCHEMES, parent: 'Landing / Safety' },
        { route: ROUTES.TELECONSULTATION, parent: 'Appointments / Safety' },
        { route: ROUTES.VACCINATION, parent: 'Appointments / Preventive' },
        { route: ROUTES.SCREENING, parent: 'Preventive Health' },
        { route: ROUTES.SERVICES, parent: 'Landing / Symptoms' },
        { route: ROUTES.INSURANCE_GUIDE, parent: 'Products' },
    ];

    return (
        <div style={{ padding: '40px', fontFamily: 'serif', whiteSpace: 'pre-wrap' }}>
            <h1>🗺️ Nari Sangha: System Route Map</h1>
            <hr />
            {routeMap.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '10px' }}>
                    <strong>Route:</strong> {item.route}
                    <br />
                    <strong>Parent:</strong> {item.parent}
                    <div style={{ borderBottom: '1px solid #ddd', marginTop: '5px' }}></div>
                </div>
            ))}
        </div>
    );
};

export default SystemMap;
