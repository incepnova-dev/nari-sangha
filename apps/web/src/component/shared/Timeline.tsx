import React from "react";
import styles from "./Timeline.module.css";

interface TimelineItem {
    id: string | number;
    title: string;
    description: string;
    icon?: React.ReactNode;
}

interface TimelineProps {
    items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
    return (
        <div className={styles.timeline}>
            {items.map((item, index) => (
                <div key={item.id} className={styles.timelineItem}>
                    <div className={styles.timelineMarker}>
                        <div className={styles.markerCircle}>
                            {item.icon || (index + 1)}
                        </div>
                        {index !== items.length - 1 && <div className={styles.markerLine} />}
                    </div>
                    <div className={styles.timelineContent}>
                        <h3 className={styles.itemTitle}>{item.title}</h3>
                        <p className={styles.itemDescription}>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Timeline;
