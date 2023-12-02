import { Box, Typography, Container, Button } from '@mui/material';
import { useState, useEffect, useRef } from 'react';

// this can be in its own css file
// this is for a transisiton to look more like the LoL champion page
// but you can get rid of this and list change from opacitiy to display
// display: none and display: block will work in the same way
// just without a transition
const videoStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    transition: 'opacity 0.6s ease-in-out',
};

const Description = ({ skill, skillL }) => {
	return (
		<>
			<Box style={{}}>
				{skill && (
					<Box>
						{skill.name ? (
							<Typography style={{ fontSize: '1.2em', textAlign: 'left' }}>
								{skill.name} ({skillL === 'P' ? 'Passive' : skillL})
							</Typography>
						) : null}
						{skill.cost ? (
							<Typography
								style={{
									color: '#A09B8C',
									fontSize: '.8em',
									textAlign: 'left',
								}}
							>
								Spell Cost: [{skill.cost + ''}]
							</Typography>
						) : null}
						{skill.cooldown ? (
							<Typography
								style={{
									color: '#A09B8C',
									fontSize: '.8em',
									textAlign: 'left',
								}}
							>
								Cooldown: [{skill.cooldown + ''}]
							</Typography>
						) : null}
						<Typography
							style={{ color: '#C89B3C', textAlign: 'left' }}
							dangerouslySetInnerHTML={{ __html: skill.description }}
						></Typography>
					</Box>
				)}
			</Box>
		</>
	);
};

const ChampionSkill = ({ spells: { passive, spells, key, name } }) => {
	// changed the name of the state because I kept using skillL incorrectly
	const [selectedSkillLetter, setSelectedSkillLetter] = useState('P');
	// useRef to store the video elements
	const videoRefs = useRef({});

	// useEffect to autoplay the passive video on load
	useEffect(() => {
		// also waits to make sure the key is passed down correctly
		// and waits for it if there is a holdup
		if (!key) {
			console.log('waiting for key');
			return;
		}

		// default to passive
		setSelectedSkillLetter('P');
		// autoplay the passive video
		playVideo('P');
	}, [passive, key]);

	// refactored the changeSkill function to be more concise
	const changeSkill = (skill) => {
		const skillLetter =
			skill === passive ? 'P' : ['Q', 'W', 'E', 'R'][spells.indexOf(skill)];
		setSelectedSkillLetter(skillLetter);
		playVideo(skillLetter);
	};

	// makes sure the video on plays when the video is displayed and pauses when it is not
	const playVideo = (skillLetter) => {
		Object.keys(videoRefs.current).forEach((letter) => {
			const video = videoRefs.current[letter];
			if (letter === skillLetter) {
				// checkis if the video can be played
				if (video.readyState >= 3) {
					video.play().catch((e) => console.error('cant play video', e));
				} else {
					video.addEventListener('canplay', () => video.play(), { once: true });
				}
			} else {
				video.pause();
				video.currentTime = 0;
			}
		});
	};

	// formats the id to be 4 digits long
	const formatID = (id) => {
		let idStr = id + '';
		while (idStr.length < 4) {
			idStr = '0' + idStr;
		}
		return idStr;
	};

	// gets the current skill based on the letter
	const getSkillByLetter = (letter) => {
		if (letter === 'P') return passive;
		const index = ['Q', 'W', 'E', 'R'].indexOf(letter);
		return spells[index];
	};

	// sets the selected skill based on the letter
	const selectedSkill = getSkillByLetter(selectedSkillLetter);

	// if passive or spells is not defined, return loading
	if (!passive || !spells) {
		return <Typography>Loading...</Typography>;
	}

	return (
		<Box
			style={{
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
				width: '80vw',
			}}
		>
			<Typography
				style={{
					marginBottom: 20,
					color: '#C8AA6E',
					fontFamily: 'Beaufort',
					fontSize: '1.8em',
				}}
			>
				Skills
			</Typography>
			<Container style={{ display: 'flex' }}>
				<Container style={{ width: '50%', margin: 0 }}>
					<Container
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							padding: 0,
							margin: 0,
						}}
					>
						<Box>
							<Button onClick={() => changeSkill(passive)}>
								<img
									src={`http://ddragon.leagueoflegends.com/cdn/13.12.1/img/passive/${passive.image.full}`}
									alt={passive.name}
									style={{
										minWidth: 50,
										minHeight: 50,
										border: '1px solid #C8AA6E',
										transform:
											selectedSkillLetter === 'P' ? 'scale(1.3,1.4)' : null,
									}}
								/>
							</Button>
						</Box>
						{spells.map((spell, index) => (
							<Box key={spell.name}>
								<Button onClick={() => changeSkill(spell)}>
									<img
										src={`https://ddragon.leagueoflegends.com/cdn/13.12.1/img/spell/${spell.image.full}`}
										alt={spell.name}
										style={{
											minWidth: 50,
											minHeight: 50,
											border: '1px solid #C8AA6E',
											transform:
												selectedSkillLetter === ['Q', 'W', 'E', 'R'][index]
													? 'scale(1.3,1.4)'
													: null,
										}}
									/>
								</Button>
							</Box>
						))}
					</Container>
					<Container
						style={{
							display: 'flex',
							paddingTop: '3em',
							margin: 0,
							width: '30vw',
						}}
					>
						<Description skill={selectedSkill} skillL={selectedSkillLetter} />
					</Container>
				</Container>
				<Container style={{ width: '50%' }}>
					<div
						style={{ position: 'relative', width: '560px', height: '315px' }}
					>
						{['P', 'Q', 'W', 'E', 'R'].map((letter) => (
							<video
								key={letter}
								ref={(el) => (videoRefs.current[letter] = el)}
								loop
								muted
								preload="auto"
								width="560"
								height="315"
								src={`https://d28xe8vt774jo5.cloudfront.net/champion-abilities/${formatID(
									key
								)}/ability_${formatID(key)}_${letter}1.webm`}
								style={{
									...videoStyle,
                                    // this is whereyou would change the opacity to display if you dont want the transition
									opacity: selectedSkillLetter === letter ? 1 : 0,
								}}
							></video>
						))}
					</div>
				</Container>
			</Container>
			<Container style={{ marginTop: '6em' }}>
				<Typography
					style={{
						marginBottom: 20,
						color: '#C8AA6E',
						fontFamily: 'Beaufort',
						fontSize: '1.8em',
					}}
				>
					Builds
				</Typography>
				<Typography>Builds coming soon!</Typography>
			</Container>
		</Box>
	);
};

export default ChampionSkill;
