// src/services/SummonerSpellService.js
import axios from 'axios';
import { getCachedData, setCachedData } from '../utils/cacheHelper';

const baseUrl = 'https://ddragon.leagueoflegends.com/cdn';

const fetchSummonerSpells = async (version, lang = 'fr_FR') => {
  const cacheKey = `lol_summoner_spells_${version}_${lang}`;
  
  // 1. Vérifier le cache
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  // 2. Fetch depuis Data Dragon
  console.log(`📡 Fetch summoner spells depuis Data Dragon (v${version})...`);
  const result = await axios.get(`${baseUrl}/${version}/data/${lang}/summoner.json`);
  const spells = Object.values(result.data.data);

  // 3. Sauvegarder dans le cache
  setCachedData(cacheKey, spells);

  return spells;
};

export default {
  fetchSummonerSpells
};
