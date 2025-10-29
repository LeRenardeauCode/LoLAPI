import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ChampionCard = ({ champion, cardWidth = 220, cardHeight = 320 }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Card
        sx={{
          width: cardWidth,
          minWidth: cardWidth,
          maxWidth: cardWidth,
          height: cardHeight,
          bgcolor: "#23272a",
          borderRadius: 2,
          boxShadow: "0 4px 16px #C4A15B40",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          transition: "transform 0.15s",
          "&:hover": {
            transform: "scale(1.045)",
            boxShadow: "0 0 16px #EDDC91",
          },
        }}
        onClick={() => navigate("/champion/" + champion.id)}
      >
        <CardMedia
          component="img"
          height="140"
          image={`https://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/${champion.image.full}`}
          alt={champion.name}
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
        <CardContent align="center">
          <Typography
            variant="h6"
            align="center"
            sx={{ mt: 1, color: "#ffffffff" }}
          >
            {champion.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 1, px: 2, textAlign: "center", color: "#ddd" }}
          >
            {champion.title}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: "auto",
              borderRadius: 2,
              background: "linear-gradient(to right, #ff9800, #ffe000)",
              color: "#23272a",
              fontWeight: 700,
              "&:hover": {
                background: "linear-gradient(to right, #ffb300, #ffd600)",
                color: "#292d37",
              },
            }}
            onClick={() => navigate("/champion/" + champion.id)}
          >
            Voir plus
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChampionCard;
