import React from 'react';
import { Link } from 'react-router-dom';
const { version } = require('../../package.json');

const Footer = () => {
  console.log(version);
  return (
    <footer className='footer-light bg-light'>
      <div
        className='text-center p-3'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        <Link
          className='text-decoration-none text-dark'
          to={{ pathname: 'https://iamkennethreyt.github.io/' }}
          target='_blank'
        >
          © {new Date().getFullYear()} Copyright | Version {version}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
