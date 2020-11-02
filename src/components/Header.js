import React from 'react';
import { Link } from 'react-router-dom';

import RMDBLogo from './images/reactMovie_logo.png';
import TMDBLogo from './images/tmdb_logo.svg';
import RMDBL from './images/RMDBL.png';

import { 
    StyledHeader, 
    StyledRMDBLogo, 
    StyledTMDBLogo
} from './styles/StyledHeader';

const Header = () => (
<StyledHeader>
  <div className="header-content">
    <Link to="/">
    <StyledRMDBLogo src={RMDBL} alt="rmdb-logo" />
    </Link>
    <StyledTMDBLogo src={TMDBLogo} alt="tmdb-logo" />
  </div>
</StyledHeader>
)

export default Header;