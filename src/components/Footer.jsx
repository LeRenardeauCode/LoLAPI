import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,                
        left: 0,                  
        width: '100%',
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        textAlign: 'center',
        zIndex: 1000
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