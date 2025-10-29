import { useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import ChampionService from "../services/ChampionService";
import ChampionCard from "../components/ChampionCard";

const ChampionsPage = () => {
  const [champions, setChampions] = useState([]);

  const fetchChampions = async () => {
    try {
      const response = await ChampionService.fetchLatestVersion();
      const version = response.data[0];
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
          variant="h2"
          sx={{
            color: "#ffe082",
            fontWeight: "bold",
            mb: 4,
            textAlign: 'center',
            letterSpacing: "0.04em",
            textShadow: "0 0 12px #c4a15b",
          }}
        >
          Champions
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {champions.map((champion) => (
            <ChampionCard champion={champion} key={champion.id} />
          ))}
        </Box>
      </Container>
  );
};

export default ChampionsPage;
