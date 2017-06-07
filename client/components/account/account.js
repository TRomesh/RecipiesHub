import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as RecipeActions from '../../actions/RecipeActions';
import * as UserActions from '../../actions/UserActions';
import Paper from 'material-ui/Paper';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FavIcon from 'material-ui/svg-icons/action/favorite';
import FavIconBorder from 'material-ui/svg-icons/action/favorite-border';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dropzone from 'react-dropzone';
import {blueGrey50,lightBlue500,deepOrange400} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import MyRecipe from './myrecipe';

const stylePaper = {
  height: 160,
  width: 700,
  marginTop: 50,
  marginLeft: 30,
};

const proPicStyle = {
  width: 100,
  height: 100,
  marginTop: 30,
  marginLeft: 15,
};

const dropZoneStyle = {
  width: 300,
  height: 200,
  paddingLeft: 20,
};

const profileDropZoneStyle = {
  width: 200,
  height: 200,
};

const styleMenu = {
  marginLeft: 130,
  marginTop: 15,
};

const styleTexts = {
  paddingTop: 40,
  marginLeft: 35,
};

const buttonStyle = {
  width: 100,
  height: 20,
};

const styleGridList = {
  marginTop: 30,
  marginLeft: 30,
};

const styles = {
  root: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 700,
  },
};

const checkboxstyles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};


class Account extends Component{

  constructor(props) {
    super(props);
    this.state = {
      editingPic: false,
      files: {},
      preview: '',
      mouseover: false,
      picture: '',
      count: 10,
      recName:'',
      recType:'',
      description:'',
      editOpen: false,
      recipieOpen: false,
      deleteOpen: false,
      profilepreview: '',
      profilefiles: {},
    };
    this.props.Useractions.GetUser({uname:localStorage.getItem('usr')});
    this.props.Recipeactions.GetMyRecipe({uname:localStorage.getItem('usr')});
  }

  componentDidMount = () => {
    //UserActions.fetchProfilePicture(localStorage.getItem('apitoken'), localStorage.getItem('username'));
    //ProfileStore.addChangeListener(this._onChange);
  }

  componentWillMount(){
    this.props.Useractions.GetUser({uname:localStorage.getItem('usr')});
    this.props.Recipeactions.GetMyRecipe({uname:localStorage.getItem('usr')});
  }

  _onChange = () => {
    this.setState({
      //picture: ProfileStore.getProfilePic()
    });
  }

  _editProfilePic = () => {
      this.setState({
          editingPic: !this.state.editingPic
      });
  }

  onDrop = (files) => {
      const file = files[0];
      console.log(file);
      this.setState({
          files: file,
          preview: files[0].preview
      });
  }

  onDropProfile = (profilefiles) => {
      const file = profilefiles[0];
      console.log(file);
      this.setState({
          profilefiles: file,
          profilepreview: profilefiles[0].preview
      });
  }

  _cancelEdit = () => {
      this.setState({
          editingPic: false,
          preview: '',
          files: '',
      });
  }

  _showUpload = () => {
    this.setState({
      mouseover: true
    });
  }

  _hideUpload = () => {
    this.setState({
      mouseover: false
    });
  }

  MyRecipies=()=>{
     return this.props.myrecipe.map((recip,index)=>{
      return (
        <MyRecipe
          key={index}
          fname={recip.fname}
          image={recip.image}
          description={recip.description}
        />
    )
   });
  }

  addrecipie=()=>{
      let token = Math.random();

      this.props.Recipeactions.AddNewRecipe({
        fname:this.state.recName,
        type:this.state.recType,
        desc:this.state.description,
        creator:localStorage.getItem('usr'),
        image:token+'.'+this.state.files.type.substring(6)
      });
      this.props.Recipeactions.uploadRecPic({
              file:this.state.files,
              name:token
      });
      console.log(token);
  }

  _editProfile = () => {
    this.props.Useractions.UpdateUser({
      fname:this.state.fname,
      lname:this.state.lname,
      email:this.state.email,
      uname:localStorage.getItem('usr'),
      image:localStorage.getItem('usr')+'.'+(this.state.profilefiles.type).substring(6)
    });
    this.props.Useractions.uploadProPic({
      file:this.state.profilefiles,
      name:localStorage.getItem('usr')
    });
    this.handleClose();
  }

  _deleteProfile = () => {
    // let deleteData = {
    //   userId: localStorage.getItem('userid'),
    //   postId: this.props.id,
    // };
    // ActivityfeedAction._deleteStatus(deleteData);
    }

  handleOpen = () => {
    this.setState({editOpen: true});
  }

  handleOpenRecipie = () => {
    this.setState({recipieOpen: true});
  }

  handleOpenDelete = () => {
    this.setState({deleteOpen: true});
  }

  handleClose = () => {
     this.setState({editOpen: false});
     this.setState({recipieOpen: false});
     this.setState({deleteOpen: false});
   }

   searchMyRecipe=(e)=>{
     if(e.keyCode == 13){
       console.log(e.target.value);
       this.props.Recipeactions.GetfromMyRecipe({fname:e.target.value,creator:localStorage.getItem('usr')})
    }
   }


  render(){

    const updateActions = [
      <FlatButton
        label="Update"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this._editProfile}/>,

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
        onTouchTap={this._deleteProfile}/>,

      <FlatButton
        label="Cansel"
        secondary={true}
        onTouchTap={this.handleClose}/>,
    ];

    return(
      <div>
        <div className="column">
          <div className="col-lg-7">
            <Paper zDepth={1} className="column" style={stylePaper}>
              <div className="col-md-2">
                <div>
                    <GridList cellHeight={200} >
                      <GridTile style={proPicStyle}>
                          <img src={'routes/media/'+ this.props.user.image} />
                      </GridTile>
                    </GridList>
                </div>
              </div>

              <div className="col-md-6" style={styleTexts}>
                  <h4><b>{this.props.user.fname + ' ' + this.props.user.lname} </b></h4>
                  <h5>{this.state.count} Posts</h5>
              </div>

              <div className="col-md-2">
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  style={styleMenu}
                  >
                  <MenuItem primaryText="Edit profile" onTouchTap={this.handleOpen} />
                  <MenuItem primaryText="Delete profile" onTouchTap={this.handleOpenDelete} />
                </IconMenu>
              </div>
            </Paper>

            <Dialog
              title="Modify Profile"
              actions={updateActions}
              modal={false}
              open={this.state.editOpen}
              onRequestClose={this.handleClose}
              autoScrollBodyContent={true}
              contentStyle={{width:550}}
            >
                <div style={{paddingLeft: 60}}>
                  <TextField style={{width: 350}} hintText={this.props.user.fname} floatingLabelText="First name" onChange={e=>{this.setState({fname:e.target.value})}}/>
                  <TextField style={{width: 350}} hintText={this.props.user.lname} floatingLabelText="Last name" onChange={e=>{this.setState({lname:e.target.value})}}/>
                  <TextField style={{width: 350}} hintText={this.props.user.email} floatingLabelText="Email" onChange={e=>{this.setState({email:e.target.value})}}/>
                  <br/><br/>
                  <Checkbox label="Change profile picture" onCheck={this._editProfilePic}/>
                  <br/>
                  {
                    this.state.editingPic ? <div>
                        <Dropzone style={profileDropZoneStyle} onDrop={this.onDropProfile} multiple={false} accept="image/*">
                            <div>Try dropping some files here, or click to select files to upload.</div>
                            <img style={profileDropZoneStyle} src={this.state.profilepreview} />
                        </Dropzone>

                    </div> : <div className="col-sm-1 col-md-1 col-lg-1">
                                <GridList
                                  cellHeight={200}
                                >
                                  <GridTile style={profileDropZoneStyle}>
                                    <img src={'routes/media/'+ this.props.user.image}/>
                                  </GridTile>
                                </GridList>

                             </div>
                   }
                  <br/><br/>
                </div>
            </Dialog>

            <Dialog
              title="Delete Profile"
              actions={confirmDeleteActions}
              modal={false}
              open={this.state.deleteOpen}
              onRequestClose={this.handleClose}>
                Are you sure you want to delete this profile?
            </Dialog>

            <div style={styleGridList}>
              <Paper zDepth={1}>
                <div style={{padding:10,margin:10}}>
                  <TextField
                    hintText="Search My Recipes"
                    fullWidth={true}
                    onKeyDown={this.searchMyRecipe}
                    onChange={e=>{this.setState({mysearchtxt:e.target.value})}}
                  />
                </div>
            </Paper>
              <div style={styles.root}>
                <GridList
                  cellHeight={250}
                  style={styles.gridList}
                  cols={4}
                >
                  {
                  (this.props.myrecipe)? this.MyRecipies():<div></div>
                  }
                </GridList>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <Paper zDepth={1} style={{marginTop:50,marginLeft:40,marginRight:40, height: 780}}>
              <h3 style={{paddingTop: 30}}><center><b>Add Recipie</b></center></h3>
              <div style={{paddingLeft: 40}}>
                <TextField style={{width: 350}} hintText="Name" floatingLabelText="Name" onChange={e=>{this.setState({recName:e.target.value})}}/>
                <TextField style={{width: 350}} hintText="Type" floatingLabelText="Type" onChange={e=>{this.setState({recType:e.target.value})}}/>
                <TextField style={{width: 350}} hintText="Description" floatingLabelText="Description" multiLine={true} rows={5} rowsMax={100} onChange={e=>{this.setState({description:e.target.value})}}/>
                <br/><br/><br/>
                <Dropzone style={dropZoneStyle} onDrop={this.onDrop} multiple={false} accept="image/*">
                    <img style={dropZoneStyle} src={this.state.preview} />
                    <div style={{paddingLeft: 20}}>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
                <br/><br/><br/><br/>
                <RaisedButton label="Add" primary={true} onTouchTap={this.addrecipie} style={{marginLeft:250}}/>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    );
  }

}

Account.PropTypes = {
  isError: PropTypes.bool.isRequired,
  redireact: PropTypes.bool.isRequired,
  Recipeactions: PropTypes.object.isRequired,
  Useractions:PropTypes.object.isRequired
}

let mapStateToProps = (state,props) => {
  return {
    isError: state.recipe.isError,
    redireact: state.recipe.redireact,
    myrecipe: state.recipe.myrecipe,
    user: state.user
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    Recipeactions:bindActionCreators(RecipeActions,dispatch),
    Useractions:bindActionCreators(UserActions,dispatch)
  };
}

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(Account));
