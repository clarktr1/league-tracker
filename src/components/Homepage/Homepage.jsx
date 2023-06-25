import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import SummonerSearch from "./SummonerSearch";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import yasuo from '../../assets/chibi_yas.png'

const api = import.meta.env.VITE_API_KEY
console.log(api)

const Homepage = () => {
    const [championList, setChampionList] = useState({});
    const [champRotation, setRotation] = useState([]);
    const [champData, setData] = useState([]);
    const access_key = 'RGAPI-346a9ab8-69a8-4f06-aacd-5e628207d037';

    async function getChampionData() {
        try {
          const response = await fetch(
            'https://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion.json'
          );
          const data = await response.json();
          setChampionList(data.data); 
 
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
      
    useEffect(() => {
        getChampionData()
    }, []);

    useEffect(() =>{
        getRotation()
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
                    <Grid item xs={2} key={champ}>
                    <Link
                    to={`/league-tracker/champions/${champData[champ].id}`} rel="noopener noreferrer" underline="none">
                        <img
                        src={`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/${champData[champ].id}.png`}
                        width={60}
                        ></img>
                    </Link>
                    </Grid>
                )
            })}
           </Grid>
        </Container>
    )
};

export default Homepage