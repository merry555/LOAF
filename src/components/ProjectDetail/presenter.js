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
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'

class ProjectDetail extends Component {
    static navigationOptions= ({navigation}) =>({
        title: 'Project Detail',	
    }); 
    constructor(props) {
        super(props)
        this.state = {
          file : "",
          title : "",
          caption: "",
          schedule : "",
          max_member: "",
          tags: [],
          creator_name : "",
          creator: [],
          data: [],
          project_status: 0
        } 
    } 
    renderItem = ({ item }) => {
        const { navigation } = this.props;
        return(
        <TouchableOpacity onPress={() => navigation.navigate('FriendDetail', {
            itemId : item.id
            })}  
            key={item.id}>
            <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd' }}>
                <View style={{ flex: 2 }}>
                    <Image source={{uri: item.profile_image}}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                    />
                </View>
                <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                    <Text>{item.username}</Text>
                </View>
            </View>
        </TouchableOpacity>
        )   
    }
    componentDidMount() {
        const {navigation} = this.props;
        const itemId = navigation.getParam('itemId','NO-ID');    
        return fetch("https://raw.githubusercontent.com/merry555/json/master/json/projects/projectDetail/"+ itemId +".json")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                file: responseJson.file,
                title: responseJson.title,
                caption : responseJson.caption,
                schedule: responseJson.schedule,
                max_member: responseJson.max_member,
                tags : responseJson.tags,
                creator_name: responseJson.creator.username,
                creator: responseJson.creator,
                id : responseJson.id, 
                data : responseJson.join,
                project_status : responseJson.project_status
                //joiner_name : responseJson.join.joiner.username,
                //joiner_img : responseJson.join.joiner.profile_image
            })
        })
        .catch((error) => {
            console.error(error)
        }); 
    }
    render() {
        const {navigation} = this.props;
        if (this.state.project_status == 2) {
            return (
                <ScrollView>
                    <View style={styles.container}>
                        <Image style={styles.projectImg} source={{uri : this.state.file}}/>
                        <View style={styles.body}>
                            <View style={styles.projectHead}>
                                <Text style={styles.projectName}>{this.state.title}</Text>
                                <Text style={styles.projectTag}>#{this.state.tags[0]} #{this.state.tags[1]} #{this.state.tags[2]}</Text>
                            </View>
                        </View>
                        <Card>
                            <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 20, marginTop:10 }}>마스터</Text>
                            <TouchableOpacity style={styles.board} 
                                onPress={() => navigation.navigate('FriendDetail', {
                                    itemId : this.state.creator.id })}
                                    key={this.state.creator.id} 
                                    style={styles.emailItem}
                                    >
                            <CardItem>
                                <Left>
                                    <Thumbnail source={{uri : this.state.creator.profile_image}} />
                                    <Body>
                                        <Text style={{ fontSize: 17 }}>{this.state.creator.username}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            </TouchableOpacity>
                        </Card>
                        <Card>
                            <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 20, marginTop:10 }}>프로젝트 개요</Text>
                            <Text style={{ fontSize: 17, fontWeight: '200', paddingHorizontal: 20, marginTop: 5, marginBottom:10 }}>{this.state.caption}</Text>
                        </Card>
                        <Card>
                            <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 20, marginTop:10 }}>프로젝트 일정</Text>
                            <Text style={{ fontSize: 17, fontWeight: '200', paddingHorizontal: 20, marginTop: 5, marginBottom:10 }}>{this.state.schedule}</Text>
                        </Card>
                        <Card>
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 20, marginTop:10 }}>참가자 목록</Text>                           
                            </View>
                            <View style={{ height: 130, marginTop: 30, marginBottom: 10 }}>
                                <FlatList
                                    horizontal={true}
                                    data = {this.state.data}
                                    renderItem = {this.renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        </Card>
                    </View>
                </ScrollView>
            );
        }
        else {
            return (
                <ScrollView>
                    <View style={styles.container}>
                        <Image style={styles.projectImg} source={{uri : this.state.file}}/>
                        <View style={styles.body}>
                            <View style={styles.projectHead}>
                                <Text style={styles.projectName}>{this.state.title}</Text>
                                <Text style={styles.projectTag}>#{this.state.tags[0]} #{this.state.tags[1]} #{this.state.tags[2]}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems:"center"}}>
        
                            <TouchableOpacity style={styles.board} 
                                onPress={() => navigation.navigate('AbilityForm', {
                                    itemId : this.state.id })}>
                                <Text>참가하기</Text>  
                            </TouchableOpacity> 
                            <Text style={{fontSize: 15, marginBottom:2}}>참여 가능한 인원 수  :  {this.state.max_member}</Text>
                        </View>
                        <Card>
                            <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 20, marginTop:10 }}>마스터</Text>
                            <TouchableOpacity style={styles.board} 
                                onPress={() => navigation.navigate('FriendDetail', {
                                    itemId : this.state.creator.id })}
                                    style={styles.emailItem}
                                    >
                            <CardItem>
                                <Left>
                                    <Thumbnail source={{uri : this.state.creator.profile_image}} />
                                    <Body>
                                        <Text style={{ fontSize: 17 }}>{this.state.creator.username}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            </TouchableOpacity>
                        </Card>
                        <Card>
                            <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 20, marginTop:10 }}>프로젝트 개요</Text>
                            <Text style={{ fontSize: 17, fontWeight: '200', paddingHorizontal: 20, marginTop: 5, marginBottom:10 }}>{this.state.caption}</Text>
                        </Card>
                        <Card>
                            <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 20, marginTop:10 }}>프로젝트 일정</Text>
                            <Text style={{ fontSize: 17, fontWeight: '200', paddingHorizontal: 20, marginTop: 5, marginBottom:10 }}>{this.state.schedule}</Text>
                        </Card>
                        <Card>
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 20, marginTop:10 }}>참가자 목록</Text>                           
                            </View>
                            <View style={{ height: 130, marginTop: 30, marginBottom: 10 }}>
                                <FlatList
                                    horizontal={true}
                                    data = {this.state.data}
                                    renderItem = {this.renderItem}
                                />
                            </View>
                        </Card>
                    </View>
                </ScrollView>
            );
        }
    }
}
 
export default ProjectDetail;

const styles = StyleSheet.create({
    container : {
        backgroundColor:'white'
    },
    body:{
        marginTop:5,
        alignItems:'center',
        backgroundColor:'white'
    },
    projectHead: {
        flex: 1,
        alignItems: 'center',
        padding:30,
    },
    projectOutline: {
        alignItems: 'center',
        padding:30,
        height: 30,
        fontSize: 20,
        backgroundColor: 'gray', 
        color:'white'
    },
    projectText: {
        alignItems: 'center',
        padding:30,
        fontSize: 15,
        backgroundColor: 'white', 
    },
    projectSchedule: {
        alignItems: 'center',
        padding: 5,
        fontSize: 20,
        backgroundColor: 'gray', 
        color:'white'       
    },
    projectImg:{
        backgroundColor: "#00BFFF",
        height:250,
    },
    projectName:{
        fontSize:30,
        color:'black',
        fontWeight:'600',
    },
    projectTag:{
        fontSize:20,
        color: 'black',
        marginTop:15
    },
    num: {
        fontSize:20,
        color:'black',
        marginTop:10,
    },

    info:{
        fontSize:18,
        marginTop:25,
    },

    board: {
        height:40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:100,
        borderRadius:30,
        borderColor: '#000',
        borderWidth: 0.5,
    },
    item:{
        flexDirection : 'row',
    },
    iconContent:{
        paddingRight:5,
    }
});