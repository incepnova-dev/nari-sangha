import React, { useState } from "react";
import styles from "./videoSection.module.css";
import VideoModal from "./VideoModal";

interface VideoData {
    id: string;
    title: string;
    author: string;
    role: string;
    views: string;
    duration: string;
    thumbnail: string;
    youtubeId: string;
}

const EXPERT_VIDEOS: VideoData[] = [
    {
        id: "v1",
        title: "The Science of Women's Health: OB/GYN Reveals 10 Truths",
        author: "Mel Robbins",
        role: "Expert Interview",
        views: "210K",
        duration: "1:07:13",
        thumbnail: "https://i.ytimg.com/vi/7KX2x0d42EE/hq720.jpg",
        youtubeId: "7KX2x0d42EE"
    },
    {
        id: "v2",
        title: "5 Things Your Gynecologist Wants You To Know: Getting Pregnant",
        author: "Mama Doctor Jones",
        role: "Board Certified OB/GYN",
        views: "1.2M",
        duration: "10:29",
        thumbnail: "https://i.ytimg.com/vi/EkqVrsrIgAI/hq720.jpg",
        youtubeId: "EkqVrsrIgAI"
    }
];

const VideoSection: React.FC = () => {
    const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);

    return (
        <section className={styles.videoSection}>
            <div className={styles.container}>
                <div className={styles.sectionHeader}>
                    <div className={styles.titleGroup}>
                        <h2>Expert Advice from Gynecologists 📺</h2>
                        <p className={styles.subheading}>Learn from leading women's health experts and specialists.</p>
                    </div>
                    <a href="#" className={styles.viewAllBtn}>View All Videos</a>
                </div>

                <div className={styles.videoGrid}>
                    {EXPERT_VIDEOS.map((video) => (
                        <div
                            key={video.id}
                            className={styles.videoCard}
                            onClick={() => setSelectedVideo(video)}
                        >
                            <div className={styles.videoThumbnail}>
                                <img src={video.thumbnail} alt={video.title} />
                                <div className={styles.playOverlay}>
                                    <i className="fa-solid fa-play"></i>
                                </div>
                            </div>
                            <div className={styles.videoContent}>
                                <h3 className={styles.videoTitle}>{video.title}</h3>
                                <p className={styles.videoAuthor}>{video.author} • {video.role}</p>
                                <div className={styles.videoMeta}>
                                    <span className={styles.videoMetaItem}>
                                        <i className="fa-solid fa-eye"></i> {video.views} views
                                    </span>
                                    <span className={styles.videoMetaItem}>
                                        <i className="fa-solid fa-clock"></i> {video.duration}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <VideoModal
                isOpen={!!selectedVideo}
                onClose={() => setSelectedVideo(null)}
                youtubeId={selectedVideo?.youtubeId || ""}
                title={selectedVideo?.title || ""}
            />
        </section>
    );
};

export default VideoSection;
