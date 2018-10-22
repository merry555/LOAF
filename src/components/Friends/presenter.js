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
import {createStackNavigator} from 'react-navigation';
import FriendDetail from '../FriendDetail/presenter'

import Icon from 'react-native-vector-icons/Ionicons'
import FriendsList from '../FriendsList/presenter'
import RecomFriends from '../RecomFriends/presenter'

const { height, width } = Dimensions.get('window')

class Friends extends Component {
    static navigationOptions= ({navigation}) =>({
        title: 'Friends',	
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
                                친구 추천
                            </Text>

                            <View style={{ height: 130, marginTop: 20 }}>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <RecomFriends navigation = {navigate}/>
                                </ScrollView>
                            </View>

                            <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 24, fontWeight: '700', marginBottom:10 }}>
                                    친구 목록
                                </Text>
                                <FriendsList navigation = {navigate}/>
                            </View>
                        </View>
                    </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default Friends;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});