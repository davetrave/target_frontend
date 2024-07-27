import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../services/CourseService'; // Adjust the import if necessary
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaPlay } from 'react-icons/fa';
import YouTube from 'react-youtube';

gsap.registerPlugin(ScrollTrigger);

// Helper function to extract video ID from YouTube URL
const getYoutubeVideoId = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
};

const videoOptions = {
  height: '200',
  width: '100%',
  playerVars: {
    autoplay: 1,
    modestbranding: 0, // Disable the YouTube logo
    rel: 0, // Disable related videos at the end
    showinfo: 0, // Hide video title and uploader info
    controls: 1, // Use controls (this needs to be set to 1 to ensure the user can control the video)
    disablekb: 0, // Disable keyboard controls
    iv_load_policy: 0 // Disable video annotations
  },
};


const CourseDetail = () => {
  const { id } = useParams(); // Get course ID from URL
  const [course, setCourse] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id); // Fetch course data by ID
        setCourse(data);
        console.log("COURSE DATA:", data.lectures);
        setCurrentVideo(data.preview_url); // Set preview video as the initial video

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
    setCurrentVideo(videoUrl);
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <div className="course-video mb-8">
          <YouTube videoId={currentVideo} opts={videoOptions} />
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-4">{course.title}</h2>
      
      {/* <h2 className="text-2xl font-bold mb-4">Lessons</h2> */}
      <div className="space-y-4 mb-60">
        {course.lectures.map((lesson) => (
          <div
            key={lesson.id}
            className="lesson-card bg-gray-800 bg-opacity-60 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out relative overflow-hidden flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">{lesson.title}</h3>
              <p className="text-gray-400 mb-2">{lesson.description}</p>
            </div>
            <FaPlay
              className="text-white text-2xl cursor-pointer"
              onClick={() => handleLessonClick(lesson.video_url)} // Set the lesson video as currentVideo
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;

{/* <div className="p-4">
                <ReactPlayer
                  url={course.preview_url}
                  controls
                  config={{
                    youtube: {
                      playerVars: {
                        modestbranding: 1,
                        showinfo: 0,
                        rel: 0,
                        iv_load_policy: 3,
                        disablekb: 1,
                      },
                    },
                  }}
                />
              </div> */}