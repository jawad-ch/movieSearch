import { useState, useEffect, useCallback} from 'react'

import { POPULAR_BASE_URL } from '../../config'

export const useHomeFetch = () => {

    const [state, setState] = useState({ movies: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchMovies = useCallback((endpoint, type) => {
        setError(false);
        setLoading(true);
    
        const isLoadMore = endpoint.search('page');
    
        try {
          fetch(endpoint).then(response => response.json())
          .then(data => {
              setState({
                ...state,
                movies:
                isLoadMore !== -1
                  ? [...state.movies, ...data.results]
                  : [...data.results],
                heroImage: state.heroImage || data.results[0],
                currentPage: data.page,
                totalPages: data.total_pages,
              })

          });
          
        } catch (error) {
          setError(true);
          console.log(error);
        }
        setLoading(false);
      },[state]);
    
      // Fetch popular movies initially on mount
      useEffect(() => {
          fetchMovies(POPULAR_BASE_URL, 'populaMovies');
      }, [fetchMovies]);
      return [{ state, loading, error }, fetchMovies];
    };