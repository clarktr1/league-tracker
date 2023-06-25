import { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { Box, Container, Typography } from "@mui/material"
import ChampionHero from "./ChampionHero"
import ChampionSkill from "./ChampionSkill"

const ChampionPage = () => {
    const [champInfo, setChampInfo] = useState({})
    const { id } = useParams()
    console.log(champInfo)

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
                <ChampionHero champ={champInfo}/>
                <ChampionSkill spells={champInfo} id={id}/>
            </Container>
    )   
}

export default ChampionPage