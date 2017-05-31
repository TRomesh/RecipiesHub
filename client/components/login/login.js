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
  height: 350,
  width: 370,
  marginLeft: 80,
  marginRight: 380,
  marginTop: 80,
  marginBottom: 50,
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: blueGrey50,
  paddingTop: 20,
};

const style1 = {
  color: lightBlue500
};

const style2 = {
  margin: 12,
};

class Login extends Component{

      constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: ''
        };


      }

    componentWillReceiveProps(nextProps){
      if(this.props.redireact.redireact){
        console.log('redireact true!');
          this.props.history.push('/chat')
      }
    }

    singin=()=>{
      console.log('signing in');
      this.props.actions.signIn({email:this.state.email,password:this.state.password});
      this.setState({email: '',password: '',loading:true});
      console.log('done sending to actions');
    }

  render(){
    return(
      <div style={{backgroundImage: "url(" + "https://addmeskype.files.wordpress.com/2015/09/d62cb-teenagers-offlinle-online.jpg" + ")",
               width:1301, height:654}}>
    <Paper style={style} zDepth={2}>
      <h1 style={style1}><center>Sign In</center></h1>
      <TextField hintText="Email" floatingLabelText="Email" onChange={e=>{this.setState({email:e.target.value})}}/>
      <TextField hintText="Password" floatingLabelText="Password" type="password" onChange={p=>{this.setState({password:p.target.value})}}/>
      <br/><br/>
      <RaisedButton label="Sign In" primary={true} style={style2} onTouchTap={this.singin}/>
    </Paper>
  </div>
    );
  }

}

Login.PropTypes = {
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

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));
