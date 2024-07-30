import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBook, FaCog, FaShoppingCart } from 'react-icons/fa';
import gsap from 'gsap';
import { CartContext } from '../context/CartContext';
import { getCart } from '../services/CartService';

const BottomNavBar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { cartCount, setCartCount } = useContext(CartContext);
  const navRefs = useRef([]);

  useEffect(() => {
    // Fetch cart count from the API
    const fetchCartCount = async () => {
      try {
        const response = await getCart();
        setCartCount(response.length);
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };

    fetchCartCount();
  }, [setCartCount]);

  useEffect(() => {
    const animateTab = (index) => {
      gsap.to('.nav-link-icon', {
        y: 0,
        duration: 0.3,
        ease: 'power3.out',
      });

      gsap.to(navRefs.current[index].querySelector('.nav-link-icon'), {
        y: -10,
        duration: 0.3,
        ease: 'power3.out',
      });
    };

    const activeIndex = ['home', 'courses', 'My Cart', 'settings'].indexOf(activeTab);
    animateTab(activeIndex);
  }, [activeTab]);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <nav className="fixed bottom-4 left-4 right-4 bg-gray-800 bg-opacity-50 text-white flex justify-around items-center py-2 rounded-lg">
      {['home', 'courses', 'My Cart', 'settings'].map((tab, index) => (
        <NavLink to={`/${tab}`}
          key={tab}
          className="nav-link relative z-10 flex flex-col items-center cursor-pointer"
          onClick={() => handleNavClick(tab)}
          ref={(el) => (navRefs.current[index] = el)}
        >
          {tab === 'home' && <FaHome className="nav-link-icon" size={24} />}
          {tab === 'courses' && <FaBook className="nav-link-icon" size={24} />}
          {tab === 'My Cart' && (
            <div className="relative">
              <FaShoppingCart className="nav-link-icon" size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-0.5 py-0.25">
                  {cartCount}
                </span>
              )}
            </div>
          )}
          {tab === 'settings' && <FaCog className="nav-link-icon" size={24} />}
          {activeTab === tab && (
            <span className="text-sm mt-1">
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNavBar;
