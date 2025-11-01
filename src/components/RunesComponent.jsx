import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

// Fonction de mapping pour le fond selon la rune principale
const getBgForRune = (key) => {
  switch (key) {
    case "Domination":
      return "url(../assets/domination_img.png)";
    case "Sorcery":
      return "url(../assets/inspiration_img.png)";
    case "Precision":
      return "url(../assets/precision_img.png)";
    case "Resolve":
      return "url(../assets/resolve_img.png)";
    case "Inspiration":
      return "url(../assets/sorcery_img.png)";
    default:
      return "#222";
  }
};

const renderDescription = (desc = "") =>
  desc
    .replace(/<\/?mainText>/gi, "")
    .replace(/<br\s*\/?>/gi, "<br>")
    .replace(/<keyword[^>]*>/gi, "<span style='color:#e679ff; font-weight:500;'>")
    .replace(/<lol-uikit-tooltipped-keyword key='LinkTooltip_Description_Takedown'>/gi, "<span style='color:#eaa43a; font-weight:500;'>")
  

const RunesList = ({ runes }) => {
  const [selectedKey, setSelectedKey] = useState(runes?.[0]?.key || "");

  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 4,
        minHeight: 520,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: getBgForRune(selectedKey),
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px)",
          zIndex: 1,
          pointerEvents: "none",
          borderRadius: 2,
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 3,
          p: 2,
          border: 6,
          borderColor: "#ffe082",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#eddc91",
            mb: 2,
            fontFamily: "Spiegel, serif",
            textAlign: "center",
          }}
        >
          Runes
        </Typography>
        {/* Liste des arbres de runes - clic pour changer */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            mb: 4,
            position: "relative",
            zIndex: 2,
          }}
        >
          {runes.map((tree) => (
            <Box
              key={tree.id}
              onClick={() => setSelectedKey(tree.key)}
              sx={{
                cursor: "pointer",
                border:
                  selectedKey === tree.key
                    ? "2px solid gold"
                    : "1px solid #333",
                background:
                  selectedKey === tree.key ? "rgba(0,0,0,0.15)" : "none",
                borderRadius: 3,
                p: 1,
                textAlign: "center",
              }}
            >
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/${tree.icon}`}
                alt={tree.key}
                width={48}
                height={48}
              />
              <Typography variant="subtitle2" sx={{ color: "#ffe082" }}>
                {tree.key}
              </Typography>
            </Box>
          ))}
        </Box>
        {/* Détails avec slots et runes children */}
        {runes
          .filter((tree) => tree.key === selectedKey)
          .map((tree) => (
            <Box key={tree.id} sx={{ mt: 2 }}>
              {tree.slots.map((slot, idx) => (
                <Box
                  key={idx}
                  sx={{
                    mb: 2,
                    background: "rgba(15, 13, 13, 0.36)",
                    borderRadius: 2,
                    p: 1,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ mb: 1, color: "#ffe082" }}
                  >
                    Slot {idx + 1}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      justifyContent: "space-evenly",
                    }}
                  >
                    {slot.runes.map((rune) => (
                      <Tooltip
                        key={rune.id}
                        title={
                          <span
                            style={{
                              whiteSpace: "pre-line",
                              maxWidth: 300,
                              display: "block",
                              fontSize: 14
                            }}
                            dangerouslySetInnerHTML={{
                              __html: renderDescription(
                                rune.shortDesc ||
                                  rune.longDesc ||
                                  rune.description ||
                                  "Pas de description disponible"
                              ),
                            }}
                          />
                        }
                        arrow
                        placement="top"
                      >
                        <Box
                          key={rune.id}
                          sx={{
                            width: 54,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-start",
                          }}
                        >
                          <img
                            src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`}
                            alt={rune.key}
                            width={idx === 0 ? 64 : 36}
                            height={idx === 0 ? 64 : 36}
                            style={{ display: "block" }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#ffe082",
                              mt: 0.5,
                              maxWidth: "100%",
                              textAlign: "center",
                              lineHeight: 1.1,
                              height: "16 px",
                            }}
                          >
                            {rune.name}
                          </Typography>
                        </Box>
                      </Tooltip>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default RunesList;
