import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../services/CourseService';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaPlay, FaCaretDown, FaCaretRight } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

gsap.registerPlugin(ScrollTrigger);

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
    modestbranding: 0,
    rel: 0,
    showinfo: 0,
    controls: 1,
    disablekb: 0,
    iv_load_policy: 0,
  },
};

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseById(id);
        setCourse(data);
        setCurrentVideo(data.preview_url);
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
          <ReactPlayer url={currentVideo} controls width="100%" height="100%" />
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-4">{course.title}</h2>

      <Accordion allowMultipleExpanded allowZeroExpanded>
        {course.lectures.map((lecture) => (
          <AccordionItem key={lecture.id}>
            <AccordionItemHeading>
              <AccordionItemButton className="flex justify-between items-center bg-gray-800 bg-opacity-60 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out relative overflow-hidden flex justify-between items-center">
                <h3 className="text-xl font-bold">{lecture.title}</h3>
                <FaCaretRight className="accordion-caret" />
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="space-y-4">
                {lecture.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="lesson-card bg-gray-800 bg-opacity-60 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 ease-in-out relative overflow-hidden flex justify-between items-center"
                    onClick={() => handleLessonClick(lesson.video_url)}
                  >
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">{lesson.title}</h3>
                      <p className="text-gray-400 mb-2">{lesson.description}</p>
                    </div>
                    <FaPlay className="text-white text-2xl cursor-pointer" />
                  </div>
                ))}
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CourseDetail;
