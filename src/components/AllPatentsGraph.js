import React from 'react'
import ReactBubbleChart from 'react-bubble-chart';
import classes from './DataGraph.css'
import Aux from '../hoc/Aux'
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import Paper from '@material-ui/core/Paper';


const dataGraph = (props) => {
        const rawData = props.data
        const data = rawData.map((el, index) => {
            return {
                _id:el.id,
                index:index,
                value:el.score,
                title:el.name,
                displayText:el.name,
                colorValue:Math.random() * 2 - 1
            }
        })
       
    const colorLegend = [
        '#ff0000', '#ffd700', '#00ffff', '#ff7373', '#0000ff', '#00ff00', '#ffff00', '#66cdaa', '#ff00ff', '#afeeee', 
        '#00ff7f', '#ff4040', '#ccff00', '#fef65b', '#ff4444', '#ff1493', '#6dc066', '#e6e6fa', '#ccff00', '#0099cc'
      ]
      

    const tooltipProps = [{
        css: 'symbol',
        prop: '_id',
        display:'ID'
    }, {
        css: 'value',
        prop: 'title',
        display: 'Title'
    }];


    const handleClick = (event) => {
        const patent = props.data[event.index]
        const id = patent.id
        const url = 'http://three10-1714580309.us-east-2.elb.amazonaws.com/api/patent?id=' + id
        
        axios.get(url)
            .then((res) => {
                props.updatePatent(res.data[0])
                props.history.push('/simple/detail')
            })
    }

    const switchToList = () => {
        props.history.push('/simple/patentsList')
    }
    
    const goBack = () => {
        props.history.push('/')
    }

    const { classes } = props;

    return(
        <Aux>
        <div className={classes.container}>
            <div style={{width:'100%'}}>
        <Typography variant="headline" gutterBottom>
            Search Content:{props.input}
        </Typography>
        <Paper>
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
            fontSizeFactor={0.5}
            onClick={handleClick}

    />
        </Paper>
        </div>
        </div>
        <div>
        <Button className={classes.button} variant="contained" onClick={() => switchToList()} color="primary">
                                                            Show All as List
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(dataGraph))

