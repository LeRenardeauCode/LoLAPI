import { useEffect, useState } from "react";
import ChampionService from "../services/ChampionService";
import { Container, Typography } from "@mui/material";
import HeroCarrousel from "../components/HeroCarrousel";

const HomePage = () => {
  const [champions, setChampions] = useState([]);
  const [version, setVersion] = useState("");

  const fetchChampions = async () => {
    try {
      const response = await ChampionService.fetchLatestVersion();
      const version = response.data[0];
      setVersion(version)

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
    <Container
      maxWidth="lg"
      sx={{
        pt: 2,
        pb: 4,
        backgroundColor: "#23272a",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h1"
        align="center"
        color="gold"
        sx={{ mb: 3, color: "#ffd700" }}
      >
        Bienvenue sur LoLAPI
      </Typography>
      <HeroCarrousel champions={champions} version={version} />
    </Container>
  );
};

export default HomePage;
