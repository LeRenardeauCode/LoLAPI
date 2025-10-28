import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChampionCard = ({ champion }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 250, cursor: 'pointer' }} onClick={() => navigate('/champion/' + champion.id)}>
      <CardMedia
        component="img"
        height="140"
        image={`https://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/${champion.image.full}`}
        alt={champion.name}
      />
      <CardContent sx={{ backgroundColor: 'darkslategray' }}>
        <Typography gutterBottom variant="h5" component="div" color="white">
          {champion.name}
        </Typography>
        <Typography variant="body2" color="white" sx={{ height: 80, overflowY: 'auto' }}>
          {champion.title}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 1 }}
          onClick={(e) => { 
            e.stopPropagation();
            navigate('/champion/' + champion.id);
          }}
        >
          Voir plus
        </Button>
      </CardContent>
    </Card>
  );
};

export default ChampionCard;