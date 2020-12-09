import { useState, useEffect, useCallback} from 'react'

import { POPULAR_BASE_URL } from '../../config'

export const useHomeFetch = () => {

    const [state, setState] = useState({ movies: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchMovies = useCallback( async (endpoint, type) => {
        setError(false);
        setLoading(true);
    
        const isLoadMore = endpoint.search('page');
    
        try {
          const data = await (await fetch(endpoint)).json();
          // .then(data => {
              setState(prevState =>({
                prevState,
                movies:
                isLoadMore !== -1
                  ? [prevState.movies, ...data.results]
                  : [...data.results],
                heroImage: prevState.heroImage || data.results[0],
                currentPage: data.page,
                totalPages: data.total_pages,
              }))
          
        } catch (error) {
          setError(true);
          console.log(error);
        }
        setLoading(false);
      },[]);
    
      // Fetch popular movies initially on mount
      useEffect(() => {
          fetchMovies(POPULAR_BASE_URL, 'populaMovies');
        // }
      }, [fetchMovies]);
      return [{ state, loading, error }, fetchMovies];
    };