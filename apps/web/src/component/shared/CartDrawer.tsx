import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './CartDrawer.module.css';

const CartDrawer: React.FC = () => {
    const { cart, cartCount, cartTotal, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen } = useCart();

    const onClose = () => setIsCartOpen(false);

    return (
        <>
            {/* Overlay */}
            <div
                className={`${styles.overlay} ${isCartOpen ? styles.visible : ''}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={`${styles.drawer} ${isCartOpen ? styles.open : ''}`}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <h2 className={styles.title}>Your Cart</h2>
                        {cartCount > 0 && (
                            <span className={styles.countBadge}>{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
                        )}
                    </div>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Close cart"
                    >
                        ×
                    </button>
                </div>

                {/* Cart Content */}
                <div className={styles.content}>
                    {cart.length === 0 ? (
                        /* Empty State */
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>🛒</div>
                            <p className={styles.emptyText}>Your cart is empty</p>
                            <p className={styles.emptySubtext}>Add products to get started</p>
                            <button
                                className={styles.continueButton}
                                onClick={onClose}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        /* Cart Items */
                        <div className={styles.itemsList}>
                            {cart.map((item) => (
                                <div key={item.id} className={styles.cartItem}>
                                    <div className={styles.itemImage}>{item.imageIcon}</div>

                                    <div className={styles.itemDetails}>
                                        <h3 className={styles.itemName}>{item.name}</h3>
                                        <p className={styles.itemCategory}>{item.category}</p>
                                        <p className={styles.itemPrice}>₹{item.price} each</p>
                                    </div>

                                    <div className={styles.itemActions}>
                                        <div className={styles.quantityControls}>
                                            <button
                                                className={styles.quantityButton}
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                aria-label="Decrease quantity"
                                            >
                                                −
                                            </button>
                                            <span className={styles.quantity}>{item.quantity}</span>
                                            <button
                                                className={styles.quantityButton}
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            className={styles.removeButton}
                                            onClick={() => removeFromCart(item.id)}
                                            aria-label="Remove item"
                                        >
                                            🗑️
                                        </button>
                                    </div>

                                    <div className={styles.itemTotal}>
                                        ₹{item.price * item.quantity}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.subtotal}>
                            <span className={styles.subtotalLabel}>Subtotal</span>
                            <span className={styles.subtotalAmount}>₹{cartTotal}</span>
                        </div>
                        <button className={styles.checkoutButton}>
                            Proceed to Checkout
                        </button>
                        <button
                            className={styles.continueShopping}
                            onClick={onClose}
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
