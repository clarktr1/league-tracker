import { useState, useEffect } from 'react'
import { Box, Container, Grid } from '@mui/material'
import MatchBox from '../Summoner/MatchBox'

const SummonerSearch = () => {
  const [user, isUser] = useState([])
  const [name, setName] = useState(null)
  const [summonerLevel, setLevel] = useState(null)
  const [profileIcon, setIcon] = useState(null)
  const [region, setRegion] = useState('NA1')
  const [puuid, setPuuid] = useState(null)
  const accessToken = 'RGAPI-6e93b529-7569-417a-84a9-4bcedf1ef817'
  const [summonerName, setSummoner] = useState('')
  const [match, setMatch] = useState(false)
  const [matchUser, setMatchUser] = useState(null)

  async function fetchSummonerData() {
    try {
      const response = await fetch(
        `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${accessToken}`
      )
      if (response.ok) {
        const summonerData = await response.json()
        const { name, id, summonerLevel, profileIconId, puuid } = summonerData
        fetchMatchData(puuid)
        setName(name)
        setLevel(summonerLevel)
        setIcon(`http://ddragon.leagueoflegends.com/cdn/11.20.1/img/profileicon/${profileIconId}.png`)
      } else {
        console.log('Error:', response.status, response.statusText)
      }
    } catch (error) {
      setName(false)
      setLevel(null)
      setIcon(null)
      console.log('Error:', error.message)
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

  return (
    <Container>
      <Box>
        <select value={region} onChange={(event) => setRegion(event.target.value)}>
          <option value="NA1">NA 1</option>
          <option value="EUW1">EU West 1</option>
          <option value="EUN1">EU North 1</option>
        </select>
        <input onChange={(event) => setSummoner(event.target.value)} />
        <button onClick={fetchSummonerData}>Click Here to Get Account Data</button>
        {name ? (
          <div className="card">
            <p>Name: {name}</p>
            <p>Level: {summonerLevel}</p>
            <img src={profileIcon} alt="Profile Icon" style={{ borderRadius: '50%', width: 100, height: 100 }} />
          </div>
        ) : name === false ? (
          <p>No user found.</p>
        ) : null}
      </Box>
      {match && matchUser ? (
        <Box>
          <MatchBox user={matchUser} />
        </Box>
      ) : null}
    </Container>
  )
}

export default SummonerSearch
