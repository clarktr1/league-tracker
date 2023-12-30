import { useState, useEffect } from 'react';

const useSummonerRank = (id, rankTiers, divisions, accessToken) => {
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRank = async () => {
      for (const tier of rankTiers) {
        for (const division of divisions) {
          let data = null;
          try {
            const response = await fetch(`https://na1.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/${tier}/${division}?page=1&api_key=${accessToken}`);
            data = await response.json();
          } catch (error) {
            console.log(error);
            setLoading(false);
            return;
          }

          const foundChamp = data.find(champ => champ.summonerName === id);

          if (foundChamp) {
            setRank(foundChamp);
            console.log('found');
            setLoading(false);
            return;
          }
        }
      }

      console.log('not found');
      setLoading(false);
    };

    getRank();
  }, [id, rankTiers, divisions, accessToken]);

  return { rank, loading };
};

export default useSummonerRank;
