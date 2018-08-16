import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Aux from '../hoc/Aux'
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
import DataGraph from '../components/DataGraph'
import DataList from '../components/DataList'
import DataDetail from '../components/DataDetail'
import axios from 'axios'
import { FadeLoader } from 'react-spinners';
import PatentList from '../components/PatentList'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider, {Range} from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import { FormGroup } from '../../node_modules/@material-ui/core';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';





class Search extends Component {
    state = {
        novel:'',
        invention:'',
        showResult:false,
        showGraph:false,
        showList:false,
        showDetail:false,
        showClass:false,
        classIndex:-1,
        detailIndex:-1,
        data:[],
        showSpinner:false,
        weight:50,
        select:'0',

    }

    changeNovel = (event) => {
        this.setState({novel:event.target.value})
    }

    changeInvention = (event) => {
        this.setState({invention:event.target.value})
    }


    handleRadio =  (event) => {

        this.setState({select:event.target.value})
    }

    // handleSearch = () => {
    //     this.handleShowModal()
    // }

    // handleShowModal = () => {
    //     this.setState({showModal:true})
    // }

    // handleCloseModal = () => {
    //     this.setState({showModal:false,
    //                     showGraph:true,
    //                     showList:false,
    //                     showClass:false,
    //                     showDetail:false})
    // }

    handleShowList = () => {
        this.setState({showList:true,
                        showGraph:false,
                        showDetail:false,
                        showClass:false})
    }

    handleShowGraph = () => {
        this.setState({showList:false,
                        showGraph:true,
                        showDetail:false,
                        showClass:false})
    }

    handleShowDetail = (classIndex, detailIndex) => {
        // this.setState({ showSpinner:true,
        //                 showDetail:false,
        //                 showList:false,
        //                 showGraph:false,
        //                 showClass:false,})

        // const patentID = this.state.data[classIndex].patents[detailIndex].id
        // const url = "http://three10-1714580309.us-east-2.elb.amazonaws.com/patent?id=" + patentID
        // axios.get(url)
        //      .then((res) => {
        //          console.log(res)
        //      })
        this.setState({ showSpinner:false,
                        showDetail:true,
                        showList:false,
                        showGraph:false,
                        showClass:false,
                        classIndex:classIndex,
                        detailIndex:detailIndex})
    }

    handleCloseDetail = () => {
        this.setState({showDetail:false,
                        showClass:false,
                        showList:false,
                        showGraph:true,
                        classIndex:-1,
                        detailIndex:-1})
    }

    handleChooseClass = (index) => {
        this.setState({
            showDetail:false,
            showClass:true,
            showList:false,
            showGraph:false,
            classIndex:index
        })
    }

    handleCloseClass = () => {
        this.setState({showDetail:false,
                        showClass:false,
                        showList:false,
                        showGraph:true,
                        classIndex:-1})
    }

    handleReturnToClass = () => {
        this.setState({showDetail:false,
                        showClass:true,
                        showList:false,
                        showGraph:false})
    }

    handleReturnToSearch = () => {
        this.setState({showDetail:false,
                        showClass:false,
                        showList:false,
                        showGraph:false,
                        showSpinner:false,
                        showResult:false})
    }


    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.search()
        }
    }


    handleSelect = (event) => {
        this.setState({searchBy:event.target.value})
    }

    handleSlider = (props) => {
        const createSliderWithTooltip = Slider.createSliderWithTooltip;
        const Handle = Slider.Handle;
        const { value, dragging, index, ...restProps } = props;

        return (
          <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="top"
            key={index}
          >
            <Handle value={value} {...restProps} />
          </Tooltip>
        );
      };

      changeWeight = (value) => {
          this.setState({weight:value})
      }


      handleSwitch = () => {
        this.props.history.push('/simple')
    }

    search = () => {
        const noval = this.state.novel
        const invention = this.state.invention
        const weight = 100 - this.state.weight
        let searchBy = ''
        if (this.state.select === '0') {
            searchBy += "&title=true&description=true&claim=true"
        }
        if (this.state.select === '1') {
            searchBy += "&title=true"
        }
        if (this.state.select === '2') {
            searchBy += "&description=true"
        }
        if (this.state.select === '3') {
            searchBy += "&claim=true"
        }
        const url = 'http://three10-1714580309.us-east-2.elb.amazonaws.com/api/search?method=kmeans&q='  + invention + searchBy + '&nf=' + noval + '&bst=' + weight
        // console.log(url)
        this.setState({showSpinner:true,
                        showResult:true,
                        showGraph:false})

        // const newData = {
        //     "clusters":[
        //       {
        //         "labels":[
        //           "Quantum Logic"
        //         ],
        //         "score":3.181807575419961,
        //         "subclusters":[
          
        //         ],
        //         "otherTopics":false,
        //         "docs":[
        //       {
        //         "id":"US-2014088734-A1",
        //         "name":"<b>Controller</b> support device, <b>controller</b> support <b>program</b> to be <b>executed</b> in said device, and recording medium storing said <b>program</b>",
        //         "description":"Preferably the <b>controller</b> support device  8  is constructed by a <b>notebook</b> personal <b>computer</b> having excellent <b>portability</b> from the viewpoint of maintenance",
        //         "patentAbstract":"A <b>controller</b> support <b>program</b> causes an arithmetic unit to <b>execute</b> total <b>execution</b> time acquisition <b>processing</b> of acquiring a total <b>execution</b> time and output <b>processing</b> of outputting the total <b>execution</b> time. ",
        //         "score":0.16566548
        //       },
        //       {
        //         "id":"US-9129063-B2",
        //         "name":"Visualizing a <b>computer</b> <b>program</b> <b>execution</b> history",
        //         "description":"System  10  also includes a <b>processor</b>  22 , operatively coupled to bus  12 , for <b>processing</b> information and <b>executing</b> <b>instructions</b> or operations. ",
        //         "patentAbstract":"The <b>software</b> application profiling environment further displays some or all of the <b>computer</b> <b>program</b> <b>instructions</b> of the <b>computer</b> <b>program</b>, and further displays a visualization of the stored <b>execution</b> history information. ",
        //         "score":0.16566491
        //       },
        //       {
        //         "id":"US-2014344787-A1",
        //         "name":"Visualizing a <b>computer</b> <b>program</b> <b>execution</b> history",
        //         "description":"System  10  also includes a <b>processor</b>  22 , operatively coupled to bus  12 , for <b>processing</b> information and <b>executing</b> <b>instructions</b> or operations. ",
        //         "patentAbstract":"The <b>software</b> application profiling environment further displays some or all of the <b>computer</b> <b>program</b> <b>instructions</b> of the <b>computer</b> <b>program</b>, and further displays a visualization of the stored <b>execution</b> history information. ",
        //         "score":0.16566491
        //       }
        //     ]
        //       },
        //     ]
        //     }
        
        // this.setState({data:newData})

        axios.get(url)
        .then((res) => {
            console.log(res)
            const newData = res['data']
            // this.setState({data:newData})
            // console.log(newData)
            // this.handleSearch()
            this.setState({showGraph:true,
                            showSpinner:false})
            this.props.updataData(newData)
            this.props.history.push('/advanced/result')
        })
        .catch((e) => {
            console.log(e)
        })
    }

    render(){
        const { classes } = this.props;

        const query = this.state.showResult ? null :     <Grid container className={classes.root}>
                                                            <Grid style={{marginTop:'5%', marginRight:'2%'}} item xs={2}>
                                                                <Paper style={{height:'70%'}}>
                                                                    <FormLabel style={{textAlign:'left'}}>Search By</FormLabel>
                                                                    <RadioGroup
                                                                        style={{margin:10}}
                                                                        value={this.state.select}
                                                                        onChange={this.handleRadio}
                                                                        >
                                                                        <FormControlLabel value='0' control={<Radio />} label="All" />
                                                                        <FormControlLabel value='1' control={<Radio />} label="Title" />
                                                                        <FormControlLabel value='2' control={<Radio />} label="Description" />
                                                                        <FormControlLabel value='3' control={<Radio />} label="Claim" />
                                                                        </RadioGroup>
                                                                </Paper>
                                                            </Grid>

                                                            <Grid item xs={9}>
                                                                <Typography style={{textAlign:'left'}} variant="display3" color='inherit' gutterBottom>
                                                                    Advanced Search
       
                                                        </Typography>
                                                        <FormControl fullWidth className={classes.formControl}>
                                                        <InputLabel>&nbsp;&nbsp;Novel Feature</InputLabel>
                                                        <Input disableUnderline className={classes.input} value={this.state.novel} onChange={this.changeNovel} />
                                                        <FormHelperText>Please input your novel feature</FormHelperText>
                                                        </FormControl>
                                                        <br />
                                                        <br />
                                                        <FormControl fullWidth className={classes.formControl}>
                                                        <InputLabel>&nbsp;&nbsp;Invention Disclosure</InputLabel>
                                                        <Input disableUnderline onKeyPress={(event) => this.handleKeyPress(event)} className={classes.input} multiline rows='8'value={this.state.invention} onChange={this.changeInvention} />
                                                        <FormHelperText>Please input your invention disclosure</FormHelperText>
                                                        </FormControl>

                                                        <FormControl fullWidth className={classes.formControl}>
                                                            <FormGroup row>

                                                                <Typography style={{fontSize:40 - this.state.weight * 0.4}} variant="caption">
                                                                    Novel Feature
                                                                </Typography>
                                                                <Slider onChange={(value) => this.changeWeight(value)}
                                                                        marks={{0:'0%',
                                                                                20:'20%',
                                                                                40:'40%',
                                                                                60:'60%',
                                                                                80:'80%',
                                                                                100:'100%'}}
                                                                        min={0} max={100}
                                                                        defaultValue={50}
                                                                        value={this.state.weight}
                                                                        handle={this.handleSlider}/>

                                                            </FormGroup>
                                                        </FormControl>

                                                        <FormControl fullWidth className={classes.formControl} >
                                                            <Typography  style={{fontSize:this.state.weight * 0.4}} variant="caption" align='right'>
                                                                Invention Disclosure
                                                            </Typography>
                                                        </FormControl>

                                                        <FormControl fullWidth className={classes.formControl}>
                                                            <FormGroup row>
                                                                <Button className={classes.button} variant="contained" color="primary" onClick={this.search}>Search</Button>
                                                                <Button className={classes.button} variant="contained" color="secondary" onClick={this.handleSwitch}>Simple Search</Button>
                                                            </FormGroup>
                                                        </FormControl>


                                                            {/* <Select
                                                                value={this.state.searchBy}
                                                                onChange={this.handleSelect}
                                                                input={<Input/>}
                                                            >

                                                                <MenuItem value={1}>All</MenuItem>
                                                                <MenuItem value={2}>Title</MenuItem>
                                                                <MenuItem value={3}>ID</MenuItem>
                                                                <MenuItem value={4}>Abstract</MenuItem>
                                                                <MenuItem value={5}>Content</MenuItem>

                                                            </Select>
                                                            <FormHelperText>Search By</FormHelperText> */}

                                                            </Grid>
                                                            </Grid>

        const dataList = this.state.showList ? <DataList
                                                        data={this.state.data}
                                                      chooseDetail={this.handleShowDetail}/> : null

        // const dataGraph = this.state.showGraph ? <DataGraph
        //                                                 data={this.state.data}
        //                                                 chooseClass = {this.handleChooseClass}
        //                                                chooseDetail={this.handleShowDetail}/> : null

        const patentList = this.state.showClass ? <PatentList data={this.state.data[this.state.classIndex]}
                                                                classification={this.state.data[this.state.classIndex].classification}
                                                                classIndex={this.state.classIndex}
                                                                chooseDetail={this.handleShowDetail}/> : null

        const toListBotton = this.state.showGraph || this.state.showDetail ? <Button className={classes.button} variant="contained" onClick={this.handleShowList} color="primary">
                                                            Show as List
                                                         </Button> : null
        const toGraphBotton = this.state.showList || this.state.showDetail ? <Button className={classes.button} variant="contained" onClick={this.handleShowGraph} color="primary">
                                                            Show as Graph
                                                          </Button> : null

        const dataDetail = this.state.showDetail ? <DataDetail keyword={this.state.invention} data={this.state.data[this.state.classIndex].patents[this.state.detailIndex]}/> : null

        // const toAllResults = this.state.showDetail ? <Button className={classes.button} variant="contained" onClick={this.handleCloseDetail} color="primary">
        //                                                 Show all results
        //                                             </Button> : null


        const returnToPatents = this.state.showDetail ? <Button className={classes.button} variant="contained" onClick={this.handleReturnToClass} color="primary">
                                                        Return
                                                    </Button> : null

        const returnToClass = this.state.showClass ? <Button className={classes.button} variant="contained" onClick={this.handleShowGraph} color="primary">
                                                        Return
                                                    </Button> : null

        const returnToSearch = this.state.showResult ? <Button className={classes.button} variant="contained" onClick={this.handleReturnToSearch} color="primary">
                                                        Back to Search
                                                    </Button> : null

        const spinner = this.state.showSpinner ? <div style={{marginLeft:'50%'}}><FadeLoader color={'#00ff00'}/></div> : null

        return (
            <Aux>
            <div>

                {query}
                {/* <Dialog
                fullWidth
                maxWidth={false}
                open={this.state.showModal}
                onClose={this.handleCloseModal}
                aria-labelledby="responsive-dialog-title"
                >
                <DialogTitle id="responsive-dialog-title">{"Search Term: "} {this.state.invention} :</DialogTitle>
                <DialogContent> */}
                {spinner}
                {/* {dataList} */}
                {/* {dataGraph} */}
                {/* {patentList}
                {dataDetail} */}
                {/* </DialogContent>
                <DialogActions> */}
                    {/* <Button onClick={this.handleCloseModal} color="primary">
                    Close
                    </Button> */}
                {/* </DialogActions> */}
                {/* </Dialog> */}
            </div>
            <div>
            {/* {toListBotton}
            {toGraphBotton} */}
            {/* {toAllResults} */}
            {/* {returnToClass}
            {returnToPatents}
            {returnToSearch} */}
            </div>
            </Aux>
        )
    }
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

    Search.propTypes = {
        classes: PropTypes.object.isRequired,
    };


    const mapStateToProps = (state) => {
        return {
    
        }
    }
    
    const mapDispatchToProps = (dispatch) => {
        return {
            updataData:(data) => dispatch({type:'advancedData', data:data}),
            // updateClassIndex:(classIndex) => dispatch({type:'advancedClassIndex', classIndex:classIndex}),
            // updateIndex:(index) => dispatch({type:'advancedIndex', index:index})
        }
    }

    export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Search))
