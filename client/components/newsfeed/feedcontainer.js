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

      };
  }

  _renderItem = () => {
      // return this.state.results.map((result) => {
      //   return (<Newsfeeds key={result.id}
      //                      id={result.id}
      //                      name={result.name}
      //                      type={result.type}
      //                      description={result.description}
      //                      user_id={result.user_id}
      //                      user_name={result.user_name}
      //                      attachment={result.attachment}
      //                      created_at={result.created_at}
      //                      lkedpost={result.liked}/>);
      // });

      return (<Newsfeeds  key=1
                          id=1
                          name='Pizza'
                          type='Pizza'
                          description='aaaaaaaaaaaaaaaaaaaaaaa'
                          user_id=4
                          user_name='Madushika'
                          attachment='http://ptownpizza.com/images/Food/Pizza/Pizza01.jpg'
                          created_at='2017.06.02'
                          lkedpost='true'/>);
    },

  render(){
    return(
      <div>
          {this._renderItem()}
      </div>
    );
  }

}

FeedContainer.PropTypes = {
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
    actions:bindActionCreators(RecipeActions,dispatch)
  };
}

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(FeedContainer));
