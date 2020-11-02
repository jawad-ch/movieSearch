import React, { useState } from 'react'
import Grid from './Grid';
import HeroImage from './HeroImage';
import SearchBar from './SearchBar';
import MovieThumb from './MovieThumb';
import LoadMoreBtn from './LoadMoreBtn';
import Spinner from './Spinner';
import { 
    SEARCH_BASE_URL,
    POPULAR_BASE_URL,
    IMAGE_BASE_URL, 
    BACKDROP_SIZE, 
    POSTER_SIZE 
} from '../config'

import NoImage from './images/no_image.jpg'
import { useHomeFetch } from './hooks/useHomeFetch'

function Home() {

    const [searchTerm, setSearchTerm] = useState('');

    const [ { state: { movies, currentPage, totalPages, heroImage }, loading, error }, fetchMovies] = useHomeFetch(searchTerm);

    const searchMovies = search => {
        const endpoint = search !== '' ? SEARCH_BASE_URL + search : POPULAR_BASE_URL;
    
        setSearchTerm(search);
        fetchMovies(endpoint);
    
    }

    const loadMoreMovies = () => {
        const searchEndpoint = `${SEARCH_BASE_URL}${searchTerm}&page=${currentPage + 1}`;
        const popularEndpoint = `${POPULAR_BASE_URL}&page=${currentPage + 1}`;
    
        const endpoint = searchTerm !== '' ? searchEndpoint : popularEndpoint;

        fetchMovies(endpoint);
    
    }

    if(error) return <div>something went wrong ...</div>;
    // if(!moviesrender[0]) return (<Spinner />);
    return (
        <div>
            {searchTerm || movies[0] ?(
                <HeroImage 
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
                    title={heroImage.original_title}
                    text={heroImage.overview}
                />
            ) : ''}
            <SearchBar callback={searchMovies} />
            {movies[0] ? <Grid header={searchTerm ? 'Search Result' : 'popular movies'}>
                { movies.map(movie => (
                    <MovieThumb  
                        key={movie.id}
                        clickable 
                        image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : NoImage}
                        movieId={movie.id}
                        movieName={movie.original_title}
                    />
                ))}
            </Grid>
            : <Spinner />}
            {loading && <Spinner />}
            {currentPage < totalPages && !loading && (
                <LoadMoreBtn text="Load More" callback={loadMoreMovies} />
            )}
        </div>
    )
}

export default Home