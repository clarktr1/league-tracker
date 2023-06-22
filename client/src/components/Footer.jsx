

import { Grid, Box, Container } from "@mui/material"
import logo from '../assets/gold_logo.png'

const Footer = () => {


    return(
        <Box className='footer'>
            <img src={logo} width={100}></img>
            <p>This is a personal project and is no way associated with Riot Game or League of Legends. </p>
        </Box>
    )
}

export default Footer