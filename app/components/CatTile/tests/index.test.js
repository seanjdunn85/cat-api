import React from 'react';
import { shallow } from 'enzyme';

import CatTile from '../index';

describe('<CatTile />', () => {
  it('should render the cat tile', () => {
    const catinfo = {id:"6",url:"https://cdn2.thecatapi.com/images/6.png"}
    const renderedComponent = shallow(<CatTile catinfo={catinfo}/>);
    expect(
      renderedComponent.contains(
        <GridListTile></GridListTile>
      )
    ).toBe(true);
  });

  it('should have an icon', () => {
    const renderedComponent = shallow(<CatTile />);
    expect(renderedComponent.text()).toContain('Dinesh Pandiyan');
  });
});
