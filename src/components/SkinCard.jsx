import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Box, Popper, Paper } from "@mui/material";

const SkinCard = ({ championId, skin }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{ display: "flex", flex: "wrap", position: "relative" }}
    >
      <Card sx={{ width: 200, m: 1, bgcolor: "#222", boxShadow: "none", border: "none", p: 0 }} elevation={0}>
        <CardMedia
          component="img"
          height="120"
          image={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_${skin.num}.jpg`}
          alt={skin.name}
          sx={{ objectFit: "cover", borderRadius: 1 }}
        />
        <CardContent sx={{ p: 1 }}>
          <Typography variant="body2" align="center" sx={{ color: "#ffd700", fontWeight: 600 }}>
            {skin.name}
          </Typography>
        </CardContent>
      </Card>

      <Popper open={open} anchorEl={anchorEl} placement="top" sx={{ zIndex: 1300 }}>
        <Paper
          elevation={8}
          sx={{ maxWidth: 220, borderRadius: 2, background: "#16171b", border: 1, borderColor: "#EDDC91"  }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championId}_${skin.num}.jpg`}
            alt={skin.name}
            style={{ width: "100%", marginBottom: 8 }}
          />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", textAlign: "center", color: "white" }}>
            {skin.name}
          </Typography>
        </Paper>
      </Popper>
    </Box>
  );
};

export default SkinCard;
