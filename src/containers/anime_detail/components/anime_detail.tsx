import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, Chip, Typography, Rating, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import '../../../css/animeDetail.css';
import animeService, { ApiError } from '../../../api/anime/anime';
import { Anime } from '../../../types';
import AnimeDetailLoading from './anime_detail_loading';
import axios from 'axios';

interface AnimeDetailProps {
  id: string;
}

const AnimeDetail: React.FC<AnimeDetailProps> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [animeDetail, setAnimeDetail] = useState<Anime | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    
    setIsLoading(true);
    setError(null);
    setAnimeDetail(null);

    animeService.getAnimeById(id, abortController.signal)
      .then((response) => {
        if (abortController.signal.aborted) {
          return;
        }

        if (response.status === 200) {
          if (!response.data?.data) {
            throw new ApiError('Invalid API response format');
          }

          if (!abortController.signal.aborted) {
            setAnimeDetail(response.data.data);
            setIsLoading(false);
            setError(null);
          }
        } else {
          throw new ApiError(`Unexpected status code: ${response.status}`, response.status);
        }
      })
      .catch((error) => {
        if (axios.isCancel(error) || abortController.signal.aborted) {
          return;
        }

        setIsLoading(false);
        
        if (error instanceof ApiError) {
          let errorMessage = error.message;
          
          if (error.isRateLimit) {
            errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
          } else if (error.isNetworkError) {
            errorMessage = 'Network error. Please check your internet connection.';
          } else if (error.statusCode === 404) {
            errorMessage = 'Anime not found.';
          }
          
          setError(errorMessage);
        } else if (error instanceof Error) {
          setError(error.message || 'Failed to load anime details');
        } else {
          setError('An unexpected error occurred');
        }
      });

    return () => {
      abortController.abort();
    };
  }, [id]);

  return (
    <div>
      <div style={{ paddingBottom: 20, textAlign: 'left' }}>
        <Typography 
          variant="h5" 
          component={Link}
          to="/"
          sx={{ 
            textDecoration: 'none', 
            color: 'inherit',
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.7
            }
          }}
        >
          YoPrintAnime
        </Typography>
      </div>

      {isLoading ? (
        <AnimeDetailLoading />
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      ) : animeDetail ? (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card className="card">
              <CardMedia
                className="cardMedia"
                image={animeDetail.images?.jpg?.large_image_url}
              />
            </Card>
          </Grid>
          <Grid item xs={8} style={{ textAlign: 'left' }}>
            <Typography variant="h5" component="h2">
              {animeDetail.title} <Chip label={animeDetail.type} color="primary" />
            </Typography>
            <div style={{ paddingTop: 10, paddingBottom: 10 }}>
              {animeDetail.genres?.map((genre) => (
                <Chip label={genre.name} style={{ marginRight: 7 }} key={genre.mal_id} />
              ))}
            </div>
            <Rating
              name="anime-rating"
              value={animeDetail.score ? animeDetail.score / 2 : 0}
              readOnly
              precision={0.5}
            />
            <Typography variant="h5" component="h3" style={{ paddingTop: 10, paddingBottom: 10 }}>Synopsis </Typography>
            <Typography style={{ textAlign: 'justify' }}>{animeDetail.synopsis}</Typography>
          </Grid>
        </Grid>
      ) : null}
    </div>
  );
};

export default AnimeDetail;

