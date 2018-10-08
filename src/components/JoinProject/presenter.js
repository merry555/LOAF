import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  CheckBox
} from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'

const JoinProject = (props) => {
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
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>질문 항목</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text style={{ fontSize: 15, paddingHorizontal: 20 }}>
                            파이썬에 대한 이해 정도
                        </Text>
                    </Body>
                    <View >
                    <CheckBox style={{marginLeft:10}}>
                        <Text style={{ fontSize: 15, fontWeight: '500'}}>상</Text>
                    </CheckBox>
                    <CheckBox style={{marginLeft:10}}>
                        <Text style={{ fontSize: 15, fontWeight: '500'}}>중</Text>
                    </CheckBox>
                    <CheckBox style={{marginLeft:10}}>
                        <Text style={{ fontSize: 15, fontWeight: '500'}}>하</Text>
                    </CheckBox>
                    </View>
                </CardItem>
            </Card> 
            </View>
        </ScrollView>
    );
}
 
export default JoinProject;

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
});