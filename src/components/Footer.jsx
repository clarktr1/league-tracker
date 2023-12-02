

import { Grid, Box, Container } from "@mui/material"
import logo from '../assets/gold_logo.png'

const Footer = () => {


    return(
        <Box className='footer'>
            <img src={logo} width={100}></img>
            <p>This is a personal project and is no way associated with Riot Games or League of Legends. All assets are property of Riot Games or League of Legends and are used solely for the purpose to proof of concept.</p>
        </Box>
    )
}

export default Footer