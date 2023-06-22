import {useState, useEffect} from 'react'
import { Box, Container, Grid } from '@mui/material'

const MatchBox = (props) => {
    const [champion, setChampion] = useState('')
    const [items, setItems] = useState([])
  
    const user = props.user
  
    
    useEffect(() => {
      setChampion(props.user.championName)
      setItems([user.item1, user.item2, user.item3, user.item4, user.item5, user.item6])
  
  
    }, [props.user])
    return (
      <Grid
      container
      style={{
        border:'1px solid black',
        backgroundColor:'#0A323C',
        width: '60%'
      }}>

        <Grid xs={2}>
        <img src={`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/champion/${champion}.png`} alt={champion} />
        <p>{props.win ? 'Win' : 'Loss'}</p>
        </Grid>

        <Grid
          item
          xs={4}
          style={{
            display: 'flex',
            alignSelf:'start',
            flexWrap:'wrap',

            padding:'1em'
          }}>
        {items.map((item)=>{
          return(
            <Grid item xs={4}>
              <img
              key={item} 
              src={`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/item/${item}.png`}
              style={{width:40}}
              > 
              </img>
            </Grid>
            )
          })}
        
        </Grid>
      </Grid>
    )
  }

  export default MatchBox