import { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { Box, Container, Typography } from "@mui/material"

const ChampionPage = () => {
    const [champInfo, setChampInfo] = useState({})


    const { id } = useParams()

    async function getChampion(){
        try {
            const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion/${id}.json`)
            const data = await response.json()
            setChampInfo(data.data[id])
           
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        getChampion();
        window.scrollTo(0, 0);
    }, [])

    return(
   
            <Container className="champion-container">
                <Box className="champion-image-container">
                <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`}
                alt={id}
                width={1017}
                height={517}
                className="champion-image"></img>
              <Box className="champion-title-container">
                    {champInfo.title && (
                        <Typography variant="span" className="champion-tag">
                            {champInfo.title.toUpperCase()}
                        </Typography>
                    )}
                    {champInfo.name && (
                        <Typography variant="h1" className="champion-title">
                            {champInfo.name.toUpperCase()}
                        </Typography>
                    )}
                </Box>
                </Box>
               
            </Container>
    )   
}

export default ChampionPage