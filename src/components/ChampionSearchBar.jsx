import { TextField, Box } from "@mui/material";
import { useState } from "react";

const ChampionSearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    onSearch(val);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", mt: 2 }}>
      <TextField
        value={searchTerm}
        onChange={handleChange}
        placeholder="Rechercher un champion..."
        fullWidth
        variant="outlined"
        sx={{
          backgroundColor: "#000",
          borderRadius: 1,
          "& .MuiOutlinedInput-root": {
            borderColor: "#c4a15b",
            color: "#fff",
            "& fieldset": {
              borderColor: "#c4a15b",
            },
            "&:hover fieldset": {
              borderColor: "#ffd700",
            },
          },
          input: {
            color: "#fff",
          },
        }}
      />
    </Box>
  );
};

export default ChampionSearchBar;
