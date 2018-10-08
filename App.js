import React , { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MyProfile from './src/components/MyProfile/myProfileBody';
import PropTypes from 'prop-types';
import {Scene, Router} from 'react-native-router-flux';
import {Navigator} from 'react-native-deprecated-custom-components';

export default class ReactNativeRailsAuth extends React.Component {
  render() {
    return <Router>
      <Scene key="root">          
        <Scene key="MyProfile" component={MyProfile} title = "MyProfile" initial = {true}/>        
      </Scene>
    </Router>
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
