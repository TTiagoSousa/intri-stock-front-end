import React from 'react';
import './Simple_Button.scss';
import { Link } from 'react-router-dom';

const Simple_Button = ({text, disabled, onClick}) => {
  return (
    <Link className='Simple_Button'>
      <button
        disabled={disabled}
        onClick={onClick}
      >
        {text}
      </button>
    </Link>
  )
};

export default Simple_Button;
