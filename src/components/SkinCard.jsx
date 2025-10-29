import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

const SkinCard = ({ championId, skin }) => (
  <Card sx={{ width: 200, m: 1, bgcolor: "#222" }}>
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
);

export default SkinCard;