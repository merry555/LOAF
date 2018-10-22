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
    Dimensions
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import MyIngProject from '../MyIngProjects/presenter'
import CompleteProject from '../CompleteProject/presenter'
import MasterProjects from '../MasterProjects/master'

const { height, width } = Dimensions.get('window')

class Explore extends Component {
    static navigationOptions= ({navigation}) =>({
        title: 'My Projects',	
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
                    <ScrollView
                        scrollEventThrottle={16}
                    >
                    <View>
                        <View style={{ backgroundColor: 'white', paddingTop: 20 }}>
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                마스터인 프로젝트
                            </Text>
                            <View style={{ height: 130, marginTop: 20 }}>
                                <MasterProjects navigation = {navigate}/>
                            </View>
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                진행중인 프로젝트
                            </Text>
                            <View style={{ height: 130, marginTop: 20 }}>
                                <MyIngProject navigation = {navigate}/>
                            </View>
                            <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 24, fontWeight: '700' }}>
                                    완료한 프로젝트 목록
                                </Text>
                                <CompleteProject navigation = {navigate}/>
                            </View>
                        </View>
                    </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}
export default Explore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});