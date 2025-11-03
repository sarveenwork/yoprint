import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import '../../../css/anime.css';
import { Link as RouterLink } from 'react-router-dom';
import { Anime } from '../../../types';

interface ItemCardProps {
  item: Anime;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
    return (
        <Card className='card' component={RouterLink} to={`/${item.mal_id}`} style={{ textDecoration: 'none' }}>
            <CardMedia
                className='cardMedia'
                image={item.images.jpg.image_url}
                title={item.title}
            />
            <CardContent className='cardContent'>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {item.title}
                    </Typography>
                    <div style={{ flexGrow: 1 }} />
                    <Typography variant="body2" color="textSecondary">
                        Episode {item.episodes}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}

export default ItemCard;

