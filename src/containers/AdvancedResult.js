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





class AdvancedResult extends Component {
    state = {
        select:'',
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
                                <option value='Kmeans'>Kmeans</option>
                                <option value='CPC'>CPC</option>
                                <option value='STC'>STC</option>
                                <option value='Citations'>Citations</option>
                            </Select>
                        </FormControl>
                        </div>
                        <Paper className={classes.paper}>
                            <DataGraph />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                   
                        <Paper className={classes.paper}>
                        <Scrollbars style={{ width: '100%', height: 652, border:'1px gray',borderRadius:'15px' }}>
                            <PatentList />
                        </Scrollbars>
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
  });

export default withStyles(styles)(AdvancedResult)