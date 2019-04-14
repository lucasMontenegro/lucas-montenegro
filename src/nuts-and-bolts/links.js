import styled from 'styled-components';
import { Link } from "react-router-dom";
import palette from './palette';

const applyStyle = Cmp => Cmp`
  text-decoration: none;
  color: ${palette.blue};

  :hover {
    color: ${palette.lightBlue};
  }
`;

export const ExternalLink = applyStyle(styled.a);
export const LocalLink = applyStyle(styled(Link));
