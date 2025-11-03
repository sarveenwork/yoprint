import React from 'react';
import { Grid, Card, Typography, Rating, Skeleton } from '@mui/material';
import '../../../css/animeDetail.css';

const AnimeDetailLoading: React.FC = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Card className="card">
                    <Skeleton variant="rectangular" className="cardMedia" />
                </Card>
            </Grid>
            <Grid item xs={8} style={{ textAlign: 'left' }}>
                <Typography variant="h5" component="h2">
                    <Skeleton width="60%" />
                </Typography>
                <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                    {[...Array(3)].map((_, index) => (
                        <Skeleton key={index} variant="rectangular" width={70} height={30} style={{ display: 'inline-block', marginRight: 7 }} />
                    ))}
                </div>
                <Rating
                    name="anime-rating"
                    value={0}
                    readOnly
                    precision={0.5}
                />
                <Typography variant="h5" component="h3" style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <Skeleton width="30%" />
                </Typography>
                <Skeleton variant="rectangular" width="100%" height={80} style={{ textAlign: 'justify' }} />
            </Grid>
        </Grid>
    );
}

export default AnimeDetailLoading;

