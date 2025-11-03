import React from 'react';
import { Grid, Card, Typography, Rating, Skeleton, Box } from '@mui/material';
import '../../../css/animeDetail.css';

const AnimeDetailLoading: React.FC = () => {
    return (
        <Grid container spacing={2}>
            <Grid 
                item 
                xs={12} 
                sm={12} 
                md={4}
                sx={{ 
                    display: 'flex',
                    justifyContent: { xs: 'center', md: 'flex-start' }
                }}
            >
                <Card className="card">
                    <Skeleton 
                        variant="rectangular" 
                        className="cardMedia"
                    />
                </Card>
            </Grid>
            <Grid 
                item 
                xs={12} 
                sm={12} 
                md={8}
                sx={{ 
                    textAlign: { xs: 'center', md: 'left' },
                    paddingLeft: { xs: 0, md: 2 }
                }}
            >
                <Typography variant="h5" component="h2">
                    <Skeleton width="60%" sx={{ mx: { xs: 'auto', md: 0 } }} />
                </Typography>
                <Box sx={{ paddingTop: 2, paddingBottom: 2, display: 'flex', flexWrap: 'wrap', gap: 0.875, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    {[...Array(3)].map((_, index) => (
                        <Skeleton key={index} variant="rectangular" width={70} height={30} />
                    ))}
                </Box>
                <Rating
                    name="anime-rating"
                    value={0}
                    readOnly
                    precision={0.5}
                    sx={{ mb: 2 }}
                />
                <Typography variant="h5" component="h3" sx={{ paddingTop: 2, paddingBottom: 2 }}>
                    <Skeleton width="30%" sx={{ mx: { xs: 'auto', md: 0 } }} />
                </Typography>
                <Skeleton variant="rectangular" width="100%" height={80} />
            </Grid>
        </Grid>
    );
}

export default AnimeDetailLoading;

