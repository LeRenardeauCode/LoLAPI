import { useState, useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import ItemService from "../services/ItemService";

const ObjectsPage = () => {
  // États en premier
  const [itemsByTag, setItemsByTag] = useState({});
  const [version, setVersion] = useState("");

  // Fonction asynchrone qui récupère les items et fait le regroupement
  const fetchItemsAndGroupByTag = async () => {
    try {
      const versionResponse = await fetch(
        "https://ddragon.leagueoflegends.com/api/versions.json"
      );
      const versions = await versionResponse.json();
      const latestVersion = versions[0];
      setVersion(latestVersion);

      const items = await ItemService.fetchItems(latestVersion);

      const grouped = items.reduce((acc, item) => {
        if (!item.tags) return acc;
        item.tags.forEach((tag) => {
          if (!acc[tag]) acc[tag] = [];
          acc[tag].push(item);
        });
        return acc;
      }, {});

      setItemsByTag(grouped);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItemsAndGroupByTag();
  }, []);

  return (
    <Container sx={{ pt: 8, pb: 8, m: 0, color: "#eee", overflowX: "hidden",}}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: "url(../public/assets/img/fond_ecran_home.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
          filter: "blur(6px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <Typography
        variant="h2"
        sx={{
          fontFamily: "Spiegel, serif",
          textAlign: "center",
          color: "#ffe082",
          mb: 4,
          letterSpacing: "0.04em",
          fontWeight: "bold",
        }}
      >
        Objets
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: 4,
          background: "linear-gradient(90deg, #C4A15B, #EDDC91)",
          borderRadius: 2,
          mb: 4,
        }}
      />

      {Object.entries(itemsByTag).map(([tag, items]) => (
        <Box
          key={tag}
          sx={{
            width: "100%",
            mb: 4,
            p: 1,
            borderRadius: 1,
            bgcolor: "#030303ff",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontFamily: "Spiegel, serif", color: "#eddc91", mb: 1 }}
          >
            {tag}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {items.map((item) => (
              <Box
                key={item.id}
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                title={item.name}
              >
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`}
                  alt={item.name}
                  width="32"
                  height="32"
                  loading="lazy"
                />
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Container>
  );
};

export default ObjectsPage;
