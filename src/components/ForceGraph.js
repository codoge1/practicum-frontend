import React from 'react';
import {InteractiveForceGraph, ForceGraphNode, ForceGraphLink} from 'react-vis-force';
import { connect } from 'react-redux';
import axios from 'axios'
import { withRouter } from 'react-router'


const forceGraph = (props) => {

    const patent = props.patent
    const citations = patent.citations
    const citationGraph = patent.citationGraph
    // const citations = ['1', '2', '3']
    // const citationGraph = [
    //     {id:'1',
    //     citations:['5', '6', '7']
    //     },
    //     {id:'2',
    //     citations:['5', '9', '10']
    //     },
    //     {id:'3',
    //     citations:['5', '12', '13']
    //     },
    // ]

    // const chooseCitation = (citation) => {
    //     const url = 'http://three10-1714580309.us-east-2.elb.amazonaws.com/api/patent?id=' + citation
    //     axios.get(url)
    //         .then((res) => {
    //             props.updatePatent(res.data[0])
    //             props.history.push('/simple/detail')
    //         })
    // }


    const firstLevelNode = citations.map((citation, index) => {
        return (
                <ForceGraphNode  key={citations[index] + '#'} node={{ id: citation, label: citation }} fill="blue" />
                
        )
    })
    const firstLevelLink = citations.map((citation, index) => {
        return (
                <ForceGraphLink key={citations[index] + '$'}  link={{ source: patent.id, target: citation }} />  
        )
    })

    let secondLevel = []
    citationGraph.forEach(origin => {
        let arr = origin.citations
        secondLevel = secondLevel.concat(arr)
    })
    const secondLevelNode = secondLevel.map((citation, index) => {
        // console.log(citation)
        return (
            <ForceGraphNode key={citation + '#'} node={{ id: citation, label: citation }} fill="red" />
        )
    })
    //some more second level nodes
    citationGraph.forEach(origin => {
        secondLevelNode.push(<ForceGraphNode key={origin.id + '&'} node={{ id: origin.id, label: origin.id }} fill="red" />)
    })

    const secondLevelLink = []
    citationGraph.forEach(origin => {
        const id = origin.id
        origin.citations.forEach(next => {
            secondLevelLink.push(<ForceGraphLink key={id + ',' + next}  link={{ source: id, target: next }} />  )
        })
    })
    
    return (
        <InteractiveForceGraph
            // zoom
            simulationOptions={{ height: 1050, width: 1050}}
            labelAttr="label"
            // onSelectNode={(node) => console.log(node)}
            highlightDependencies
            strokeWidth='60'
            >
            <ForceGraphNode node={{ id: patent.id, label: 'Origin' }} fill="red" />
            {firstLevelNode}
            {firstLevelLink}
            {secondLevelNode}
            {secondLevelLink}
        </InteractiveForceGraph>
    )
}

const mapStateToProps = (state) => {
    return {
        patent:state.patent
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        // updataData:() => dispatch({type:'advancedData', }),
        // updateClassData:(classData) => dispatch({type:'classData', classData:classData}),
        updatePatent:(patent) => dispatch({type:'patent', patent:patent})
    }
  }
  
  export default withRouter((connect(mapStateToProps, mapDispatchToProps)(forceGraph)))
