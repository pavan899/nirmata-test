import React from 'react';
import CustomTable from '../CustomTable';
import getData from '../../services/get-players';
import {
    FormControl,
    InputAdornment,
    TextField,
    Grid,
    Box,
    InputLabel,
    MenuItem,
    Select,
    OutlinedInput,
    Checkbox,
    ListItemText
} from '@mui/material/';
import { Search } from '@mui/icons-material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function playerData(id, name, age, description, points, rank, type) {
    return {
        id,
        name,
        age,
        description,
        points,
        rank,
        type,
    };
}

export default function Cricketers() {

    const [players, setPlayers] = React.useState(null);
    const [allPlayers, setAllPlayers] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [searchedValue, setSearchedvalue] = React.useState("");
    const [allTypes, setAllType] = React.useState([]);
    const [playerType, setPlayerType] = React.useState([]);

    React.useEffect(() => {
        setLoading(true);
        getData().then((data) => {
            var playerdata = data.map((val) => playerData(val.id, val.name, val.dob, val.description, val.points, val.rank, val.type));
            setPlayers(playerdata);
            setAllPlayers(playerdata);
            setLoading(false);
            const alltypes = playerdata.map((v) => v.type);
            var types = alltypes.filter((v, i) => alltypes.indexOf(v) === i);
            setAllType(types);
        });
    }, []);

    const searchPlayer = (e) => {
        setSearchedvalue(e.target.value);
    }

    const filterPlayer = (event) => {
        const {
            target: { value },
        } = event;
        setPlayerType(
            typeof value === 'string' ? value.split(',') : value,
        );
    }

    React.useEffect(() => {

        if (!allPlayers || allPlayers.length < 1) {
            return
        }

        var filteredPlayers;
        if (!playerType || !playerType.length > 0) {
            filteredPlayers = allPlayers.filter((pl) => pl.name.toLowerCase().includes(searchedValue.toLowerCase()));
        } else {
            filteredPlayers = allPlayers.filter((pl) => pl.name.toLowerCase().includes(searchedValue.toLowerCase())).filter((pl) => playerType.includes(pl.type));
        }
        setPlayers(filteredPlayers);
    }, [playerType, searchedValue])

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid item sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ minWidth: 100 }}>
                    <FormControl variant="standard">
                        <TextField
                            id="input-with-icon-adornment"
                            size='small'
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            }}
                            value={searchedValue}
                            onChange={searchPlayer}
                            placeholder="Search player by name"
                        />
                    </FormControl>
                </Box>
                <Box sx={{ minWidth: 100 }}>
                    <FormControl sx={{ m: 0, width: 300 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Player Type</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={playerType}
                            onChange={filterPlayer}
                            input={<OutlinedInput label="Player Type" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {allTypes.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={playerType.indexOf(name) > -1} />
                                    <ListItemText primary={<Box sx={{ textTransform: 'capitalize' }}>{name}</Box>} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid>
                {!loading && players ? <CustomTable players={players} /> : <>Loading...</>}
            </Grid>
        </Box>
    )
}
