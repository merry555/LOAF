import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity
} from "react-native";

import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'
import ProjectBoardList from '../ProjectBoardList/presenter'

class ProjectBoard extends Component {

    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: 'white',paddingHorizontal: 20, paddingTop:10 }}>
                <TouchableOpacity>
                    <ProjectBoardList/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ProjectBoardList/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ProjectBoardList/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ProjectBoardList/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ProjectBoardList/>
                </TouchableOpacity>
                    <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.board}>
                        <Text>게시판글 등록하기</Text>  
                    </TouchableOpacity> 
                    </View>
                </View>
                </View>
            </ScrollView>
        );
    }
}
export default ProjectBoard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white'
    },
    board: {
        marginTop: 10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:150,
        borderRadius:30,
        backgroundColor: "#00BFFF",
    },
});