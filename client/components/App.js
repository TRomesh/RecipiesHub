import React,{Component} from 'react';
import Login from './login/login';
import Signup from './signup/signup';
import Account from './account/account';
import Newsfeeds from './newsfeed/newsfeed';
import createBrowserHistory from 'history/createBrowserHistory';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const history = createBrowserHistory({});

class App extends Component{

  render(){
    return(
       <Router history={history}>
         <Switch>
           <Route exact path="/Login" component={Login}/>
           <Route exact path="/signup" component={Signup}/>
           <Route exact path="/account" component={Account}/>
           <Route exact path="/home" component={Newsfeeds}/>
         </Switch>
       </Router>
    );
  }

}

export default App;
