import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import * as RecipeActions from '../../actions/RecipeActions';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FavIcon from 'material-ui/svg-icons/action/favorite';
import FavIconBorder from 'material-ui/svg-icons/action/favorite-border';
import {deepOrange400} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';

const Cardstyle = {
  height: 450,
  width: 300,
  marginTop: 30,
  //marginLeft: 20,
};

const dropZoneStyle = {
  width: 300,
  height: 200,
  paddingLeft: 20,
};

class Newsfeeds extends Component{

  constructor(props) {
    super(props);
    this.state = {
      editOpen: false,
      deleteOpen: false,
      recipieOpen: false,
    };
  }

  _editStatus = () => {
    // let status = this.refs.EditBox.getValue();
    // let editData = {
    //   userId: localStorage.getItem('userid'),
    //   postId: this.props.id,
    //   status: status,
    // };
    // ActivityfeedAction._editStatus(editData);
    this.handleClose();
  }

  _deleteStatus = () => {
    // let deleteData = {
    //   userId: localStorage.getItem('userid'),
    //   postId: this.props.id,
    // };
    // ActivityfeedAction._deleteStatus(deleteData);
    }

  handleOpen = () => {
    this.setState({editOpen: true});
  }

  handleOpenDelete = () => {
    this.setState({deleteOpen: true});
  }

  handleOpenRecipie = () => {
    this.setState({recipieOpen: true});
  }

  handleClose = () => {
     this.setState({editOpen: false});
     this.setState({deleteOpen: false});
     this.setState({recipieOpen: false});
   }

  render(){

    const updateActions = [
      <FlatButton
        label="Update"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._editStatus}/>,

      <FlatButton
        label="Close"
        secondary={true}
        onTouchTap={this.handleClose}/>,
    ];

    const confirmDeleteActions = [
      <FlatButton
        label="Delete"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._deleteStatus}/>,

      <FlatButton
        label="Cansel"
        secondary={true}
        onTouchTap={this.handleClose}/>,
    ];

    return(
      <div className="column">
        <div className="col-lg-3">
          <Card style={Cardstyle}>
            <ListItem
              leftAvatar={<Avatar src='http://aurora-awards.com/wp-content/uploads/2017/05/girls-hd-images-cute-girl-hd-wallpaper-cnmuqi.jpg' />}
              primaryText='Madushika Perera'
              secondaryText={
                <p>
                  created_at
                </p>
              }
              secondaryTextLines={1}
              rightIconButton={
                  <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                    <MenuItem primaryText="Edit" onClick={this.handleOpen}/>
                    <MenuItem primaryText="Remove" onClick={this.handleOpenDelete}/>
                  </IconMenu> }
            />
            <CardMedia>
              <img style={{height:230}} src="https://i.ytimg.com/vi/zdpJy70Ou48/maxresdefault.jpg" />
            </CardMedia>
            <CardTitle className="col-lg-9 column" titleStyle={{fontSize: 18}} title={<b><a onClick={this.handleOpenRecipie}>Spunch cake</a></b>} subtitle="Cake" />
            <CardActions className="col-lg-3 column" style={{marginTop:15}}>
              <IconButton onClick={this._changeLikeState} tooltip={'Like'} touch={true} tooltipPosition="bottom-right">
                  <FavIcon onClick={this._changeLikeState} viewBox="0 0 20 30" color={deepOrange400} />
              </IconButton>
            </CardActions>
            <CardText className="col-lg-12 column" style={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}>
              Ingredients (Serves: 8)
                225g (8 oz) self-raising flour
                225g (8 oz) butter, at room temperature
                225g (8 oz) caster sugar
                4 eggs
                1 teaspoon baking powder

              Method
                Preheat the oven to 180 degrees C / gas mark 4.
                Measure all the ingredients into a large bowl.
                Mix all of the ingredients using a electric whisk.
                Pour the mixture into 2 non-stick 7 inch (18cm) tins.
                Place them in the oven till golden brown 15-25 minutes.
                Cool on a wire rack before serving.
            </CardText>
          </Card>
        </div>

        <Dialog
          title="Modify Your Recipie"
          actions={updateActions}
          modal={false}
          open={this.state.editOpen}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          contentStyle={{width:500}}
        >
            <div>
              <TextField hintText="Name" floatingLabelText="Name" onChange={e=>{this.setState({recName:e.target.value})}}/>
              <TextField hintText="Type" floatingLabelText="Type" onChange={e=>{this.setState({recType:e.target.value})}}/>
              <TextField hintText="Description" floatingLabelText="Description" multiLine={true} rows={5} rowsMax={100} onChange={e=>{this.setState({description:e.target.value})}}/>
              <br/><br/><br/>
              <Dropzone style={dropZoneStyle} onDrop={this.onDrop} multiple={false} accept="image/*">
                  <img style={dropZoneStyle} src={this.state.preview} />
                  <div style={{paddingLeft: 20}}>Try dropping some files here, or click to select files to upload.</div>
              </Dropzone>
              <br/><br/>
            </div>
        </Dialog>

        <Dialog
          title="Delete Recipie"
          actions={confirmDeleteActions}
          modal={false}
          open={this.state.deleteOpen}
          onRequestClose={this.handleClose}>
            Are you sure you want to delete this recipie?
        </Dialog>

        <Dialog
          title="Spunch cake"
          modal={false}
          open={this.state.recipieOpen}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}>
            <Card>
              <CardMedia>
                <img style={{height:400}} src="https://i.ytimg.com/vi/zdpJy70Ou48/maxresdefault.jpg" />
              </CardMedia>
              <CardText>
                Ingredients (Serves: 8)
                  225g (8 oz) self-raising flour
                  225g (8 oz) butter, at room temperature
                  225g (8 oz) caster sugar
                  4 eggs
                  1 teaspoon baking powder

                Method
                  Preheat the oven to 180 degrees C / gas mark 4.
                  Measure all the ingredients into a large bowl.
                  Mix all of the ingredients using a electric whisk.
                  Pour the mixture into 2 non-stick 7 inch (18cm) tins.
                  Place them in the oven till golden brown 15-25 minutes.
                  Cool on a wire rack before serving.
              </CardText>
            </Card>
        </Dialog>
      </div>
    );
  }

}

Newsfeeds.PropTypes = {
  isError: PropTypes.bool.isRequired,
  redireact: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
}

let mapStateToProps = (state,props) => {
  return {
    isError: state.user,
    redireact: state.user
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    actions:bindActionCreators(RecipeActions,dispatch)
  };
}

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(Newsfeeds));
