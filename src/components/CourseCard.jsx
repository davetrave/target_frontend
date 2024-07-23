import React, { useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {

  const navigate = useNavigate()

  const handleCardClick = () => {
    console.log(`Clicked on course: ${course.title}`);
    navigate(`/course/${course.id}`);
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
          src="https://via.placeholder.com/150" // Replace with course.image when connected to the database
          alt={course.title}
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
      <div className="w-2/3 pl-4">
        <h3 className="text-xl font-bold mb-2 text-white">{course.title}</h3>
        <p className="text-gray-400 mb-2">{course.description}</p>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`text-yellow-500 ${i < course.rating ? 'text-yellow-500' : 'text-gray-600'}`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-400">Category: {course.category}</p>
      </div>
    </div>
  );
};

export default CourseCard;
