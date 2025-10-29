import axios from 'axios';

const baseUrl = 'https://ddragon.leagueoflegends.com/cdn';

const fetchRunes = async (version, lang = 'fr_FR') => {
  const result = await axios.get(`${baseUrl}/${version}/data/${lang}/runesReforged.json`);
  return result.data;
};

export default {
    fetchRunes
}