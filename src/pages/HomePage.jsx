import { useEffect, useState } from "react";
import ChampionService from "../services/ChampionService";
import { Box, Container, Typography } from "@mui/material";
import HeroCarrousel from "../components/HeroCarrousel";

const HomePage = () => {
  const [champions, setChampions] = useState([]);
  const [version, setVersion] = useState("");

  const fetchChampions = async () => {
    try {
      const response = await ChampionService.fetchLatestVersion();
      const version = response.data[0];
      setVersion(version);

      const championsArray = await ChampionService.fetchChampions(version);
      setChampions(championsArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChampions();
  }, []);

  return (

    <Container>
      <Typography
        variant="h1"
        align="center"
        sx={{
          fontWeight: "bold",
          mb: 3,
          color: "#c4a15b",
          letterSpacing: "0.04em",
          textShadow: "0 4px 16px #66635bff",
          fontSize: { xs: "2.6rem", md: "3.3rem" },
          fontFamily: "Spiegel, serif",
        }}

      >
        Bienvenue sur LoLAPP
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: 4,
          background: "linear-gradient(90deg, #C4A15B, #EDDC91)",
          borderRadius: 2,
          my: 4,
        }}
      />
      <Box sx={{ zIndex: 2, mb: 4, borderRadius: 4, maxHeight: 700 }}>
        <HeroCarrousel champions={champions} version={version} />
      </Box>

      <Box
        sx={{
          width: "100%",
          height: 4,
          background: "linear-gradient(90deg, #C4A15B, #EDDC91)",
          borderRadius: 2,
          my: 4,
        }}
      />
      <Typography
        variant="h2"
        align="center"
        sx={{
          fontWeight: "bold",
          mb: 3,
          color: "#ffffffff",
          letterSpacing: "0.04em",
          fontSize: { xs: "1.3rem", md: "1.5rem" },
          fontFamily: "Beaufort, serif",
        }}
      >
        Bienvenue sur LoLAPP, votre portail ultime pour explorer l’univers riche et dynamique de League of Legends.
        Découvrez les champions, leurs skins, compétences et statistiques mises à jour automatiquement grâce aux dernières données officielles de Riot Games.
      </Typography>
    </Container>
  );
};

export default HomePage;
