import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import championService from "../services/ChampionService";
import ChampionCard from "../components/ChampionCard"; 

const ChampionsPage = () => {
  const [champions, setChampions] = useState([]);

const fetchChampions = async () => {
  try {
    const response = await championService.fetchLatestVersion();
    const version = response.data[0];
    const championsArray = await championService.fetchChampions(version);
    setChampions(championsArray);
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    fetchChampions();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ pt: 3 }}>
      <h1>Champions</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
        }}
      >
        {champions.map((champion) => (
          <ChampionCard champion={champion} key={champion.id} />
        ))}
      </div>
    </Container>
  );
};

export default ChampionsPage;
