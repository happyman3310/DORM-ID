// frontend/src/components/CreateCourseForm.js
import React, { useState } from 'react';
import { createCourse } from '../services/courseService';

const CreateCourseForm = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [xp, setXp] = useState(0);
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createCourse({ title, description, xp, questions });
      onCreate(data);
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>XP</label>
        <input
          type="number"
          value={xp}
          onChange={(e) => setXp(e.target.value)}
          required
        />
      </div>
      {questions.map((q, index) => (
        <div key={index}>
          <div>
            <label>Question</label>
            <input
              type="text"
              value={q.question}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].question = e.target.value;
                setQuestions(newQuestions);
              }}
              required
            />
          </div>
          {q.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <label>Option {optionIndex + 1}</label>
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index].options[optionIndex] = e.target.value;
                  setQuestions(newQuestions);
                }}
                required
              />
            </div>
          ))}
          <div>
            <label>Correct Answer Index</label>
            <input
              type="number"
              min="0"
              max="3"
              value={q.correctAnswer}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].correctAnswer = e.target.value;
                setQuestions(newQuestions);
              }}
              required
            />
          </div>
        </div>
      ))}
      <button type="button" onClick={addQuestion}>Add Question</button>
      <button type="submit">Create Course</button>
    </form>
  );
};

export default CreateCourseForm;