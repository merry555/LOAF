import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import RecruitProject from '../RecruitProject/presenter'
import RecomProjects from '../RecomProjects/presenter'

const { height, width } = Dimensions.get('window')

class Projects extends Component {
    static navigationOptions= ({navigation}) =>({
        title: 'Projects',	
    }); 
    componentWillMount() {
        this.startHeaderHeight = 80
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
    } 

    render() {
        const { navigate } = this.props.navigation;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                <View style={{ alignItems:"center", backgroundColor:"white"}}>
                    <TouchableOpacity style={styles.board} 
                        onPress={() => navigate('ProjectForm')}>
                        <Text>프로젝트 등록하기</Text>  
                    </TouchableOpacity> 
                </View>
                    <ScrollView
                        scrollEventThrottle={16}
                    >
                    <View>
                        <View style={{ backgroundColor: 'white'}}>
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                프로젝트 추천
                            </Text>
                            <View style={{ height: 130, marginTop: 20 }}>
                                <RecomProjects navigation = {navigate}/>
                            </View>
                            <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 24, fontWeight: '700', marginBottom:15 }}>
                                    프로젝트 목록
                                </Text>
                                <RecruitProject navigation = {navigate}/>
                            </View>
                        </View>
                    </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}
export default Projects;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    board: {
        marginTop: 20,
        height:40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:200,
        borderRadius:30,
        borderColor: '#000',
        borderWidth: 0.5,
        marginBottom:20
    },
});