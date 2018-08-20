import React from 'react'
import ReactBubbleChart from 'react-bubble-chart';
import classes from './DataGraph.css'
import { connect } from 'react-redux';
import Aux from '../hoc/Aux'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router'


const dataGraph = (props) => {
    console.log(props)
        const rawData = props.data.clusters
        const data = rawData.map((cluster, index) => {
            return {
                _id:index,
                index:index,
                classification:cluster.label,
                value:cluster.score,
                number:cluster.docs.length,
                displayText:cluster.label,
                colorValue:Math.random() * 2 - 1
            }
        })
       
    const colorLegend = [
        '#ff0000', '#ffd700', '#00ffff', '#ff7373', '#ffff00', '#00ff00', '#ffff00', '#66cdaa', '#ff00ff', '#afeeee', 
        '#00ff7f', '#ff4040', '#ccff00', '#fef65b', '#ff4444', '#ff1493', '#6dc066', '#e6e6fa', '#ccff00', '#0099cc'
      ]
      

    const tooltipProps = [{
        css: 'symbol',
        prop: 'classification',
        display:'Classification'
    }, {
        css: 'value',
        prop: 'number',
        display: 'Number of Patents'
    }];


    const handleClick = (event) => {
        let data = props.data.clusters[event.index]
        props.updateClassData(data)
        // props.history.push('/advanced/classification/patentsList')
    }
            
    const goBack = () => {
        props.history.goBack()
    }

    const switchToList = () => {
        props.history.push('/advanced/classificationList')
    }

    const returnToSearch = () => {
        props.history.push('/advanced')
      }

    const {classes} = props
    return(
        <Aux>
        <ReactBubbleChart
            className={classes}
            colorLegend={colorLegend}
            data={data}
            selectedColor="red"
            selectedTextColor="#d9d9d9"
            fixedDomain={{min: -1, max: 1}}
            legend={false}
            legendSpacing={5}
            tooltip={true}
            tooltipProps={tooltipProps}
            fontSizeFactor={0.25}
            onClick={handleClick}

    />
        <Button className={classes.button} variant="contained" onClick={switchToList} color="primary">
            Show as List
        </Button>
        <Button className={classes.button} variant="contained" onClick={goBack} color="primary">
            Return
        </Button>
        <Button className={classes.button} variant="contained" onClick={returnToSearch} color="primary">
            Back to Search
        </Button>
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
    formControl: {
        margin: theme.spacing.unit,
    },
    input:{
        border:'1px solid gray',
        borderRadius:'15px',
    },
    button: {
        margin: theme.spacing.unit,
      },
});

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        data:state.advancedData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // updataData:() => dispatch({type:'advancedData', }),
        // updateInput:() => dispatch({type:'advancedClassIndex', }),
        // updateClassification:(label) => dispatch({type:'classification', classification:label}),
        updateClassData:(data) => dispatch({type:'classData', classData:data})
    }
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(dataGraph)))

