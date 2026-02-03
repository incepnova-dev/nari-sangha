import React, { useEffect, useRef } from "react";
import styles from "./videoSection.module.css";
import { createPortal } from "react-dom";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    youtubeId: string;
    title: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, youtubeId, title }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className={styles.modalBackdrop} onClick={onClose} aria-modal="true" role="dialog">
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
                ref={modalRef}
            >
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    ×
                </button>
                <div className={styles.iframeWrapper}>
                    <iframe
                        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>,
        document.body
    );
};

export default VideoModal;
