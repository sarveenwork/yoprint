import React from 'react';
import { Card, CardContent, Skeleton, Typography } from '@mui/material';
import '../../../css/anime.css';

const ItemCardLoading: React.FC = () => {
  return (
    <Card className='card'>
      <Skeleton variant="rectangular" className='cardMedia' />
      <CardContent className='cardContent'>
        <Typography gutterBottom variant="h5" component="h2">
          <Skeleton animation="wave" height={30} width="80%" style={{ marginBottom: 6 }} />
        </Typography>
        <Skeleton animation="wave" height={20} width="50%" />
      </CardContent>
    </Card >
  );
}

export default ItemCardLoading;

