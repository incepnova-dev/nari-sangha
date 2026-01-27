import React, { useState } from "react";
import styles from "../landing/landing.module.css";
import { products, insurancePlans, Product } from "../../data/seed";
import InnerPageHero from "../shared/InnerPageHero";
import { useCart } from "../../context/CartContext";
import InsuranceCard from "../shared/InsuranceCard";
import ProductQuickView from "../shared/ProductQuickView";

const Products: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const { addToCart } = useCart();

    const categories = ["All", "Pregnancy", "Fertility", "Period Care", "Wellness", "Supplements", "Devices", "Intimate Care", "Insurance"];

    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(p => p.category === selectedCategory);

    const benefits = [
        { icon: "👩‍⚕️", title: "Expert Curated", desc: "Approved by medical professionals" },
        { icon: "🎖️", title: "Quality Assured", desc: "Tested for safety and efficacy" },
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
            />

            <div style={{ maxWidth: '100vw', background: 'var(--theme-bg-accent)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 80px' }}>

                    {/* Categories */}
                    <div style={{ margin: '50px 0 50px', display: 'flex', gap: '12px', overflowX: 'auto', padding: '10px 0', justifyContent: 'center', flexWrap: 'wrap' }}>
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
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className={styles.productCard}
                                onClick={() => handleCardClick(product)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '400px',
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

                                    {/* Price Row - Pinned to Bottom */}
                                    <div style={{
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
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Insurance Section */}
                    {(selectedCategory === 'All' || selectedCategory === 'Insurance') && (
                        <div id="insurance" style={{ marginTop: '80px' }}>
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
                                {insurancePlans.map(plan => (
                                    <InsuranceCard key={plan.id} plan={plan} />
                                ))}
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
