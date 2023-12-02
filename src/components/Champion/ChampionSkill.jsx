import { Box, Typography, Container, Button } from "@mui/material";
import {useState, useEffect} from 'react'

const Description = ({ skill, skillL }) => {
    return (
        <>
            <Box style={{}}>
                { skill &&
                    <Box>
                        {skill.name ?   <Typography style={{fontSize:'1.2em', textAlign:'left'}}>{skill.name} ({skillL === "P" ? ("Passive"): skillL})</Typography>: null}
                        {skill.cost ? <Typography style={{color:'#A09B8C', fontSize:'.8em', textAlign:'left'}}>Spell Cost: [{skill.cost + ""}]</Typography> : null}
                        {skill.cooldown ? <Typography style={{color:'#A09B8C', fontSize:'.8em', textAlign:'left'}}>Cooldown: [{skill.cooldown + ""}]</Typography> : null}
                        <Typography style={{ color: '#C89B3C', textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: skill.description }}></Typography>
                    </Box>   
                }   
            </Box>
        </>
    )
}

const ChampionSkill = ({ spells: { passive, spells, key, name }}) => {
    const [selectedSkill, setSkill] = useState();
    const [skillL, setSkillL] = useState("P");
    
    //spells.push(passive);
    

    function changeSkill(name){
        setSkill(name)
        handleSkill(name.id);
    }

    function handleSkill(id){
       for(let i = 0; i < spells.length; i++){
           if(spells[i].id === id){
               if(i === 0){
                setSkillL("Q");
               } else if (i === 1){
                setSkillL("W");
               } else if (i === 2){
                setSkillL("E");
               } else if (i === 3){
                setSkillL("R");
               } return;
           }
       }
        setSkillL("P");
        return;
    }

    function formatID(id){
        let idStr = id + "";
        while(idStr.length < 4){
            idStr = "0" + idStr;
        }
        return idStr;
    }

    useEffect(() => {
        setSkill(passive);
    }, [passive])

    if (passive && spells) {
        return (
            <Box style={{ display:"flex", justifyContent:"center", flexDirection:"column", width: '80dvw'}} >
               <Typography style={{ marginBottom:20, color:'#C8AA6E', fontFamily:'Beaufort', fontSize:'1.8em'}}>Skills</Typography>
                    <Container style={{display:"flex"}}>
                        <Container style={{width: "50%", margin: 0}}>
                            <Container style={{display:'flex', justifyContent:"space-between", padding:0, margin:0}}>
                                <Box>
                                    <Button onClick={() => changeSkill(passive)}>
                                        <img src={`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/passive/${passive.image.full}`} alt={passive.name} minwidth={50} minheight={50} style={{ border:"1px solid #C8AA6E", transform: selectedSkill === passive? "scale(1.3,1.4)" : null}} />
                                    </Button> 
                                </Box>
                                {spells.map((spell) => (
                                    <Box key={spell.name}>
                                        <Button  onClick={() => changeSkill(spell)}>
                                        <img src={`https://ddragon.leagueoflegends.com/cdn/13.12.1/img/spell/${spell.image.full}`} alt={spell.name} style={{ border:"1px solid #C8AA6E", minWidth: 50, minHeight: 50, marginTop: 'auto',  transform: selectedSkill === spell? "scale(1.3,1.4)" : null }} />
                                        </Button>
                                    </Box>
                                ))}
                            </Container>
                            <Container style={{display: "flex", paddingTop: "3em", margin: 0, width:"30dvw"}}>
                                <Description skill={selectedSkill} skillL={skillL} />  
                                    {/* <source src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${formatID(key)}/ability_${formatID(key)}_${skillL}1.webm`} type="video/webm" />
                                    <source src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${formatID(key)}/ability_${formatID(key)}_${skillL}1.mp4`} type="video/mp4" /> */}
                            </Container>      
                        </Container>
                        <Container style={{width: "50%"}}>
                            <video autoPlay loop muted width={560} height={315} src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${formatID(key)}/ability_${formatID(key)}_${skillL}1.webm`}></video>
                        </Container>
                    </Container>
               
                <Container style={{marginTop:"6em"}}>
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
