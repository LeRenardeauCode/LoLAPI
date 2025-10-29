import axios from 'axios';

const baseUrl = 'https://ddragon.leagueoflegends.com/cdn';

const fetchSummonerSpells = async (version, lang = 'fr_FR') => {
  const result = await axios.get(`${baseUrl}/${version}/data/${lang}/summoner.json`);
  return Object.values(result.data.data);
};

export default {
    fetchSummonerSpells
}