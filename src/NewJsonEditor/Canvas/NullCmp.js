import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  color: white;
  padding: 0.5em;
  background-color: #9c27b0;
  border-radius: 0.25rem;
`;

export const PureNullCmp = () => (
  <Wrapper>Null</Wrapper>
);

export default PureNullCmp;
