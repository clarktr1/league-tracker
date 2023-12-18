import {useParams, Link, useHistory} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Typography, Box, Container, Card, Grid, Button } from '@mui/material'
import SummonerHead from './SummonerHead';


const SummonerInfo = () => {
  const {region, id} = useParams()
  const history = useHistory(); 
  
const handleParticipantLinkClick = (summonerName) => {
  history.push(`/summoner/${region}/${summonerName}`);
};


  const accessToken = import.meta.env.VITE_API_KEY

  const [name, setName] = useState()
  const [icon, setIcon] = useState()
  const [level, setLevel] = useState()
  const [allMatch, setMatch] = useState([])
  const [selfData, setSelfData] = useState([])
  const [pid, setPID] = useState()
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState({})
  const [self, setSelf] = useState({})



async function fetchSummonerData() {
    try {
      const response = await fetch(
        `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${id}?api_key=${accessToken}`,
  
      );
      if (response.ok) {
        const summonerData = await response.json();
        const { name, summonerLevel, profileIconId, puuid } = summonerData;
        setSelf(summonerData);
        setName(name);
        setLevel(summonerLevel);
        setIcon(`http://ddragon.leagueoflegends.com/cdn/11.20.1/img/profileicon/${profileIconId}.png`);
        fetchMatchID(puuid)
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


async function fetchMatchID(puuid) {
    try {
      const response = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${accessToken}`,
   )
      if (response.ok) {
        const matchData = await response.json()
        setPID(puuid)
        fetchMatchData(matchData)
       
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function fetchMatchData(ids) {
    const matchArr = [];
    try {
      for (const id of ids) {
        const response = await fetch(
          `https://americas.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${accessToken}`,
   
        );
        const matchData = await response.json();
        matchArr.push(matchData.info)
        setMatch(matchArr)
        setLoading(false);
      }
      
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  async function fetchItemData(){
    try {
      const response = await fetch('http://ddragon.leagueoflegends.com/cdn/13.13.1/data/en_US/item.json')
      if (response.ok){
        const data = await response.json()
        setItems(data.data)
        
  
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    fetchItemData()
    console.log(items)
  }, [])

  useEffect(() => {
    setLoading(true); 
    fetchSummonerData();
    
  }, [id])

  useEffect(() => {
    if (pid) {
      fetchMatchData(selfData);
    }
  }, [pid]);

  const [showDialog, setShowDialog] = useState(false);
  const [dialogItem, setDialogItem] = useState(null);

  const handleMouseEnter = (index) => {
    setShowDialog(true);
    setDialogItem(items[self[`item${index}`]]);
  };

  const handleMouseLeave = () => {
    setShowDialog(false);
    setDialogItem(null);
  };



  // return(
  //   <>
  //     <SummonerHead self={self} icon={icon}/> 
  //   </>
  //)
  return (
       <Box style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'100dvw'}}>
         <SummonerHead self={self} icon={icon}/> 
        {allMatch ? (
          allMatch.map((game) => {
            const participants = game.participants;
            const self = participants.find((p) => p.puuid === pid);
            
    
            if (self) {
          
              return (
                <Card key={Math.random()} style={{ maxWidth: '50dvw', background:'#091428', padding:'2em', margin:'0 auto'}}>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <Link to={`/league-tracker/champions/${self.championName}`}>
                      <img
                        src={`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${self.championName}.png`}
                        alt=""
                        width={80}
                      />
                      </Link>
                      <Typography style={{color:'#aaa'}}>{game.gameMode}</Typography>
                      <Typography style={{color:'#fff'}}>K/D/A: <span style={{color:'#C89B3C'}}>{self.kills}/{self.deaths}/{self.assists}</span></Typography>
                      {self.win === true ? <Typography style={{color:'#0397AB'}}>Win</Typography> : <Typography style={{color:'red'}}>Loss</Typography>}
                    </Grid>
    
                    <Grid item xs={4}>
                      <Grid container spacing={2}>
                        {Array.from(Array(6), (_, index) => (
                          <Grid item xs={4} key={index}>
                            {self[`item${index}`] ? (
                              <div
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                                style={{ position: 'relative' }}
                              >
                                <img
                                  src={`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/item/${self[`item${index}`]}.png`}
                                  alt={self[`item${index}`]}
                                  width={38}
                                />
                                {items[self[`item${index}`]] && items[self[`item${index}`]].name ? (
                                  <p style={{ color: 'white', fontSize: '12px' }}>{items[self[`item${index}`]].name}</p>
                                ) : null}
                                {showDialog && dialogItem && (
                                  <div
                                    style={{
                                      position: 'absolute',
                                      top: '100%',
                                      left: '50%',
                                      transform: 'translate(-50%, 0)',
                                      background: 'black',
                                      color: 'white',
                                      padding: '4px',
                                    }}
                                  >
                                    <p>{dialogItem.name}</p>
                                    <p>{dialogItem.plaintext}</p>
                                  </div>
                                )}
                              </div>
                            ) : null}
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                        
                    <Grid item xs={6}>
                      <Grid container columnSpacing={4} spacing={1} sx={{ textAlign: 'left' }}>
                        {participants.map((participant, index) => (
                          <Grid item xs={6} key={index} >
                            {participant.summonerName === self.summonerName ? (
                              <Typography style={{ color: 'red', fontSize:'.9em' }}>
                                <img
                                src={`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${self.championName}.png`}
                                alt=""
                                width={30}
                                />
                              {participant.summonerName}
                              </Typography>
                            ) : (
                            <Link
                              className='participants'
                              to={`/summoner/${region}/${participant.summonerName}`}
                              style={{ fontSize: '.9em', color: '#fff', textDecoration: 'none' }}
                              onClick={() => handleParticipantLinkClick(participant.summonerName)}
                            >
                            <img
                            src={`http://ddragon.leagueoflegends.com/cdn/13.13.1/img/champion/${participant.championName}.png`}
                            alt=""
                            width={30}
                          />
                              {participant.summonerName}
                            </Link>
                            )}
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                    
                  </Grid>
                </Card>
              );
            }
          })
        ) : null}
      </Box>
    );
};

export default SummonerInfo