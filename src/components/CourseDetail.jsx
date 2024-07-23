import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../services/CourseService'; // Adjust the import if necessary
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaTv } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

// Helper function to extract video ID from YouTube URL
const getYoutubeVideoId = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
};

const CourseDetail = () => {
  const { id } = useParams(); // Get course ID from URL
  const [course, setCourse] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id); // Fetch course data by ID
        setCourse(data[0]);
        console.log("COURSE DATA:", data.lectures);
        setCurrentVideo(getYoutubeVideoId(data.preview_url)); // Set preview video as the initial video
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourse();
  }, [id]);

  useEffect(() => {
    if (course) {
      gsap.utils.toArray('.lesson-card').forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 60%',
              scrub: true,
              once: true,
            },
          }
        );
      });
    }
  }, [course]);

  const handleLessonClick = (videoUrl) => {
    setCurrentVideo(getYoutubeVideoId(videoUrl));
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="text-lg mb-4">{course.description}</p>
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <iframe
          src={`https://www.youtube.com/embed/${currentVideo}`} // Use currentVideo state
          title={course.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        />
      </div>
      <h2 className="text-2xl font-bold mb-4">Lessons</h2>
      <div className="space-y-4">
        {course.lectures.map((lesson) => (
          <div
            key={lesson.id}
            className="lesson-card bg-gray-800 bg-opacity-60 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out relative overflow-hidden flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">{lesson.title}</h3>
              <p className="text-gray-400 mb-2">{lesson.description}</p>
            </div>
            <FaTv
              className="text-white text-2xl cursor-pointer"
              onClick={() => handleLessonClick(lesson.videoUrl)} // Set the lesson video as currentVideo
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;