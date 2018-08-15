import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

class Login extends Component {
    state = {
        email:"", 
        password:"",
    }

    changeEmail = (event) => {
        this.setState({email:event.target.value})
    }

    changePassword = (event) => {
        this.setState({password:event.target.value})
    }

    render(){
        const { classes } = this.props;
        return (
            <Aux>
                <Typography variant="display3" color='inherit' gutterBottom>
                    Welcome to Login!
                </Typography>
                <FormControl fullWidth className={classes.formControl}>
                <InputLabel>Email</InputLabel>
                <Input type='email' value={this.state.email} onChange={this.changeEmail} />
                </FormControl>
                
                <FormControl fullWidth className={classes.formControl}>
                <InputLabel>Password</InputLabel>
                <Input type='password' value={this.state.password} onChange={this.changePassword} />
                </FormControl>

                <Button variant="contained" color="primary" className={classes.button}>Sign In</Button>
                <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.props.switch()}>Switch to Sign Up</Button>
            </Aux>
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
    button:{
        marginRight:20
    }
  });

Login.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Login)
