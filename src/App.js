import React, { useState, useEffect } from 'react';
import './App.css';

const styles = {
  title: {
    fontWeight: 'bold',
  },
  questionContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 24px',
  },
  text: {
    fontWeight: '200',
    textAlign:'left',
  },
  buttonContainer: {
    display:'flex',
    flexDirection: 'row',
  },
  answerButton: {
    height: 40,
  },
  submitButton: {
    marginTop: 16,
  }
};

const difficulties = ['Easy', 'Medium', 'Hard'];

const getCategoriesUrl = 'https://opentdb.com/api_category.php';
const getQuestionsUrl = `https://opentdb.com/api.php?amount=5&category={category}&difficulty={difficulty}&type=multiple`;

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    fetch(getCategoriesUrl)
      .then((response) => response.json())
      .then((data) => {
        setSelectedCategory('');
        setSelectedDifficulty('');
        setQuestions([]);
        setSelectedAnswers({});
        setCategories(data.trivia_categories);
      });
  }, []);

  const onCreatePressed = () => {
    setQuestions([]);
    setSelectedAnswers({});

    fetch(getQuestionsUrl
      .replace(/\{category\}/, selectedCategory)
      .replace(/\{difficulty\}/, selectedDifficulty.toLowerCase())
    )
      .then((response) => response.json())
      .then((data) => {
        const result = data.results.map((item) => ({
          ...item,
          answers: [item.correct_answer, ...item.incorrect_answers].sort(() => Math.random() - 0.5),
        }));
        setQuestions(result);
      });
  };

  return (
    <div className="App">
      <h1 style={styles.title}>QUIZ MAKER</h1>

      <section>
        <select id="categorySelect" value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select id="difficultySelect" value={selectedDifficulty} onChange={(event) => setSelectedDifficulty(event.target.value)}>
          {difficulties.map((difficulty, index) => (
            <option key={difficulty + index.toString()} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>

        <button id="createBtn" onClick={onCreatePressed} disabled={!selectedCategory}>
          Create
        </button>
      </section>

      <section style={styles.questionContainer}>
      {questions.map((question, questionIndex) => (
        <div key={question.question}>
          <h4 dangerouslySetInnerHTML={{ __html: question.question }} style={styles.text}/>
          <div style={styles.buttonContainer}>
          {question.answers.map((answer, answerIndex) => {
            const isSelected = selectedAnswers[questionIndex] === answer || false;
            const bgColor = isSelected ? 'green' : '';
            return (
              <button
                key={answer}
                onClick={() => setSelectedAnswers({ ...selectedAnswers, [questionIndex]: answer })}
                style={{ 
                  backgroundColor: bgColor, 
                  color: isSelected ? 'white' : '', 
                  borderColor: bgColor, 
                  marginRight: answerIndex < question.answers.length - 1 ? 8 : 0,
                  ...styles.answerButton,
                }}
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            )})}
          </div>
        </div>
      ))}

      {Object.keys(selectedAnswers).length === questions.length &&  Object.keys(selectedAnswers).length > 0 && (<button onClick={() => {}} style={styles.submitButton}>Submit</button>)}
      </section>
    </div>
  );
}

export default App;
