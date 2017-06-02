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
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dropzone from 'react-dropzone';
import AddRecipie from './addrecipie';
import {blueGrey50,lightBlue500,deepOrange400} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';

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

const tilesData = [
  {
    img: 'http://static5.businessinsider.com/image/56450d312491f9b9008b4bd4/50-meals-everyone-should-eat-in-their-lifetime.jpg',
    title: 'Special fried rice with prawns',
  },
  {
    img: 'http://www.leanphysiquemeals.co.uk/wp-content/uploads/2015/02/bigstock-Pasta-Meal-1095251.jpg',
    title: 'Vegi pasta',
  },
  {
    img: 'http://www.travelistanbulhotels.com/media/dXSbL-inside-crucial-aspects-for-appetizers.png',
    title: 'Vegitable salad with crispy fried fish',
  },
  {
    img: 'http://cdn2.tmbi.com/TOH/Images/Photos/37/1200x1200/Strawberries---Cream-Torte_exps167223_TH2847295D02_21_4bC_RMS.jpg',
    title: 'Strawberry cake with fresh cream',
  },
  {
    img: 'http://www.sugaretal.com/wp-content/uploads/2013/06/IMG_0767-1.jpg?x87046',
    title: 'Chocolate mousse',
  },
  {
    img: 'http://cdn2.tmbi.com/TOH/Images/Photos/37/1200x1200/exps143154_THCA153054A09_11_2b.jpg',
    title: 'Special chocolate dessert with strawberry',
  },
  {
    img: 'https://i.ytimg.com/vi/-H7PPTc9J90/maxresdefault.jpg',
    title: 'Italian spaghetti',
  },
  {
    img: 'http://files.hungryforever.com/wp-content/uploads/2015/09/23213411/pizza.jpg',
    title: 'Pizza with chicken and baby mushroom',
  },
];

class Account extends Component{

  constructor(props) {
    super(props);
    this.state = {
      editingPic: false,
      files: {},
      preview: '',
      mouseover: false,
      picture: '',
      firstname: 'Madushika',
      lastname: 'Perera',
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
  }

  componentDidMount = () => {
    //UserActions.fetchProfilePicture(localStorage.getItem('apitoken'), localStorage.getItem('username'));
    //ProfileStore.addChangeListener(this._onChange);
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
      this.props.Recipeactions.uploadRecPic({
        file,
        name:this.state.recName
      });
  }

  onDropProfile = (profilefiles) => {
      const file = profilefiles[0];
      console.log(file);
      this.setState({
          profilefiles: file,
          profilepreview: file.preview
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
     return tilesData.map((user,index)=>{
      return (<GridTile
                  key={index}
                  title={<a onClick={this.handleOpenRecipie}>{user.title}</a>}
                  actionIcon={<IconButton><StarBorder color="white" /></IconButton>}>
                <img src={user.img} />
              </GridTile>)
   });
  }

  addrecipie=()=>{
    this.props.Recipeactions.AddNewRecipe({
      fname:this.state.recName,
      type:this.state.recType,
      desc:this.state.description
    });
  }

  _editProfile = () => {
    // let status = this.refs.EditBox.getValue();
    // let editData = {
    //   userId: localStorage.getItem('userid'),
    //   postId: this.props.id,
    //   status: status,
    // };
    // ActivityfeedAction._editStatus(editData);
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
                          <img src={'http://aurora-awards.com/wp-content/uploads/2017/05/girls-hd-images-cute-girl-hd-wallpaper-cnmuqi.jpg'} />
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
                  <TextField style={{width: 350}} hintText="First name" floatingLabelText="First name" onChange={e=>{this.setState({recfname:e.target.value})}}/>
                  <TextField style={{width: 350}} hintText="Last name" floatingLabelText="Last name" onChange={e=>{this.setState({reclname:e.target.value})}}/>
                  <TextField style={{width: 350}} hintText="Username" floatingLabelText="Username" onChange={e=>{this.setState({recuname:e.target.value})}}/>
                  <TextField style={{width: 350}} hintText="Email" floatingLabelText="Email" onChange={e=>{this.setState({recemail:e.target.value})}}/>
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
                                    <img src={'http://aurora-awards.com/wp-content/uploads/2017/05/girls-hd-images-cute-girl-hd-wallpaper-cnmuqi.jpg'} />
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
              <div style={styles.root}>
                <GridList
                  cellHeight={180}
                  style={styles.gridList}
                  cols={4}
                >
                  {
                    this.MyRecipies()
                  }
                </GridList>
              </div>
            </div>
          </div>

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

          <div className="col-lg-5">
            <Paper zDepth={1} style={{marginTop:50,marginLeft:40,marginRight:40, height: 780}}>
              <h3 style={{paddingTop: 30}}><center><b>Add Recipie</b></center></h3>
              <div style={{paddingLeft: 40}}>
                <TextField style={{width: 350}} hintText="Name" floatingLabelText="Name" onChange={e=>{this.setState({recName:e.target.value})}}/>
                <TextField style={{width: 350}}hintText="Type" floatingLabelText="Type" onChange={e=>{this.setState({recType:e.target.value})}}/>
                <TextField style={{width: 350}}hintText="Description" floatingLabelText="Description" multiLine={true} rows={5} rowsMax={100} onChange={e=>{this.setState({description:e.target.value})}}/>
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
