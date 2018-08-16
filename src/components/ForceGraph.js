import React from 'react';
import {InteractiveForceGraph, ForceGraphNode, ForceGraphLink} from 'react-vis-force';
import { connect } from 'react-redux';
import axios from 'axios'


const forceGraph = (props) => {

    const patent = props.patent
    const citations = patent.citations
    const citationGraph = patent.citationGraph


    const chooseCitation = (citation) => {
        const url = 'http://three10-1714580309.us-east-2.elb.amazonaws.com/api/patent?id=' + citation
        axios.get(url)
            .then((res) => {
                props.updatePatent(res.data[0])
                props.history.push('/simple/detail')
            })
    }


    const firstLevelNode = citations.map((citation, index) => {
        return (
                <ForceGraphNode onClick={() => chooseCitation(citation)} key={citations[index] + '#'} node={{ id: citation, label: citation }} fill="blue" />
                
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
            <ForceGraphNode onClick={() => chooseCitation(citation)} key={citations[index] + '#'} node={{ id: citation, label: citation }} fill="blue" />
        )
    })

    // const secondLevelLink = []
    // citationGraph.forEach(origin => {
    //     const id = origin.id
    //     origin.citations.forEach(next => {
    //         secondLevelLink.push(<ForceGraphLink key={id + ',' + next}  link={{ source: id, target: next }} />  )
    //     })
    // })
    
    return (
        <InteractiveForceGraph
            // zoom
            simulationOptions={{ height: 400, width: 500 }}
            labelAttr="label"
            // onSelectNode={(node) => console.log(node)}
            highlightDependencies
            strokeWidth='40'
            >
            <ForceGraphNode node={{ id: patent.id, label: 'Origin' }} fill="red" />
            {firstLevelNode}
            {firstLevelLink}
            {secondLevelNode}
            {/* {secondLevelLink} */}
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
        // updatePatent:(patent) => dispatch({type:'patent', patent:patent})
    }
  }
  
  export default (connect(mapStateToProps, mapDispatchToProps)(forceGraph))
