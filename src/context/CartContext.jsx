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
        const cartData = await getCart();
        setCart(cartData);
        setCartCount(cartData.length);
        console.log("CART DATA:= ", cartData)
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  // Update cart count whenever the cart is updated
  useEffect(() => {
      setCartCount(cart.length);
    }, [cart]);

  

  // Function to add an item to the cart
  const addToCart = async (courseId) => {

    try { 
      if (!cart.some(item => item.course.id === courseId)) {

        const course = await apiAddToCart(courseId); // Call API to add item to the cart
        
        // Update local state
        setCart(prevCart => [...prevCart, course]); // Add new course to cart
      }
      else alert("You already have added this course to cart!")
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
