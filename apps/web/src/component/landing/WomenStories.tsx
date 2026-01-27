import React, { useRef, useState, useEffect } from "react";
import styles from "./landing.module.css";
import { useI18n } from "../../hooks/useI18n";
import { stories, Story } from "../../data/seed";
import StoryModal from "./StoryModal";

const WomenStories: React.FC = () => {
    const { t } = useI18n();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [selectedStory, setSelectedStory] = useState<Story | null>(null);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 10);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        const ref = scrollRef.current;
        if (ref) {
            ref.addEventListener('scroll', checkScroll);
            checkScroll();
            window.addEventListener('resize', checkScroll);
        }
        return () => {
            if (ref) ref.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const cardWidth = 350; // Approximated
            const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
            scrollRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const openStory = (story: Story) => {
        setSelectedStory(story);
    };

    const closeStory = () => {
        setSelectedStory(null);
    };

    return (
        <section className={styles.storiesSection}>
            <div className={styles.sectionHeader}>
                <h2>{t("stories.title") || "Community Stories"}</h2>
                <p>{t("stories.subtitle") || "Real journeys, real strength."}</p>
            </div>

            <div className={styles.storiesCarouselWrapper}>
                <button
                    className={`${styles.navButton} ${styles.navPrev}`}
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                    aria-label="Previous stories"
                >
                    ←
                </button>
                <button
                    className={`${styles.navButton} ${styles.navNext}`}
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight}
                    aria-label="Next stories"
                >
                    →
                </button>

                <div className={styles.storiesCarousel} ref={scrollRef}>
                    <div className={styles.carouselTrack}>
                        {stories.map((story) => (
                            <div
                                key={story.id}
                                className={styles.storyCard}
                                style={{ background: story.themeColor || '#fff' }}
                            >
                                <div className={styles.storyBody}>
                                    <div className={styles.storyIcon} style={{ fontSize: '32px', marginBottom: '16px' }}>
                                        {story.icon}
                                    </div>
                                    <span className={styles.storyCategory} style={{
                                        display: 'inline-block',
                                        padding: '4px 12px',
                                        background: 'rgba(0,0,0,0.05)',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        marginBottom: '12px',
                                        color: '#555'
                                    }}>
                                        {story.category}
                                    </span>
                                    <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>{story.title}</h3>
                                    <blockquote style={{
                                        fontStyle: 'italic',
                                        fontSize: '14px',
                                        color: '#444',
                                        marginBottom: '16px',
                                        lineHeight: '1.5'
                                    }}>
                                        "{story.quote}"
                                    </blockquote>
                                    <p style={{ fontSize: '14px', flexGrow: 1, lineHeight: '1.6' }}>
                                        {story.content.substring(0, 160)}...
                                    </p>
                                    <button
                                        className={styles.readFullStoryBtn}
                                        onClick={() => openStory(story)}
                                    >
                                        Read Full Story
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Story Modal */}
            {selectedStory && (
                <StoryModal
                    story={selectedStory}
                    isOpen={!!selectedStory}
                    onClose={closeStory}
                />
            )}
        </section>
    );
};

export default WomenStories;

