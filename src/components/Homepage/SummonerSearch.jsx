import { useState, useEffect } from 'react'
import { Box, Container, Grid, Button } from '@mui/material'
import { Link } from 'react-router-dom'


const SummonerSearch = () => {
  const [name, setName] = useState('')
  const [region, setRegion] = useState('NA1')



  return (
    <Container>
      <Box id='summoner-search' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '4em ', width: '40vw' }}>
        <form id="summoner-search-bar">
          <select style={{
            color: '#C8AA6E',
            backgroundColor: '#091A29',
            borderRadius: '8px',
            border: '1px solid #e2a222',
            padding: '10px 15px',
            fontSize: '16px',
            width: '150px',
            marginRight: '10px'
          }} value={region} onChange={(event) => setRegion(event.target.value)}>
            <option value="na1">NA 1</option>
            <option value="euw1">EU West 1</option>
            <option value="eun1">EU North 1</option>
          </select>
          <input placeholder='Search' value={name} className='champion-search' onChange={(event) => setName(event.target.value)} style={{
            color: '#C8AA6E',
            backgroundColor: '#010A13',
            border: '1px solid #e2a222',
            borderRadius: '8px',
            padding: '10px 15px',
            fontSize: '16px'
          }} />
          <Button variant='contained' className='btn'>
            <Link to={`/summoner/${region}/${name}`} style={{ textDecoration: 'none', color: '#e2a222' }}>Search</Link>
          </Button>

        </form>
      </Box>
    </Container>
  )
}

export default SummonerSearch

