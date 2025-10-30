import { Popper, Paper, Typography, Box } from "@mui/material";
import React, { useState } from "react";

const SpellIconWithTooltip = ({ spell, version }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <Box sx={{ textAlign: "center", minWidth: 80 }}>
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`}
          alt={spell.name}
          width={64}
          height={64}
          style={{
            cursor: "pointer",
            borderRadius: 8,
            boxShadow: "0 0 8px #EDDC91",
          }}
          onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
          onMouseLeave={() => setAnchorEl(null)}
        />
        <Typography variant="subtitle1" sx={{ fontFamily: "Beaufort, serif" }}>
          {spell.name}
        </Typography>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="bottom"
          sx={{ zIndex: 1300 }}
        >
          <Paper sx={{ p: 1.5, maxWidth: 280, background: "#16171b", border: 2, borderColor: "#EDDC91" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, color: "white" }}>
              {spell.name}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "normal", color: "white" }}>
              {spell.description}
            </Typography>
            {/* Ajoute les stats ici si tu veux */}
          </Paper>
        </Popper>
      </Box>
    </>
  );
};

export default SpellIconWithTooltip;
