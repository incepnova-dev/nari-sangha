import React, { useState, useEffect } from 'react';
import { Product } from '../../data/seed';
import styles from './ProductQuickView.module.css';

interface ProductQuickViewProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
    onAddToCart: (product: Product, quantity: number) => void;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({
    product,
    isOpen,
    onClose,
    onAddToCart
}) => {
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);

    // Reset quantity when product changes
    useEffect(() => {
        setQuantity(1);
        setAddedToCart(false);
    }, [product]);

    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !product) return null;

    const handleIncrement = () => setQuantity(prev => Math.min(prev + 1, 10));
    const handleDecrement = () => setQuantity(prev => Math.max(prev - 1, 1));

    const handleAddToCart = () => {
        onAddToCart(product, quantity);
        setAddedToCart(true);
        setTimeout(() => {
            setAddedToCart(false);
            onClose();
        }, 1500);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div className={styles.modal}>
                {/* Close Button */}
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                    ✕
                </button>

                <div className={styles.content}>
                    {/* Left Column - Image */}
                    <div className={styles.imageColumn}>
                        <div className={styles.mainImage}>
                            <span className={styles.productEmoji}>{product.imageIcon}</span>
                        </div>
                        {product.badge && (
                            <div className={styles.modalBadge}>{product.badge.toUpperCase()}</div>
                        )}
                    </div>

                    {/* Right Column - Details */}
                    <div className={styles.detailsColumn}>
                        <div className={styles.header}>
                            <h2 className={styles.productName}>{product.name}</h2>
                            <p className={styles.category}>
                                {product.category} · SKU: {product.id.toUpperCase()}
                            </p>
                        </div>

                        {/* Price */}
                        <div className={styles.priceSection}>
                            <span className={styles.currentPrice}>₹{product.price}</span>
                            {product.originalPrice && (
                                <span className={styles.originalPrice}>₹{product.originalPrice}</span>
                            )}
                            {product.originalPrice && (
                                <span className={styles.discount}>
                                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                </span>
                            )}
                        </div>

                        {/* Rating */}
                        <div className={styles.rating}>
                            <span className={styles.stars}>⭐ {product.rating}</span>
                            <span className={styles.reviews}>({product.reviews} reviews)</span>
                        </div>

                        {/* Description */}
                        <p className={styles.description}>{product.description}</p>

                        {/* Benefits */}
                        {product.benefits && product.benefits.length > 0 && (
                            <ul className={styles.benefits}>
                                {product.benefits.map((benefit, idx) => (
                                    <li key={idx}>
                                        <span className={styles.checkIcon}>✓</span>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Quantity Controls */}
                        <div className={styles.quantitySection}>
                            <label className={styles.quantityLabel}>Quantity:</label>
                            <div className={styles.quantityControls}>
                                <button
                                    className={styles.qtyBtn}
                                    onClick={handleDecrement}
                                    disabled={quantity <= 1}
                                >
                                    −
                                </button>
                                <span className={styles.quantity}>{quantity}</span>
                                <button
                                    className={styles.qtyBtn}
                                    onClick={handleIncrement}
                                    disabled={quantity >= 10}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            className={styles.addToCartBtn}
                            onClick={handleAddToCart}
                            disabled={addedToCart}
                        >
                            {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductQuickView;
