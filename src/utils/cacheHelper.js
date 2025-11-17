const CACHE_DURATION = 24 * 60 * 60 * 1000;
const SEPARATOR = "___CACHE_TIMESTAMP___";

export const getCachedData = (key) => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) {
      console.log(`Pas de cache pour: ${key}`);
      return null;
    }
    const [dataString, timestampString] = cached.split(SEPARATOR);
    const timestamp = parseInt(timestampString, 10);
    
    const isValid = Date.now() - timestamp < CACHE_DURATION;

    if (!isValid) {
      console.log(`Cache expiré pour: ${key}`);
      localStorage.removeItem(key);
      return null;
    }
    console.log(`Cache valide pour: ${key}`);
    return JSON.parse(dataString);
  } catch (error) {
    console.error(`Erreur lecture cache pour ${key}:`, error);
    localStorage.removeItem(key); 
    return null;
  }
};


export const setCachedData = (key, data) => {
  try {
    const dataString = JSON.stringify(data);
    const timestamp = Date.now();
    const cacheValue = `${dataString}${SEPARATOR}${timestamp}`;

    localStorage.setItem(key, cacheValue);
    console.log(`Cache sauvegardé pour: ${key}`);
  } catch (error) {
    console.error(`Erreur sauvegarde cache pour ${key}:`, error);
  }
};


export const clearCache = (key) => {
  localStorage.removeItem(key);
  console.log(`🗑️ Cache supprimé pour: ${key}`);
};


export const clearAllCache = () => {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('lol_')) {
      localStorage.removeItem(key);
    }
  });
  console.log('Tout le cache a été supprimé');
};
