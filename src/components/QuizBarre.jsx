import { Box, Typography, Button, Container } from "@mui/material";

// Barre de progression du quiz

const QuizProgress = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ color: "#ffe082", mb: 1 }}>
        Question {current} / {total}
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: 8,
          bgcolor: "#333",
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            width: `${percentage}%`,
            height: "100%",
            bgcolor: "#C4A15B",
            borderRadius: 1,
            transition: "width 0.3s ease",
          }}
        />
      </Box>
    </Box>
  );
};



export default QuizProgress;
