import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

class Register extends Component {
    state = {
        firstname:"", 
        lastname:"", 
        email:"",
        password:"",
        confirm:"", 
        samePassword:true,
        login:false,
    }

    changeFirstname = (event) => {
        this.setState({firstname:event.target.value})
    }
    changeLastName = (event) => {
        this.setState({lastname:event.target.value})
    }
    changeEmail = (event) => {
        this.setState({email:event.target.value})
    }
    changePassword = (event) => {
        this.setState({password:event.target.value})
    }
    changeConfirm = (event) => {
        this.setState({confirm:event.target.value}, () => this.checkPassword())
    }

    checkPassword = () => {
        if (this.state.password === this.state.confirm) {
            this.setState({samePassword:true})
        } else {
            this.setState({samePassword:false})
        }
    }

    render(){
        const { classes } = this.props;
        const helper = this.state.samePassword ? null : <FormHelperText>Please make sure you input the same password</FormHelperText>
        const showError = !this.state.samePassword

        return (
            <Aux>
                <Typography variant="display3" color='inherit' gutterBottom>
                    Welcome to Sign Up!
                </Typography>
                <FormControl fullWidth className={classes.formControl}>
                <InputLabel>First Name</InputLabel>
                <Input value={this.state.firstname} onChange={this.changeFirstname} />
                </FormControl>
                
                <FormControl fullWidth className={classes.formControl}>
                <InputLabel>Last Name</InputLabel>
                <Input value={this.state.lastname} onChange={this.changeLastName} />
                </FormControl>

                <FormControl fullWidth className={classes.formControl}>
                <InputLabel>Email</InputLabel>
                <Input type='email' value={this.state.email} onChange={this.changeEmail} />
                </FormControl>

                <FormControl fullWidth className={classes.formControl}>
                <InputLabel>Password</InputLabel>
                <Input type='password' value={this.state.password} onChange={this.changePassword} />
                </FormControl>

                <FormControl fullWidth className={classes.formControl}>
                <InputLabel>Confirm Password</InputLabel>
                <Input type='password' error={showError} value={this.state.confirm} onChange={(event) => this.changeConfirm(event)} />
                {helper}
                </FormControl>

                <Button variant="contained" color="primary" className={classes.bottom}>Sign Up</Button>
                <Button variant="contained" color="secondary" onClick={() => this.props.switch()}>Switch to Sign In</Button>
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
    bottom:{
        marginRight:20
    }
  });

Register.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Register)

