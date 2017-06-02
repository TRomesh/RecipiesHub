import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
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
           <div>
             <Link to="/home"><FlatButton label="Home"/></Link>
             <Link to="/account"><FlatButton label="Account" /></Link>
             <IconMenu
               iconButtonElement={
                 <IconButton><MoreVertIcon /></IconButton>
               }
               targetOrigin={{horizontal: 'right', vertical: 'top'}}
               anchorOrigin={{horizontal: 'right', vertical: 'top'}}
             >
               <Link to="/login"><MenuItem primaryText="Sign out" onTouchTap={e=>{localStorage.clear();}}/></Link>
             </IconMenu>
           </div>
       }/>
         {this.props.children}
       </div>
     );
   }
}

export default Navigation;
