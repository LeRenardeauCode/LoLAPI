// src/services/ItemService.js
import axios from 'axios';
import { getCachedData, setCachedData } from '../utils/cacheHelper';

const baseUrl = 'https://ddragon.leagueoflegends.com/cdn';

const fetchItems = async (version, lang = 'fr_FR') => {
  const cacheKey = `lol_items_${version}_${lang}`;
  
  // 1. Vérifier le cache
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  // 2. Fetch depuis Data Dragon
  console.log(`📡 Fetch items depuis Data Dragon (v${version})...`);
  const result = await axios.get(`${baseUrl}/${version}/data/${lang}/item.json`);
  const items = Object.entries(result.data.data).map(([id, item]) => ({ id, ...item }));

  // 3. Sauvegarder dans le cache
  setCachedData(cacheKey, items);

  return items;
};

export default {
  fetchItems
};
