import React,{Component} from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

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
         iconElementRight={<FlatButton label="Save" />}/>
         {this.props.children}
       </div>
     );
   }
}

export default Navigation;
