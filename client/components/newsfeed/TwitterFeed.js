import React,{Component} from 'react';


class TwitterFeed extends Component{

  render(){
    
    return(
      <a className="twitter-timeline" data-dnt="true" href="https://twitter.com/search?q=%23recipe%20" data-widget-id="871770866014715906">Tweets about #recipe </a>
    );
  }

}

export default TwitterFeed;
