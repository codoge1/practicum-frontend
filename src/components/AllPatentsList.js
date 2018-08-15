import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import green from '@material-ui/core/colors/green';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Aux from '../hoc/Aux'
import axios from 'axios'


const AllPatents = (props) => {
    const { classes } = props;
    const list = props.data.map((el, index) => {

        return (<ExpansionPanel className={classes.root} key={el.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              {/* <Typography className={classes.heading}>Title: {el.name}</Typography> */}
              <div style={{'textAlign':'left'}} dangerouslySetInnerHTML={{__html: 'Title:  ' + el.name}}></div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div>
              <Typography>
                {/* Abstract: { el.patentAbstract } */}
                <div style={{'textAlign':'left'}} dangerouslySetInnerHTML={{__html: 'Abstract:  ' + el.patentAbstract}}></div>
                </Typography>
                <Avatar style={{cursor:'pointer'}} onClick={() => goToDetail(index)} className={classes.greenAvatar}>
                  <AssignmentIcon />
                </Avatar>
                </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>)
    })

    const switchToGraph = () => {
      props.history.push('/simple/patentsGraph')
  }
  
    const goBack = () => {
        props.history.push('/')
    }

    const goToDetail = (index) => {
        const patent = props.data[index]
        const id = patent.id
        const url = 'http://three10-1714580309.us-east-2.elb.amazonaws.com/api/patent?id=' + id
        
        axios.get(url)
            .then((res) => {
                props.updatePatent(res.data[0])
                props.history.push('/simple/detail')
            })

    }

    return (
      <Aux>
        <div className={classes.root}>
        <Typography variant="headline" gutterBottom>
            Search Content:{props.input}
        </Typography>
        
        <br/>
        <br/>
        
        <div className={classes.container}>
        {list}
        </div>

        </div>
        <div>
        <Button className={classes.button} variant="contained" onClick={() => switchToGraph()} color="primary">
                                                            Show All as Graph
                                                         </Button>
        <Button className={classes.button} variant="contained" onClick={() => goBack()} color="primary">
                                                            Return
                                                            </Button>
        </div>
      </Aux>
    )
}


const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      paddingLeft: 300,
      paddingRight: 300,
    },
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    avatar: {
      margin: 10,
    },
    greenAvatar: {
      margin: 10,
      color: '#fff',
      backgroundColor: green[500],
    },
    button: {
      margin: theme.spacing.unit,
    },
  });

AllPatents.propTypes = {
classes: PropTypes.object.isRequired,
};
  
const mapStateToProps = (state) => {
  return {
      data:state.simpleData,
      input:state.simpleInput,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatePatent:(patent) => dispatch({type:'patent', patent:patent})
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AllPatents))
