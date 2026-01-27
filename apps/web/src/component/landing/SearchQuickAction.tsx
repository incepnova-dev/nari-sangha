import React from "react";
import styles from "./landing.module.css";
import { useI18n } from "../../hooks/useI18n";
import { Search } from "lucide-react";

import DiscoveryGrid from "./DiscoveryGrid";

const SearchQuickAction: React.FC = () => {
    const { t } = useI18n();

    const actions = [
        t("search.quickActions.action1"),
        t("search.quickActions.action2"),
        t("search.quickActions.action3"),
    ];

    return (
        <section className={styles.searchSection}>
            <div className={styles.searchContainer}>
                <div className={styles.searchBarWrapper}>
                    <Search className={styles.searchIcon} size={24} />
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder={t("search.placeholder")}
                    />
                </div>
                <div className={styles.quickActions}>
                    <span className={styles.quickActionsLabel}>{t("search.quickActions.title")}:</span>
                    <div className={styles.actionPills}>
                        {actions.map((action, idx) => (
                            <button key={idx} className={styles.actionPill}>
                                {action}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <DiscoveryGrid />
        </section>
    );
};

export default SearchQuickAction;
