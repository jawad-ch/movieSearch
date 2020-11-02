import React from 'react';

// Components
import Navigation from './Navigation';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Actor from './Actor';
import Grid from './Grid';
import Spinner from './Spinner';

import { useMovieFetch } from './hooks/useMovieFetch';

const Movie = ({match}) => {
  const [movie, loading, error] = useMovieFetch(match.params.movieId);

  if (error) return <div>Something went wrong ...</div>;
  if (loading) return <Spinner />;

  return (
  <>
    <Navigation movie={movie.original_title} />
    <MovieInfo movie={movie} />
    <MovieInfoBar
      time={movie.runtime}
      budget={movie.budget}
      revenue={movie.revenue}
    />
    <Grid header="Actors">
      {movie.actors.map(actor => (
        <Actor key={actor.credit_id} actor={actor} />
      ))}     
    </Grid>
  </>
  )
};

export default Movie;