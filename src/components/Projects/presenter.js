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
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import IngProject from '../IngProject/presenter'
import RecomProjects from '../RecomProjects/presenter'

const { height, width } = Dimensions.get('window')

class Projects extends Component {

    componentWillMount() {
        this.startHeaderHeight = 80
        if (Platform.OS == 'android') {
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                <View style={{ height: this.startHeaderHeight, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
                        <View style={{
                            flexDirection: 'row', padding: 10,
                            backgroundColor: 'white', marginHorizontal: 20,
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: 'black',
                            shadowOpacity: 0.2,
                            elevation: 1,
                            marginTop: Platform.OS == 'android' ? 35 : 20,
                            marginBottom: Platform.OS == 'android' ? null : 10
                        }}>
                            <Icon name="ios-search" size={20} style={{ marginRight: 10 }} />
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="진행중인 프로젝트 찾기"
                                placeholderTextColor="grey"
                                style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
                                secureTextEntry
                            />
                        </View>
                    </View>
                    <ScrollView
                        scrollEventThrottle={16}
                    >
                    <View>
                        <View style={{ backgroundColor: 'white', paddingTop: 20 }}>
                            <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                                프로젝트 추천
                            </Text>

                            <View style={{ height: 130, marginTop: 20 }}>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <RecomProjects imageUri={require('../../img/home.jpg')}
                                        name="Home"
                                    />
                                    <RecomProjects imageUri={require('../../img/home.jpg')}
                                        name="Experiences"
                                    />
                                    <RecomProjects imageUri={require('../../img/home.jpg')}
                                        name="Resturant"
                                    />
                                </ScrollView>
                            </View>

                            <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 24, fontWeight: '700' }}>
                                    프로젝트
                                </Text>
                                <Text style={{ fontWeight: '100', marginTop: 10 }}>
                                    전체 프로젝트 목록
                                </Text>
                                        <IngProject imageUri={require('../../img/home.jpg')}
                                        name="Home"
                                        />
                                        <IngProject imageUri={require('../../img/home.jpg')}
                                        name="Home"/>
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
    }
});