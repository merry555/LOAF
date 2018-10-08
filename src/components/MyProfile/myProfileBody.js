import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';

class myProfileBody extends Component {
  constructor() {
    super()
    this.state = {
      data : []
    }
  } 
  renderItem = ({ item }) => {
    return(
      <View style={styles.container}>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={{uri : item.image}}/>
      <View style={styles.body}>
      <View style={styles.bodyContent}>
        <Text style={styles.name}>{item.book_title}</Text>
        <Text style={styles.nick}>{item.author}</Text>
        <View style={styles.item}>
        <View style={styles.iconContent}>
        <Image style={styles.icon} source={{uri: 'https://png.icons8.com/home/win8/50/ffffff'}}/>
        </View>
        <View style={styles.infoContent}>
        <Text style={styles.info}>{item.author}</Text>
        </View>
        </View>
        <View style={styles.item}>
        <View style={styles.iconContent}>
        <Image style={styles.icon} source={{uri: 'https://png.icons8.com/windows/50/000000/gender-neutral-user.png'}}/>
        </View>
        <View style={styles.infoContent}>
        <Text style={styles.info}>{item.author}</Text>
        </View>
        </View>
        <View style={styles.item}>
        <View style={styles.iconContent}>
        <Image style={styles.icon} source={{uri: 'https://png.icons8.com/shopping-basket/ios11/50/ffffff'}}/>
        </View>
        <View style={styles.infoContent}>
        <Text style={styles.info}>{item.image}</Text>
        </View>
        </View>

        <View style={styles.item}>
        <View style={styles.iconContent}>
        <Image style={styles.icon} source={{uri: 'https://png.icons8.com/news/win8/50/ffffff'}}/>
        </View>
        <View style={styles.infoContent}>
        <Text style={styles.info}>{item.book_title}</Text>
        </View>
        </View>

        <View style={styles.item}>
        <View style={styles.iconContent}>
        <Image style={styles.icon} source={{uri: 'https://png.icons8.com/shopping-basket/ios11/50/ffffff'}}/>
        </View>
        <View style={styles.infoContent}>
        <Text style={styles.info}>#서핑 #자바</Text>
        </View>
        </View>
        </View>
        </View>
      </View>
    )
  }
  componentDidMount() {
    return fetch('https://www.json-generator.com/api/json/get/ccLAsEcOSq?indent=1')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        data: responseJson.book_array
      })
    })
    .catch((error)=> {
      console.error(error)
    });
  }
  render() {
    return(
      <ScrollView>
          <FlatList
            data={this.state.data} //[{key: 'a'}, {key: 'b'}]
            renderItem={this.renderItem} //({user})=> <Text>{user.key}</Text>
          />
          <TouchableOpacity style={styles.buttonContainer}>
            <Text>프로젝트 경험</Text>  
          </TouchableOpacity> 
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
    height:500,
    alignItems:'center',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  nick:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  info:{
    fontSize:18,
    marginTop:25,
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5
  },
  buttonContainer: {
    marginTop: 40,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  item:{
    flexDirection : 'row',
  },
  iconContent:{
    paddingRight:5,
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
  },
});

export default myProfileBody;