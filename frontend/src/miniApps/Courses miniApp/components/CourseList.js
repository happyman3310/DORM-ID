// frontend/src/components/CourseList.js
import React, { useEffect, useState } from 'react';
import { getCourses } from '../services/courseService';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error('Ошибка при получении курсов:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Список курсов</h2>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>XP: {course.xp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;