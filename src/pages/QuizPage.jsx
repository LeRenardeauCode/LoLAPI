import { useState, useEffect } from 'react';
import { Container, Button, Box, Typography } from '@mui/material';
import QuizService from '../services/QuizService';
import QuizProgress from '../components/QuizBarre';
import QuizQuestion from '../components/QuizQuestion';
import QuizResults from '../components/QuizResults';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Charger les questions au démarrage
  useEffect(() => {
    const quizQuestions = QuizService.getRandomQuestions(5);
    setQuestions(quizQuestions);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];

  // Gérer la sélection d'une réponse
  const handleAnswerClick = (answerIndex) => {
    if (isAnswered) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    const isCorrect = QuizService.checkAnswer(currentQuestion, answerIndex);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  // Passer à la question suivante
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  // Recommencer le quiz
  const handleRestart = () => {
    const quizQuestions = QuizService.getRandomQuestions(5);
    setQuestions(quizQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  // Écran de chargement
  if (questions.length === 0) {
    return (
      <Container sx={{ textAlign: 'center', pt: 10 }}>
        <Typography variant="h4">Chargement du quiz...</Typography>
      </Container>
    );
  }

  // Écran de résultats
  if (showResults) {
    const finalScore = QuizService.calculateScore(score, questions.length);
    const isNewRecord = QuizService.saveBestScore(finalScore);

    return (
      <QuizResults 
        score={finalScore}
        onRestart={handleRestart}
        isNewRecord={isNewRecord}
      />
    );
  }

  // Écran de question
  return (
    <Container sx={{ pt: 8, pb: 8 }}>
      {/* Barre de progression */}
      <QuizProgress 
        current={currentQuestionIndex + 1}
        total={questions.length}
      />

      {/* Question */}
      <QuizQuestion
        question={currentQuestion}
        onAnswerClick={handleAnswerClick}
        selectedAnswer={selectedAnswer}
        isAnswered={isAnswered}
      />

      {/* Bouton suivant */}
      {isAnswered && (
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={handleNextQuestion}
            sx={{
              bgcolor: '#C4A15B',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': { bgcolor: '#EDDC91', color: '#000' }
            }}
          >
            {currentQuestionIndex < questions.length - 1 
              ? 'Question suivante' 
              : 'Voir les résultats'}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default QuizPage;