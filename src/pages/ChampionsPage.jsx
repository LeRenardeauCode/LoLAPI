import { useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import ChampionService from "../services/ChampionService";
import ChampionCard from "../components/ChampionCard";
import ChampionSearchBar from "../components/ChampionSearchBar";
import ChampionFiltered from "../components/ChampionFiltered"
import RegionService from "../services/RegionService"

const ChampionsPage = () => {
  const [champions, setChampions] = useState([]);
  const [filteredChampions, setFilteredChampions] = useState([]);
  const [tags, setTags] = useState([]);
  const [regions, setRegions] = useState([]);

  const fetchChampions = async () => {
    try {
      const response = await ChampionService.fetchLatestVersion();
      const version = response.data[0];
      const championsArray = await ChampionService.fetchChampions(version);
      setChampions(championsArray);
      setFilteredChampions(championsArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChampions();
  }, []);

  useEffect(() => {
  if (champions.length === 0) return;

  // Extraire tous les tags et supprimer les doublons
  const allTags = champions.flatMap(c => c.tags);
  const uniqueTags = Array.from(new Set(allTags));
  setTags(uniqueTags);

  // Obtenir la liste des régions à partir de RegionsService
  const allRegions = RegionService.getAllRegions();
  setRegions(allRegions);

    setFilteredChampions(champions);
  }, [champions]);


  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredChampions(champions);
      return;
    }
    const filtered = champions.filter((champion) =>
      champion.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredChampions(filtered);
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          pt: { xs: "72px", md: "72px" },
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
            backgroundImage:
              "url(../assets/img/fond_ecran_champion.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
            filter: "blur(4px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <Container>
          <ChampionSearchBar onSearch={handleSearch} />
          <ChampionFiltered
            champions={champions}
            tags={tags}
            regions={regions}
            onFiltered={setFilteredChampions}
          />
          <Typography
            variant="h2"
            sx={{
              color: "#ffe082",
              fontWeight: "bold",
              mb: 4,
              textAlign: "center",
              letterSpacing: "0.04em",
              fontFamily: "Spiegel, serif",
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
            {filteredChampions.map((champion) => (
              <ChampionCard champion={champion} key={champion.id} />
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ChampionsPage;
