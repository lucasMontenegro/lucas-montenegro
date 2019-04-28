import React from 'react';
import styled from 'styled-components';

const Empty = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  color: gray;
  background-color: #f8f9fa;
  width: 100%;
  max-width: 40ch;
  margin-right: auto;
  line-height: 1.5;
  border: 1px solid #f8f9fa;
  padding: 0.375rem;
  border-radius: 0.25rem;
`;

export const PureEmptyCmp = () => <Empty><em>empty</em></Empty>;
export default PureEmptyCmp
