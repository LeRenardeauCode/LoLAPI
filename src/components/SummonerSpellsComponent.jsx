import { Box, Typography } from "@mui/material";

const SummonerSpellsList = ({ spells, version }) => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h4" sx={{ color: "#eddc91", mb: 2, fontFamily: "Spiegel, serif", textAlign: 'center' }}>
      Sorts d'invocateur
    </Typography>
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center", pt: 2 }}>
      {spells.map(spell => (
        <Box key={spell.id} sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: 56, textAlign: "center", mb: 2, gap: 2 }}>
          <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.id}.png`} alt={spell.name} width={40} height={40} />
          <Typography variant="caption" sx={{ color: "#ffe082" }}>{spell.name}</Typography>
        </Box>
      ))}
    </Box>
  </Box>
);

export default SummonerSpellsList;