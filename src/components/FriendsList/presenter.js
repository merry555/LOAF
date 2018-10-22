import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,KeyboardAvoidingView,Alert } from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import SearchInput, { createFilter } from 'react-native-search-filter';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'
import user from "./api/users";
import { createStackNavigator } from 'react-navigation';

import FriendDetail from '../FriendDetail/presenter'

const KEYS_TO_FILTERS = ['username', 'tags']
   
class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm:''
    };   
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }

  render() {
    const filteredFriends = user.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    const { navigation } = this.props;
    console.log("flist navigation"+ navigation);

    return (
      <View> 
      <KeyboardAvoidingView>
        <SearchInput
          onChangeText={(term) => {this.searchUpdated(term)}}
          style={styles.searchInput}
          placeholder="Search Friends (ex. 취업)"
        />
      </KeyboardAvoidingView>
        <ScrollView>
          {filteredFriends.map(user => {
            return( //Alert.alert('You tapped the button!');
            //navigation('FriendDetail',{itemId:user.id})
              <TouchableOpacity onPress={() => navigation('FriendDetail', {
                itemId : user.id
              })} 
              key={user.id} 
              style={styles.emailItem}
              >
              <CardItem>
                  <Left>
                      <Thumbnail source={{uri : user.profile_image}} />
                      <Body>
                          <Text style={{ fontSize: 17 }}>{user.username}</Text>
                          <Text style={{ fontSize: 15, marginTop:10 }}>#{user.tags[0]} #{user.tags[1]} #{user.tags[2]}</Text>
                      </Body>
                  </Left>
              </CardItem>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    );
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  emailItem:{
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)'
  },
  searchInput:{
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius : 5
  }
});

export default FriendsList;