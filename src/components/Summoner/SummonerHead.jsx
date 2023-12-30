import {useParams, Link, useHistory} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Typography, Box, Container, Card, Grid, Button, Paper } from '@mui/material'
import useSummonerRank from './SummonerHooks'

const boxStyle = {
    width: '100dvw',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '18dvh',
    backgroundColor: '#1E282D',
    padding: '2rem'
}
const accessToken = import.meta.env.VITE_API_KEY


const SummonerHead = ({self, icon}) => {
  const {region, id} = useParams()
  const history = useHistory();
  const [rank, setRank] = useState("")
  const ranks = ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'];
  const tiers = ['I', 'II', 'III', 'IV'];
  const [loading, setLoading] = useState(true);
  const [found, setFound] = useState(false);


  async function rankHelper(rank, tier) {
    try {
      const response = await fetch(`https://na1.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/${rank}/${tier}?page=1&api_key=${accessToken}`);
      const data = await response.json();
      data.forEach(user => {
        if(user.summonerId === self.id){
          setRank(user);
          setFound(true);
          setLoading(false);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }


  async function getRank() {
    for(let i = 0; i < ranks.length; i++){
      for(let j = 0; j < tiers.length; j++){
        await rankHelper(ranks[i], tiers[j]);
        await new Promise(resolve => setTimeout(resolve, 200));
        if(found){
          return;
        }
      }
    }
    
  }

    useEffect(() => {
        getRank();
    },[found,rank]);

  return(
    <>
    {loading ? <Typography>Loading...</Typography> :
    <Box style={boxStyle}>
    <Container style={{ position: 'relative', display:'flex' }}>
     <img src={icon} alt='icon' style={{width: '10rem', height: '10rem', borderRadius: '16px'}}/>
     <Paper
            style={{
            position: 'absolute',
            left: '6.5%',
            top: '93%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '2rem',
            width: '3rem',
            borderRadius: '8px', // Add border radius for a rounded look
            }}
        >             
        <Typography>{self.summonerLevel}</Typography>
     </Paper>
     <Container style={{marginLeft: '2rem'}}>
        <Typography variant='h4' style={{color: '#FFFFFF'}}>{self.name}</Typography>
        <Typography variant='h6' style={{color: '#FFFFFF'}}>{rank ? rank.tier + " " + rank.rank : "Unranked"}</Typography>
    </Container>
    </Container>

    </Box>
    }
    </>
  )
}

export default SummonerHead;