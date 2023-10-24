import React from 'react';
import { Box, Grid, Rating } from '@mui/material/';
import { getAge, getDobFromEpoch, playerType, playerRating } from '../HelperLogic';
import { useNavigate } from 'react-router-dom';

const MAX_CARDS = 5;

function Card({ player, allPlayers }) {

    const navigate = useNavigate();

    const gotoPlayer = () => {
        navigate(`/cricketer/${player.id}`);
    };

    return (
        <Grid
            onClick={gotoPlayer}
            sx={{
                width: '100%',
                aspectRatio: '1/1.5',
                backgroundColor: '#2975d4',
                borderRadius: 2,
                boxShadow: '1px 1px 7px #80808069',
                color: 'white',
                overflow: 'hidden',
                '&:hover': {
                    transform: 'scale(1.02)',
                    cursor: 'pointer',
                    boxShadow: '0px 0px 7px #faaf0054'
                }
            }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '35%', width: '100%', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                <Box sx={{ fontWeight: '500' }}>{player.name}</Box>
                <Box sx={{ fontWeight: '400', color: '#ffffff82' }}>{playerType[player.type]}</Box>
            </Box>
            <Box
                sx={{
                    color: 'black',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    alignItems: 'center',
                    height: '65%',
                    width: '100%',
                    backgroundColor: 'white',
                    borderRadius: '15px 15px 0 0',
                    overflow: 'hidden'
                }}>
                <Grid container sx={{ width: '100%', justifyContent: 'space-evenly', display: 'flex' }}>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{ fontSize: 'calc(0.75vw + 10px)', color: 'black', fontWeight: '600' }}>
                            {player.rank}
                        </Box>
                        <Box sx={{ fontSize: 'calc(0.5vw + 5px)', color: 'grey', fontWeight: '400' }}>
                            Rank
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{ fontSize: 'calc(0.75vw + 10px)', color: 'black', fontWeight: '600' }}>
                            {player.points}
                        </Box>
                        <Box sx={{ fontSize: 'calc(0.5vw + 5px)', color: 'grey', fontWeight: '400' }}>
                            Points
                        </Box>
                    </Grid>
                </Grid>
                <Box>
                    <Rating size="small" name="half-rating-read" value={playerRating(player.points, allPlayers)} precision={0.1} readOnly />
                </Box>
                <Box sx={{ fontSize: 'calc(0.5vw + 10px)', color: 'black', fontWeight: '600' }}>
                    {getAge(player.dob)}
                </Box>
                <Box sx={{ fontSize: 'calc(0.5vw + 10px)', color: 'black', fontWeight: '600' }}>
                    {getDobFromEpoch(player.dob, '/')}
                </Box>
            </Box>
        </Grid>
    )
}

export default function SimilarPlayers({ type, allPlayers, exclude }) {

    const similarPlayers = allPlayers.filter((pl) => pl.type === type);

    return (
        <Box sx={{ textAlign: 'left', mb: 6 }}>
            <Box sx={{ py: 3, fontSize: 'calc(0.6vw + 10px)', fontWeight: '500' }}>Similar Players:</Box>
            <Grid container spacing={3} sx={{ display: 'flex', width: '100%' }}>
                {
                    similarPlayers.filter((e, i) => i < MAX_CARDS && e.id !== exclude.id).map((pl) => {
                        return <Grid item xs={12} sm={4} md={3} lg={2.4} xl={2.4} key={pl.id}>
                            <Card player={pl} allPlayers={allPlayers}/>
                        </Grid>;
                    })
                }
            </Grid>
        </Box>
    )
}