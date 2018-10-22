import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,KeyboardAvoidingView, Image, SafeAreaView } from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import SearchInput, { createFilter } from 'react-native-search-filter';
import contest from './contest';

const KEYS_TO_FILTERS = ['title', 'tags']

class ContestInfo extends Component {
    static navigationOptions= ({navigation}) =>({
        title: 'Contest Information',	
    }); 
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
    const filteredFriends = contest.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    const { navigation } = this.props;

    return (
        
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor:'white' }}>   
      <KeyboardAvoidingView>
        <SearchInput
          onChangeText={(term) => {this.searchUpdated(term)}}
          style={styles.searchInput}
          placeholder="Search Projects (ex. 공모전)"
        />
      </KeyboardAvoidingView> 
        <ScrollView
            scrollEventThrottle={16}
        >
          {filteredFriends.map(contest => {
            return(
                <View style={{ height: 200, borderWidth: 0.5, borderColor: '#dddddd', marginTop:10 }}>
                  <View style={{ flex: 3 }}>
                      <Image source={{uri : contest.file}}
                          style={{ flex: 1, resizeMode: 'cover'}}
                      />
                  </View>
                  <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                    <Text style={{ fontSize: 17 }}>{contest.title}</Text>
                    <Text style={{ fontSize: 14, marginTop:2 }}>#{contest.tags[0]} #{contest.tags[1]} #{contest.tags[2]}</Text>
                  </View>
                </View>
            )
          })}
        </ScrollView>
      </View>
      </SafeAreaView>
    );
  }
}

export default ContestInfo;

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
      borderRadius : 5,
      marginTop: 10
    }
  });