import PropTypes from 'prop-types';
//var { FBLogin, FBLoginManager } = require('react-native-facebook-login');
import React , { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, StatusBar,
   KeyboardAvoidingView,
   AsyncStorage } from 'react-native';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-router-flux';
import {Navigator} from 'react-native-deprecated-custom-components';

const ACCESS_TOKEN = 'access_token';

export default class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      username: "",
      password: "",
      error: "",
      showProgress: false,
    }
  }
  redirect(routeName, accessToken){
    this.props.navigator.push({
      name: routeName
    });
  }
  storeToken(responseData){
    AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err)=> {
      if(err){
        console.log("an error");
        throw err;
      }
      console.log("success");
    }).catch((err)=> {
        console.log("error is: " + err);
    });
  }
  async onLoginPressed() {
    this.setState({showProgress: true})
    try {
      let response = await fetch('http://172.20.10.10:8000/rest-auth/login/', {
                              method: 'POST',
                              headers: {
                                //'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                session:{
                                  username: this.state.username,
                                  password: this.state.password,
                                }
                              })
                            });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          //Handle success
          let accessToken = res;
          console.log(accessToken);
          //On success we will store the access_token in the AsyncStorage
          this.storeToken(accessToken);
          this.redirect('home');
      } else {
          //Handle error
          let error = res;
          throw error;
      }
    } catch(error) {
        this.setState({error: error});
        console.log("error " + error);
        this.setState({showProgress: false});
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.sub}> Loaf </Text>
          <Text style={styles.title}> 대학생들의 경계없는 성장공간에 오신것을 환영합니다 </Text>
        </View>   
        <View style={styles.formContainer}>
          <View style={styles.loginContainer}>
            <StatusBar
              barStyle="light-content"
            />
            <TextInput 
                onChangeText={ (text)=> this.setState({username: text}) }
                placeholder="username or email"
                placeholderTextColor="rgba(255,255,255,0.2)"
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
            />
            <TextInput 
                onChangeText={ (text)=> this.setState({password: text}) }
                placeholder="password"
                placeholderTextColor="rgba(255,255,255,0.2)"
                returnKeyType="go"
                secureTextEntry
                style={styles.input}
                ref={(input) => this.passwordInput = input}
            />

            <TouchableOpacity 
              style={styles.buttonContainer}
              onPress={this.onLoginPressed.bind(this)}
            >
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonFacebook}>
              <Text style={styles.buttonText}>FACEBOOK LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>  
        <View style={styles.createContainer}>
          <TouchableOpacity>
            <Text 
              style={styles.creteText} 
              onPress={Actions.signUp}
//              onPress={ this.navigate.bind(this,'register') }
              >
              SignUp</Text>
          </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.creteText}>Forgot Password?</Text>
        </TouchableOpacity>
        </View> 
      </KeyboardAvoidingView>
    );
  }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

/*
Login.propTypes = {
  usernameValue : PropTypes.string.isRequired,
  passwordValue : PropTypes.string.isRequired,
  handleInputChange : PropTypes.func.isRequired,
  handleSubmit : PropTypes.func.isRequired,
}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  createContainer: {
    flex: 1,
    top: 65,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',    
  },
  creteText: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  logoContainer: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  sub: {
    color: '#FFF',
  },
  title: {
    color: '#FFF',
    marginTop: 10,
    width: 160,
    textAlign: 'center',
    opacity: 0.9
  },
  loginContainer: {
    padding: 20    
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10
  },
  buttonContainer: {
      backgroundColor: '#F00',
      paddingVertical: 15,
      marginBottom: 5,
  },
  buttonText: {
      textAlign: 'center',
      color: '#FFFFFF',
      fontWeight: '700'
  },
  buttonFacebook: {
    backgroundColor: 'rgb(255,0,0)',   
    paddingVertical: 15   
  }  
});
