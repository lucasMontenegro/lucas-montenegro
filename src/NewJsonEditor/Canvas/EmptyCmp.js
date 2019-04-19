import React from 'react';
import styled from 'styled-components';

const Empty = styled.div`
  color: gray;
  background-color: #f8f9fa;
  height: 10em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
`;

export const PureEmptyCmp = () => <Empty><em>empty</em></Empty>;
export default PureEmptyCmp
