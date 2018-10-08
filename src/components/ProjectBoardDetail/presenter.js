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

const ProjectBoardDetail = (props) => {
    return (
    <ScrollView>
        <View style={styles.container}>
            <Card>
                <CardItem>
                    <Left>
                        <Body>
                        <View style={styles.body}>
                            <View style={styles.projectHead}>
                                <Text style={styles.projectName}>09 29 회의록 입니다.</Text>
                            </View>
                        </View>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Body>
                        <Text style={{ fontSize: 20, fontWeight: '300', paddingHorizontal: 20 }}>
                        으ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ로프 화이링
                        </Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Left>
                        <Body>
                        <Text style={{ fontSize: 20, fontWeight: '300', paddingHorizontal: 20 }}>
                        파일 목록
                        </Text>
                        </Body>
                    </Left>
                </CardItem>
            </Card>
            <Card>
                <CardItem>
                    <Left>
                        <Body>
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: '700', paddingHorizontal: 20 }}>댓글 5개</Text>
                            </View>
                        </Body>
                    </Left>
                </CardItem> 
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}} />
                        <Body>
                            <View>
                            <Text 
                                style={{ fontSize: 15, 
                                fontWeight: '300', 
                                paddingHorizontal: 20 }}
                            >댓글 달기</Text>
                            </View>
                        </Body>
                    </Left>
                </CardItem> 
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}} />
                        <Body>
                            <View>
                            <Text 
                                style={{ fontSize: 15, 
                                fontWeight: '300', 
                                paddingHorizontal: 20 }}
                            >댓글 달기</Text>
                            </View>
                        </Body>
                    </Left>
                </CardItem> 
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}} />
                        <Body>
                            <View>
                            <Text 
                                style={{ fontSize: 15, 
                                fontWeight: '300', 
                                paddingHorizontal: 20 }}
                            >댓글 달기</Text>
                            </View>
                        </Body>
                    </Left>
                </CardItem> 
            </Card>
        </View>
    </ScrollView>
    );
}
 
export default ProjectBoardDetail;

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
        fontSize:20,
        color:'black',
        fontWeight:'600',
    },
});