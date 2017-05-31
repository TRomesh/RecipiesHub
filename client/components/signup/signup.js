import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as AuthActions from '../../actions/AuthActions';
import {blueGrey50,lightBlue500} from 'material-ui/styles/colors';

const style = {
  height: 554,
  width: 400,
  marginLeft: 200,
  marginRight: 380,
  marginTop: 50,
  marginBottom: 50,
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: blueGrey50
};

const style1 = {
  color: lightBlue500
};

const style2 = {
  margin: 12,
};

class Signup extends Component{

      constructor(props,contex){
       super(props,contex);

         this.state = {
           fname:'',
           lname:'',
           uname:'',
           email:'',
           password:'',
           loading:false
         }
    }

    validateEmail = (event) => {
      // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(event);
    };

    isEmpty = (value) => {
      //return !_.isEmpty(value);
    };

    singup=()=>{
      this.props.actions.signUp({
        fname:this.state.fname,
        lname:this.state.lname,
        uname:this.state.uname,
        email:this.state.email,
        password:this.state.password
      });
      this.setState({fname:'',lname:'',uname:'',email:'',password:''});
    }

  render(){
    return(
      <div style={{backgroundImage: "url(" + "https://www-static-blogs.operacdn.com/multi/wp-content/uploads/sites/2/2015/02/Girl_laptop.jpg" + ")" }}>
        <Paper style={style} zDepth={2}>
          <h1 style={style1}><center>Sign Up</center></h1>
          <TextField hintText="First name" floatingLabelText="First name" onChange={e=>{this.setState({fname:e.target.value})}}/>
          <TextField hintText="Last name" floatingLabelText="Last name" onChange={e=>{this.setState({lname:e.target.value})}}/>
          <TextField hintText="Username" floatingLabelText="Username" onChange={e=>{this.setState({uname:e.target.value})}}/>
          <TextField hintText="Email" floatingLabelText="Email" onChange={e=>{this.setState({email:e.target.value})}}/>
          <TextField hintText="Password" floatingLabelText="Password" type="password" onChange={e=>{this.setState({password:e.target.value})}}/>
          <br/><br/>
          <RaisedButton label="Sign Up" primary={true} style={style2} onTouchTap={this.singup}/>
        </Paper>
  </div>
    );
  }

}

Signup.PropTypes = {
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

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(Signup));
