import React, { useEffect, useRef } from "react";
import styles from "./StoryModal.module.css";
import { Story } from "../../data/seed";

interface StoryModalProps {
    story: Story;
    isOpen: boolean;
    onClose: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ story, isOpen, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    // Focus trap and ESC key handling
    useEffect(() => {
        if (!isOpen) return;

        closeButtonRef.current?.focus();
        document.body.style.overflow = "hidden";

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
            // Focus trap
            if (e.key === "Tab" && modalRef.current) {
                const focusableElements = modalRef.current.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0] as HTMLElement;
                const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="story-title">
            <div
                ref={modalRef}
                className={styles.modalContainer}
                style={{ background: story.themeColor }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    ref={closeButtonRef}
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close story"
                >
                    ✕
                </button>

                {/* Modal content */}
                <div className={styles.modalContent}>
                    {/* Icon */}
                    <div className={styles.storyIcon}>{story.icon}</div>

                    {/* Category badge */}
                    <span className={styles.categoryBadge}>{story.category}</span>

                    {/* Title */}
                    <h2 id="story-title" className={styles.storyTitle}>{story.title}</h2>

                    {/* Quote */}
                    <blockquote className={styles.storyQuote}>"{story.quote}"</blockquote>

                    {/* Full story content */}
                    <div className={styles.storyFullContent}>
                        <p>{story.content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryModal;
