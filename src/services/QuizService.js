import quizData from '../quizQuestions.json'

const getAllQuestions = () => {
  return quizData;
};

const getRandomQuestions = (count = 5) => {
  const random = [...quizData].sort(() => Math.random() - 0.5);
  return random.slice(0, count);
};

const getQuestionsByDifficulty = (difficulty) => {
  return quizData.filter(q => q.difficulty === difficulty);
};

const getQuestionsByCategory = (category) => {
  return quizData.filter(q => q.category === category);
};

const checkAnswer = (question, answerIndex) => {
  return question.correctAnswer === answerIndex;
};

const calculateScore = (correct, total) => {
  const percentage = (correct / total) * 100;
  let grade = 'F';
  
  if (percentage >= 90) grade = 'S';
  else if (percentage >= 80) grade = 'A';
  else if (percentage >= 70) grade = 'B';
  else if (percentage >= 60) grade = 'C';
  else if (percentage >= 50) grade = 'D';
  
  return {
    correct,
    total,
    percentage: Math.round(percentage),
    grade
  };
};

const saveBestScore = (score) => {
  const bestScore = localStorage.getItem('quiz_best_score');
  
  if (!bestScore || score.percentage > JSON.parse(bestScore).percentage) {
    localStorage.setItem('quiz_best_score', JSON.stringify(score));
    return true;
  }
  return false;
};

const getBestScore = () => {
  const bestScore = localStorage.getItem('quiz_best_score');
  return bestScore ? JSON.parse(bestScore) : null;
};

export default {
  getAllQuestions,
  getRandomQuestions,
  getQuestionsByDifficulty,
  getQuestionsByCategory,
  checkAnswer,
  calculateScore,
  saveBestScore,
  getBestScore
};