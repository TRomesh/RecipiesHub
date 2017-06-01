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
import Dropzone from 'react-dropzone'
import AddRecipie from './addrecipie';
import {blueGrey50,lightBlue500,deepOrange400} from 'material-ui/styles/colors';

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
  marginLeft: 5,
};

const dropZoneStyle = {
  width: 100,
  height: 100,
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
    };
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
      console.log(files);
      this.setState({
          files: files,
          preview: files[0].preview
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

  // _saveImage = () => {
  //     var fd = new FormData();
  //     var self = this;
  //     fd.append('apitoken', localStorage.getItem('apitoken'));
  //     fd.append('file', this.state.files[0]);
  //     fd.append('email', localStorage.getItem('email'));
  //     fd.append('user', localStorage.getItem('username'));
  //     $.ajax({
  //         type: 'POST',
  //         url: '/user/profilepic?token=' + localStorage.getItem('apitoken'),
  //         data: fd,
  //         contentType: false,
  //         processData: false,
  //         success: function (data) {
  //             console.log("success");
  //             console.log(data);
  //             if(data.done == true) {
  //               UserActions.fetchProfilePicture(localStorage.getItem('apitoken'), localStorage.getItem('username'));
  //               location.reload();
  //             } else {
  //
  //             }
  //         },
  //         error: function (data) {
  //             console.log("error");
  //             console.log(data);
  //         }
  //     });
  // }

  renderSave = () => {
      return (
          this.state.preview ? <div>
              <RaisedButton onClick={this._saveImage} label="Save" primary={true} style={{width: 100,height: 20,marginTop: 40}}/>
              <RaisedButton label="Cancel" onClick={this._cancelEdit} style={buttonStyle} />
          </div> : ''
      );
  }

  MyFriends=()=>{
     return tilesData.map((user,index)=>{
      return  <GridTile
                  key={index}
                  title={<a>{user.title}</a>}
                  actionIcon={<IconButton><StarBorder color="white" /></IconButton>}>
                <img src={user.img} />
              </GridTile>
   });
  }

  render(){
    return(
      <div>
        <div className="column">
          <div className="col-lg-7">
            <Paper zDepth={1} className="column" style={stylePaper}>
              <div className="col-md-2">
                {
                  this.state.editingPic ? <div className="col-sm-1 col-md-1 col-lg-1">
                      <Dropzone style={dropZoneStyle} onDrop={this.onDrop} multiple={false} accept="image/*">
                          <div>Try dropping some files here, or click to select files to upload.</div>
                          <img style={dropZoneStyle} src={this.state.preview} />
                      </Dropzone>
                  {this.renderSave()}

                  </div> : <div className="col-sm-1 col-md-1 col-lg-1">
                              <GridList
                                cellHeight={200}
                              >
                                <GridTile style={proPicStyle}>
                                  <img src={'http://aurora-awards.com/wp-content/uploads/2017/05/girls-hd-images-cute-girl-hd-wallpaper-cnmuqi.jpg'} />
                                </GridTile>
                              </GridList>

                           </div>
                 }
              </div>

              <div className="col-md-6" style={styleTexts}>
                  <h4><b>{this.state.firstname + ' ' + this.state.lastname} </b></h4>
                  <h5>{this.state.count} Posts</h5>
              </div>

              <div className="col-md-2">
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  targetOrigin={{horizontal: 'right', vertical: 'top'}}
                  style={styleMenu}
                  >
                  <MenuItem primaryText="Change profile picture" onTouchTap={this._editProfilePic} />
                  <MenuItem primaryText="Edit profile" onTouchTap={this._editProfile} />
                </IconMenu>
              </div>
            </Paper>

            <div style={styleGridList}>
              <div style={styles.root}>
                <GridList
                  cellHeight={180}
                  style={styles.gridList}
                  cols={4}
                >
                  {
                    this.MyFriends()
                  }
                </GridList>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <Paper zDepth={1} style={{marginTop:50,marginLeft:40,marginRight:40, height: 500}}>
              <h3 style={{paddingTop: 30}}><center><b>Add Recipie</b></center></h3>
              <div style={{paddingLeft: 40}}>
                <TextField style={{width: 350}} hintText="Name" floatingLabelText="Name" onChange={e=>{this.setState({recName:e.target.value})}}/>
                <TextField style={{width: 350}}hintText="Type" floatingLabelText="Type" onChange={e=>{this.setState({recType:e.target.value})}}/>
                <TextField style={{width: 350}}hintText="Description" floatingLabelText="Description" multiLine={true} rows={5} rowsMax={100} onChange={e=>{this.setState({description:e.target.value})}}/>
                <br/><br/>
                <RaisedButton label="Add" primary={true} onTouchTap={this.add}/>
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
    redireact: state.recipe.redireact
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    Recipeactions:bindActionCreators(RecipeActions,dispatch),
    Useractions:bindActionCreators(UserActions,dispatch)
  };
}

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(Account));
