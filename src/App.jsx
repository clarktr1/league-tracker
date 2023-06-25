import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavBar from './components/NavBar'
import Homepage from './components/Homepage/Homepage'
import Championlist from './components/Champion/ChampionList'
import ChampionPage from './components/Champion/ChampionPage'
import Footer from './components/Footer'
import bgvideo from './assets/magic.mp4'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const [user, isUser] = useState(false)
  const [name, setName] = useState(null)
  const [summonerLevel, setLevel] = useState(null)
  const [profileIcon, setIcon] = useState(null)

  const accessToken = 'RGAPI-ddf05cb7-3e8f-4876-b117-955b11a2d9de';
  const [summonerName, setSummoner] = useState('')
  
  const region = 'na1'; // Replace 'na1' with the appropriate region code
  
  async function fetchSummonerData() {
    console.log(summonerName)
    try {
      const response = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${accessToken}`);
      if (response.ok) {
        const summonerData = await response.json();
        const {name, id, summonerLevel, profileIconId} = summonerData
        setName(name)
        setLevel(summonerLevel)
        setIcon(`http://ddragon.leagueoflegends.com/cdn/11.20.1/img/profileicon/${profileIconId}.png`)

      } else {
        console.log('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };
  

  return (
    <>
      <Router>
          <NavBar />
          {/* <video id='background-video' autoplay loop muted>
            <source src={bgvideo} type='video/mp4'></source>
          </video> */}
            <div
                style={{
                width: '100vw',
                minHeight:'100vh',
                backgroundColor: '#010A13',
              }}>
            <Switch >
              <Route exact path="/league-tracker">
                <Homepage />
              </Route>
              <Route exact path="/league-tracker/champions">
                <Championlist />
              </Route>
              <Route exact path="/league-tracker/champions/:id">
                <ChampionPage />
              </Route>
            
            </Switch>
            </div>
            <Footer />
      </Router>
    </>
  )
}

export default App
