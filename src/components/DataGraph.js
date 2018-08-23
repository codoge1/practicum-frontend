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
    let rawData = {}
    if (props.select === 'Lingo') {
        rawData = props.lingo.clusters
    } else if (props.select === 'Kmeans') {
        rawData = props.kmeans.clusters
    } else if (props.select === 'STC') {
        rawData = props.stc.clusters
    }
    console.log(props.select)
        const data = rawData.map((cluster, index) => {
            return {
                _id:props.select + index,
                index:index,
                classification:cluster.label,
                value:cluster.score === 0.0 ? cluster.docs.length : cluster.score,
                number:cluster.docs.length,
                displayText:cluster.label,
                colorValue:Math.random() * 2 - 1
            }
        })
       
    const colorLegend = [
        '#ffc0cb', '#ffe4e1', '#ffd700', '#00ffff', '#e6e6fa', '#d3ffce', '#7fffd4', '#00ff00', '#fff68f', '#00ff7f', 
        '#ffff66', '#b6fcd5', '#fa8072', '#40e0d0']
      

    const tooltipProps = [{
        css: 'change',
        prop: 'displayText',
        display:''
    }, {
        css: 'value',
        prop: 'number',
        display: 'Patents'
    }];


    const handleClick = (event) => {
        let data = rawData[event.index]
        props.updateClassData(data)
        // props.history.push('/advanced/classification/patentsList')
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
            // fixedDomain={{min: -1, max: 1}}
            // legend={true}
            // legendSpacing={5}
            tooltip={true}
            tooltipProps={tooltipProps}
            fontSizeFactor={0.22}
            onClick={handleClick}

    />
        

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
        lingo:state.lingo,
        kmeans:state.kmeans,
        stc:state.stc,
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

