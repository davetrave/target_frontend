// import React, { useState, useEffect } from 'react';
// import { getCourses } from '../services/CourseService';
// import { gsap } from 'gsap';
// import CourseCard from './CourseCard';

// const CourseList = () => {
//   const [courses, setCourses] = useState([]);
//   const [fetchError, setFetchError] = useState(null);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const data = await getCourses();
//         setCourses(data);
//       } catch (error) {
//         console.error('Error fetching courses:', error.response);
//         setFetchError('Failed to fetch courses. Please try again later.');
//       }
//     };

//     fetchCourses();
//     console.log("COURSES := ", courses)
//   }, []);

//   useEffect(() => {
//     // Create stars
//     const createStars = (count) => {
//       const container = document.querySelector('.stars-bg');
//       for (let i = 0; i < count; i++) {
//         const star = document.createElement('div');
//         star.className = 'star';
//         star.style.top = `${Math.random() * 100}vh`;
//         star.style.left = `${Math.random() * 100}vw`;
//         container.appendChild(star);
//       }
//     };

//     createStars(100);

//     // Animate stars
//     gsap.to('.star', {
//       y: '+=10vh',
//       repeat: -1,
//       duration: () => Math.random() * 5 + 5,
//       ease: 'linear',
//     });

//     gsap.fromTo(
//       '.star',
//       { opacity: 0 },
//       {
//         opacity: 1,
//         repeat: -1,
//         yoyo: true,
//         duration: () => Math.random() * 1 + 0.5,
//         ease: 'power1.inOut',
//       }
//     );

//     // Parallax effect for background
//     gsap.to('.parallax-bg', {
//       yPercent: -20,
//       ease: 'none',
//       scrollTrigger: {
//         trigger: '.parallax-bg',
//         start: 'top bottom',
//         end: 'bottom top',
//         scrub: true,
//       },
//     });
//   }, []);

//   const handleCategoryChange = (category) => {
//     console.log('Switching to category:', category);
//   };

//   return (
//     <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
//       <div className="absolute inset-0 z-0 stars-bg"></div>
//       <div className="absolute inset-x-0 top-0 z-20 bg-gray-800 bg-opacity-60 py-2">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="flex justify-center">
//             <nav className="flex space-x-4" aria-label="Tabs">
//               <button
//                 onClick={() => handleCategoryChange('all')}
//                 className="nav-pill"
//               >
//                 All Courses
//               </button>
//               <button
//                 onClick={() => handleCategoryChange('featured')}
//                 className="nav-pill"
//               >
//                 Featured
//               </button>
//               <button
//                 onClick={() => handleCategoryChange('beginner')}
//                 className="nav-pill"
//               >
//                 Beginner
//               </button>
//               <button
//                 onClick={() => handleCategoryChange('advanced')}
//                 className="nav-pill"
//               >
//                 Advanced
//               </button>
//             </nav>
//           </div>
//         </div>
//       </div>
//       <div className="relative z-10 p-6">
//         {fetchError && (
//           <div className="bg-red-200 text-red-800 p-3 mb-4 rounded">
//             {fetchError}
//           </div>
//         )}
//         <h2 className="text-3xl font-bold mb-4">Courses</h2>
//         <div className="parallax-bg absolute inset-0 z-0 bg-gradient-to-br from-purple-600 via-blue-500 to-purple-700"></div>
//         <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {courses.map((course) => (
//             <div
//               key={course.id}
//               className="relative overflow-hidden rounded-lg border-l-4 border-purple-600 shadow-lg bg-white bg-opacity-70"
//             >
//               <div className="p-4">
//                 <CourseCard course={course} />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseList;

import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import { getCourses } from '../services/CourseService';
import { gsap } from 'gsap';
import CourseCard from './CourseCard';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [gradient, setGradient] = useState("from-purple-600 via-blue-500 to-purple-700")

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
        setFilteredCourses(data); // Initially display all courses
      } catch (error) {
        console.error('Error fetching courses:', error.response);
        setFetchError('Failed to fetch courses. Please try again later.');
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const createStars = (count) => {
      const container = document.querySelector('.stars-bg');
      for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        container.appendChild(star);
      }
    };

    createStars(100);

    gsap.to('.star', {
      y: '+=10vh',
      repeat: -1,
      duration: () => Math.random() * 5 + 5,
      ease: 'linear',
    });

    gsap.fromTo(
      '.star',
      { opacity: 0 },
      {
        opacity: 1,
        repeat: -1,
        yoyo: true,
        duration: () => Math.random() * 1 + 0.5,
        ease: 'power1.inOut',
      }
    );

    gsap.to('.parallax-bg', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.parallax-bg',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  const handleCategoryChange = (category) => {
    let filtered = courses;

    if (category === 'all') {
      filtered = courses;
      setGradient("from-purple-600 via-blue-500 to-purple-700");
    }
    else if (category === 'beginner') {
      filtered = courses.filter(course => course.category === 1);
      setGradient("from-purple-600 via-blue-500 to-purple-700");

    } else if (category === 'featured') {
      filtered = courses.filter(course => course.category === 2);
      setGradient("from-purple-600 via-pink-500 to-purple-700");
    }
    setFilteredCourses(filtered);
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 stars-bg"></div>
      <div className="absolute inset-x-0 top-0 z-20 bg-gray-800 bg-opacity-60 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center">
            <nav className="flex space-x-4" aria-label="Tabs">
              <button
                onClick={() => handleCategoryChange('all')}
                className="nav-pill"
              >
                All Courses
              </button>
              <button
                onClick={() => handleCategoryChange('featured')}
                className="nav-pill"
              >
                Grade 11
              </button>
              <button
                onClick={() => handleCategoryChange('beginner')}
                className="nav-pill"
              >
                Grade 12
              </button>
            </nav>
          </div>
        </div>
      </div>
      <div className="relative z-10 p-6">
        {fetchError && (
          <div className="bg-red-200 text-red-800 p-3 mb-4 rounded">
            {fetchError}
          </div>
        )}
        <h2 className="text-3xl font-bold mb-4">Courses</h2>

        <div className={` absolute inset-0 z-0 bg-gradient-to-br ${gradient}`}></div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard course={course} />
            // <div

            //   key={course.id}
            //   className="relative overflow-hidden rounded-lg border-l-4 border-purple-600 shadow-lg bg-white bg-opacity-70"
            // >
            //   <div className="p-4">
                
            //   </div>
              
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
