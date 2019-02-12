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
import Button from '@material-ui/core/Button';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Pagination from "material-ui-flat-pagination";
import CatGrid from "../CatGrid";
import CatTile from "../CatTile";
import IconButton from '@material-ui/core/IconButton';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}


TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

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

class CatNav extends React.Component {
  state = {
    tabValue:0,
    gifs:{
      total:10,
      number:15,
      display:10,
      offset:0,
    },
    images:{
      total:10,
      number:15,
      display:10,
      offset:0,
    }
  }
  ;

  getRelevantBook(){

    let book = this.props.books[this.props.browserCategory];
    return book;

  }

  handleTabChange = (event, tabValue) => {
    console.log('handle change', tabValue)

    this.setState({ tabValue });
  };

  handleClick = (offset) => {
    console.log('handleClick', offset)
  	this.setState({offset})
  };

  onChangePage = (page, book) => {
    this.state[book].offset = page
    this.setState(this.state)
    this.props.onChangePage(page, book);
  }



  render() {
    
    console.log('rendering page')

    const { onChangePage, page, classes, favourites, books, categories} = this.props;

    const cats = this.props.favourites;

    const { tabValue } = this.state;

    return (
      <div >
        <Button onClick={() => {
          this.props.showAlert();
        }}>Render error dialog</Button>
        <AppBar position="static">
          <Tabs value={tabValue} onChange={this.handleTabChange}>
            <Tab label="Cat Images" />
            <Tab label="Cat Gifs" />
            <Tab icon={<FavoriteIcon/>} label="FAVORITES" />
            <Tab label="Cat-egories" />
          </Tabs>
        </AppBar>
        

       {
          tabValue === 0 && <TabContainer>
          <Pagination
          total = { this.state.images.total }
          offset = { this.state.images.offset }
          display = { this.state.images.display }
          onClick={(e, offset) => this.onChangePage(offset, 'images')}
            /> 
          <GridList cellHeight={350} className={classes.gridList} cols={3}>

          {books['images'] && 
            books['images']['pages'][books['images']['currentPage']].map(cat => (
              <CatTile key = {cat.id} catinfo = {cat} />
              ))}
          </GridList>
        </TabContainer>
        }


        {
          tabValue === 1 && <TabContainer>
          <Pagination
          total = { this.state.gifs.total }
          offset = { this.state.gifs.offset }
          display = { this.state.gifs.display }
          onClick={(e, offset) => this.onChangePage(offset, 'gifs')}
            /> 
          <GridList cellHeight={350} className={classes.gridList} cols={3}>

          {books && 
            books['gifs']['pages'][books['gifs']['currentPage']].map(cat => (
              <CatTile key = {cat.id} catinfo = {cat} />
              ))}
          </GridList>
        </TabContainer>
        }


        {
          tabValue === 2 && <TabContainer>
          {
            !favourites && <div>loading...</div>
          }
          <GridList cellHeight={350} className={classes.gridList} cols={3}>

          {favourites && 
            favourites.list.map(cat => 
              (
              <CatTile key = {cat.id} catinfo = {cat.image} />
              )
            )
          }
          </GridList>
        
        </TabContainer>
        }
        

        {
          tabValue === 3 && <TabContainer>
          {
            !categories && <div>loading...</div>
          }
          <GridList cellHeight={350} className={classes.gridList} cols={3}>
          {!categories && <div>list..</div>}
          {categories && 
            categories.json.map(cat => 
              (
              <CatTile key = {cat.id} catinfo = {cat} />
              )
            )
          }
          </GridList>
        
        </TabContainer>
        }
        
      </div>
    );
    
  }
}


export default withStyles(styles)(CatNav);

