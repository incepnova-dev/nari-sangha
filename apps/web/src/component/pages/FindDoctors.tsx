import React, { useState } from "react";
import styles from "./FindDoctors.module.css";
import InnerPageHero from "../shared/InnerPageHero";

interface Doctor {
    id: string;
    name: string;
    specialty: string;
    experience: string;
    rating: number;
    reviews: number;
    location: string;
    tags: string[];
    available: string;
    photo: string;
}

const DOCTORS: Doctor[] = [
    {
        id: "1",
        name: "Dr. Sarah Johnson, MD",
        specialty: "OB/GYN",
        experience: "15 years",
        rating: 4.9,
        reviews: 247,
        location: "Women's Health Center, New York, NY",
        tags: ["Pregnancy Care", "High-Risk OB", "Spanish"],
        available: "Tomorrow 2:00 PM",
        photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400"
    },
    {
        id: "2",
        name: "Dr. Emily Chen, MD",
        specialty: "Reproductive Endocrinology",
        experience: "12 years",
        rating: 4.8,
        reviews: 189,
        location: "Fertility Institute, Los Angeles, CA",
        tags: ["IVF", "PCOS", "Endometriosis"],
        available: "Today 4:30 PM",
        photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400"
    },
    {
        id: "3",
        name: "Dr. Maria Rodriguez, DO",
        specialty: "General Gynecology",
        experience: "10 years",
        rating: 5.0,
        reviews: 312,
        location: "Community Health Clinic, Chicago, IL",
        tags: ["Birth Control", "Menstrual Disorders", "Spanish & Polish"],
        available: "Friday 10:00 AM",
        photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400"
    }
];

const SPECIALTIES = [
    "General Gynecologist", "OB/GYN", "Reproductive Endocrinologist",
    "Maternal-Fetal Medicine", "Gynecologic Oncologist", "Urogynecologist",
    "Menopause Specialist", "Sexual Health Specialist"
];

const FindDoctors: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [locationQuery, setLocationQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");

    return (
        <div className={styles.findDoctorsPage}>
            <InnerPageHero
                title="Find Women's Health Specialists"
                subtitle="Connect with top-rated gynecologists, fertility experts, and specialized women's health clinics. Quality care tailored to your specific needs."
                badge="Expert Network"
                centered
            />

            <section className={styles.section} style={{ paddingTop: 0 }}>
                <div className={styles.container}>
                    <div className={styles.searchBox}>
                        <div className={styles.searchInputs}>
                            <input
                                type="text"
                                placeholder="Condition, specialty, or doctor name"
                                className={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="City, state, or ZIP"
                                className={styles.searchInput}
                                value={locationQuery}
                                onChange={(e) => setLocationQuery(e.target.value)}
                            />
                            <button className={styles.btnSearch}>
                                🔍 Search
                            </button>
                        </div>
                        <div className={styles.filterChips}>
                            <span
                                className={`${styles.filterChip} ${activeFilter === 'all' ? styles.filterChipActive : ''}`}
                                onClick={() => setActiveFilter('all')}
                            >
                                All Specialists
                            </span>
                            <span className={styles.filterChip}>Accepts New Patients</span>
                            <span className={styles.filterChip}>Highly Rated (4.5+)</span>
                            <span className={styles.filterChip}>Weekend Hours</span>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2>Explore by Specialty</h2>
                        <div className={styles.filterChips} style={{ marginTop: '20px' }}>
                            {SPECIALTIES.map(s => (
                                <span key={s} className={styles.filterChip}>{s}</span>
                            ))}
                        </div>
                    </div>

                    <div className={styles.doctorListings}>
                        {DOCTORS.map(doc => (
                            <div key={doc.id} className={styles.doctorCard}>
                                <img src={doc.photo} alt={doc.name} className={styles.doctorPhoto} />
                                <div className={styles.doctorInfo}>
                                    <h3>{doc.name}</h3>
                                    <p className={styles.specialty}>{doc.specialty} - {doc.experience} experience</p>
                                    <div className={styles.rating}>
                                        <span className={styles.stars}>⭐ {doc.rating}</span>
                                        <span style={{ color: '#666', fontSize: '0.9rem' }}>({doc.reviews} reviews)</span>
                                    </div>
                                    <p className={styles.location}>📍 {doc.location}</p>
                                    <div className={styles.doctorTags}>
                                        {doc.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                                    </div>
                                </div>
                                <div className={styles.doctorActions}>
                                    <div className={styles.availability}>
                                        Next available: <br />
                                        <strong>{doc.available}</strong>
                                    </div>
                                    <button className={styles.btnBook}>Book Appointment</button>
                                    <button className={styles.btnProfile}>View Profile</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.section} style={{ background: '#fcf8fa' }}>
                <div className={styles.container}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                        <div style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                            <h3 style={{ marginBottom: '20px', color: '#ec407a' }}>First Visit Questions</h3>
                            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
                                <li>What is your experience with my specific concern?</li>
                                <li>What diagnostic tests do you recommend initially?</li>
                                <li>What are the different treatment paths available?</li>
                                <li>Are there lifestyle changes that supplement medical care?</li>
                            </ul>
                        </div>
                        <div style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                            <h3 style={{ marginBottom: '20px', color: '#ec407a' }}>Before Scheduling</h3>
                            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
                                <li>Does the clinic accept my insurance provider?</li>
                                <li>What are the typical wait times for appointments?</li>
                                <li>Do you offer evening or weekend consultations?</li>
                                <li>Is there a patient portal for test results?</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FindDoctors;
