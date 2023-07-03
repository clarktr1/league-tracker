import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavBar from './components/NavBar'
import Homepage from './components/Homepage/Homepage'
import Championlist from './components/Champion/ChampionList'
import ChampionPage from './components/Champion/ChampionPage'
import SummonerInfo from './components/Summoner/SummonerInfo'
import Footer from './components/Footer'
import bgvideo from './assets/magic.mp4'
import './App.css'


function App() {
  
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
              <Route exact path="/league-tracker/">
                <Homepage />
              </Route>
              <Route exact path="/league-tracker/champions">
                <Championlist />
              </Route>
              <Route exact path="/league-tracker/champions/:id">
                <ChampionPage />
              </Route>
              <Route path='/league-tracker/:region/:id'>
                <SummonerInfo />
              </Route>
            </Switch>
            </div>
            <Footer />
      </Router>
    </>
  )
}

export default App
