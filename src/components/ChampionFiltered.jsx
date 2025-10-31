import React, { useState, useEffect } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const ChampionFiltered = ({ champions, tags, regions, onFiltered }) => {
  const [filterTag, setFilterTag] = useState("");
  const [filterRegion, setFilterRegion] = useState("");

  // Filtrage automatique à chaque changement
  useEffect(() => {
    const filtered = champions.filter((champ) => {
      const matchTag = !filterTag || champ.tags.includes(filterTag);
      const matchRegion =
        !filterRegion ||
        regions.some(
          (region) =>
            region.name === filterRegion &&
            region.championIds.includes(champ.id)
        );
      return matchTag && matchRegion;
    });

    onFiltered(filtered);
  }, [filterTag, filterRegion, champions, regions, onFiltered]);

  return (
    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
      <FormControl sx={{ minWidth: 140 }} size="small">
        <InputLabel sx={{ color: "#c4a15b" }}>Par tag</InputLabel>
        <Select
          value={filterTag}
          label="Par tag"
          onChange={(e) => setFilterTag(e.target.value)}
          sx={{
            color: "#c4a15b",
            "& .MuiSelect-icon": { color: "#c4a15b" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#c4a15b" },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e6ce7f",
            },
          }}
        >
          <MenuItem value="">Tous</MenuItem>
          {tags.map((tag) => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 140 }} size="small">
        <InputLabel sx={{ color: "#c4a15b" }}>Par région</InputLabel>
        <Select
          value={filterRegion}
          label="Par région"
          onChange={(e) => setFilterRegion(e.target.value)}
          sx={{
            color: "#c4a15b",
            "& .MuiSelect-icon": { color: "#c4a15b" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#c4a15b" },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#e6ce7f",
            },
          }}
        >
          <MenuItem value="">Toutes</MenuItem>
          {regions.map((region) => (
            <MenuItem key={region.name} value={region.name}>
              {region.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default ChampionFiltered;
