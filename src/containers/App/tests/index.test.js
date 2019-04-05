import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';

import Header from '../../Header';
import Footer from '../../Footer';
import App from '../index';

describe('<App />', () => {
  it('should render the header', () => {
    const renderedComponent = shallow(<App />);
    expect(renderedComponent.find(Header)).toHaveLength(1);
  });

  it('should render some routes', () => {
    const renderedComponent = shallow(<App />);
    expect(renderedComponent.find(Route)).not.toHaveLength(0);
  });

  it('should render the footer', () => {
    const renderedComponent = shallow(<App />);
    expect(renderedComponent.find(Footer)).toHaveLength(1);
  });
});
