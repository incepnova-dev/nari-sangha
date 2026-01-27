import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/Routes';
import styles from './InsuranceCard.module.css';

interface InsurancePlan {
    id: string;
    name: string;
    provider: string;
    priceYearly: number;
    features: string[];
    description?: string;
}

interface InsuranceCardProps {
    plan: InsurancePlan;
    isPreview?: boolean;
}

const InsuranceCard: React.FC<InsuranceCardProps> = ({ plan, isPreview = false }) => {
    return (
        <div className={styles.insuranceCard}>
            <div className={styles.cardHeader}>
                <span className={styles.badge}>INSURANCE</span>
                <h4 className={styles.planName}>{plan.name}</h4>
                <p className={styles.provider}>{plan.provider}</p>
            </div>

            <ul className={styles.featuresList}>
                {plan.features.slice(0, isPreview ? 2 : 3).map((feature, idx) => (
                    <li key={idx}>
                        <span className={styles.checkIcon}>✓</span>
                        {feature}
                    </li>
                ))}
                {!isPreview && plan.features.length > 3 && (
                    <li className={styles.moreFeatures}>
                        +{plan.features.length - 3} more benefits
                    </li>
                )}
            </ul>

            <div className={styles.cardFooter}>
                <div className={styles.pricing}>
                    <span className={styles.price}>₹{plan.priceYearly.toLocaleString()}</span>
                    <span className={styles.period}>/year</span>
                </div>

                {isPreview ? (
                    <Link to={`${ROUTES.PRODUCTS}#insurance`}>
                        <button className={styles.ctaButton}>
                            View Plan →
                        </button>
                    </Link>
                ) : (
                    <button className={styles.ctaButton}>
                        Get Coverage
                    </button>
                )}
            </div>
        </div>
    );
};

export default InsuranceCard;
