import { useState, useEffect} from 'react'

import { SEARCH_BASE_URL,
    POPULAR_BASE_URL,
    API_URL,
    API_KEY,
    IMAGE_BASE_URL, 
    BACKDROP_SIZE, 
    POSTER_SIZE 
} from '../../config'

export const useHomeFetch = () => {

    const [state, setState] = useState({ movies: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchMovies = (endpoint, type) => {
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
            // if (searchTerm !== '') {
            //   console.log('searchTerm :', searchTerm)
            //   setState(prev => ({
            //     ...prev,
            //     searchedMovies:[...data.results]
            //   }))
            // }else{
            //   console.log('no searchTerm :', searchTerm)
            //   setState(prev => ({
            //     ...prev,
            //     movies:
            //       isLoadMore !== -1
            //         ? [...prev.movies, ...data.results]
            //         : [...data.results],
            //     heroImage: prev.heroImage || data.results[0],
            //     currentPage: data.page,
            //     totalPages: data.total_pages,
            //   }));
            // }

          });
          
        } catch (error) {
          setError(true);
          console.log(error);
        }
        setLoading(false);
      };
    
      // Fetch popular movies initially on mount
      useEffect(() => {
        // if (sessionStorage.homeState) {
        //   setState(JSON.parse(sessionStorage.homeState));
        //   setLoading(false);
        // } else {
          fetchMovies(POPULAR_BASE_URL, 'populaMovies');
        // }
      }, []);
    
      // useEffect(() => {
      //   if (searchTerm !== '') {
      //     sessionStorage.setItem('homeState', JSON.stringify(state));
      //   }
      // }, [searchTerm, state]);
    
      return [{ state, loading, error }, fetchMovies];
    };