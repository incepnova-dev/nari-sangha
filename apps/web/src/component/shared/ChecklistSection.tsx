import React from "react";
import styles from "./ChecklistSection.module.css";

interface ChecklistItem {
    id: string | number;
    text: string;
}

interface ChecklistSectionProps {
    title: string;
    icon?: React.ReactNode;
    items: ChecklistItem[];
}

const ChecklistSection: React.FC<ChecklistSectionProps> = ({ title, icon, items }) => {
    return (
        <div className={styles.checklistCard}>
            <h3 className={styles.checklistTitle}>
                {icon && <span className={styles.checklistIcon}>{icon}</span>}
                {title}
            </h3>
            <ul className={styles.checklist}>
                {items.map((item) => (
                    <li key={item.id} className={styles.checklistItem}>
                        <span className={styles.checkbox}>✓</span>
                        {item.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChecklistSection;
