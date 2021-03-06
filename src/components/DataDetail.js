import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Highlighter from 'react-highlight-words'
import Input from '@material-ui/core/Input';
import { connect } from 'react-redux';
import Aux from '../hoc/Aux'
import Button from '@material-ui/core/Button';
import boldClass2 from './DataDetail.css'
import Grid from '@material-ui/core/Grid';
import { Scrollbars } from 'react-custom-scrollbars';
import ForceGraph from './ForceGraph'



const styles = theme => ({
    root: {
    //   ...theme.mixins.gutters(),
    //   paddingTop: theme.spacing.unit * 2,
    //   paddingBottom: theme.spacing.unit * 2,
      flexGrow:1
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
      },
    input:{
        border:'1px solid gray',
        borderRadius:'15px',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingLeft: 300,
        paddingRight: 300,
        },
    button: {
        margin: theme.spacing.unit,
        },
  });


const dataDetail = (props) => {
    const { classes } = props;
    

    const patent = props.patent

    const switchToList = () => {
        props.history.push('/simple/patentsList')
    }

    const switchToGraph = () => {
        props.history.push('/simple/patentsGraph')
    }
    
    const goBack = () => {
        props.history.goBack()
    }

    const goBackToSearch = () => {
        props.history.push('/')
    }


    const HandleDate = (str) => {
        return str.substring(0, 4) + ' / ' + str.substring(4, 6) + ' / ' + str.substring(6, 8)
    }
    console.log(patent.id)
    let filingDate = ''
    let grantDate = ''
    let publicationDate = ''
    if (patent.filingDate !== undefined) {
        filingDate = HandleDate(patent.filingDate.toString())
    }
    if (patent.grantDate !== undefined) {
        grantDate = HandleDate(patent.grantDate.toString())
    }
    if (patent.filingDate !== undefined) {
        publicationDate = HandleDate(patent.publicationDate.toString())
    }
    let cpc = patent.cpc.join(', ')
    let citations = patent.citations.join(', ')

    const description = patent.description.replace(/\n/g, '</br>')
    const claims = patent.claims.replace(/\n/g, '</br>')
    
    return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={7}>
                <div>
                <Paper className={classes.paper} elevation={1}>
                    <Typography style={{textAlign: 'center'}} variant="display1" component="h1">
                        {patent.name}
                    </Typography>
                    <br/>

                    <br/>
                    <Typography style={{textAlign: 'center'}} variant="title" component="h4">
                        <b style={{'backgroundColor':'white'}}>Abstract</b>
                    </Typography>
                    <br />
                    
                    <Typography variant='subheading'>
                        {patent.patentAbstract}
                    </Typography>
                    <br/>
                    <Typography style={{textAlign: 'center'}} variant="title">
                        <b style={{'backgroundColor':'white'}}>Description</b>
                    </Typography>
                    <br />
                    <br />
                    <div>
                    {/* <Highlighter textToHighlight='asfasdas <b>gesadasd</b>'
                                searchWords={[]}/> */}
                    <Scrollbars style={{ width: '100%', height: 330, border:'1px solid gray',borderRadius:'15px' }}>
                    <div style={{'textAlign':'left','color':'black', paddingLeft:15}} dangerouslySetInnerHTML={{__html:  '<p>' + description + '</p>'}}></div>
                        {/* {patent.description} */}
                    </Scrollbars>
                    </div>

                    <Typography style={{textAlign: 'center', marginTop:'5%'}} variant="title">
                        <b style={{'backgroundColor':'white'}}>Claims</b>
                    </Typography>
                    <br />
                    <br />
                    <div>
                    {/* <Highlighter textToHighlight='asfasdas <b>gesadasd</b>'
                                searchWords={[]}/> */}
                    <Scrollbars style={{ width: '100%', height: 330, border:'1px solid gray',borderRadius:'15px' }}>
                    <div style={{'textAlign':'left','color':'black', paddingLeft:15}} dangerouslySetInnerHTML={{__html:  '<p>' + claims + '</p>'}}></div>
                        {/* {patent.description} */}
                    </Scrollbars>
                    </div>

                </Paper>
                </div>
                <div>
                
                <Button className={classes.button} style={{backgroundColor:'#2874F0'}} variant="contained" onClick={goBack} color="primary">
                                                                    Return
                                                                    </Button>
                
                <Button className={classes.button} style={{backgroundColor:'lightgray', color:'black'}} variant="contained" onClick={goBackToSearch} color="primary">
                                                                    Return to Search
                                                                    </Button>
                </div>

                </Grid>
                
                <Grid className={boldClass2} item xs={5}>
                    <Typography style={{textAlign:'left'}} variant="headline">
                        File Info:
                    </Typography>

                    <Paper style={{marginTop:'3%'}} className={classes.paper}>
                        <Typography variant="body2">
                        <b style={{'backgroundColor':'white'}}>Application ID:</b> {patent.id}
                        </Typography>
                        <Typography variant="body2">
                        <b  style={{'backgroundColor':'white'}}>Family ID:</b> {patent.familyId}
                        </Typography>
                        <Typography variant="body2">
                        <b style={{'backgroundColor':'white'}}>Filing Date:</b> {filingDate}
                        </Typography>
                        <Typography variant="body2">
                        <b style={{'backgroundColor':'white'}}>Grant Date:</b> {grantDate}
                        </Typography>
                        <Typography variant="body2">
                        <b style={{'backgroundColor':'white'}}>Publication Date:</b> {publicationDate}
                        </Typography>
                        <Typography variant="body2">
                        <b style={{'backgroundColor':'white'}}>CPC:</b> {cpc}
                        </Typography>
                        <Typography variant="body2">
                        <b style={{'backgroundColor':'white'}}> Assignee:</b> {patent.assignee}
                        </Typography>
                        {/* <Typography variant="body2">
                            Citations: {citations}
                        </Typography> */}
                    </Paper>
                    
                    <Typography style={{marginTop:'10%', textAlign:'left'}} variant="headline">
                        Citations:
                    </Typography>

                    <Paper style={{marginTop:'3%', }} className={classes.paper}>
                        <ForceGraph />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}



  dataDetail.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
const mapStateToProps = (state) => {
    return {
        patent:state.patent
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(dataDetail))
