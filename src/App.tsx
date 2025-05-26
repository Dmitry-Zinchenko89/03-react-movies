import { useState } from 'react';
import { fetchMovies } from './services/movieService';
import type { Movie } from './types/movie';

import SearchBar from './components/SearchBar/SearchBar';
import MovieGrid from './components/MovieGrid/MovieGrid';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import MovieModal from './components/MovieModal/MovieModal';

import styles from './App.module.css';
import toast from 'react-hot-toast';

function App() {
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      toast.error('Введіть запит');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      const results = await fetchMovies(searchQuery);
      setMovies(results);
    } catch (err) {
  const message = err instanceof Error ? err.message : 'Сталася помилка';
  setError(`Не вдалося завантажити фільми: ${message}`);
}
     finally {
      setIsLoading(false);
    }
  };

  const openModal = (movie: Movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  return (
    <div className={styles.container}>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onMovieClick={openModal} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;

