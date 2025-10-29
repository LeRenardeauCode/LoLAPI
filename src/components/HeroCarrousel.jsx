import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Flèche droite personnalisée
const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#ffe000",
        borderRadius: "50%",
        padding: "12px",
        right: "15px",
        zIndex: 10,
      }}
      onClick={onClick}
    />
  );
};

// Flèche gauche personnalisée
const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#ffe000",
        borderRadius: "50%",
        padding: "12px",
        left: "15px",
        zIndex: 10,
      }}
      onClick={onClick}
    />
  );
};

const HeroCarrousel = ({ champions }) => {
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 7000,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const splashUrl = (championId) =>
    `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_0.jpg`;

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: 300, md: 600 },
        width: "100%",
        mx: "auto",
      }}
    >
      <Slider {...settings}>
        {champions.map((champion) => (
          <Box key={champion.id}>
            <Card
              sx={{
                height: { xs: 300, md: 600 },
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                backgroundColor: "transparent",
                boxShadow: "none",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={() => navigate("/champion/" + champion.id)}
            >
              <CardMedia
                component="img"
                height="100%"
                image={splashUrl(champion.id)}
                alt={champion.name}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.5)",
                }}
              />
              <CardContent
                sx={{
                  position: "relative",
                  zIndex: 2,
                  color: "rgba(255, 223, 0, 0.85)",
                  textShadow: "2px 2px 8px rgba(0,0,0,0.9)",
                  textAlign: "center",
                  pb: 3,
                }}
              >
                <Typography variant="h2" sx={{ fontWeight: "bold", userSelect: "none" }}>
                  {champion.name}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    borderRadius: 2,
                    background: "linear-gradient(to right, #ff9800, #ffe000)",
                    color: "#23272a",
                    fontWeight: 700,
                    "&:hover": {
                      background: "linear-gradient(to right, #ffb300, #ffd600)",
                      color: "#292d37",
                    },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/champion/" + champion.id);
                  }}
                >
                  Voir plus
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HeroCarrousel;
