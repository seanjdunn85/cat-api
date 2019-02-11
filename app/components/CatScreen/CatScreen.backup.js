import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Pagination from "material-ui-flat-pagination";
import CatGrid from "../CatGrid";
import CatTile from "../CatTile";
import IconButton from '@material-ui/core/IconButton';



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

class CatScreen extends React.Component {
  state = {
    value: 0,
    total:10,
    number:15,
    display:10,
    offset:0,
  };

  handleTabChange = (event, value) => {
    console.log('handle change', value)
    this.setState({ value });
  };

  handleClick = (offset) => {
    console.log('handleClick', offset)
  	this.setState({offset})
  };

  onChangePage = (page) => {
    
    console.log('on change page', page);
    this.setState({offset:page})
    this.props.onChangePage(page, this.props.browserCategory);
  }

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
    
    const {  onChangePage, classes, books, favourites } = this.props;

    const { value } = this.state;

    let cats;

    let book;

    book = this.getRelevantBook();

    if(typeof book == 'undefined'){
      console.log('book is undefined', this.props.cats)
      cats = this.props.cats;
    }else{
      cats = book.pages[book.currentPage]
    }

    console.log('props.cats', this.props.cats);
    let CatPageInt;

    if(cats){
      CatPageInt = (<CatTile catinfo={cats}/>)
    }else{
      CatPageInt = <div> Cat page interior</div>
    }
    return (
      <div >
          <Pagination
          total = { this.state.total }
          offset = { this.state.offset }
          display = { this.state.display }
          onClick={(e, offset) => this.onChangePage(offset)}
            /> 
            {favourites && <div>{favourites.length}</div>}
            {cats && <GridList cellHeight={350} className={classes.gridList} cols={3}>
            {cats.map(cat => (
              <GridListTile key={cat.id} cols={1}>
                <img src={cat.url} alt={cat.url} />
                <GridListTileBar
                titlePosition="top"
                className={classes.titleBar}
                actionIcon={
                  <IconButton 
                  onClick = {() => this.handleFavouriteClick(cat)}
                  className={this.isFavouritedImage(cat) ? classes.iconFavourited : classes.icon}>
                    <FavoriteIcon />
                  </IconButton>
                }
                actionPosition="left"
              />
              </GridListTile>
            ))}
          </GridList>
          }
      </div>
    );
    
  }
}

export default withStyles(styles)(CatScreen);

