import { useState, useEffect } from "react";
import { Container, Box, Typography, Tooltip } from "@mui/material";
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

  const renderDescription = (desc) =>
    desc
      .replace(/<\/?mainText>/g, "")
      .replace(/<br\s*\/?>/gi, "<br />")
      .replace(/<stats>/g, "<span style='color:#8ef;'>")
      .replace(/<\/stats>/g, "</span>")
      .replace(/<attention>/g, "<b>")
      .replace(/<\/attention>/g, "</b>")
      .replace(/<active>/g, "<span style='color:#f39;'>")
      .replace(/<\/active>/g, "</span>")
      .replace(/<passive>/g, "<span style='color:#EDDC91;'>")
      .replace(/<\/passive>/g, "</span>")
      .replace(/<speed>/g, "<span style='color:#61dafb;'>")
      .replace(/<\/speed>/g, "</span>")
      .replace(/<keyword[^>]*>|<\/keyword>/g, "");

  useEffect(() => {
    fetchItemsAndGroupByTag();
  }, []);

  return (
    <Container sx={{ pt: 8, pb: 8, m: 0, color: "#eee", overflowX: "hidden" }}>
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
              <Tooltip
                key={item.id}
                title={
                  <span
                    style={{ whiteSpace: "pre-line", fontSize: 14 }}
                    dangerouslySetInnerHTML={{
                      __html: renderDescription(item.description),
                    }}
                  />
                }
                arrow
              >
                <Box
                  sx={{
                    width: 48,
                    height: "auto",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    cursor: "pointer",
                    p: 1.5,
                  }}
                  aria-label={item.name}
                >
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`}
                    alt={item.name}
                    width="42"
                    height="42"
                    loading="lazy"
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#ffe082",
                      fontFamily: "Spiegel, serif",
                      textAlign: "center",
                      mt: 0.5,
                      lineHeight: 1.1,
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>
              </Tooltip>
            ))}
          </Box>
        </Box>
      ))}
    </Container>
  );
};

export default ObjectsPage;
