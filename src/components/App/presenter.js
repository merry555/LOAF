import React , { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {Scene, Router} from 'react-native-router-flux';
import {Navigator} from 'react-native-deprecated-custom-components';

//import JoinProject from './src/components/JoinProject/presenter'
//import RecruitProject from './src/components/RecruitProject/presenter'
//import ProjectBoard from './src/components/ProjectBoard/presenter'
//import ProjectBoardDetail from './src/components/ProjectBoardDetail/presenter'

//import Home from './src/components/Home/presenter'
import Login from '../Login/presenter'
//import MyProject from './src/components/MyProject/presenter'
//import Friends from './src/components/Friends/presenter' 
//import Projects from './src/components/Projects/presenter'

import SignupForm from '../SignupForm/presenter'

//import MyProfile from './src/components/MyProfile/presenter'

//<Scene key="friends" component={Friends} title = "Friends" initial = {true}/>
//<Scene key="myProfile" component={MyProfile}/>
//<Scene key="signUp" component={SignupForm}/>
//<Scene key="myproject" component={MyProject} title = "MyProject" initial = {true}/>
//<Scene key="recruitproject" component={RecruitProject} title = "RecruitProject" initial = {true}/>
//<Scene key="joinproject" component={JoinProject} title = "JoinProject" initial = {true}/>
//<Scene key="projectboard" component={ProjectBoard} title = "ProjectBoard" initial = {true}/>

export default class ReactNativeRailsAuth extends React.Component {
  /*
  renderScene(route, navigator) {
    console.log(route);
    if(route.name == 'register') {
      return <SignupForm navigator={navigator} />
    }
    if(route.name == 'login') {
      return <Login navigator={navigator} />
    }
    if(route.name == 'home') {
      return <Home navigator={navigator} {...route.passProps} />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{name: 'login'}}
          renderScene={this.renderScene.bind(this)}
        />
      </View>
    );
  }
*/
  
  render() {
    return <Router>
      <Scene key="root">          
        <Scene key="signUp" component={SignupForm}/>
        <Scene key="Login" component={Login} title = "Login" initial = {true}/>
        
      </Scene>
    </Router>
  }
  
}
// AppRegistry.registerComponent('ReactNativeRailsAuth', () => ReactNativeRailsAuth);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
