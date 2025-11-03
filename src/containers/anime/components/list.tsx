import React, { useEffect, useState } from 'react';
import { Grid, Pagination, Typography, TextField, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import ItemCard from './item_card';
import ItemCardLoading from './item_card_loading';
import '../../../css/anime.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { fetchAnime } from '../../../thunks/anime.thunk';
import { setAnimeFilter } from '../../../actions/anime.action';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useDebounce } from '../../../hooks/useDebounce';

const List: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, anime, pagination, filter, error } = useAppSelector((state) => state.anime);
  const [searchInput, setSearchInput] = useState(filter.q || '');
  const debouncedQuery = useDebounce(searchInput, 250);

  useEffect(() => {
    setSearchInput(filter.q || '');
  }, [filter.q]);

  const handlePageChange = (_event: unknown, page: number) => {
    dispatch(setAnimeFilter({ page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (debouncedQuery !== filter.q) {
      dispatch(setAnimeFilter({ q: debouncedQuery, page: 1 }));
    }
  }, [debouncedQuery, dispatch, filter.q]);

  useEffect(() => {
    dispatch(fetchAnime());
  }, [filter.page, filter.q, dispatch]);

  return (
    <div>
      <div style={{ height: 60 }}>
        <div style={{ display: 'flex' }}>
          <div style={{ minWidth: 200, textAlign: 'left' }}>
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
          <div style={{ marginLeft: 'auto' }}>
            <TextField
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
      </div>

      <Grid container spacing={2}>
        {isLoading ? (
          [...Array(10)].map((_, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              key={`loading-${index}`} 
              sx={{ 
                display: 'flex',
                '@media (min-width: 960px)': {
                  flexBasis: '20%',
                  maxWidth: '20%'
                }
              }}
            >
              <ItemCardLoading />
            </Grid>
          ))
        ) : anime.length > 0 ? (
          anime.map((item) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              key={item.mal_id} 
              sx={{ 
                display: 'flex',
                '@media (min-width: 960px)': {
                  flexBasis: '20%',
                  maxWidth: '20%'
                }
              }}
            >
              <ItemCard item={item} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>
              {error ? `Error: ${error}` : (filter.q ? 'No Anime Found' : 'No anime available. Please check your API connection.')}
            </Typography>
          </Grid>
        )}
      </Grid>
      {!isLoading && pagination && (
        <div style={{ paddingBottom: 20, paddingRight: 20, paddingTop: 10, float: 'right' }}>
          <Pagination 
            count={pagination.last_visible_page} 
            page={filter.page}
            onChange={handlePageChange} 
          />
        </div>
      )}
    </div>
  );
};

export default List;

