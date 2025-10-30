import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RegionService from "../services/RegionService";
import ChampionService from "../services/ChampionService";
import { Box, Container, Typography, Button } from "@mui/material";

const RegionDetailPage = () => {
    const { regionName } = useParams();
    const navigate = useNavigate();
    const [region, setRegion] = useState(null);
    const [champions, setChampions] = useState([]);

    // Fetch/récupère la région et ses champions à l’ouverture
    const fetchRegionDetails = async () => {
        try {
            const reg = RegionService.getRegionByName(regionName);
            setRegion(reg);

            if (reg?.championIds) {
                // Optionnel : fetches details champions
                const allChampions = await ChampionService.fetchChampions();
                // Filtrer pour ne garder que ceux de la région
                const championsArray = allChampions.filter((c) =>
                    reg.championIds.includes(c.id)
                );
                setChampions(championsArray);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRegionDetails();
        // eslint-disable-next-line
    }, [regionName]);

    if (!region) return null;

    return (
        <>
            {region && (
                <>
                    {/* Fond fixé en arrière-plan avec image région */}
                    <Box
                        sx={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            backgroundImage: `url(${region.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "blur(10px)",
                            opacity: 0.15,
                            zIndex: 0,
                            pointerEvents: "none",
                        }}
                    />
                </>
            )}
            <Container sx={{ position: "relative", zIndex: 2, py: 5 }}>
                <Box
                    sx={{
                        width: "100%",
                        height: { xs: 220, md: 320 },
                        borderRadius: 4,
                        mb: 4,
                        backgroundImage: `url(${region.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        boxShadow: "0 4px 28px #c4a15b70",
                    }}
                />

                {/* Grid principal */}
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
                    {/* Bloc gauche : description + factions */}
                    <Box
                        sx={{
                            flex: 3,
                            border: "2px solid #c4a15b",
                            borderRadius: 3,
                            p: 3,
                            minHeight: 300,
                            bgcolor: "#23272ad9",
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", mb: 2 }}>
                            <img
                                src={region.icon}
                                alt={`${region.name} icon`}
                                style={{ width: 80, height: "auto", marginBottom: 8 }}
                            />
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, textAlign: "center", color: "#e9e6c3", fontFamily: "Spiegel, serif" }}>
                            {region.name}
                        </Typography>
                        <Typography sx={{ fontSize: 19, mb: 3, textAlign: "center", color: "white", fontFamily: "Beaufort, serif" }}>{region.description}</Typography>
                        {/* Sous-box factions */}
                        <Box sx={{ border: "2px solid #ffd700", borderRadius: 2, mt: 2, p: 2, bgcolor: "#ede7d620" }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#e9e6c3" }}>Factions</Typography>
                            {/* Liste à enrichir si tu ajoutes factions dans le JSON */}
                            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                                {/* {region.factions?.map(...)} */}

                                <Typography>Aucune faction listée</Typography>
                            </Box>
                        </Box>
                    </Box>
                    {/* Bloc droit : champions "pins" */}
                    <Box
                        sx={{
                            flex: 1,
                            border: "2px solid #c4a15b",
                            borderRadius: 3,
                            p: 2,
                            minWidth: 200,
                            minHeight: 300,
                            bgcolor: "#23272aed",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "#e9e6c3", fontFamily: 'Spiegel, serif'}}>Champions associés</Typography>
                        </Box>
                        
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
                            {(champions.length > 0
                                ? champions.slice(0, 3)   // affiche 3 premiers
                                : region.championIds.slice(0, 3)
                            ).map((champion, i) => (
                                <Box
                                    key={i}
                                    sx={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", mb: 1, "&:hover": { transform: "scale(1.1)" }, objectFit: "cover", transition: "transform 0.3s" }}
                                    onClick={() =>
                                        navigate("/champion/" + (champion.id || champion))
                                    }
                                >
                                    <img
                                        src={
                                            champion.iconUrl ||
                                            `https://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/${champion.id || champion}.png`
                                        }
                                        alt={champion.name || champion}
                                        style={{
                                            width: 'auto',
                                            height: 'auto',
                                            borderRadius: "50%",
                                            border: "2px solid #EDDC91",
                                            boxShadow: "0 0 8px #c4a15b"
                                        }}
                                    />
                                    <Typography variant="caption" sx={{ color: "#EDDC91", fontWeight: 700, fontFamily: 'Spiegel, serif', mt: 0.5, textAlign: "center" }}>
                                        {champion.name || champion}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                        <Button
                            size="lg"
                            variant="contained"
                            sx={{
                                mt: 2,
                                borderRadius: 2,
                                fontWeight: 700,
                                background: "linear-gradient(to right, #ff9800, #ffe000)",
                                color: "#23272a",
                                fontFamily: 'Spiegel, serif',
                            }}
                            onClick={() => navigate(`/champions?region=${region.name}`)}
                        >
                            Voir plus
                        </Button>
                    </Box>
                </Box>
            </Container >
        </>
    );
};

export default RegionDetailPage;
