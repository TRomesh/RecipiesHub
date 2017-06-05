import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
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
    this.props.recipactions.UpdateRecipe({
      id:localStorage.getItem('selrec'),
      fname:this.state.recName,
      type:this.state.recType,
      description:this.state.description
    });
    this.handleClose();
  }

  _deleteStatus = () => {
      this.props.recipactions.RemoveRecipe({
        id:localStorage.getItem('selrec')
      });
      this.handleClose();
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
        <div className="col-lg-4">
          <Card style={Cardstyle}>
            <ListItem
              leftAvatar={<Avatar src={'routes/media/'+ this.props.cimage} />}
              primaryText={this.props.user_name}
              secondaryText={
                <p>
                {this.props.created_at}
                </p>
              }
              secondaryTextLines={1}
              rightIconButton={
                  <IconMenu onTouchTap={e=>{localStorage.setItem('selrec',this.props.id);}} iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}>
                    <MenuItem primaryText="Edit" onClick={this.handleOpen}/>
                    <MenuItem primaryText="Remove" onClick={this.handleOpenDelete}/>
                  </IconMenu> }
            />
            <CardMedia>
              <img style={{height:230}} src={'routes/media/'+ this.props.attachment} />
            </CardMedia>
            <CardTitle className="col-lg-9 column" titleStyle={{fontSize: 18}} title={<b><a onClick={this.handleOpenRecipie}>{this.props.name}</a></b>} subtitle={this.props.type} />
            <CardActions className="col-lg-3 column" style={{marginTop:15}}>
              <IconButton>
                  <FavIcon color="red" />
              </IconButton>
            </CardActions>
            <CardText className="col-lg-12 column" style={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}}>
              {this.props.description}
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
              {this.props.id}
              <TextField hintText={this.props.name} floatingLabelText="Name" onChange={e=>{this.setState({recName:e.target.value})}}/>
              <TextField hintText={this.props.type} floatingLabelText="Type" onChange={e=>{this.setState({recType:e.target.value})}}/>
              <TextField hintText={this.props.description} floatingLabelText="Description" multiLine={true} rows={5} rowsMax={100} onChange={e=>{this.setState({description:e.target.value})}}/>
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
          title={this.props.name}
          modal={false}
          open={this.state.recipieOpen}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}>
            <Card>
              <CardMedia>
                <img style={{height:400}} src={'routes/media/'+ this.props.attachment} />
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

Newsfeeds.PropTypes = {
  isError: PropTypes.bool.isRequired,
  redireact: PropTypes.bool.isRequired,
  recipactions: PropTypes.object.isRequired
}

let mapStateToProps = (state,props) => {
  return {
    isError: state.user,
    redireact: state.user
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    recipactions:bindActionCreators(RecipeActions,dispatch)
  };
}

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(Newsfeeds));
