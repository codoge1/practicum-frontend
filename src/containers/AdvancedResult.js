import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DataGraph from '../components/DataGraph'
import DataList from '../components/DataList'
import PatentList from '../components/PatentList'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { Scrollbars } from 'react-custom-scrollbars';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';





class AdvancedResult extends Component {
    state = {
        select:'Lingo',
    }

    handleChange = name => event => {

        this.setState({ [name]: event.target.value });
    }



    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                    <div style={{float:'left', paddingLeft:'3%'}}>
                        <FormControl>
                            {/* <InputLabel htmlFor="age-native-simple">Age</InputLabel> */}
                            <Select
                                native
                                value={this.state.select}
                                onChange={this.handleChange('select')}
                                inputProps={{
                                name: 'age',
                                id: 'age-native-simple',
                                }}
                            >
                                <option value='Lingo'>Lingo</option>
                                <option value='Kmeans'>Kmeans</option>
                                <option value='STC'>STC</option>
                            </Select>
                        </FormControl>
                        </div>
                        <Paper className={classes.paper}>
                            <DataGraph select={this.state.select}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                   
                        <Paper className={classes.paper}>
                        <Scrollbars style={{ width: '95%', height: 602, border:'1px gray',borderRadius:'15px' }}>
                            <PatentList select={this.state.select}/>
                        </Scrollbars>
                        <Button className={classes.button} variant="contained" onClick={this.props.clearClassData} color="primary">
                            Show All Patents
                        </Button>
                        </Paper>
                        
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing.unit,
      },
  });



  const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearClassData:() => dispatch({type:'classData', classData:[]}),
        
        
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AdvancedResult))