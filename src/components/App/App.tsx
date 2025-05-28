import { useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (formData: FormData) => {
    const query = (formData.get('query') as string).trim();
    
     if (!query) {
      toast.error('Please enter your search query.');
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const results = await fetchMovies(query);
setMovies(results);
    }
    catch (err) {
  console.error('Error fetching movies:', err);
  toast.error('Something went wrong');
}
     finally {
      setLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar action={handleSearch} />

      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}