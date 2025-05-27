import axios from 'axios';

import type { Movie,  MovieApiResponse } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  try {
   const response = await axios.get<MovieApiResponse>(BASE_URL, {
      params: {
        query,
      },
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    throw error;
  }
};