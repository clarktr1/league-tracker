import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Grid, Card, CardMedia, Typography } from '@mui/material';

const ChampionList = () => {
  const [championList, setChampionList] = useState(null);

  async function getChampionData() {
    try {
      const response = await fetch(
        'http://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion.json'
      );
      const data = await response.json();
      setChampionList(data.data); 
      console.log(data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getChampionData();

  }, []);
  return (
    <>
    <h1
    style={{paddingTop:'3em', margin:0, textAlign:'center', fontFamily:'Beaufort', color:'#C8AA6E', textDecoration:'underline', textUnderlinePosition:'under'}}>Champion List</h1>
    <Grid container spacing={0} rowGap={6} sx={{margin:'0 auto', padding:'3em 0'}} id='champ-grid'>
      {championList && Object.keys(championList).map((champion) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={championList[champion].id}
        className='champ-container'>
  
            <Card
            className='champion-card'
            sx={{ width: '192px', height: '282px', position: 'relative', overflow: 'hidden' }}>
            <Link
            to={`/champions/${championList[champion].id}`}
            rel="noopener noreferrer"
            underline="none"
          >
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
                <Card variant="subtitle2" align="left" sx={{position: 'absolute', bottom: 0, width: '100%', bgcolor: '#005A82', color: '#fff', padding: '8px 13px' }}>
                  <Typography className='subtitle'>{championList[champion].name}</Typography>
                </Card>
              </Link>
            </Card>
         
        </Grid>
      ))}
    </Grid>
    </>
  );
  
};

export default ChampionList;
