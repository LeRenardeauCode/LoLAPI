import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        LoLAPP isn't endorsed by Riot Games and doesn't reflect the views or opinions 
        of Riot Games or anyone officially involved in producing or managing Riot Games properties. 
        Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
      </Typography>
    </Box>
  );
};

export default Footer;