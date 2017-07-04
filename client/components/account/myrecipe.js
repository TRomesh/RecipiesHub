import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import { withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import * as RecipeActions from '../../actions/RecipeActions';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FavIcon from 'material-ui/svg-icons/action/favorite';
import FavIconBorder from 'material-ui/svg-icons/action/favorite-border';
import {deepOrange400,red500} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Dropzone from 'react-dropzone';

class MyRecipe extends Component{

  constructor(props) {
    super(props);
    this.state = {
      recipieOpen: false,
      liked: '',
    }
  }

  handleOpenRecipie = () => {
    this.setState({recipieOpen: true});
  }

  handleClose = () => {
     this.setState({recipieOpen: false});
   }

  changeLikeState = () => {

      if (this.state.liked) {
        this.setState({liked: !this.state.liked});
      }
      else {
        this.setState({liked: !this.state.liked});
      }
  }

    render(){
      return(
        <div>
          <GridTile
              title={<a onClick={this.handleOpenRecipie}>{this.props.fname}</a>}
              actionIcon={<IconButton onClick={this.changeLikeState}  touch={true}>
                            {this.state.liked ? <FavIcon onClick={this.changeLikeState} color={red500} /> :
                            <FavIconBorder color={red500} />}
                          </IconButton>}>
              <img style={{height:250}} src={'routes/media/'+ this.props.image}/>
          </GridTile>
          <Dialog
            title={this.props.fname}
            modal={false}
            open={this.state.recipieOpen}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}>
              <Card>
                <CardMedia>
                  <img style={{height:400}} src={'routes/media/'+ this.props.image} />
                </CardMedia>
                <CardText>
                    {this.props.description}
                </CardText>
              </Card>
          </Dialog>
        </div>
        );
    }


}

MyRecipe.PropTypes = {
  isError: PropTypes.bool.isRequired,
  redireact: PropTypes.bool.isRequired,
  recipactions: PropTypes.object.isRequired,
  useractions:PropTypes.object.isRequired
}

let mapStateToProps = (state,props) => {
  return {
    isError: state.recipe.isError,
    redireact: state.recipe.redireact
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    recipactions:bindActionCreators(RecipeActions,dispatch)
  };
}

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(MyRecipe));
