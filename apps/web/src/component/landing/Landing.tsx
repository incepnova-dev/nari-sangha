import React from "react";
import HeroSection from "./HeroSection";
import WomenStories from "./WomenStories";
import ProductsSection from "./ProductsSection";
import styles from "./landing.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/Routes";

interface LandingProps {
  handleSignInClick?: () => void;
  onSignInSuccess?: (data: any) => void;
  language?: string;
}

const Landing: React.FC<LandingProps> = ({ handleSignInClick }) => {
  return (
    <>
      <HeroSection onSignInClick={handleSignInClick || (() => { })} />

      {/* 2. Quick Access / Platform Explorer */}
      <section className={styles.section} style={{ background: "white", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <h2 className={styles.sectionTitle} style={{ fontSize: "28px", marginBottom: "40px" }}>Explore the platform</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "24px" }}>
            {[
              { title: "Guided Journeys", icon: "🛤️", path: ROUTES.JOURNEYS, color: "#F3E5F5" },
              { title: "Symptom Checker", icon: "🩺", path: ROUTES.SYMPTOM_CHECKER, color: "#E8F5E9" },
              { title: "Teleconsultation", icon: "📹", path: ROUTES.APPOINTMENTS, color: "#E3F2FD" },
              { title: "Find Specialists", icon: "👩‍⚕️", path: ROUTES.APPOINTMENTS, color: "#FFF3E0" },
            ].map((item, idx) => (
              <Link key={idx} to={item.path} style={{ textDecoration: "none" }}>
                <div style={{ background: "white", padding: "24px", borderRadius: "20px", border: "1px solid #f0f0f0", transition: "transform 0.2s", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
                  <div style={{ fontSize: "32px", marginBottom: "16px", background: item.color, width: "60px", height: "60px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>{item.icon}</div>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#333", marginBottom: "8px" }}>{item.title}</h3>
                  <span style={{ fontSize: "13px", color: "var(--pink)", fontWeight: "600" }}>Explore &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. AI Assistant Banner */}
      <section style={{ padding: "20px" }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background: "linear-gradient(90deg, #6A1B9A 0%, #8E24AA 100%)",
          borderRadius: "24px",
          padding: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "white",
          flexWrap: "wrap",
          gap: "20px"
        }}>
          <div style={{ flex: 1, minWidth: "300px" }}>
            <span style={{ background: "rgba(255,255,255,0.2)", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "800", marginBottom: "12px", display: "inline-block" }}>AGENTIC AI</span>
            <h2 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "12px" }}>Meet Your AI Health Assistant</h2>
            <p style={{ fontSize: "18px", opacity: 0.9, maxWidth: "500px" }}>Get instant, evidence-based answers to any health question, 24/7. Designed specifically for Indian women.</p>
          </div>
          <div>
            <button style={{
              background: "white",
              color: "#6A1B9A",
              border: "none",
              padding: "16px 32px",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "800",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
            }}>Chat Now</button>
          </div>
        </div>
      </section>

      <ProductsSection />

      <WomenStories />

      {/* 6. Knowledge Hub CTA */}
      <div style={{ background: "#FAFAFA", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 className={styles.sectionTitle} style={{ fontSize: "32px" }}>Your Health Knowledge Hub</h2>
          <p style={{ fontSize: "18px", color: "#666", marginBottom: "32px" }}>Access thousands of expert-reviewed articles, guides, and videos to help you make informed decisions.</p>
          <button className={styles.secondaryCta} style={{ background: "white" }}>Visit Knowledge Hub</button>
        </div>
      </div>
    </>
  );
};

export default Landing;
