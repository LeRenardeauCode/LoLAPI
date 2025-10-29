import REGIONS_DATA from '../regions.json';

// Récupérer toutes les régions
const getAllRegions = () => {
  return Object.entries(REGIONS_DATA).map(([name, data]) => ({
    name,
    description: data.description,
    championCount: data.championIds.length,
    championIds: data.championIds
  }));
};

// Trouver la région d'un champion par son ID
const getRegionByChampionId = (championId) => {
  for (const [regionName, data] of Object.entries(REGIONS_DATA)) {
    if (data.championIds.includes(championId)) {
      return {
        name: regionName,
        description: data.description
      };
    }
  }
  return null;
};

// Récupérer une région spécifique
const getRegionByName = (regionName) => {
  const data = REGIONS_DATA[regionName];
  if (!data) return null;
  
  return {
    name: regionName,
    description: data.description,
    championIds: data.championIds
  };
};

export default {
  getAllRegions,
  getRegionByChampionId,
  getRegionByName
};