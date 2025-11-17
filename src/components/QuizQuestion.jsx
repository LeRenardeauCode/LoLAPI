import { Box, Typography, Button } from '@mui/material';

const QuizQuestion = ({ 
  question, 
  onAnswerClick, 
  selectedAnswer, 
  isAnswered 
}) => {
  return (
    <Box sx={{ mb: 4, p: 3, bgcolor: '#030303', borderRadius: 2 }}>
      {/* Question */}
      <Typography variant="h4" sx={{ color: '#EDDC91', mb: 3 }}>
        {question.question}
      </Typography>

      {/* Réponses */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {question.options.map((option, index) => {
          const isCorrect = index === question.correctAnswer;
          const isSelected = index === selectedAnswer;
          
          // Couleur du bouton selon l'état
          let bgcolor = '#1a1a1a';
          if (isAnswered) {
            if (isCorrect) bgcolor = '#4caf50';
            else if (isSelected) bgcolor = '#f44336'; 
          } else if (isSelected) {
            bgcolor = '#C4A15B'; 
          }

          return (
            <Button
              key={index}
              onClick={() => onAnswerClick(index)}
              disabled={isAnswered}
              sx={{
                p: 2,
                bgcolor,
                color: '#fff',
                fontSize: '1.1rem',
                textTransform: 'none',
                justifyContent: 'flex-start',
                '&:hover': {
                  bgcolor: isAnswered ? bgcolor : '#C4A15B'
                },
                transition: 'all 0.3s ease',
                '&:disabled': {
                  color: '#fff'
                }
              }}
            >
              {option}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default QuizQuestion;