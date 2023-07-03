import { Box, Typography, Container, Button } from "@mui/material";
import {useState, useEffect} from 'react'

const Description = ({ skill }) => {


    return (
        <>
            <Box style={{margin:'7dvh 0', paddingLeft:'1em'}}>
                { skill &&
                    <Box>
                        {skill.name ?   <Typography style={{fontSize:'1.2em', textAlign:'left'}}>{skill.name}</Typography>: null}
                        {skill.cost ? <Typography style={{color:'#A09B8C', fontSize:'.8em', textAlign:'left'}}>Spell Cost: [{skill.cost + ""}]</Typography> : null}
                        {skill.cooldown ? <Typography style={{color:'#A09B8C', fontSize:'.8em', textAlign:'left'}}>Cooldown: [{skill.cooldown + ""}]</Typography> : null}
                        <Typography style={{ color: '#C89B3C', textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: skill.description }}></Typography>
                    </Box>   
                }   
            </Box>
        </>
    )
}

const ChampionSkill = ({ spells: { passive, spells } }) => {
    const [selectedSkill, setSkill] = useState()
    
    function changeSkill(name){
        setSkill(name)
        console.log(name)
    }

    if (passive && spells) {
        return (
            <Box style={{ width: '50dvw',margin: '0 auto'}} >
               <Typography style={{ marginBottom:20, color:'#C8AA6E', fontFamily:'Beaufort', fontSize:'1.8em'}}>Skills</Typography>
                <Container style={{display:'flex', justifyContent:'space-around', padding:0}}>
                    <Box>
                        <Button onClick={() => changeSkill(passive)}>
                            <img src={`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/passive/${passive.image.full}`} alt={passive.name} minwidth={50} minheight={50} />
                        </Button>
                        
                    </Box>
                    {spells.map((spell) => (
                        <Box key={spell.name}>
                            <Button style={{ display: 'flex', flexDirection: 'column', color: '#fff', alignItems: 'center' }} onClick={() => changeSkill(spell)}>
                      
                            <img src={`https://ddragon.leagueoflegends.com/cdn/13.12.1/img/spell/${spell.image.full}`} alt={spell.name} style={{ minWidth: 50, minHeight: 50, marginTop: 'auto'  }} />
                            </Button>
                        </Box>
                    ))}


                </Container>
                <Container>
                    <Description  skill={selectedSkill} />
                </Container>
                <Container>
                    <Typography style={{ marginBottom:20, color:'#C8AA6E', fontFamily:'Beaufort', fontSize:'1.8em'}}>Builds</Typography>
                    <Typography>Builds coming soon!</Typography>
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
