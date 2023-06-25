import { Box, Typography } from "@mui/material"

const ChampionHero = ({champ:{name, title, id}}) => {
    return (
        <Box className="champion-image-container">
        <img
        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`}
        alt={id}
        width={1017}
        height={517}
        className="champion-image"></img>
            <Box className="champion-title-container">
                {title && (
                    <Typography variant="span" className="champion-tag">
                        {title.toUpperCase()}
                    </Typography>
                )}
                {name && (
                    <Typography variant="h1" className="champion-title">
                        {name.toUpperCase()}
                    </Typography>
                )}
            </Box>
        </Box>
    )
}

export default ChampionHero