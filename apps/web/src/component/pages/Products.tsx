import React, { useState } from "react";
import styles from "../landing/landing.module.css";
import { products } from "../../data/seed";
import InnerPageHero from "../shared/InnerPageHero";
import { useCart } from "../../context/CartContext";

const Products: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [addedProductId, setAddedProductId] = useState<string | null>(null);
    const { addToCart } = useCart();

    const categories = ["All", "Pregnancy", "Fertility", "Period Care", "Wellness", "Supplements", "Devices", "Intimate Care"];

    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(p => p.category === selectedCategory);

    const benefits = [
        { icon: "👩‍⚕️", title: "Expert Curated", desc: "Approved by medical professionals" },
        { icon: "🎖️", title: "Quality Assured", desc: "Tested for safety and efficacy" },
        { icon: "🚚", title: "Fast Delivery", desc: "Ships within 24 hours" },
        { icon: "↩️", title: "Easy Returns", desc: "Hassle-free 30 day policy" },
    ];

    const handleAddToCart = (product: typeof products[0]) => {
        addToCart(product);
        setAddedProductId(product.id);
        // Clear the "Added" feedback after 2 seconds
        setTimeout(() => {
            setAddedProductId(null);
        }, 2000);
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
                                style={{
                                    textAlign: 'left',
                                    alignItems: 'flex-start',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '400px'
                                }}
                            >
                                <div style={{
                                    width: '100%',
                                    aspectRatio: '1/1',
                                    background: '#fafafa',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '16px',
                                    marginBottom: '16px',
                                    fontSize: '60px'
                                }}>
                                    {product.imageIcon}
                                </div>

                                {product.badge && (
                                    <span style={{
                                        background: '#FFF3E0',
                                        color: '#E65100',
                                        fontSize: '11px',
                                        fontWeight: '800',
                                        padding: '4px 10px',
                                        borderRadius: '8px',
                                        marginBottom: '8px',
                                        display: 'inline-block'
                                    }}>
                                        {product.badge.toUpperCase()}
                                    </span>
                                )}

                                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px', lineHeight: '1.3' }}>{product.name}</h3>
                                <div style={{ fontSize: '13px', color: '#777', marginBottom: '12px' }}>{product.category}</div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                    <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--pink)' }}>₹{product.price}</span>
                                    {product.originalPrice && (
                                        <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '14px' }}>₹{product.originalPrice}</span>
                                    )}
                                </div>

                                <button
                                    className={styles.primaryCta}
                                    onClick={() => handleAddToCart(product)}
                                    style={{
                                        width: '100%',
                                        borderRadius: '12px',
                                        fontSize: '15px',
                                        marginTop: 'auto',
                                        background: addedProductId === product.id ? '#4CAF50' : undefined,
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {addedProductId === product.id ? '✓ Added' : 'Add to Cart'}
                                </button>
                            </div>
                        ))}
                    </div>

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
        </div>
    );
};

export default Products;
