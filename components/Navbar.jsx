import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

const Navbar = () => (
  <div>
    NavBar <FontAwesomeIcon icon={faCoffee} /> <FontAwesomeIcon icon={faDiscord} />
  </div>
);

export default Navbar;
