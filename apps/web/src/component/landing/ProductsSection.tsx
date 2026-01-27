import React from "react";
import styles from "./landing.module.css";
import { useI18n } from "../../hooks/useI18n";
import { products, insurancePlans } from "../../data/seed";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes/Routes";

const ProductsSection: React.FC = () => {
    const { t } = useI18n();

    // Show only first 4 products on Home page as a teaser
    const featuredProducts = products.slice(0, 4);

    return (
        <section className={styles.productsSection}>
            <h2 className={styles.sectionTitle}>{t("products.title") || "Curated for You"}</h2>

            <div className={styles.productCategoryContainer}>
                <div className={styles.categoryBlock}>
                    <div className={styles.categoryHeader}>
                        <span className={styles.chatbotTag}>SHOP</span>
                        <h3>{t("products.healthcare.title") || "Healthcare Essentials"}</h3>
                        <p>{t("products.healthcare.subtitle") || "Trusted products for your journey."}</p>
                    </div>
                    <div className={styles.productsGrid}>
                        {featuredProducts.map(product => (
                            <div key={product.id} className={styles.productCard}>
                                <div className={styles.productIcon}>{product.imageIcon}</div>
                                <div className={styles.productInfo}>
                                    <h4>{product.name}</h4>
                                    <div className={styles.productMeta}>
                                        <span className={styles.price}>₹{product.price}</span>
                                        {product.originalPrice && <span className={styles.originalPrice}>₹{product.originalPrice}</span>}
                                    </div>
                                    <div className={styles.rating}>⭐ {product.rating} ({product.reviews})</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA to explore full catalog */}
                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <Link to={ROUTES.PRODUCTS}>
                            <button className={styles.primaryCta} style={{
                                background: 'var(--pink)',
                                color: 'white',
                                padding: '14px 32px',
                                fontSize: '16px',
                                borderRadius: '999px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '700',
                                boxShadow: '0 4px 16px rgba(216, 27, 96, 0.2)',
                                transition: 'all 0.3s ease'
                            }}>
                                Explore All Products →
                            </button>
                        </Link>
                    </div>
                </div>

                <div className={styles.categoryBlock}>
                    <div className={styles.categoryHeader}>
                        <span className={styles.chatbotTag}>PROTECT</span>
                        <h3>{t("products.insurance.title") || "Insurance Plans"}</h3>
                        <p>{t("products.insurance.subtitle") || "Coverage designed for women."}</p>
                    </div>
                    <div className={styles.insuranceList}>
                        {insurancePlans.map(plan => (
                            <div key={plan.id} className={styles.insuranceCard}>
                                <h4>{plan.name}</h4>
                                <p className={styles.provider}>{plan.provider}</p>
                                <ul className={styles.featuresList}>
                                    {plan.features.slice(0, 2).map((feature, idx) => (
                                        <li key={idx}>• {feature}</li>
                                    ))}
                                </ul>
                                <div className={styles.planPrice}>₹{plan.priceYearly}/yr</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;
