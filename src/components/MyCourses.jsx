import React, { useContext, useEffect, useRef } from 'react';
import { CartContext } from '../context/CartContext';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {
  const navigate = useNavigate();
  const { purchasedCourses } = useContext(CartContext);
  const purchasedRef = useRef([]);
  
  const handleCardClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };


  useEffect(() => {
    purchasedRef.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { scale: 0, rotationY: 180, opacity: 0 },
        {
          scale: 1,
          rotationY: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          delay: index * 0.1,
        }
      );
    });
  }, [purchasedCourses]);

  return (
    <div className="relative overflow-hidden h-screen bg-black">
      <h2 className="text-3xl text-white text-center my-4">My Courses</h2>
      {purchasedCourses.length > 0 ? (
        <div className="flex flex-wrap justify-center">
          {purchasedCourses.map((item, index) => (
            <div
              onClick={(id) => {handleCardClick(id)}}
              key={item.id}
              ref={(el) => (purchasedRef.current[index] = el)}
              className="purchased-item p-4 m-2 bg-gray-800 rounded-lg shadow-lg text-white w-full sm:w-1/2"
            >
              <div className="flex items-center">
                <img
                  src={item.course.img_url}
                  alt={item.course.title}
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
                <span className="flex-grow">{item.course.title}</span>
              </div>
              <div className="mt-2">
                <span className="text-green-500">Verified Purchase</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white text-center">You haven't purchased any courses yet.</p>
      )}
    </div>
  );
};

export default MyCourses;
