import axios, { AxiosError } from 'axios';
import { AnimeResponse, AnimeDetailResponse, AnimeFilter } from '../../types';

const API_BASE_URL = 'https://api.jikan.moe/v4';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public isRateLimit?: boolean,
    public isNetworkError?: boolean
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function getAnime(query: AnimeFilter, signal?: AbortSignal) {
  const queryParams = new URLSearchParams();
  if (query.q) {
    queryParams.append('q', query.q);
  }
  queryParams.append('page', query.page.toString());
  
  try {
    const response = await axios.get<AnimeResponse>(
      `${API_BASE_URL}/anime?${queryParams}`,
      { signal }
    );

    // Validate response structure
    if (!response.data || !response.data.data || !Array.isArray(response.data.data)) {
      throw new ApiError('Invalid API response structure', response.status);
    }

    return response;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw error;
    }
    
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      
      // Handle rate limiting (429)
      if (axiosError.response?.status === 429) {
        throw new ApiError(
          'Rate limit exceeded. Please try again later.',
          429,
          true,
          false
        );
      }
      
      // Handle network errors
      if (!axiosError.response) {
        throw new ApiError(
          'Network error. Please check your internet connection.',
          undefined,
          false,
          true
        );
      }
      
      // Handle other HTTP errors
      const statusCode = axiosError.response.status;
      const errorData = axiosError.response.data as { message?: string } | undefined;
      const message = errorData?.message || `HTTP ${statusCode} error`;
      throw new ApiError(message, statusCode, false, false);
    }
    
    throw new ApiError('An unexpected error occurred');
  }
}

async function getAnimeById(id: string | number, signal?: AbortSignal) {
  try {
    const response = await axios.get<AnimeDetailResponse>(
      `${API_BASE_URL}/anime/${id}`,
      { signal }
    );

    // Validate response structure
    if (!response.data || !response.data.data) {
      throw new ApiError('Invalid API response structure', response.status);
    }

    return response;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw error;
    }
    
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      
      // Handle rate limiting (429)
      if (axiosError.response?.status === 429) {
        throw new ApiError(
          'Rate limit exceeded. Please try again later.',
          429,
          true,
          false
        );
      }
      
      // Handle 404 - anime not found
      if (axiosError.response?.status === 404) {
        throw new ApiError('Anime not found', 404, false, false);
      }
      
      // Handle network errors
      if (!axiosError.response) {
        throw new ApiError(
          'Network error. Please check your internet connection.',
          undefined,
          false,
          true
        );
      }
      
      // Handle other HTTP errors
      const statusCode = axiosError.response.status;
      const errorData = axiosError.response.data as { message?: string } | undefined;
      const message = errorData?.message || `HTTP ${statusCode} error`;
      throw new ApiError(message, statusCode, false, false);
    }
    
    throw new ApiError('An unexpected error occurred');
  }
}

const animeService = {
  getAnime,
  getAnimeById
};

export default animeService;

