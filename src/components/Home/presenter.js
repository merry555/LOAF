import React , { Component } from 'react';
import { Alert , 
  AsyncStorage,
  StyleSheet, Text, View, Button, Image, TouchableOpacity, TouchableHighlight,
 } from 'react-native';
import {createStackNavigator, StackNavigator} from 'react-navigation';
// import eunwoo from '../image/eunwoo.jpg';
import {Navigator} from 'react-native-deprecated-custom-components';

const ACCESS_TOKEN = 'access_token';

export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggenIn: "",
      showProgress: false,
      accessToken: "",
    }
  }
  componentWillMount() {
    this.getToken();
  }
  async getToken() {
    try {
      let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      if(!accessToken) {
          this.redirect('login');
      } else {
          this.setState({accessToken: accessToken})
      }
    } catch(error) {
        console.log("Something went wrong");
        this.redirect('login');
    }
  }
  async deleteToken() {
    try {
        await AsyncStorage.removeItem(ACCESS_TOKEN)
        this.redirect('root');
    } catch(error) {
        console.log("Something went wrong");
    }
  }
  redirect(routeName){
    this.props.navigator.push({
      name: routeName,
      passProps: {
        accessToken: this.state.accessToken
      }
    });
  }
  onLogout(){
    this.setState({showProgress: true})
    this.deleteToken();
  }

  confirmDelete() {
    AlertIOS.alert("Are you sure?", "This action cannot be undone", [
      {text: 'Cancel'}, {text: 'Delete', onPress: () => this.onDelete()}
    ]);
  }

  async onDelete(){
    let access_token = this.state.accessToken
    try {
      let response = await fetch('https://afternoon-beyond-22141.herokuapp.com/api/users/'+access_token,{
                              method: 'DELETE',
                            });
        let res = await response.text();
        if (response.status >= 200 && response.status < 300) {
          console.log("success sir: " + res)
          this.redirect('root');
        } else {
          let error = res;
          throw error;
        }
    } catch(error) {
        console.log("error: " + error)
    }
  }
  _onPressButton()  {
    Alert.alert('You tapped the button!')
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
      
        <View style={{height: 150}}>
          <View style= {{flex:1, height: 150, borderWidth: 0.5, justifyContent: 'center',
                alignItems: 'center' }}> 
            <TouchableHighlight
            onPress={Actions.MyProfile} 
            >
          <Image source={eunwoo} style={{height: 50, width: 50}}/>
          </TouchableHighlight>
          <Text> USER NAME </Text>
          </View>
        </View>
        
        <View style={{height: 150}}>
          <View style= {{flex:1, height: 150, borderWidth: 0.5, justifyContent: 'center',
                    alignItems: 'center' }}>
            <TouchableHighlight
            onPress={Actions.MyProject}
           // onPress={() => navigation.navigate('MyProject'
            //navigation.navigate(MyProfile)
          >
            <View style= {{width: 50, height: 50, backgroundColor: 'gray'}}/>
          </TouchableHighlight>
        <Text>MY PROJECT</Text>
          </View>
        </View>

        <View style={{height: 150,flexDirection: 'row'} }>

          <View style= {{flex:1,borderWidth: 0.5, justifyContent: 'center',
                    alignItems: 'center' }}>
            <TouchableHighlight  onPress={this._onPressButton}>
            <View style= {{width: 50, height: 50, backgroundColor: 'gray'}}/>
            </TouchableHighlight >
              <Text>PROJECT</Text>
            </View>

          <View style= {{flex:1,borderWidth: 0.5, justifyContent: 'center',
                    alignItems: 'center' }}>
            <TouchableHighlight  onPress={this._onPressButton}>
            <View style= {{width: 50, height: 50, backgroundColor: 'gray'}}/>
            </TouchableHighlight>
              <Text>FRIENDS</Text>
          </View>

        </View>


        <View style={{height: 100,flexDirection: 'row'} }>
          <View style= {{flex:1,borderWidth: 0.5, justifyContent: 'center',
                    alignItems: 'center' }}>
            <TouchableHighlight  onPress={this._onPressButton}>
            <View style= {{width: 50, height: 50, backgroundColor: 'gray'}}/>
            </TouchableHighlight >
              <Text>Logout</Text>
            </View>

            <View style= {{flex:1,borderWidth: 0.5, justifyContent: 'center',
                    alignItems: 'center' }}>
              <TouchableHighlight  onPress={this._onPressButton}>        
            <View style= {{width: 50, height: 50, backgroundColor: 'gray'}}/>
            </TouchableHighlight>
              <Text>NOTICE</Text>
            
            </View>

          </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex :1,
  },
  button:{
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10
  }
});
  