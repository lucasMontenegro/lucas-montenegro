import React from 'react';
import styled from 'styled-components';

const PurpleDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  color: white;
  background-color: #9c27b0;
  width: 100%;
  max-width: 40ch;
  margin-right: auto;
  line-height: 1.5;
  border: 1px solid #f8f9fa;
  padding: 0.375rem;
  border-radius: 0.25rem;
`;

export const PureNullCmp = () => (
  <PurpleDiv>Null</PurpleDiv>
);

export default PureNullCmp;
