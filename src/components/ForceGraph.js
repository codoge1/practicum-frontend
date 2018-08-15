import React from 'react';
import {InteractiveForceGraph, ForceGraphNode, ForceGraphLink} from 'react-vis-force';
import { connect } from 'react-redux';


const forceGraph = (props) => {

    const patent = props.patent
    const citations = patent.citations
    const citationGraph = patent.citationGraph

    return (
        <InteractiveForceGraph
            zoom
            simulationOptions={{ height: 400, width: 500 }}
            labelAttr="label"
            onSelectNode={(node) => console.log(node)}
            highlightDependencies
            
            >
            <ForceGraphNode node={{ id: 'first-node', label: 'First node' }} fill="red" />
            <ForceGraphNode node={{ id: 'second-node', label: 'Second node' }} fill="blue" />
            <ForceGraphLink strokeWidth='40' link={{ source: 'first-node', target: 'second-node' }} />

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
