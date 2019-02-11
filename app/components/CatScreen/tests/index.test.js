import React from 'react';
import { shallow } from 'enzyme';

import CatScreen from '../index';

describe('<CatScreen />', () => {
  const books={
    'gifs':{
      'currentPage':0,
      'pages':[]
    },
    'images':{
      'currentPage':0,
      'pages':[]
    },
  }
  it('should render the cat tile', () => {
    const renderedComponent = shallow(<CatScreen cats={[]} books={books}/>);
    expect(
      renderedComponent.contains(
        <section>This project is licensed under the MIT license.</section>
      )
    ).toBe(true);
  });

  it('should have an icon', () => {
    const renderedComponent = shallow(<CatScreen />);
    expect(renderedComponent.text()).toContain('Dinesh Pandiyan');
  });
});
