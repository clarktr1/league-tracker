import { Container, Grid, MenuItem, Button, Box } from "@mui/material"
import { Link } from 'react-router-dom'
import icon from "../assets/gold_icon.png"


const NavBar = () => {

    const pages = ['Champions', 'Summoner', 'Leaderboard']

    return (
        <Grid className="navbar" container spacing={5}>
            <Grid item xs={7}>
                <Box 
                className="navbar-logo-container">
                <Link
                style={{textDecoration:'none'}}
                to="/home">
                    <img width={'50px'} src={icon}></img>
                    <h2 className="title">eague Tracker</h2>
                </Link>
                </Box>
            </Grid>
            <Grid item xs={5}>
                <Box 
                className="navbar-item-container"
                >   
                 <Link
                className="navbar-item"
                to={'/'}
                sx={{ my: 2, color: '#C8AA6E', display: 'block' }}
                >
                    Home
                </Link>
                    {pages.map((page) => {
                        return(
                            <Link
                            key={page}
                            className="navbar-item"
                            to={'/' + page.toLowerCase()}
                            sx={{ my: 2, color: '#C8AA6E', display: 'block' }}
                            >
                                {page}
                            </Link>
                        )
                    })}
                </Box>
            </Grid>
        </Grid>
    )
}

export default NavBar