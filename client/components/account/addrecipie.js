import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {blueGrey50,lightBlue500,deepOrange400} from 'material-ui/styles/colors';

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
          <h1><center><b>Add Recipie</b></center></h1>
          <TextField hintText="Name" floatingLabelText="Name" onChange={e=>{this.setState({recName:e.target.value})}}/>
          <TextField hintText="Type" floatingLabelText="Type" onChange={e=>{this.setState({recType:e.target.value})}}/>
          <TextField hintText="Description" floatingLabelText="Description" onChange={e=>{this.setState({description:e.target.value})}}/>
        <br/><br/>
          <RaisedButton label="Add" primary={true} onTouchTap={this.add}/>
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
