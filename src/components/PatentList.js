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
import Aux from '../hoc/Aux'
import Button from '@material-ui/core/Button';
import axios from 'axios'
import {withRouter} from 'react-router'
import boldClass from './DataList.css'





const patentList = (props) => {
    const { classes } = props;
    const compare = (a, b) => {
      if (a.score < b.score) {
        return 1;
      } else if (a.score > b.score) {
        return -1;
      }
      return 0;
    }
    let select = props.select
    let patents = props.classData.docs
    if (patents === undefined) {
      if (props.select === 'Lingo') {
        patents = props.lingo.patents
    } else if (props.select === 'Kmeans') {
        patents = props.kmeans.patents
    } else if (props.select === 'STC') {
        patents = props.stc.patents
    }
    }
    patents.sort(compare);
    console.log(patents)
    const list = patents.map((el, index) => {
        return (<ExpansionPanel defaultExpanded className={classes.root} key={el.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>

            <div style={{'textAlign':'left', 'color':'black'}} dangerouslySetInnerHTML={{__html: '<b style="background-color:white">' + el.name + '</b>'}}></div>

              {/* <Typography className={classes.heading}>Title: {el.name}</Typography> */}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              
                <div style={{'textAlign':'left', 'color':'black', width:'90%'}} dangerouslySetInnerHTML={{__html:  el.id + '</br></br>' + el.patentAbstract}}></div>

                <Avatar style={{cursor:'pointer'}} onClick={() => chooseDetail(index)} className={classes.greenAvatar}>
                  <AssignmentIcon />
                </Avatar>
            </ExpansionPanelDetails>
          </ExpansionPanel>)
    })



    const chooseDetail = (index) => {
        console.log(props)
        const patent = patents[index]
        const id = patent.id

        const url = 'http://three10-1714580309.us-east-2.elb.amazonaws.com/api/patent?id=' + id
        axios.get(url)
             .then((res) => {
                props.updatePatent(res.data[0])
                props.history.push('/simple/detail')
             })

    }

    const goBack = () => {
      props.history.goBack()
    }

    const goBackToSearch = () => {
      props.history.push('/advanced')
    }

    let classification = props.classData.label === undefined ? 'All Results' : 'Classification: ' + props.classData.label

    return (
      <Aux className={boldClass}>
        <div>
        <Typography variant="headline" gutterBottom>
          {classification}
        </Typography>
        
        <br/>
        <br/>
        
        {/* <div className={classes.container} > */}
        {list}
        {/* </div> */}

        </div>

        <div>
        {/* <Button className={classes.button} variant="contained" onClick={goBack} color="primary">
            Return
        </Button>
        <Button className={classes.button} variant="contained" onClick={goBackToSearch} color="primary">
            Return to Search
        </Button> */}
        </div>
      </Aux>
    )
}


const styles = theme => ({
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
    container: {
      // display: 'flex',
      // flexWrap: 'wrap',
      paddingLeft: 300,
      paddingRight: 300,
      },
  });

patentList.propTypes = {
classes: PropTypes.object.isRequired,
};
  
const mapStateToProps = (state) => {
  return {
      classData:state.classData,
      lingo:state.lingo,
      kmeans:state.kmeans,
      stc:state.stc,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      // updataData:() => dispatch({type:'advancedData', }),
      // updateInput:() => dispatch({type:'advancedClassIndex', }),
      updatePatent:(patent) => dispatch({type:'patent', patent:patent})
  }
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(patentList)))
