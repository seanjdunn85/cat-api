import React from 'react';
import { shallow } from 'enzyme';

import CatNav from '../index';

describe('<CatNav />', () => {
  it('should render a div', () => {
    const renderedComponent = shallow(<CatNav />);
    expect(renderedComponent.length).toEqual(1);
  });
});
