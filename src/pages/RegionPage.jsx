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

    return <>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography
                variant="h2"
                sx={{
                    color: "#ffe082",
                    fontWeight: "bold",
                    mb: 4,
                    textAlign: 'center',
                    letterSpacing: "0.04em",
                    textShadow: "0 0 12px #c4a15b",
                }}
            >
                Regions
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: 3,
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                {region.map((region) => (
                    <RegionCard region={region} key={region.name} />
                ))}
            </Box>
        </Container>

    </>;
}

export default RegionPage;