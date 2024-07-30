// components/Cart.js

import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart } from '../services/CartService';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCart(data);
      } catch (err) {
        setError('Failed to fetch cart');
      }
    };

    fetchCart();
  }, []);

  const handleRemoveFromCart = async (cartId) => {
    try {
      await removeFromCart(cartId);
      setCart(cart.filter(item => item.id !== cartId));
    } catch (err) {
      setError(`Failed to remove from cart ${err}`);
  
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>My Cart</h2>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.course.title}
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
