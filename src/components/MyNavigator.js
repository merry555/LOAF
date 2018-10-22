import React , { Component } from 'react';
import { Alert , StyleSheet, Text, View, Button, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import {createStackNavigator} from 'react-navigation';

import JoinProject from './JoinProject/presenter'
import RecruitProject from './RecruitProject/presenter'
import RecomFriends from './RecomFriends/presenter'
import ProjectBoard from './ProjectBoard/presenter'
import FriendDetail from './FriendDetail/presenter'
import FriendsList from './FriendsList/presenter'
import ProjectDetail from './ProjectDetail/presenter'
import Message from './Message/message'
import AbilityForm from './AbilityForm/ability'
import MasterProjectDetail from './MasterProjectDetail/masterDetail'

import Home from './Home/presenter'
import MyProject from './MyProject/presenter'
import Friends from './Friends/presenter'
import Projects from './Projects/presenter'
import MyProfile from './MyProfile/presenter'
import ContestInfo from './ContestInfo/info'
import ProfileForm from './ProfileForm/presenter'
import ProjectForm from './ProjectForm/presenter'

export default class MyNavigator extends React.Component{
  render(){
    return<MainNavigator/>;
    <SubNavigator/>;
  }
}

const MainNavigator = createStackNavigator({
  Home: { 
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
      },    
    },
  MyProject: { 
    screen: MyProject,
    navigationOptions: {
      tabBarLabel: 'MyProject',
    },
  },
  MyProfile: { 
    screen:MyProfile,
    navigationOptions: {
      tabBarLabel: 'MyProfile',
    },
  },	
  Projects: { 
    screen: Projects,
    navigationOptions: {
      tabBarLabel: 'Projects',
    },    
  },	
  Friends: { 
    screen: Friends,
    navigationOptions: {
      tabBarLabel: 'Friends',
    },  
  },
  RecomFriends: {
    screen : RecomFriends
  },
  	
  FriendDetail: { 
    screen: FriendDetail, 
  },		
  ProjectDetail: {
    screen: ProjectDetail
  },
  Message: {
    screen: Message
  },
  AbilityForm: {
    screen: AbilityForm
  },
  MasterProjectDetail: {
    screen: MasterProjectDetail
  },
  ContestInfo : {
    screen : ContestInfo
  },
  ProfileForm : {
    screen : ProfileForm
  },
  ProjectForm : {
    screen : ProjectForm
  },
  initialRouteName : Home 
  
})