import React from 'react';
import AnimeDetail from './components/anime_detail';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const AnimeDetailIndex: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return null;
    }

    return (
        <Box sx={{ padding: 4 }}>
            <AnimeDetail id={id}/>
         </Box>    
    );
}

export default AnimeDetailIndex;

