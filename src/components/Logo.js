import React from 'react';
import './Logo.css';

const Logo = ({ size = 'medium' }) => {
  return (
    <div className={`logo ${size}`}>
      <div className="logo-shape">
        <span className="logo-initial">E</span>
      </div>
      <span className="logo-text">Edwin</span>
    </div>
  );
};

export default Logo;
