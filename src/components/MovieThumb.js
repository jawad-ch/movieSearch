import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { StyledMovieThumb } from './styles/StyledMovieThumb';

const MovieThumb = ({ image, movieId, clickable, movieName }) => (
  <StyledMovieThumb>
    {clickable ? (
      <Link to={`/${movieId}`}>
        <img className="clickable" src={image} alt={movieName} />
      </Link>
    ) : (
      <img src={image} alt="moviethumb" />
    )}
  </StyledMovieThumb>
)

MovieThumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  clickable: PropTypes.bool,
}

export default MovieThumb;
