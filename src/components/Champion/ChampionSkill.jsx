import { Box, Typography, Container, Button } from "@mui/material";
import {useState, useEffect} from 'react'

const Description = ({spells, skill, passive}) => {

    useEffect(()=>{
        if(spells.length <= 6){
            spells.push(passive)
        }
    },[])

    return (
        <Box style={{marginTop:'7dvh'}}>
        {spells.map((spell) => {
            if(spell.name === skill && spell.cost){
            return(
            <Box key={spell.name}>
                <Typography style={{fontSize:'1.2em', textAlign:'left'}}>{spell.name}</Typography>
                <Typography style={{color:'#A09B8C', fontSize:'.8em', textAlign:'left'}}>Spell Cost: [{spell.cost + ""}]</Typography>
                <Typography style={{color:'#A09B8C', fontSize:'.8em', textAlign:'left'}}>Cooldown: [{spell.cooldown + ""}]</Typography>
                <Typography style={{color:'#C89B3C', textAlign:'left'}}>{spell.description}</Typography>
            </Box>
            )} else if (spell.name === skill) {
                return(
                    <Box key={spell.name}>
                    <Typography style={{fontSize:'1.2em', textAlign:'left'}}>{spell.name}</Typography>
                    <Typography style={{color:'#C89B3C', textAlign:'left'}}>{spell.description}</Typography>
                    </Box>
                )
            }
        })}
        </Box>
    )
}

const ChampionSkill = ({ id, spells: { passive, spells } }) => {
    const [selectedSkill, setSkill] = useState('')
    function changeSkill(name){
        setSkill(name)
    }
    if (passive && spells) {
        return (
            <Box style={{ width: '50dvw', border: '1px solid #fff', margin: '0 auto'}} >
               
                <Container style={{display:'flex', justifyContent:'space-around'}}>
                    <Box key={passive.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
                        <Button style={{display:'flex', flexDirection:'column',justifyContent:'flex-end', color:'#fff'}} onClick={(event) => changeSkill(event.target.id)}>
                            <Typography>{passive.name}</Typography>
                            <img id={passive.name} src={`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/passive/${passive.image.full}`} alt={passive.name} minwidth={50} minheight={50} />
                        </Button>
                        
                    </Box>
                    {spells.map((spell) => (
                        <Box key={spell.id} >
                            <Button style={{display:'flex', flexDirection:'column',justifyContent:'flex-end', color:'#fff'}} onClick={(event) => changeSkill(event.target.id) }>
                            <Typography>{spell.name}</Typography>
                            <img id={spell.name} src={`https://ddragon.leagueoflegends.com/cdn/13.12.1/img/spell/${spell.image.full}`} alt={spell.name} minwidth={50} minheight={50} />
                            </Button>
                        </Box>
                    ))}
                </Container>
                <Container>
                 <Description spells={spells} skill={selectedSkill} passive={passive} />
                 </Container>
            </Box>

        );
    } else {
        return (
            <Typography>Loading</Typography>
        );
    }
};

export default ChampionSkill;
