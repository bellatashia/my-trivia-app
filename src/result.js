import React, { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
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
  footerButton: {
    marginTop: 16,
  }
};

const getScore = (questions, selectedAnswers) => {
  const value = questions.reduce((total, question, index) => {
    return total + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
  }, 0);

  let color = '';
  if (value <= 1) color = 'red';
  if (value <= 3) color = 'yellow';
  color = 'green';
  return { value, color };
};


function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location, navigate]);

  if (!location.state) {
    return null;
  } else {
    const { selectedAnswers, questions } = location.state;

    const score = getScore(questions, selectedAnswers);

    return (
      <div className="App">
        <h1 style={styles.title}>RESULTS</h1>

        <section style={styles.questionContainer}>
        {questions.map((question, questionIndex) => (
          <div key={question.question}>
            <h4 dangerouslySetInnerHTML={{ __html: question.question }} style={styles.text} />
            <div style={styles.buttonContainer}>
            {question.answers.map((answer, answerIndex) => {
              const isCorrect = answer === question.correctAnswer ? 'green' : '';
              const isWrong = selectedAnswers[questionIndex] === answer ? 'red' : '';
              const bgColor = isCorrect || isWrong;
              return (
                <button
                  key={answer}
                  disabled
                  style={{ 
                    backgroundColor: bgColor, 
                    color: isCorrect || isWrong ? 'white' : '', 
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

        <h3 style={{ color: score.color }}>
          You scored {score.value} out of {questions.length}
        </h3>

        <button onClick={() => navigate(-1)} style={styles.footerButton}>Create a new quiz</button>
        </section>
      </div>
    );
  }
}

export default Result;
