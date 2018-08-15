import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'

class Auth extends Component {
    state = {
        isLogin:true,
    }

    switch = () => {
        this.setState({isLogin:!this.state.isLogin})
    }    

    render(){
        const { classes } = this.props;
        const form = this.state.isLogin ? <Login switch={this.switch}/> : <Register switch={this.switch}/>

        return(
            <div className={classes.container}>
                {form}
            </div>
        )
    }
}


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      paddingLeft: 300,
      paddingRight: 300,
    },
    formControl: {
      margin: theme.spacing.unit,
    },
  });

export default withStyles(styles)(Auth)