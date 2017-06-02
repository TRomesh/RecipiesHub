import React,{Component} from 'react';
import Login from './login/login';
import Signup from './signup/signup';
import Account from './account/account';
import Navigation from './navigation/navigation';
import Newsfeeds from './newsfeed/feedcontainer';
import Test from './test';
import injectTapEventPlugin from 'react-tap-event-plugin';
import createBrowserHistory from 'history/createBrowserHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

const history = createBrowserHistory({});
injectTapEventPlugin();

let hasToken = () => {
  const token = localStorage.getItem('jwtToken');
  return (token == undefined);
}

class App extends Component{

  render(){
    return(
      <MuiThemeProvider>
       <Router history={history}>
         <Switch>
           <Route exact path="/login" component={Login}/>
           <Route exact path="/signup" component={Signup}/>
           <Route exact path="/test" component={Test}/>
            <Navigation>
             <Route exact path="/account" render={() => (hasToken() ? (<Redirect to="/login"/>) : (<Account />))}/>
             <Route exact path="/home" render={() => (hasToken() ? (<Redirect to="/login"/>) : (<Newsfeeds />))}/>
           </Navigation>
         </Switch>
       </Router>
     </MuiThemeProvider>
    );
  }

}

export default App;
