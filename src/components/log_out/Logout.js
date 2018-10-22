import React , { Component } from 'react';
import { 
    AsyncStorage 
} from 'react-native';
import Login from '../log_in/Login';


export default class Logout extends React.Component {
    render() {
        console.log("logout..?");
        async () => await AsyncStorage.getItem('token');
        async () => await AsyncStorage.getItem('username');
        alert("logout!");
    

    }
    
    
}
