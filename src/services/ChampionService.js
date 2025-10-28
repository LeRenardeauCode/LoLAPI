import axios from 'axios';

const baseUrl = 'https://ddragon.leagueoflegends.com/cdn';

const fetchLatestVersion = () => {
  return axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
};

const fetchChampions = async (version, lang = 'fr_FR') => {
  const result = await axios.get(`${baseUrl}/${version}/data/${lang}/champion.json`);
  return Object.values(result.data.data); 
};

export default {
  fetchLatestVersion,
  fetchChampions,
};