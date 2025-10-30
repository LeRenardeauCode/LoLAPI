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
  <>
    <Box
      sx={{
        position: "relative",
        pt: { xs: '72px', md: '72px' },
        minHeight: "100vh",
        backgroundColor: "#23272a",
        color: "#eee",
        pb: 8,
        zIndex: 1,
        overflowX: "hidden",
      }}
    >
      {/* Overlay background splashart - FULL SCREEN */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: "url(../public/assets/img/fond_ecran_champion.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
          filter: "blur(4px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <Container>
        <Typography
          variant="h2"
          sx={{
            color: "#ffe082",
            fontWeight: "bold",
            mb: 4,
            textAlign: 'center',
            letterSpacing: "0.04em",
            fontFamily: "Spiegel, serif"
          }}
        >
          Champions
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
    </Box>
  </>
  );
};

export default ChampionsPage;
