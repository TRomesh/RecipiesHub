import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

class Navigation extends Component{



   render(){
     return(
       <div>
       <AppBar
         title={<span style={styles.title}>RecipesHub</span>}
         iconElementLeft={<IconButton></IconButton>}
         iconElementRight={
           <div style={{marginRight:'0px',marginTop:'8px'}}>
             <Link to="/home"><FlatButton label="Home" /></Link>
             <Link to="/account"><FlatButton label="Account" /></Link>
           </div>
       }/>
         {this.props.children}
       </div>
     );
   }
}

export default Navigation;
