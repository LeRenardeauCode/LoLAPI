// ChampionService.js
import axios from 'axios';
import { getCachedData, setCachedData } from '../utils/cacheHelper';

const baseUrl = 'https://ddragon.leagueoflegends.com/cdn';

const fetchLatestVersion = async () => {
  const cacheKey = 'lol_latest_version';
  
  // 1. Vérifier le cache
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return { data: [cachedData] };
  }

  // 2. Fetch depuis Data Dragon
  console.log('Fetch version depuis Data Dragon...');
  const response = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
  const latestVersion = response.data[0];

  // 3. Sauvegarder dans le cache
  setCachedData(cacheKey, latestVersion);

  return response;
};

const fetchChampions = async (version, lang = 'fr_FR') => {
  const cacheKey = `lol_champions_${version}_${lang}`;
  
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  console.log(`Fetch champions depuis Data Dragon (v${version})...`);
  const result = await axios.get(`${baseUrl}/${version}/data/${lang}/champion.json`);
  const champions = Object.values(result.data.data);

  setCachedData(cacheKey, champions);

  return champions;
};

const fetchChampionById = async (version, id, lang = 'fr_FR') => {
  const cacheKey = `lol_champion_${id}_${version}_${lang}`;
  
  const cachedData = getCachedData(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  console.log(`Fetch champion ${id} depuis Data Dragon (v${version})...`);
  const result = await axios.get(`${baseUrl}/${version}/data/${lang}/champion/${id}.json`);
  const champion = Object.values(result.data.data)[0];

  setCachedData(cacheKey, champion);

  return champion;
};

export default {
  fetchLatestVersion,
  fetchChampions,
  fetchChampionById
};
