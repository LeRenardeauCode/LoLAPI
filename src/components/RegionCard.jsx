import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegionCard = ({ region, cardWidth = 400, cardHeight = 320 }) => {
  const navigate = useNavigate();

    return (
    <Box>
        <Card
        sx={{
            width: cardWidth,
            minWidth: cardWidth,
            maxWidth: cardWidth,
            height: cardHeight,
            bgcolor: "#23272a",
            borderRadius: 2,
            boxShadow: "0 4px 16px #C4A15B40",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
            transition: "transform 0.15s",
            "&:hover": {
            transform: "scale(1.045)",
            boxShadow: "0 0 16px #EDDC91",
            },
        }}
        onClick={() => navigate("/region/" + encodeURIComponent(region.name))}
        >
        <CardMedia
            component="img"
            height="140"
            image={region.image}
            alt={region.name}
            style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            }}
        />
        <CardContent display="flex" flexDirection="column" alignItems="center" sx={{ p: 1, pt: 2 }}>
            <Typography
            variant="h6"
            align="center"
            sx={{ mt: 1, color: "#ffffffff" }}
            >
            {region.name}
            </Typography>
            <Typography
            variant="body2"
            align="center"
            sx={{ mt: 1, color: "#cccccc", minHeight: 60 }}
            >
            {region.description.length > 100
                ? region.description.substring(0, 100) + "..."
                : region.description}
            </Typography>
        </CardContent>
        </Card>
    </Box>
    );
};
export default RegionCard;