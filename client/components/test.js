import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as RecipeActions from '../actions/RecipeActions';
import * as UserActions from '../actions/UserActions';


class Test extends Component{

    constructor(props){
        super(props);
        this.state={
          fname:'',
          type:'',
          description:''
        }
    }

    add=()=>{
        this.props.Recipeactions.AddNewRecipe(this.state);
        this.props.Useractions.GetUsers();
    }

    render(){
      return(
        <div>
          <TextField id="fname" onChange={e=>{this.setState({fname:e.target.value})}}/>
          <br/>
          <TextField id="type" onChange={e=>{this.setState({type:e.target.value})}}/>
            <br/>
          <TextField id="desc" onChange={e=>{this.setState({description:e.target.value})}}/>
            <br/>
          <RaisedButton label="add" primary={true} onTouchTap={this.add}/>
        </div>
        );
    }


}

Test.PropTypes = {
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

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(Test));
