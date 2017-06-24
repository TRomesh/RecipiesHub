import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import * as RecipeActions from '../../actions/RecipeActions';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Newsfeeds from './newsfeed';
import TwitterFeed from './TwitterFeed';

const Twitterstyle = {
  marginTop: 20,
};

class FeedContainer extends Component{

  constructor(props) {
    super(props);
      this.state = {
          search:'',
          dataSource: []
      };
      this.props.recipactions.GetAllRecipes();
  }

  componentWillMount(){
    this.props.recipactions.GetAllRecipes();
  }

  searchRecipe=(e)=>{
      if(e.keyCode == 13){
        this.props.recipactions.GetRecipe({fname:e.target.value});
     }
  }

  _renderItem = () => {

    return  this.props.recipies.map((rec,index)=>{
        return (<Newsfeeds  key={index}
                            id={rec._id}
                            name={rec.fname}
                            type={rec.type}
                            description={rec.description}
                            user_name={rec.cname}
                            cimage={rec.cimage}
                            attachment={rec.image}
                            created_at={rec.created}
                            lkedpost='true'/>);
      });

    }

  render(){
    return(
      <div className="column">
        <div className="col-md-12">
          <Paper zDepth={1} style={{ margin: 20}}>
            <div style={{padding:10}}>
              <TextField
                hintText="Search Recipes"
                fullWidth={true}
                onKeyDown={this.searchRecipe}
                onChange={e=>{this.setState({searchtxt:e.target.value})}}
              />
            </div>
        </Paper>
        </div>
        <div className="col-md-9">
            {(this.props.recipies)? this._renderItem():<div></div>}
        </div>
        <div className="col-md-3" style={Twitterstyle}>
          <TwitterFeed/>
        </div>
      </div>
    );
  }

}

FeedContainer.PropTypes = {
  isError: PropTypes.bool.isRequired,
  rerender: PropTypes.bool.isRequired,
  recipies:  PropTypes.object.isRequired,
  recipactions: PropTypes.object.isRequired
}

let mapStateToProps = (state,props) => {
  return {
    isError: state.user,
    redireact: state.user,
    recipies:state.recipe.allrecipe,
    rerender:state.recipe.rerender
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    recipactions:bindActionCreators(RecipeActions,dispatch)
  };
}

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(FeedContainer));
