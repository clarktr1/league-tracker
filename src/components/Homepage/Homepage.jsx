import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import SummonerSearch from "./SummonerSearch";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import yasuo from '../../assets/chibi_yas.png'

const api = import.meta.env.VITE_API_KEY


const Homepage = () => {
    const [championList, setChampionList] = useState({});
    const [champRotation, setRotation] = useState([]);
    const [champData, setData] = useState([]);
   

    async function getChampionData() {
        try {
          const response = await fetch(
            'https://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion.json'
          );
          const data = await response.json();
          setChampionList(data.data); 
          getRotation();
 
        } catch (error) {
          console.log(error);
        }
      }

    async function getRotation(){
        const response = await fetch(`https://na1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${api}`)
        const data = await response.json()
        setRotation(data.freeChampionIds)
        handleRotation()
    };

    async function handleRotation() {
        const champData = [];

        champRotation.forEach((id) => {
            const champion = Object.values(championList).find((champ) => champ.key == id);
            if (champion) {
              champData.push(champion);
            }
          });
        setData(champData)
      }


    useEffect(() =>{
      getChampionData()
    },[champData])


    return (
        <Container style={{display:'flex', flexDirection:'column'}}>
            <Box style={{margin:'0 auto', textAlign:'center', paddingTop:'3em'}}>
            <img
            src={yasuo}
            alt='Yasuo Logo'
            width={100}
            ></img>
            <SummonerSearch />
                <h2
                style={{fontFamily:'Beaufort', color:'#C8AA6E', textDecoration:'underline', textUnderlinePosition:'under'}}>
                Free Champion Rotation
               </h2>
            </Box>
            <Grid container columnSpacing={-20} rowGap={2} 
            style={{margin:'0 auto', padding:'4em'}}>
            {champData && Object.keys(champData).map((champ) => {
                return(
                    <Grid item xs={2.3} key={champ}>
                    <Link
                  
                    to={`/champions/${champData[champ].id}`} rel="noopener noreferrer" underline="none">
                    <img
                    src={`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/${champData[champ].id}.png`}
                    width={60}
                    style={{
                        border: '1px solid #C8AA6E',
                        display: 'block',
                        margin: '0 auto',
                        transition: 'transform 0.3s', // Add a smooth transition
                        '&:hover': {
                            transform: 'scale(1.2)',
                        },
                    }}
                    alt={champData[champ].name}
                    />

                    </Link>
                    </Grid>
                )
            })}
           </Grid>
        </Container>
    )
};

export default Homepage;
