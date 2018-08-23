import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import Search from './Search'
import Auth from './Auth'
import Logo from '../dorothy.png'


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};


class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
        <Tabs
          value={value}
          style={{backgroundColor:'#2874F0'}}
          onChange={this.handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          <Tab 
            disableRipple
            selected
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={<Avatar src={Logo} className={classes.bigAvatar}></Avatar>}
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Dorothy"
          />
          {/* <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Freedom to Operate"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Clearance"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Invalidity"
          /> */}
          <Tab
            disableRipple
            classes={{ root: classes.tabRight, selected: classes.tabSelected }}
            label="Sign In / Up"
          />
        </Tabs>
        
          </AppBar>
        {value === 0 && <TabContainer><Search /></TabContainer>}
        {value === 1 && <TabContainer><Search /></TabContainer>}
        {/* {value === 2 && <TabContainer>Should be freedom to operate page</TabContainer>}
        {value === 3 && <TabContainer>Should be clearance page</TabContainer>}
        {value === 4 && <TabContainer>Should be invalidity page</TabContainer>} */}
        {value === 2 && <TabContainer><Auth /></TabContainer>}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  tabsIndicator: {
    backgroundColor: 'green',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    // fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: 'white',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: 'white',
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
  tabRight:{
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
    position:'absolute',
    top:'20%',
    right:0,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$tabSelected': {
      color: 'white',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: 'white',
    },
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
});

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
