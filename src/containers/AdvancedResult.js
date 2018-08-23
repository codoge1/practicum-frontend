import React, {Component} from 'react';
import ReactDOM from 'react-dom';
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

    goBack = () => {
        this.props.history.goBack()
    }

    switchToList = () => {
        this.props.history.push('/advanced/classificationList')
    }

    returnToSearch = () => {
        this.props.history.push('/advanced')
      }

    componentDidMount = () => {
        // console.log(ReactDOM.unmountComponentAtNode(document.getElementsByClassName('bubble-legend')[0]));
        let node = document.getElementsByClassName('bubble-legend')[0]
        node.style.height = '0px'
        console.log('here')
      }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Grid container spacing={24} style={{backgroundColor:'#FAFAFA'}}>
                    <Grid item xs={6}>
                    <Paper className={classes.paper} style={{display:'flex',flexDirection:'column', height:'95%'}}>
                        <FormControl style={{textAlign:'center', float:'left',paddingLeft:'3%', width:'12%'}}>
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
                        <br />
                        <div>

                            <DataGraph  select={this.state.select}/>

                            <Button className={classes.button} style={{backgroundColor:'#2874F0'}} variant="contained" onClick={this.switchToList} color="primary">
                                Show as List
                            </Button>
                            <Button className={classes.button} style={{backgroundColor:'#2874F0'}} variant="contained" onClick={this.goBack} color="primary">
                                Return
                            </Button>
                            <Button className={classes.button} style={{backgroundColor:'lightgray', color:'black'}} variant="contained" onClick={this.returnToSearch} color="primary">
                                Back to Search
                            </Button>

                        </div>

                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                   
                        <Paper className={classes.paper} style={{height:'95%'}}>
                        <Scrollbars style={{ width: '95%', height: '92%', border:'1px gray',borderRadius:'15px' }}>
                            <PatentList select={this.state.select}/>
                        </Scrollbars>
                        <Button className={classes.button} style={{backgroundColor:'#2874F0'}} variant="contained" onClick={this.props.clearClassData} color="primary">
                            Show All Results
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