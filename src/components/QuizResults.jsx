import { Container, Typography, Button, Box } from '@mui/material';

const QuizResults = ({ score, onRestart, isNewRecord }) => {
  // Couleur selon le grade
  const gradeColors = {
    'S': '#FFD700',
    'A': '#4caf50',
    'B': '#8bc34a',
    'C': '#ffc107',
    'D': '#ff9800',
    'F': '#f44336'
  };

  return (
    <Container sx={{ textAlign: 'center', pt: 10 }}>
      <Typography 
        variant="h2" 
        sx={{ 
          mb: 4, 
          color: '#ffe082',
          fontFamily: 'Spiegel, serif'
        }}
      >
        Résultats
      </Typography>
      
      {/* Grade avec couleur */}
      <Box 
        sx={{ 
          display: 'inline-block',
          p: 3,
          mb: 3,
          borderRadius: 2,
          bgcolor: '#030303',
          border: `4px solid ${gradeColors[score.grade]}`
        }}
      >
        <Typography 
          variant="h1" 
          sx={{ 
            color: gradeColors[score.grade],
            fontWeight: 'bold',
            fontSize: '5rem'
          }}
        >
          {score.grade}
        </Typography>
      </Box>
      
      {/* Score */}
      <Typography variant="h4" sx={{ mb: 2, color: '#EDDC91' }}>
        {score.correct} / {score.total} bonnes réponses
      </Typography>
      
      <Typography variant="h5" sx={{ mb: 4, color: '#C4A15B' }}>
        {score.percentage}%
      </Typography>

      {/* Nouveau record */}
      {isNewRecord && (
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 4, 
            color: '#4caf50',
            animation: 'pulse 1s infinite'
          }}
        >
        Nouveau record personnel !
        </Typography>
      )}

      {/* Message selon le score */}
      <Typography variant="h6" sx={{ mb: 4, color: '#888' }}>
        {score.percentage >= 90 && "Parfait ! Tu es un expert de LoL !"}
        {score.percentage >= 70 && score.percentage < 90 && "Très bien ! Continue comme ça !"}
        {score.percentage >= 50 && score.percentage < 70 && "Pas mal, mais tu peux faire mieux !"}
        {score.percentage < 50 && "Continue à jouer pour t'améliorer !"}
      </Typography>

      {/* Bouton rejouer */}
      <Button 
        variant="contained" 
        onClick={onRestart}
        size="large"
        sx={{ 
          bgcolor: '#C4A15B',
          px: 4,
          py: 1.5,
          fontSize: '1.2rem',
          '&:hover': { bgcolor: '#EDDC91', color: '#000' }
        }}
      >
        Rejouer
      </Button>
    </Container>
  );
};

export default QuizResults;