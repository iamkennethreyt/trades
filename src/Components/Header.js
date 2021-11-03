import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className='navbar navbar-light bg-light'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            Crypto
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
