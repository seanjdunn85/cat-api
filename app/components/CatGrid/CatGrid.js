import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';


class CatGrid extends React.Component {
  state = {
    value: 0,
    total:0,
    number:100,
    display:10,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleClick = (offset) => {
    console.log(offset)
  };


  render() {
    return (<div>I'm a catgrid</div>)
    const { classes, cats } = this.props;

    const { value } = this.state;
    if(typeof this.props.cats != 'undefined'){
      return (
        <div >
          <GridList cellHeight={55}>
            <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
              <ListSubheader component="div">December</ListSubheader>
            </GridListTile>GridListTileBar
          </GridList>
        </div>
      );
      
    }else{
      return (<div>Fetching cats</div>)
    }
  }
}


export default withStyles(CatGrid);