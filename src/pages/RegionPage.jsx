import { useEffect, useState } from "react";
import RegionService from "../services/RegionService";
import { Box, Container, Typography } from "@mui/material";
import RegionCard from "../components/RegionCard";

const RegionPage = () => {
    const [region, setRegion] = useState([]);

    const fetchRegion = async () => {
        try {
            const regionArray = await RegionService.getAllRegions();
            setRegion(regionArray);
            console.log(regionArray);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRegion();
    }, []);

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
                        backgroundImage: "url(../public/assets/img/fond_ecran_region.jpg)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: 0.15,
                        filter: "blur(6px)",
                        zIndex: 0,
                        pointerEvents: "none",
                    }}
                />
                <Container>
                    <Typography
                        variant="h2"
                        sx={{
                            color: "#ffe082",
                            fontWeight: "bold",
                            mb: 4,
                            textAlign: 'center',
                            letterSpacing: "0.04em",
                            fontFamily: "Spiegel, serif"
                        }}
                    >
                        Regions
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
                            gap: 3,
                            flexWrap: "wrap",
                            justifyContent: "center"
                        }}
                    >
                        {region.map((region) => (
                            <RegionCard region={region} key={region.name} />
                        ))}
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default RegionPage;