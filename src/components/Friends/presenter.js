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
import FriendsList from '../FriendsList/presenter'
import RecomFriends from '../RecomFriends/presenter'

const { height, width } = Dimensions.get('window')

class Friends extends Component {

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
                <View style={{ height: this.startHeaderHeight, backgroundColor: 'white', borderBottomColor: '#dddddd' }}>
                    </View>
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
                                    <RecomFriends imageUri={require('../../img/home.jpg')}
                                        name="Home"
                                    />
                                    <RecomFriends imageUri={require('../../img/home.jpg')}
                                        name="Experiences"
                                    />
                                    <RecomFriends imageUri={require('../../img/home.jpg')}
                                        name="Resturant"
                                    />
                                </ScrollView>
                            </View>

                            <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                                <Text style={{ fontSize: 24, fontWeight: '700' }}>
                                    친구 목록
                                </Text>
                                <Text style={{ fontWeight: '100', marginTop: 10 }}>
                                    가입한 친구 목록
                                </Text>
                                    <FriendsList/>
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