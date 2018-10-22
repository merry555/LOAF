import PropTypes from 'prop-types';
//var { FBLogin, FBLoginManager } = require('react-native-facebook-login');
import React , { Component } from 'react';
import logoImg from '../../image/logoImg.png';
import loginImg1 from '../../image/loginImg1.png';
import loginImg2 from '../../image/loginImg2.png';
import logingback from '../../image/loginBack_background.png';
import { StyleSheet, 
    Text, 
    View, 
    TextInput, 
    Dimensions, 
    TouchableOpacity, 
    Image, 
    KeyboardAvoidingView,
    ImageBackground,
    ScrollView,
    AsyncStorage } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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


  componentDidMount(){
    this._loadInitialState().done();
}

_loadInitialState = async () => {
  const isLogin = await AsyncStorage.getItem('l');//l change token, username
  if(isLogin !== null) {
    console.log(isLogin);
   this.props.navigation.navigate('Main');
  }
}

  render() {
    return (
     

        <ImageBackground source={logingback} style={{flex:4}}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo}
                source={logoImg}/>

        </View>   
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.formContainer}>
          
          <View style={{ paddingBottom: 20, justifyContent: 'center', alignItems:'center'}}>
            <TextInput 
                onChangeText={ (text)=> this.setState({username: text}) }
                placeholder="username or email"
                placeholderTextColor="rgba(0,0,0,0.2)"
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
            />
            </View>

          <View style={{   paddingBottom: 20, justifyContent: 'center', alignItems:'center'}}>

            <TextInput 
                onChangeText={ (text)=> this.setState({password: text }) }
                placeholder="password"
                placeholderTextColor="rgba(0,0,0,0.2)"
                returnKeyType="go"
                secureTextEntry
                style={styles.input}
                ref={(input) => this.passwordInput = input}
            />
          </View>



            <View style={{ justifyContent: 'center', alignItems:'center', marginBottom: 10 }}> 
            <TouchableOpacity 
              style={styles.buttonContainer}
              onPress={this._login}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            </View>

            <View style={{justifyContent: 'center', alignItems:'center', marginBottom: 10 }}>
            <TouchableOpacity style={styles.buttonFacebook}>
              <Text style={styles.buttonText}>FACEBOOK LOGIN</Text>
            </TouchableOpacity>
            </View>
 
            </View>
            </KeyboardAvoidingView>

        <View style={styles.createContainer}>
          <TouchableOpacity>
            <Text 
              style={styles.creteText}>
              SignUp</Text>
          </TouchableOpacity>

    
          <TouchableOpacity>
          <Text style={styles.creteText}>Forgot Password?</Text>
        </TouchableOpacity>

        </View> 
      
  
      </ImageBackground>
    );
  }



  _login = () => {
      console.log(this.state.username);
      
      fetch('http://192.168.0.3:8000/rest-auth/login/', {
        method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
              })
            })

            .then( (response) => response.json() )
            .then((res) => {

                if(res.user.username === this.state.username) {
                    //loginToken = res.token.replace("\"","");
                    //AsyncStorage.setItem('token',(loginToken));
                    AsyncStorage.setItem('username',(res.user.username));
                    AsyncStorage.setItem('token',(res.token));
                    console.log("--------res.token----------------");
                    console.log(res.token);

                    !this.props.navigation.navigate('Main',{
                      username: res.user.username,
                      profile_image: res.user.profile_image,
                      name: res.user.name,
                      address: res.user.address,
                      school: res.user.school,
                      major: res.user.major,
                      bio: res.user.bio,
                      website: res.user.website,
                      tags: res.user.tags
                    });
                    console.log(res);
                    console.log("login sucess");
                }
                else {
                    console.log("username:"+ res.user.username);
                    alert(res.user.username);
                }

            })
            .done();
        

  
    }


}

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
    flex: 3,
  },
  createContainer: {
    flex: 1,
    marginTop:20,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-around',    
  },
  creteText: {
    color: '#055a47',
    backgroundColor: 'transparent',
  },
  logoContainer: {
      paddingTop: 100,
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center'
  },
  logo : {
    width: 140, 
    height: 140, 
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    color: '#055a47',
    backgroundColor: 'transparent',
  },
  input: {
    width: width - 40 ,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.4)',

    color: '#055a47',
    paddingHorizontal: 10
  },
  buttonContainer: {
      width: width-40,
      backgroundColor: '#fff',
      paddingVertical: 15,
      marginBottom: 5,
  },
  buttonText: {
      textAlign: 'center',
      color: '#055a47',
      fontWeight: '900',
    
  },
  buttonFacebook: {
    width: width-40,
    backgroundColor: 'rgb(59,89,152)',   
    paddingVertical: 15   
  },
  inlineImg: {

    width: 22,
    height: 22,
  },
  formContainer:{
    flex:1,
    marginTop:10,

  },
});