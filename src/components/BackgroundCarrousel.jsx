import { useEffect, useState } from "react";
import { Box } from "@mui/material";

const BackgroundCarousel = ({ champions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    if (champions.length === 0) return;

    const interval = setInterval(() => {
      setFadeIn(false);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % champions.length);
        setFadeIn(true);
      }, 1500);
    }, 8000); // Change toutes les 8 secondes

    return () => clearInterval(interval);
  }, [champions]);

  if (champions.length === 0) return null;

  const currentChampion = champions[currentIndex];
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${currentChampion.id}_0.jpg`;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          opacity: fadeIn ? 0.7 : 0.3,
          transition: "opacity 1.3s ease-in-out",
          filter: "blur(6px)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.95) 100%)",
          },
        }}
      />
    </Box>
  );
};

export default BackgroundCarousel;