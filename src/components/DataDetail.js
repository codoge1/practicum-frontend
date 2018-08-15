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
import boldClass from './DataDetail.css'
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

    return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={8}>
                <div>
                <Paper className={classes.paper} elevation={1}>
                    <Typography style={{textAlign: 'center'}} variant="display1" component="h1">
                        Title: {patent.name}
                    </Typography>
                    <br/>
                    <Typography style={{textAlign: 'center'}} variant='subheading' component="p">
                        Application_ID:  {patent.id}
                    </Typography>
                    <br/>
                    <Typography style={{textAlign: 'center'}} variant="title" component="h4">
                        Abstract
                    </Typography>
                    <br />
                    
                    <Typography variant='subheading'>
                        {patent.patentAbstract}
                    </Typography>
                    <br/>
                    <Typography style={{textAlign: 'center'}} variant="title">
                        Content
                    </Typography>
                    <br />
                    <br />
                    <div className={boldClass}>
                    {/* <Highlighter textToHighlight='asfasdas <b>gesadasd</b>'
                                searchWords={[]}/> */}
                    <Scrollbars style={{ width: '100%', height: 330, border:'1px solid gray',borderRadius:'15px' }}>
                        <Typography style={{padding:10}} variant='body2'>
                            {patent.description}
                        </Typography>
                        {/* {patent.description} */}
                    </Scrollbars>
                    </div>
                </Paper>
                </div>
                <div>
                
                <Button className={classes.button} variant="contained" onClick={goBack} color="primary">
                                                                    Return
                                                                    </Button>
                
                <Button className={classes.button} variant="contained" onClick={goBackToSearch} color="primary">
                                                                    Return to Search
                                                                    </Button>
                </div>

                </Grid>
                
                <Grid item xs={4}>
                    <Typography style={{textAlign:'left'}} variant="headline">
                        File Info:
                    </Typography>

                    <Paper className={classes.paper}>
                        <Typography variant="body2">
                            Family ID: {patent.familyId}
                        </Typography>
                        <Typography variant="body2">
                            Filing Date: {filingDate}
                        </Typography>
                        <Typography variant="body2">
                            Grant Date: {grantDate}
                        </Typography>
                        <Typography variant="body2">
                            Publication Date: {publicationDate}
                        </Typography>
                        <Typography variant="body2">
                            CPC: {cpc}
                        </Typography>
                        <Typography variant="body2">
                            Assignee: {patent.assignee}
                        </Typography>
                        {/* <Typography variant="body2">
                            Citations: {citations}
                        </Typography> */}
                    </Paper>
                    
                    <Typography style={{marginTop:'10%', textAlign:'left'}} variant="headline">
                        Citations:
                    </Typography>

                    <Paper style={{marginTop:'3%', height:'46%'}} className={classes.paper}>
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
