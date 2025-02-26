// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import CourseList from './components/CourseList';
import CreateCourseForm from './components/CreateCourseForm';
import AchievementList from './components/AchievementList';
import AuthForm from './components/AuthForm';
import SocialAuthButtons from './components/SocialAuthButtons';
import Profile from './components/Profile';
import { register, login } from './services/authService';
import { getCourses } from './services/courseService';
import { getAchievements } from './services/achievementService';

function App() {
  const [token, setToken] = useState(null);
  const [courses, setCourses] = useState([]);
  const [achievements, setAchievements] = useState([]);

  const handleRegister = async (email, password, username) => {
    try {
      const data = await register(email, password, username);
      setToken(data.token);
      console.log('Registered successfully:', data);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const data = await login(email, password);
      setToken(data.token);
      console.log('Logged in successfully:', data);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleCreateCourse = async (newCourse) => {
    setCourses([newCourse, ...courses]);
  };

  useEffect(() => {
    if (token) {
      getCourses().then(setCourses);
      getAchievements().then(setAchievements);
    }
  }, [token]);

  return (
    <div className="App">
      <h1>Welcome to DORM Frontend!</h1>
      {!token ? (
        <div>
          <AuthForm onRegister={handleRegister} onLogin={handleLogin} />
          <SocialAuthButtons />
        </div>
      ) : (
        <div>
          <p>You are logged in with token: {token}</p>
          <Profile token={token} />
          <CourseList courses={courses} />
          <CreateCourseForm onCreate={handleCreateCourse} />
          <AchievementList achievements={achievements} />
        </div>
      )}
    </div>
  );
}

export default App;