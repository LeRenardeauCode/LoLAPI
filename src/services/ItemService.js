import axios from 'axios';

const baseUrl = 'https://ddragon.leagueoflegends.com/cdn';

const fetchItems = async (version, lang = 'fr_FR') => {
  const result = await axios.get(`${baseUrl}/${version}/data/${lang}/item.json`);
  return Object.entries(result.data.data).map(([id, item]) => ({ id, ...item }));
};

export default {
    fetchItems
}