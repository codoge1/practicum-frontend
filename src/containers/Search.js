import React, { Component } from 'react'
import AdvanceSearch from './AdvanceSearch'
import SimpleSearch from './SimpleSearch'
import { Route } from 'react-router-dom'
import Aux from '../hoc/Aux'
import Input from '@material-ui/core/Input';
import AllPatentsGraph from '../components/AllPatentsGraph'
import AllPatentsList from '../components/AllPatentsList'
import DataDetail from '../components/DataDetail';
import DataList from '../components/DataList'
import DataGraph from '../components/DataGraph'
import PatentList from '../components/PatentList'
import AdvancedResult from './AdvancedResult';


class Search extends Component {
    state = {
        showAdvance:false,
    }

    switchToSimple = () => {
        this.setState({showAdvance:false})
    }

    switchToAdvance = () => {
        this.setState({showAdvance:true})
    }

    render(){
        // const search = this.state.showAdvance ? <AdvanceSearch switch={this.switchToSimple}/> : <SimpleSearch switch={this.switchToAdvance}/>
        return (
            <div>
                <Aux>
                    {/* <Route path='/simple/patentsGraph' exact component={AllPatentsGraph} /> */}
                    <Route path='/simple' exact component={SimpleSearch} />
                    <Route path='/simple/patentsList' exact component={AllPatentsList} />
                    <Route path='/simple/detail' exact component={DataDetail} />

                    <Route path='/' exact component={AdvanceSearch} />
                    <Route path='/advanced' exact component={AdvanceSearch} />
                    <Route path='/advanced/result' exact component={AdvancedResult} />
                    <Route path='/advanced/classificationGraph' exact component={DataGraph} />
                    <Route path='/advanced/classificationList' exact component={DataList} />
                    <Route path='/advanced/classification/patentsList' exact component={PatentList} />
                </Aux>
            {/* {search} */}
            </div>
        )
    }
}

export default Search