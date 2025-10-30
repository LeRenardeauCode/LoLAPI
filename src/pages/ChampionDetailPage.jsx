import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Grid, Button } from "@mui/material";
import championService from "../services/ChampionService";
import SkinCard from "../components/SkinCard";

const ChampionDetailPage = () => {
  const { id } = useParams();
  const [champion, setChampion] = useState({});
  const [version, setVersion] = useState();

  const fetchChampion = async () => {
    try {
      const response = await championService.fetchLatestVersion();
      const fetchedVersion = response.data[0];
      setVersion(fetchedVersion);
      const resArray = await championService.fetchChampionById(fetchedVersion, id);
      setChampion(resArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChampion();
  }, [id]);

  return (
    <>
      <Box
        sx={{
          position: "relative",
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
            backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
            filter: "blur(10px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <Container sx={{ position: "relative", zIndex: 2 }}>
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              color: "#fff",
              px: { xs: 2, md: 6 },
              py: 6,
              gap: 6,
            }}
          >
            {/* Colonne gauche: IMAGE */}
            <Container
              maxWidth={false}
              disableGutters
              sx={{
                flex: { xs: "none", md: "0 0 340px" },
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                mb: { xs: 4, md: 0 },
                p: 0,
                minWidth: 0,
              }}
            >
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`}
                alt={champion.name}
                style={{
                  width: 320,
                  height: 480,
                  borderRadius: "18px",
                  objectFit: "cover",
                  boxShadow: "0 0 32px #C4A15B",
                  display: "block",
                }}
              />
            </Container>

            {/* Colonne droite: CONTENU */}
            <Container
              maxWidth={false}
              disableGutters
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                p: 0,
                minWidth: 0,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2, m: 2 }}>
                <Typography
                  variant="h2"
                  sx={{ fontWeight: "bold", color: "#EDDC91", mb: 2 }}
                >
                  {champion.name}
                  {champion.tags &&
                    champion.tags.map((tag) => (
                      <Button
                        key={tag}
                        size="small"
                        sx={{
                          background: "linear-gradient(to right, #C4A15B, #EDDC91)",
                          color: "#000",
                          fontWeight: 700,
                          ml: 1,
                          borderRadius: 2,
                          boxShadow: "0 0 5px #EDDC91",
                        }}
                        variant="contained"
                        disableElevation
                      >
                        {tag}
                      </Button>
                    ))}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {champion.lore}
              </Typography>

              {/* Compétences */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" sx={{ mb: 1, color: "#e9e6c3", }}>
                  Compétences :
                </Typography>
                <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                  {champion.spells &&
                    champion.spells.map((spell) => (
                      <Box key={spell.id} sx={{ textAlign: "center" }}>
                        <img
                          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`}
                          alt={spell.name}
                          style={{
                            width: 64,
                            height: 64,
                            marginBottom: 4,
                            borderRadius: "8px",
                            boxShadow: "0 0 8px #EDDC91",
                          }}
                        />
                        <Typography variant="subtitle1">{spell.name}</Typography>
                      </Box>
                    ))}
                </Box>
              </Box>

              {/* Stats */}
              <Container
                sx={{
                  bgcolor: "#16171b",
                  border: 1,
                  borderRadius: 2,
                  p: 3,
                  mt: 5,
                  boxShadow: "0 0 10px #C4A15B",
                }}
              >
                <Typography variant="h5" sx={{ color: "#EDDC91" }}>
                  Stats :
                </Typography>
                <Grid container spacing={2}>
                  <Grid item>
                    <Typography>PV : {champion.stats ? champion.stats.hp : "-"}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>Mana : {champion.stats ? champion.stats.mp : "-"}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      Attaque : {champion.stats ? champion.stats.attackdamage : "-"}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      Vitesse d'attaque : {champion.stats ? champion.stats.attackspeed : "-"}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>Armure : {champion.stats ? champion.stats.armor : "-"}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      Résistance magique : {champion.stats ? champion.stats.spellblock : "-"}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      Vitesse : {champion.stats ? champion.stats.movespeed : "-"}
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
            </Container>
          </Box>

          {/* Skins */}
          <Container sx={{ position: "relative", zIndex: 2, mt: 6, p: 3 }}>
            <Box
              sx={{
                width: "100%",
                height: 4,
                background: "linear-gradient(90deg, #C4A15B, #EDDC91)",
                borderRadius: 2,
                my: 4,
              }}
            />
            <Box sx={{ p: 3, bgcolor: "#16171b", borderRadius: 2, boxShadow: "0 0 10px #C4A15B" }}>
              <Typography variant="h5" gutterBottom sx={{ color: "#EDDC91" }}>
                Skins disponibles :
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {champion.skins &&
                  champion.skins.map((skin) => (
                    <SkinCard key={skin.num} championId={champion.id} skin={skin} />
                  ))}
              </Box>
            </Box>
          </Container>
        </Container>
      </Box>
    </>
  );
};

export default ChampionDetailPage;
