import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet,
  AsyncStorage, 
  Text, View, TextInput, Image, TouchableOpacity, StatusBar, KeyboardAvoidingView } from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';

const ACCESS_TOKEN = 'access_token';

export default class SignupForm extends React.Component {
  constructor(){
    super();
    this.state = {
      username:"",
      email: "",
      name: "",
      password1: "",
      password2: "",
      errors: [],
      showProgress: false,
    }
  }
  redirect(routeName, accessToken){
    this.props.navigator.push({
      name: routeName
    });
  }

  async storeToken(accessToken) {
    try {
        await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
        console.log("Token was stored successfull ");
    } catch(error) {
        console.log("Something went wrong");
    }
  }
  async onRegisterPressed() {
    this.setState({showProgress: true})
    try {
      let response = await fetch('/rest-auth/registration/', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                user:{
                                  username: this.state.username,                                  
                                  name: this.state.name,
                                  email: this.state.email,
                                  password1: this.state.password1,
                                  password2: this.state.password2,
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
    } catch(errors) {
      //errors are in JSON form so we must parse them first.
      let formErrors = JSON.parse(errors);
      //We will store all the errors in the array.
      let errorsArray = [];
      for(var key in formErrors) {
        //If array is bigger than one we need to split it.
        if(formErrors[key].length > 1) {
            formErrors[key].map(error => errorsArray.push(`${key} ${error}`));
        } else {
            errorsArray.push(`${key} ${formErrors[key]}`);
        }
      }
      this.setState({errors: errorsArray})
      this.setState({showProgress: false});
    }
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.sub}> Sign up </Text>
          <Text style={styles.title}> 아래 내용을 입력해 주세요. </Text>
        </View>   
        <View style={styles.formContainer}>
          <View style={styles.loginContainer}>
            <TextInput 
                onChangeText={ (text)=> this.setState({username: text}) }
                placeholder="User Name"
                placeholderTextColor="rgba(255,255,255,0.2)"
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
            />
            <TextInput 
                onChangeText={ (text)=> this.setState({name: text}) }
                placeholder="Name"
                placeholderTextColor="rgba(255,255,255,0.2)"
                returnKeyType="go"
                secureTextEntry={false}
                style={styles.input}
            />
            <TextInput 
                onChangeText={ (text)=> this.setState({email: text}) }
                placeholder="Email"
                placeholderTextColor="rgba(255,255,255,0.2)"
                returnKeyType="go"
                secureTextEntry = {false}
                style={styles.input}
            />
            <TextInput 
                onChangeText={ (text)=> this.setState({password1: text}) }
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.2)"
                returnKeyType="go"
                secureTextEntry
                style={styles.input}
                ref={(input) => this.passwordInput = input}
            />
            <TextInput 
                onChangeText={ (text)=> this.setState({password2: text}) }
                placeholder="Check Password"
                placeholderTextColor="rgba(255,255,255,0.2)"
                returnKeyType="go"
                secureTextEntry
                style={styles.input}
                ref={(input) => this.passwordInput = input}
            />
            <TouchableOpacity 
              style={styles.buttonContainer}
              onPress={this.onRegisterPressed.bind(this)}
            >
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>  
        <Errors errors={this.state.errors}/>

      </KeyboardAvoidingView>
    );
  }
}

const Errors = (props) => {
  return (
    <View>
      {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
});
