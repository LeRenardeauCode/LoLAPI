// src/services/RuneService.js
import axios from 'axios';
import { getCachedData, setCachedData } from '../utils/cacheHelper';

const baseUrl = 'https://ddragon.leagueoflegends.com/cdn';

const fetchRunes = async (version, lang = 'fr_FR') => {
  const cacheKey = `lol_runes_${version}_${lang}`;
  
  // 1. Vérifier le cache
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  // 2. Fetch depuis Data Dragon
  console.log(`📡 Fetch runes depuis Data Dragon (v${version})...`);
  const result = await axios.get(`${baseUrl}/${version}/data/${lang}/runesReforged.json`);
  const runes = result.data;

  // 3. Sauvegarder dans le cache
  setCachedData(cacheKey, runes);

  return runes;
};

export default {
  fetchRunes
};
