import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Grid, Card, CardMedia, Typography, Box, Icon } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


const ChampionList = () => {
  const [championList, setChampionList] = useState(null);
  const [searchChamp, setSearch] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

 async function getChampionData() {
    try {
      const response = await fetch(
        'https://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion.json'
      );
      const data = await response.json();
      setChampionList(data.data); 
      champSearch();
    } catch (error) {
      console.log(error);
    }
  }

  function champSearch() {
    if (searchChamp && championList) {
      const formattedSearchChamp = searchChamp.toLowerCase();
      const filteredChampions = Object.keys(championList).filter(champ =>
        champ.toLowerCase().includes(formattedSearchChamp)
      );
      setSearchResults(filteredChampions.map(champ => championList[champ].id));
    } else {
      setSearchResults([]);
    }
  }

  // useEffect(() => {
  //   champSearch();
  // }, [searchChamp, championList]);

  useEffect(() => {
    getChampionData();
  }, []);
  return (
    <>
    <Box style={{textAlign:'center', fontFamily:'Beaufort', width: '50vw', margin:'0 auto' }}>
      <h1
      style={{paddingTop:'3em', margin:0, color:'#C8AA6E', textDecoration:'underline', textUnderlinePosition:'under'}}>Champion List</h1>
      <Box>
      <SearchIcon 
      style={{position:'relative', left:'30px', top:'8px'}}/>
      <input className="champion-search" onChange={(e) => {setSearch(e.target.value);}}></input>
      </Box>
    </Box>
    <Grid container spacing={0} rowGap={6} sx={{margin:'0 auto', padding:'3em 0'}} id='champ-grid'>

    {searchResults.length > 0 ? (
  searchResults.map((champion) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={championList[champion].id} className="champ-container">
      <Card className='champion-card' sx={{ width: '192px', height: '282px', position: 'relative', overflow: 'hidden' }}>
        <Link to={`/league-tracker/champions/${championList[champion].id}`} rel="noopener noreferrer" underline="none">
          <div
            className="image-container"
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championList[champion].id}_0.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Card variant="subtitle2" align="left" sx={{ position: 'absolute', bottom: 0, width: '100%', bgcolor: '#005A82', color: '#fff', padding: '8px 13px' }}>
            <Typography className='subtitle'>{championList[champion].name}</Typography>
          </Card>
        </Link>
      </Card>
    </Grid>
  ))
) : (
  searchChamp && searchResults.length === 0 ? (
    <Box style={{height:'80vh', textAlign:'center', width:'100vw'}}>
        <Typography style={{fontFamily:'Beaufort'}}> Nothing found. Try a different name.</Typography>
    </Box>
  
  ) : (
    championList && Object.keys(championList).map((champion) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={championList[champion].id} className='champ-container'>
        <Card className='champion-card' sx={{ width: '192px', height: '282px', position: 'relative', overflow: 'hidden' }}>
          <Link to={`/league-tracker/champions/${championList[champion].id}`} rel="noopener noreferrer" underline="none">
            <div
              className="image-container"
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championList[champion].id}_0.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <Card variant="subtitle2" align="left" sx={{ position: 'absolute', bottom: 0, width: '100%', bgcolor: '#005A82', color: '#fff', padding: '8px 13px' }}>
              <Typography className='subtitle'>{championList[champion].name}</Typography>
            </Card>
          </Link>
        </Card>
      </Grid>
    ))
  )
)}

    </Grid>
    </>
  );
  
};

export default ChampionList;
