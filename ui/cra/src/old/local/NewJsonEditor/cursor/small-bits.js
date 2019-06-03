import React from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const SmallBtn = styled.button`
  width: 3em;
`;

export const CursorBtn = ({ focused, onClick }) => {
  const str = focused ? 'primary' : 'secondary';
  return <Button as={SmallBtn} variant={str} onClick={onClick}>+</Button>;
}

export const CollapseBtn = ({ collapsed, onClick }) => {
  let arrow;
  if (collapsed) {
    arrow = <FontAwesomeIcon icon={['fas', 'arrow-circle-right']} />
  } else {
    arrow = <FontAwesomeIcon icon={['fas', 'arrow-circle-down']} />
  }
  return (
    <Button as={SmallBtn} variant="info" onClick={onClick}>
      {arrow}
    </Button>
  );
}
