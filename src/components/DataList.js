import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import green from '@material-ui/core/colors/green';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import Aux from '../hoc/Aux'
import Button from '@material-ui/core/Button';
import axios from 'axios'


const dataList = (props) => {
    const { classes } = props;
    // console.log(props)

    const list = props.data.clusters.map((el, classIndex) => {
        const patents = el.docs
        const patentsList = patents.map((patent, detailIndex) => {
            return <ListItem key={detailIndex + "," + classIndex}
                          dense
                          button
                          onClick={() => chooseDetail(classIndex, detailIndex)}
                          // className={classes.listItem}
                          >
                          {/* <ListItemText primary={patent.name}/> */}
                          <div style={{'textAlign':'left'}} dangerouslySetInnerHTML={{__html: detailIndex + 1 + ': ' + patent.name}}></div>
                          </ListItem>
      })
        return (
                <ExpansionPanel key={classIndex}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Classification: {el.label}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div>
                    <Typography>
                      Number of Patents: { patentsList.length }
                    </Typography>

                    <List className={classes.list}>
                      {patentsList}
                    </List>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>)})

      const switchToGraph = () => {
        props.history.push('/advanced/result')
      }

      const goBack = () => {
        props.history.goBack()
      }

      const returnToSearch = () => {
        props.history.push('/advanced')
      }

      const chooseDetail = (classIndex, index) => {
          const patent = props.data.clusters[classIndex].docs[index]//not contain description
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
        {list}
        <Button className={classes.button} style={{backgroundColor:'#2874F0'}} variant="contained" onClick={switchToGraph} color="primary">
              Show as Graph
        </Button>
        <Button className={classes.button} style={{backgroundColor:'#2874F0'}} variant="contained" onClick={goBack} color="primary">
              Return
        </Button>
        <Button className={classes.button} style={{backgroundColor:'lightgray', color:'black'}} variant="contained" onClick={returnToSearch} color="primary">
            Back to Search
        </Button>
        </div>
      </Aux>
    )
}


const styles = theme => ({
    root: {
      width: '100%',
    },
    list: {
      width: '100%',
      // maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
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

dataList.propTypes = {
classes: PropTypes.object.isRequired,
};
  
const mapStateToProps = (state) => {
  return {
      data:state.lingo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      // updataData:() => dispatch({type:'advancedData', }),
      updateClassData:(classData) => dispatch({type:'classData', classData:classData}),
      updatePatent:(patent) => dispatch({type:'patent', patent:patent})
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(dataList))
