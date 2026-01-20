import React, { useState, useEffect } from 'react';
import { useMobileNavigation, ROUTES } from '../mobile-routes/Routes';
import { icons } from '../../styles/theme';
import Chatbot from './Chatbot';
import CookieConsent from './CookieConsent';
import styles from './Welcome.module.css';

interface WelcomeProps {
  language?: string;
  onSignInSuccess?: (userData: any) => void;
}

const Welcome: React.FC<WelcomeProps> = () => {
  const navigation = useMobileNavigation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    navigation.navigate(ROUTES.REGION_SELECTION);
  };

  const handleSignInClick = () => {
    navigation.navigate(ROUTES.SIGN_IN);
  };

  // Feature cards data
  const features = [
    { icon: icons.products, title: 'Products', description: 'Find health products tailored for you', color: 'pink' },
    { icon: icons.hospital, title: 'Care', description: 'Discover clinics and hospitals nearby', color: 'purple' },
    { icon: icons.knowledgeHub, title: 'Knowledge', description: 'Learn about women\'s health topics', color: 'blue' },
    { icon: icons.vaccine, title: 'Tracking', description: 'Monitor vaccines and screenings', color: 'green' },
  ];

  // Testimonials
  const testimonials = [
    {
      text: "This platform helped me find the right healthcare provider and products for my needs. The community support made all the difference.",
      author: "Priya Sharma",
      role: "Community Member"
    },
    {
      text: "I learned so much about my health through the knowledge hub. The articles are well-researched and easy to understand.",
      author: "Anjali Patel",
      role: "Active User"
    }
  ];

  return (
    <div className={styles.page}>
      {/* Cookie Consent Overlay */}
      <CookieConsent />

      {/* Header Navigation */}
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
        <div className={styles.headerContent}>
          <div className={styles.logoSection}>
            <a href="#" className={styles.logoLink} aria-label="Nari Swasthya Samuday">
              <div className={styles.logo}>
                <span className={styles.logoEmoji}>🌸</span>
                <span className={styles.logoText}>Nari Swasthya Samuday</span>
              </div>
            </a>
            
            {/* Desktop Navigation */}
            <nav className={styles.desktopNav} aria-label="Main navigation">
              <ul className={styles.navList}>
                <li>
                  <button className={styles.navLink} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</button>
                </li>
                <li>
                  <button className={styles.navLink} onClick={() => navigation.navigate(ROUTES.PRODUCTS_OPTION)}>Products</button>
                </li>
                <li>
                  <button className={styles.navLink} onClick={() => navigation.navigate(ROUTES.KNOWLEDGE_HUB)}>Knowledge</button>
                </li>
                <li>
                  <button className={styles.navLink} onClick={() => navigation.navigate(ROUTES.TRACK_OPTIONS)}>Track</button>
                </li>
                <li>
                  <button className={styles.navLink} onClick={() => navigation.navigate(ROUTES.ABOUT_US)}>About</button>
                </li>
              </ul>
            </nav>
          </div>

          <div className={styles.headerActions}>
            <button className={styles.signInButton} onClick={handleSignInClick}>
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <div className={styles.heroGradient1}></div>
          <div className={styles.heroGradient2}></div>
        </div>
        <div className={styles.heroContent}>
          {/* Hero Images - Women-focused */}
          <div className={styles.heroImages}>
            <div className={`${styles.heroImageCard} ${styles.imageCard1}`}>
              <div className={styles.imageWrapper}>
                <img 
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&q=80" 
                  alt="Women's healthcare professional consultation"
                  className={styles.heroImage}
                  loading="lazy"
                />
                <div className={styles.imageOverlay}></div>
              </div>
              <p className={styles.imageLabel}>Health Care</p>
            </div>
            <div className={`${styles.heroImageCard} ${styles.imageCard2}`}>
              <div className={styles.imageWrapper}>
                <img 
                  src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop&q=80" 
                  alt="Pregnant woman receiving prenatal care"
                  className={styles.heroImage}
                  loading="lazy"
                />
                <div className={styles.imageOverlay}></div>
              </div>
              <p className={styles.imageLabel}>Pregnancy Care</p>
            </div>
            <div className={`${styles.heroImageCard} ${styles.imageCard3}`}>
              <div className={styles.imageWrapper}>
                <img 
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&q=80" 
                  alt="Women's wellness and self-care"
                  className={styles.heroImage}
                  loading="lazy"
                />
                <div className={styles.imageOverlay}></div>
              </div>
              <p className={styles.imageLabel}>Wellness</p>
            </div>
          </div>

          {/* Main Hero Content */}
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span>Your Trusted Health Partner</span>
            </div>
            <h1 className={styles.mainHeadline}>
              Empowering Women's Health
              <span className={styles.headlineAccent}> Every Step of the Way</span>
            </h1>
            <p className={styles.heroDescription}>
              Join a safe, supportive community for women's health, wellness, and empowerment. 
              Find meaningful connections with healthcare providers, products, and knowledge that ignite confidence and joy.
            </p>
            
            <div className={styles.heroActions}>
              <button
                className={styles.primaryCtaButton}
                onClick={handleGetStarted}
                type="button"
              >
                Get Started
                <span className={styles.buttonArrow}>→</span>
              </button>
              <button
                className={styles.secondaryCtaButton}
                onClick={handleSignInClick}
                type="button"
              >
                Sign In
              </button>
            </div>

            {/* Stats */}
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>500K+</div>
                <div className={styles.statLabel}>Women Served</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>1000+</div>
                <div className={styles.statLabel}>Expert Doctors</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>24/7</div>
                <div className={styles.statLabel}>AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Everything You Need</h2>
          <p className={styles.sectionSubtitle}>Comprehensive healthcare solutions in one place</p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`${styles.featureCard} ${styles[`featureCard${feature.color}`]}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.featureIconWrapper}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <div className={styles.featureIconBg}></div>
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
              <button className={styles.featureLink}>Learn More →</button>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className={styles.missionSection}>
        <div className={styles.missionBackground}></div>
        <div className={styles.missionContent}>
          <div className={styles.missionImage}>
            <div className={styles.missionIcon}>👥</div>
          </div>
          <div className={styles.missionText}>
            <h2 className={styles.missionTitle}>Join Our Community</h2>
            <p className={styles.missionDescription}>
              Help shape the future of women's health by joining our community. 
              Share experiences, support others, and access expert advice through our platform.
            </p>
            <button className={styles.secondaryCtaButton} onClick={handleGetStarted}>
              Join Community
            </button>
          </div>
        </div>
      </section>

      {/* Product/Service Sections */}
      <section className={styles.servicesSection}>
        <div className={styles.serviceCard}>
          <div className={styles.serviceIcon}>{icons.products}</div>
          <h3 className={styles.serviceTitle}>Health Products</h3>
          <p className={styles.serviceDescription}>
            Whether you're looking for supplements, wellness products, or health essentials, 
            we make it easy to find trusted products tailored to your needs.
          </p>
          <button className={styles.serviceLink} onClick={() => navigation.navigate(ROUTES.PRODUCTS_OPTION)}>
            Explore Products →
          </button>
        </div>

        <div className={styles.serviceCard}>
          <div className={styles.serviceIcon}>{icons.hospital}</div>
          <h3 className={styles.serviceTitle}>Healthcare Providers</h3>
          <p className={styles.serviceDescription}>
            Whether you've moved to a new city or need a specialist, 
            find trusted doctors, clinics, and hospitals that match your healthcare needs.
          </p>
          <button className={styles.serviceLink} onClick={() => navigation.navigate(ROUTES.DISCOVER_OPTIONS)}>
            Find Providers →
          </button>
        </div>
      </section>

      {/* Success Stories / Testimonials */}
      <section className={styles.storiesSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Success Stories</h2>
          <p className={styles.sectionSubtitle}>Real experiences from our community</p>
        </div>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <blockquote key={index} className={styles.testimonial}>
              <p className={styles.testimonialText}>"{testimonial.text}"</p>
              <footer className={styles.testimonialAuthor}>
                <strong>{testimonial.author}</strong>
                <span>{testimonial.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
        <a href="#" className={styles.readMoreLink}>
          Read more stories →
        </a>
      </section>

      {/* Call to Action - Get Started */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaBackground}></div>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Start Your Health Journey Today</h2>
          <p className={styles.ctaDescription}>
            Join thousands of women who are taking control of their health and wellness.
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.primaryCtaButton} onClick={handleGetStarted}>
              Get Started
              <span className={styles.buttonArrow}>→</span>
            </button>
            <button className={styles.secondaryCtaButton} onClick={handleSignInClick}>
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <div className={styles.footerLogo}>
              <span className={styles.logoEmoji}>🌸</span>
              <span className={styles.footerLogoText}>Nari Swasthya Samuday</span>
            </div>
            <p className={styles.footerTagline}>
              Your Trusted Women's Health Community
            </p>
          </div>
          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Our Platform</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#" className={styles.footerLink}>Products</a></li>
              <li><a href="#" className={styles.footerLink}>Healthcare</a></li>
              <li><a href="#" className={styles.footerLink}>Knowledge Hub</a></li>
              <li><a href="#" className={styles.footerLink}>Tracking</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Company</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#" className={styles.footerLink}>About</a></li>
              <li><a href="#" className={styles.footerLink}>Contact</a></li>
              <li><a href="#" className={styles.footerLink}>Support</a></li>
              <li><a href="#" className={styles.footerLink}>Privacy</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Legal</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#" className={styles.footerLink}>Terms</a></li>
              <li><a href="#" className={styles.footerLink}>Privacy Policy</a></li>
              <li><a href="#" className={styles.footerLink}>Guidelines</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © 2025 Nari Swasthya Samuday. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Welcome;
