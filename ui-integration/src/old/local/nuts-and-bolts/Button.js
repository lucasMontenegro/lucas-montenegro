import React from 'react';
import styled from 'styled-components';
import palette from './palette';

const createButton = color => styled.button`
  margin: 0 0.5ch;
  border: 0;
  padding: 0.75em 2ch;
  border-radius: 2px;
  color: ${palette[color].contrast}
  background-color: ${palette[color].normal};

  :hover {
    background-image: linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.1));
  }

  :disabled {
    opacity: 0.4;
  }

  :active {
    box-shadow: 0 0 0 1px rgba(0,0,0,.15) inset, 0 0 6px rgba(0,0,0,.2) inset;
  }
`;

const GrayButton = createButton('gray');
const BlueButton = createButton('blue');
const RedButton = createButton('red');
const GreenButton = createButton('green');
const OrangeButton = createButton('orange');

const Button = ({ primary, error, success, warning, children, ...props }) => {
  return primary ? <BlueButton {...props}>{children}</BlueButton>
  : error ? <RedButton {...props}>{children}</RedButton>
  : success ? <GreenButton {...props}>{children}</GreenButton>
  : warning ? <OrangeButton {...props}>{children}</OrangeButton>
  : <GrayButton  {...props}>{children}</GrayButton>
}

export default Button;
