import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';



const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 'auto',
    height: 'auto',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
  'iconFavourited':{
    color:'red'
  }
});

class CatTile extends React.Component {

  /**
   * [isFavouritedImage description]
   * @param  {object image}  The image in question
   * @return {Boolean}       whether the image is favorited 
   */
  isFavouritedImage(image){
    const {favourites} = this.props;
    if(favourites){
      for (var i = 0; i < favourites.list.length; i++) {
        favourites.list[i]
        if(favourites.list[i].image_id == image.id){
          console.log('IS isFavouritedImage');
          return true;
        }
      }
    }
    return false;
  }

  /**
   * [getFavouriteId description]
   * @param  {[type]} image [description]
   * @return {[type]}       [description]
   */
  getFavouriteId(image){
    const {favourites} = this.props;
    if(favourites){
      for (var i = 0; i < favourites.list.length; i++) {
        favourites.list[i]
        if(favourites.list[i].image_id == image.id){
          return favourites.list[i].id;
        }
      }
    }
    return null;  
  }

  getRelevantBook(){

    let book = this.props.books[this.props.browserCategory];
    return book;

  }

  /**
   * [handleFavouriteClick description]
   * @param  {object} image object
   * @return {void}
   */
  handleFavouriteClick(image){
    let bool;
    bool = this.isFavouritedImage(image)
    if(!bool){
      this.props.favouriteCatImage(image)
    }else{
      this.props.deleteCatFavourite(this.getFavouriteId(image));
    }
  }


  render() {
    const { catinfo, classes } = this.props;

    return (
      /*Be sure to inherit the partent style that is applied by the gridlist*/
      <GridListTile key={catinfo.id}  style={{...this.props.style}} cols={1}>
        <img src={catinfo.url} alt={catinfo.title} />
        <GridListTileBar
          titlePosition="top"
          className={classes.titleBar}
          actionIcon={
            <IconButton
              onClick = {() => this.handleFavouriteClick(catinfo)}
              className={this.isFavouritedImage(catinfo) ? classes.iconFavourited : classes.icon}>
              <FavoriteIcon />
            </IconButton>
          }
          actionPosition="left"
        />
      </GridListTile>
    );
  }
}


export default withStyles(styles)(CatTile);