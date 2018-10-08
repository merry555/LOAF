import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'

const ProjectDetail = (props) => {
    return (
    <ScrollView>
        <View style={styles.container}>
            <Image style={styles.projectImg} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
            <View style={styles.body}>
                <View style={styles.projectHead}>
                    <Text style={styles.projectName}>NLP</Text>
                    <Text style={styles.projectTag}>#파이썬 #자연어 #코딩</Text>
                </View>
            </View>
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}} />
                        <Body>
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>참가자 목록</Text>
                        </Body>
                    </Left>
                </CardItem>
                <View style={{ height: 130, marginTop: 30, marginBottom: 10 }}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd' }}>
                            <View style={{ flex: 2 }}>
                                <Image source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
                                    style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                                />
                            </View>
                            <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                                <Text>박혜진</Text>
                            </View>
                        </View>
                        <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd' }}>
                            <View style={{ flex: 2 }}>
                                <Image source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
                                    style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                                />
                            </View>
                            <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                                <Text>김지수</Text>
                            </View>
                        </View>
                        <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd' }}>
                            <View style={{ flex: 2 }}>
                                <Image source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
                                    style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                                />
                            </View>
                            <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                                <Text>김지수</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Card>
            <TouchableOpacity style={styles.board}>
                <Text>게시판으로 가기</Text>  
            </TouchableOpacity> 
        </View>
    </ScrollView>
    );
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
        marginTop:5
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
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:150,
        borderRadius:30,
        backgroundColor: "#00BFFF",
    },
    item:{
        flexDirection : 'row',
    },
    iconContent:{
        paddingRight:5,
    }
});