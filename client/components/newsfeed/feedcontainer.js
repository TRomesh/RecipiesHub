import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import * as RecipeActions from '../../actions/RecipeActions';
import Newsfeeds from './newsfeed';

class FeedContainer extends Component{

  constructor(props) {
    super(props);
      this.state = {
          search:''
      };
      this.props.recipactions.GetAllRecipes();
  }

  componentWillMount(){
    this.props.recipactions.GetAllRecipes();
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
      <div className="row">
        <div className="col-md-9">
            {(this.props.recipies)? this._renderItem():<div></div>}
        </div>
        <div className="col-md-3">
          <a className="twitter-timeline" data-dnt="true" href="https://twitter.com/search?q=%23recipe%20" data-widget-id="871770866014715906">Tweets about #recipe </a>
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
