import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Grid, IconButton, Rating, Tooltip } from '@mui/material/';
import getData from '../../services/get-players';
import ReplyIcon from '@mui/icons-material/Reply';
import SimilarPlayers from './SimilarPlayers';

import { getAge, getDobFromEpoch, playerType, playerRating, playerNameSign } from '../HelperLogic';

export default function CricketerDetails() {

    const [id, setId] = React.useState(null);
    const [player, setplayer] = React.useState(null);
    const [allPlayers, setAllPlayers] = React.useState(null);
    const location = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        setId(location.id);
        getData().then((data) => {
            var playerdata = data.filter((pl) => pl.id === location.id);
            setAllPlayers(data);
            setplayer(playerdata[0]);
        });
    }, [location]);

    const goBack = () => {
        navigate('/');
    }

    return (
        <Box sx={{ position: 'relative' }}>
            <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 4 }}>
                <Tooltip title="back">
                    <IconButton aria-label="back" sx={{ position: 'absolute', left: 0 }} onClick={goBack}>
                        <ReplyIcon sx={{ color: 'black' }}/>
                    </IconButton>
                </Tooltip>
                <Box sx={{ fontSize: 'calc(0.75vw + 10px)', fontWeight: 600 }}>Player Details</Box>
            </Grid>
            {player && (
                <Box>
                    <Grid container spacing={3} sx={{ textAlign: 'left' }}>
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                            <Box
                                sx={{
                                    width: '100%',
                                    aspectRatio: '1/1',
                                    backgroundColor: 'grey',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: 'calc(1vw + 20px)',
                                    fontWeight: '600'
                                }}>
                                {playerNameSign(player.name)}
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                            <Box>
                                <Box sx={{ fontSize: 'calc(0.75vw + 10px)', fontWeight: '600' }}>
                                    {player.name}
                                </Box>
                                <Box sx={{ textAlign: 'justify', width: '80%', py: 2 }}>
                                    {player.description}
                                </Box>
                                <Box>
                                    <Box sx={{ fontWeight: 600 }}>Player Type: </Box>
                                    <Box>{playerType[player.type]}</Box>
                                </Box>
                                <Box>
                                    <Box sx={{ fontWeight: 600, pt: 2 }}>Player Points: </Box>
                                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                        {player.points}
                                        <Rating size="small" name="half-rating-read" value={playerRating(player.points, allPlayers)} precision={0.1} readOnly />
                                    </Box>
                                </Box>
                                <Box>
                                    <Box sx={{ fontWeight: 600, pt: 2 }}>Player rank: </Box>
                                    <Box>{player.rank}</Box>
                                </Box>
                                <Box>
                                    <Box sx={{ fontWeight: 600, pt: 2 }}>Player Date of birth: </Box>
                                    <Box>{getDobFromEpoch(player.dob, '-')}</Box>
                                </Box>
                                <Box>
                                    <Box sx={{ fontWeight: 600, pt: 2 }}>Player Age: </Box>
                                    <Box>{getAge(player.dob)}</Box>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box>
                        <SimilarPlayers allPlayers={allPlayers} type={player.type} exclude={player} />
                    </Box>
                </Box>
            )}
        </Box>
    )
}
