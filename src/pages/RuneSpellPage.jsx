import { useEffect, useState } from "react";
import RuneService from "../services/RuneService";
import SummonerSpellService from "../services/SummonerSpellService";
import RunesList from "../components/RunesComponent";
import SummonerSpellsList from "../components/SummonerSpellsComponent";
import { Box, Container } from "@mui/material";

const RunesAndSummonersPage = () => {
  const [version, setVersion] = useState("");
  const [runes, setRunes] = useState([]);
  const [summonerSpells, setSummonerSpells] = useState([]);

  const fetchRunesAndSummoners = async () => {
    try {
      const vResp = await fetch(
        "https://ddragon.leagueoflegends.com/api/versions.json"
      );
      const versions = await vResp.json();
      const latestVersion = versions[0];
      setVersion(latestVersion);

      const runesFetched = await RuneService.fetchRunes(latestVersion);
      setRunes(runesFetched);
      console.log(runesFetched);

      const spellsFetched = await SummonerSpellService.fetchSummonerSpells(
        latestVersion
      );
      setSummonerSpells(spellsFetched);
      console.log(spellsFetched);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRunesAndSummoners();
  }, []);

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: "url(../assets/img/fond_ecran_runes.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
          filter: "blur(4px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <Container
        sx={{
          pt: 8,
          pb: 8,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 6,
          position: "relative",
        }}
      >
        {/* RUNES SIDE */}
        <Box sx={{ width: "45%" }}>
          <RunesList runes={runes} version={version} />
        </Box>

        {/* Barre verticale OR */}
        <Box
          sx={{
            width: "4px",
            minHeight: "420px",
            background: "linear-gradient(180deg, #C4A15B, #EDDC91)",
            borderRadius: 2,
            mx: 2,
            alignSelf: "center",
            boxShadow: 1,
          }}
        />

        {/* SUMMONER SPELLS */}
        <Box sx={{ width: "45%" }}>
          <SummonerSpellsList spells={summonerSpells} version={version} />
        </Box>
      </Container>
    </>
  );
};

export default RunesAndSummonersPage;
