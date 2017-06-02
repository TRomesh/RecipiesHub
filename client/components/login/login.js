import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as AuthActions from '../../actions/AuthActions';
import {deepOrange50,pink500,deepOrange400,grey50} from 'material-ui/styles/colors';

const style = {
  height: 350,
  width: 370,
  marginLeft: 80,
  marginRight: 380,
  marginTop: 80,
  marginBottom: 50,
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor: deepOrange50,
  paddingTop: 20,
};

const style1 = {
  color: deepOrange400
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
      if(this.props.redireact){
        console.log('redireact true!');
          this.props.history.push('/home')
      }
    }

    singin=()=>{
      console.log('signing in');
      this.props.actions.signIn({email:this.state.email,password:this.state.password});
      this.setState({email: '',password: '',loading:true});
      console.log('done sending to actions');
    }

  render(){
    if(this.props.redireact){
      console.log('redireact true!');
        this.props.history.push('/home')
    }
    return(
      <div style={{backgroundImage: "url(" + "https://i.ytimg.com/vi/zdpJy70Ou48/maxresdefault.jpg" + ")",
               width:1301, height:654}}>
    <Paper style={style} zDepth={2}>
      <h1 style={style1}><center><b>Sign In</b></center></h1>
      <TextField hintText="Email" floatingLabelText="Email" onChange={e=>{this.setState({email:e.target.value})}}/>
      <TextField hintText="Password" floatingLabelText="Password" type="password" onChange={p=>{this.setState({password:p.target.value})}}/>
      <br/><br/>
      <RaisedButton label="Sign In" primary={true} buttonStyle={{backgroundColor:deepOrange400}} style={style2} onTouchTap={this.singin}/>
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
    isError: state.user.isError,
    redireact: state.user.redireact
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    actions:bindActionCreators(AuthActions,dispatch)
  };
}

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));
