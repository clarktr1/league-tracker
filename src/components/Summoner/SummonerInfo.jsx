async function fetchSummonerData() {
    try {
      const response = await fetch(
        `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${accessToken}`
      );
      if (response.ok) {
        const summonerData = await response.json();
        const { name, id, summonerLevel, profileIconId, puuid } = summonerData;
        fetchMatchData(puuid);
        setName(summonerData.name); // Fixed line
        setLevel(summonerLevel);
        setIcon(`http://ddragon.leagueoflegends.com/cdn/11.20.1/img/profileicon/${profileIconId}.png`);
      } else {
        console.log('Error:', response.status, response.statusText);
      }
    } catch (error) {
      setName(false);
      setLevel(null);
      setIcon(null);
      console.log('Error:', error.message);
    }
  }


async function fetchMatchData(puuid) {
    try {
      const response = await fetch(
        `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${accessToken}`,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.43',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
            Origin: 'https://developer.riotgames.com',
          },
        }
      )
      if (response.ok) {
        const matchData = await response.json()
        console.log(matchData[0])
        fetchOneMatchData(matchData[0], puuid)
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function fetchOneMatchData(id, puuid) {
    try {
      const response = await fetch(
        `https://americas.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${accessToken}`
      )
      const oneMatchData = await response.json()
      const { participants } = oneMatchData.info

      for (let i = 0; i < participants.length; i++) {
        if (participants[i].puuid !== puuid) {
          console.log('not participant ' + i)
        } else {
          setMatch(true)
          const matchUser = participants[i]
          setMatchUser(matchUser)
          return
        }
      }
    } catch (error) {
      console.error(error)
    }
  }