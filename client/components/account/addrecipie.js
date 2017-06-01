import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {blueGrey50,lightBlue500,deepOrange400} from 'material-ui/styles/colors';
import Dropzone from 'react-dropzone';

const proPicStyle = {
  width: 100,
  height: 100,
  marginTop: 30,
  marginLeft: 5,
};

const dropZoneStyle = {
  width: 300,
  height: 200,
  paddingLeft: 20,
};

class AddRecipie extends Component{

    constructor(props,contex){
       super(props,contex);

         this.state = {
           recName:'',
           recType:'',
           description:'',
           iamge: false,
           files: {},
           preview: '',
           mouseover: false,
           picture: '',
           loading:false
         }
    }

    add=()=>{
      // this.props.actions.signUp({
      //   recName:this.state.recName,
      //   recType:this.state.recType,
      //   description:this.state.description,
      // });
      // this.setState({recName:'',recType:'',description:''});
    }

  render(){
    return(
      <div>
        <Paper zDepth={1} style={{marginTop:50,marginLeft:40,marginRight:40, height: 500}}>
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
            <RaisedButton label="Add" primary={true} onTouchTap={this.add} style={{marginLeft:250}}/>
          </div>
        </Paper>
  </div>
    );
  }

}

AddRecipie.PropTypes = {
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
    actions:bindActionCreators(AuthActions,dispatch)
  };
}

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(AddRecipie));
