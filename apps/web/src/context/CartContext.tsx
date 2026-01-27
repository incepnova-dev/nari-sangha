import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '../data/seed';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
    imageIcon: string;
}

interface CartContextType {
    cart: CartItem[];
    cartCount: number;
    cartTotal: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        // Initialize cart from localStorage if available
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('nariSanghaCart');
            if (savedCart) {
                try {
                    return JSON.parse(savedCart);
                } catch (e) {
                    return [];
                }
            }
        }
        return [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    // Persist cart to localStorage whenever it changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('nariSanghaCart', JSON.stringify(cart));
        }
    }, [cart]);

    // Calculate cart count and total
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    const addToCart = (product: Product) => {
        setCart(currentCart => {
            const existingItem = currentCart.find(item => item.id === product.id);

            if (existingItem) {
                // Item already in cart, increase quantity
                return currentCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // New item, add to cart
                const newItem: CartItem = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    category: product.category,
                    imageIcon: product.imageIcon
                };
                return [...currentCart, newItem];
            }
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(currentCart => currentCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            setCart(currentCart =>
                currentCart.map(item =>
                    item.id === productId
                        ? { ...item, quantity }
                        : item
                )
            );
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const value: CartContextType = {
        cart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
