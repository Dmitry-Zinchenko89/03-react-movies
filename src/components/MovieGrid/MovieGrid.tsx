import React from 'react';
import type { Movie } from '../../types/movie';
import styles from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onMovieClick }) => {
  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <div
          key={movie.id}
          className={styles.card}
          onClick={() => onMovieClick(movie)}
        >
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Image'
            }
            alt={movie.title}
            className={styles.poster}
          />
          <h3 className={styles.title}>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;