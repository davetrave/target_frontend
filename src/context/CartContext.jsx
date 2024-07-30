// CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getCart, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart } from '../services/CartService';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart();
        setCart(response);
        setCartCount(response.length);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (courseId) => {
    try {
      const response = await apiAddToCart(courseId);
      setCart((prevCart) => [...prevCart, response]);
      setCartCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await apiRemoveFromCart(cartItemId);
      setCart((prevCart) => prevCart.filter(item => item.id !== cartItemId));
      setCartCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
