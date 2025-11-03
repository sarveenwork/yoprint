import React, { useEffect } from 'react';
import List from './components/list';
import { Box } from '@mui/material';
import { useAppDispatch } from '../../hooks/redux';
import { setAnimeFilter } from '../../actions/anime.action';

const AnimeIndex: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setAnimeFilter({ q: '', page: 1 }));
    }, [dispatch]);

    return (
        <Box sx={{ padding: 4 }}>
            <List />
        </Box>    
    );
}

export default AnimeIndex;

