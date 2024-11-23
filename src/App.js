import React, { useState, useEffect } from 'react';
import './App.css';

const styles = {
  title: {
    fontWeight: 'bold',
  },
};

const difficulties = ['Easy', 'Medium', 'Hard'];

const getCategoriesUrl = 'https://opentdb.com/api_category.php';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  useEffect(() => {
    fetch(getCategoriesUrl)
      .then((response) => response.json())
      .then((data) => setCategories(data.trivia_categories));
  }, []);

  return (
    <div className="App">
      <h1 style={styles.title}>QUIZ MAKER</h1>

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

      <button id="createBtn" onClick={() => {}}>
        Create
      </button>
    </div>
  );
}

export default App;
