import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import styles from "../landing/landing.module.css";
import { products, insurancePlans, Product, InsurancePlan } from "../../data/seed";
import InnerPageHero from "../shared/InnerPageHero";
import { useCart } from "../../context/CartContext";
import InsuranceCard from "../shared/InsuranceCard";
import ProductQuickView from "../shared/ProductQuickView";
import ProductsAnimation from "../shared/animations/ProductsAnimation";

const Products: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const { addToCart } = useCart();
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (location.hash === "#insurance-plans") {
            const scrollToInsurance = () => {
                const section = document.getElementById("insurance-plans");
                if (section) {
                    const navbarOffset = 100; // Account for sticky navbar
                    const elementPosition = section.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            };

            // Small delay to ensure content is rendered
            timer = setTimeout(scrollToInsurance, 100);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [location]);

    const categories = ["All", "Pregnancy", "Fertility", "Period Care", "Wellness", "Supplements", "Devices", "Intimate Care", "Insurance"];

    const categoryGrid = [
        { name: "Pregnancy & Prenatal", icon: "💊", desc: "Prenatal vitamins, maternity wear, body pillows, stretch mark creams", color: "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)" },
        { name: "Fertility Support", icon: "🌸", desc: "Ovulation kits, fertility supplements, basal thermometers, tracking apps", color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
        { name: "Period Care", icon: "🩸", desc: "Menstrual cups, organic pads, heating pads, PMS relief supplements", color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
        { name: "Wellness & Self-Care", icon: "🧘", desc: "Yoga mats, meditation apps, essential oils, wellness journals", color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
    ];

    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter((p: Product) => p.category === selectedCategory);

    const benefits = [
        { icon: "👨‍⚕️", title: "Expert Curated", desc: "Approved by medical professionals" },
        { icon: "🛡️", title: "Quality Assured", desc: "Tested for safety and efficacy" },
        { icon: "🚚", title: "Fast Delivery", desc: "Ships within 24 hours" },
        { icon: "↩️", title: "Easy Returns", desc: "Hassle-free 30 day policy" },
    ];

    const handleCardClick = (product: Product) => {
        setSelectedProduct(product);
        setIsQuickViewOpen(true);
    };

    const handleCloseQuickView = () => {
        setIsQuickViewOpen(false);
        setSelectedProduct(null);
    };

    const handleAddToCartFromPopup = (product: Product, quantity: number) => {
        // Add product multiple times based on quantity
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
    };

    return (
        <div className="app-container">
            {/* Hero */}
            <InnerPageHero
                title="Curated for Your Health"
                subtitle="Find trusted products, supplements, and tools recommended by experts for every stage of your journey."
                badge="Wellness Store"
                illustration={<ProductsAnimation />}
            />


            <div style={{ maxWidth: '100vw', background: 'var(--theme-bg-accent)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px 80px' }}>

                    {/* Shop by Category GRID */}
                    <div style={{ marginBottom: '80px' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '24px' }}>📂</span> Shop by Category
                        </h2>
                        <p style={{ color: '#666', marginBottom: '32px' }}>Find exactly what you need for your health journey.</p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                            {categoryGrid.map((cat, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => {
                                        const mapping: Record<string, string> = {
                                            "Pregnancy & Prenatal": "Pregnancy",
                                            "Fertility Support": "Fertility",
                                            "Period Care": "Period Care",
                                            "Wellness & Self-Care": "Wellness"
                                        };
                                        setSelectedCategory(mapping[cat.name] || "All");
                                        window.scrollTo({ top: 800, behavior: 'smooth' });
                                    }}
                                    style={{
                                        background: cat.color,
                                        padding: '32px',
                                        borderRadius: '24px',
                                        color: 'white',
                                        cursor: 'pointer',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)'; }}
                                >
                                    <div style={{ fontSize: '40px', marginBottom: '16px' }}>{cat.icon}</div>
                                    <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '12px' }}>{cat.name}</h3>
                                    <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: '1.5' }}>{cat.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Filters Header */}
                    <div style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '24px' }}>✨</span> Featured Products
                        </h2>
                        <p style={{ color: '#666' }}>Best-selling and expert-recommended items for women's health.</p>
                    </div>

                    {/* Categories Filter Pills */}
                    <div style={{ margin: '0 0 40px', display: 'flex', gap: '12px', overflowX: 'auto', padding: '10px 0', flexWrap: 'wrap' }}>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                style={{
                                    padding: '12px 28px',
                                    borderRadius: '999px',
                                    border: 'none',
                                    background: selectedCategory === cat ? 'var(--pink)' : 'white',
                                    color: selectedCategory === cat ? 'white' : '#555',
                                    fontWeight: '700',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Product Grid */}
                    <div className={styles.productsGrid} style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
                        {filteredProducts.map((product: Product) => (
                            <div
                                key={product.id}
                                className={styles.productCard}
                                onClick={() => handleCardClick(product)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {/* Top Badge */}
                                {product.badge && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '16px',
                                        left: '16px',
                                        background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
                                        color: '#E65100',
                                        fontSize: '10px',
                                        fontWeight: '800',
                                        padding: '6px 12px',
                                        borderRadius: '8px',
                                        zIndex: 1,
                                        letterSpacing: '0.5px',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                    }}>
                                        {product.badge.toUpperCase()}
                                    </span>
                                )}

                                {/* Fixed Height Image Container */}
                                <div style={{
                                    width: '100%',
                                    height: '200px',
                                    background: '#FAFAFA',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '16px',
                                    marginBottom: '16px',
                                    fontSize: '80px',
                                    flexShrink: 0
                                }}>
                                    {product.imageIcon}
                                </div>

                                {/* Content Wrapper with flex: 1 */}
                                <div style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'left',
                                    minHeight: 0
                                }}>
                                    {/* Category */}
                                    <div style={{
                                        fontSize: '12px',
                                        color: '#999',
                                        marginBottom: '6px',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        flexShrink: 0
                                    }}>
                                        {product.category}
                                    </div>

                                    {/* Product Name - Max 2 Lines */}
                                    <h3 style={{
                                        fontSize: '17px',
                                        fontWeight: '700',
                                        marginBottom: '8px',
                                        lineHeight: '1.3',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                        height: '44px'
                                    }}>
                                        {product.name}
                                    </h3>

                                    {/* Description - Max 1 Line */}
                                    <p style={{
                                        fontSize: '13px',
                                        color: '#666',
                                        marginBottom: '12px',
                                        lineHeight: '1.4',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                        height: '18px'
                                    }}>
                                        {product.description}
                                    </p>

                                    {/* Ratings */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px', fontSize: '13px', color: '#F39C12' }}>
                                        {"★".repeat(5)} <span style={{ color: '#999', marginLeft: '4px' }}>(4.8)</span>
                                    </div>

                                    {/* Vendor Tags */}
                                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                                        {["Amazon", "1mg"].map(v => (
                                            <span key={v} style={{ fontSize: '10px', background: '#f5f5f5', padding: '2px 8px', borderRadius: '4px', fontWeight: '600', color: '#666' }}>
                                                🛒 {v}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Price Row Hidden on Card - Visible in Modal */}
                                    {/* <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        marginTop: 'auto',
                                        flexShrink: 0
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                            <span style={{ fontSize: '22px', fontWeight: '900', color: 'var(--pink)' }}>₹{product.price}</span>
                                            {product.originalPrice && (
                                                <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '14px' }}>₹{product.originalPrice}</span>
                                            )}
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Insurance Section */}
                    {(selectedCategory === 'All' || selectedCategory === 'Insurance') && (
                        <div id="insurance-plans" style={{ marginTop: '80px' }}>
                            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                                <span style={{
                                    background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
                                    color: '#1565C0',
                                    fontSize: '12px',
                                    fontWeight: '800',
                                    padding: '6px 16px',
                                    borderRadius: '999px',
                                    display: 'inline-block',
                                    marginBottom: '16px',
                                    letterSpacing: '0.5px'
                                }}>PROTECT YOUR HEALTH</span>
                                <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '12px' }}>Insurance Plans</h2>
                                <p style={{ fontSize: '16px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                                    Comprehensive coverage designed specifically for women's healthcare needs
                                </p>
                            </div>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                                gap: '32px',
                                marginBottom: '40px'
                            }}>
                                {insurancePlans.map((plan: InsurancePlan) => (
                                    <InsuranceCard key={plan.id} plan={plan} />
                                ))}
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                                <button
                                    onClick={() => navigate(ROUTES.INSURANCE_GUIDE)}
                                    style={{
                                        padding: '16px 32px',
                                        background: 'white',
                                        border: '2px solid #1565C0',
                                        color: '#1565C0',
                                        borderRadius: '12px',
                                        fontWeight: '800',
                                        cursor: 'pointer'
                                    }}
                                >
                                    View Full Insurance Guide →
                                </button>
                            </div>
                        </div>

                    )}

                    {/* Why Shop With Us */}
                    <div style={{ marginTop: '100px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '40px' }}>Why Shop With Nari Sangha?</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
                            {benefits.map((b, idx) => (
                                <div key={idx} style={{ padding: '24px', background: 'white', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                                    <div style={{ fontSize: '40px', marginBottom: '16px' }}>{b.icon}</div>
                                    <h4 style={{ fontWeight: '800', marginBottom: '8px' }}>{b.title}</h4>
                                    <p style={{ color: '#666', fontSize: '14px' }}>{b.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Quick View Popup */}
            <ProductQuickView
                product={selectedProduct}
                isOpen={isQuickViewOpen}
                onClose={handleCloseQuickView}
                onAddToCart={handleAddToCartFromPopup}
            />
        </div>
    );
};

export default Products;
