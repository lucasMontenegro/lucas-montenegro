import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import palette from './palette';

const applyStyle = Cmp => Cmp`
  text-decoration: none;
  color: ${palette.blue.normal};

  :hover {
    color: ${palette.blue.light};
  }
`;

export const ExternalLink = applyStyle(styled.a);
export const LocalLink = applyStyle(styled(Link));

const ContentLink = ({ local, ...props }) => local
  ? <LocalLink {...props} />
  : <ExternalLink {...props} />;

export default ContentLink;
