// CourseCard.js
import React, { useContext, useEffect, useState } from 'react';
import { FaStar, FaCartPlus, FaCheck } from 'react-icons/fa';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { cart, addToCart } = useContext(CartContext);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const isInCart = cart.some(cartItem => cartItem.course.id === course.id);
    setInCart(isInCart);
  }, [cart, course.id]);

  const handleCardClick = () => {
    navigate(`/course/overview/${course.id}`);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (!inCart) {
      addToCart(course.id);
    }
  };

  useEffect(() => {
    gsap.fromTo(
      '.course-card',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: {
          amount: 0.3,
        },
      }
    );
  }, []);

  return (
    <div
      onClick={handleCardClick}
      className="course-card flex bg-gray-800 bg-opacity-60 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out relative overflow-hidden"
    >
      <div className="w-1/3 flex-shrink-0">
        <img
          src={course.img_url}
          alt={course.title}
          className="h-auto max-w-full rounded-lg"
        />
      </div>
      <div className="w-2/3 pl-4">
        <h3 className="text-xl font-bold mb-2 text-white">{course.title}</h3>
        <h2 className="text-white font-bold mb-2">{`For ${course.category}`}</h2>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-yellow-500 ${i < course.rating ? 'text-yellow-500' : 'text-gray-600'}`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <button
            className={`ml-4 px-3 py-2 text-sm font-semibold text-white rounded-lg flex items-center ${inCart ? 'bg-green-500 cursor-not-allowed' : 'magic-button' }`}
            onClick={handleButtonClick}
            disabled={inCart}
          >
            {inCart ? <><FaCheck className="mr-2" /> Added to Cart</> : <><FaCartPlus className="mr-2" /> Add to Cart</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
