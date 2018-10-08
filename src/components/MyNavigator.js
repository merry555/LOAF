import React , { Component } from 'react';
import { Alert , StyleSheet, Text, View, Button, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import {createStackNavigator} from 'react-navigation';

import Main from './Main';
import MyProfile from './MyProfile';
import MyProject from './MyProject';
import ProfileForm from './ProfileForm/ProfileForm';


export default class MyNavigator extends React.Component{
    render(){
      return<MainNavigator/>;
    }
  }
  
  const MainNavigator = createStackNavigator({
   Main:  {
        screen: Main,
        navigationOptions: {
            headerTitle : 'Loaf',
            headerStyle: {
                backgroundColor: '#f4511e',
            },
        }
   },   
   MyProject : {
           screen: MyProject,
           navigationOptions: {
               headerTitle : 'MY Project',
           }
       },
    MyProfile : {
           screen: MyProfile,
           navigationOptions: {
               headerTitle : 'MY Profile',
           }
     }, 
     ProfileForm : {
        screen: ProfileForm,
        navigationOptions: {
            headerTitle : 'Profile',
        }
  }, 
     initialRounteName: Main
   
  })
  