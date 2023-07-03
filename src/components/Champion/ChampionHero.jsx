import { Box, Typography } from "@mui/material";

const ChampionHero = ({ champ: { name, title, id, tags, lore } }) => {
  return (
    <Box className="champion-image-container">
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`}
        alt={id}
        width={1017}
        height={517}
        className="champion-image"
      />
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
        {tags && (
          <Box className="champion-tags">
            {tags.map((tag, index) => (
              <Typography variant="span" key={index} style={{fontFamily:'Beaufort'}}>
                {tag.toUpperCase() + " "}
              </Typography>
            ))}
          </Box>
        )}
        {lore && (
            <Box style={{margin:'1em auto', width:'80dvh', textAlign:'center'}}>
                <Typography variant="span" style={{fontFamily:'Beaufort', fontSize:'.9em'}}>
                {lore}
                 </Typography>
            </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChampionHero;
