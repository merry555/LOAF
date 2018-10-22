import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity
} from "react-native";

class MyIngProject extends Component {
    constructor() {
        super();
        this.state = {
            data : []
        }
    }
    renderItem = ({ item }) => {
        const { navigation } = this.props;
        return ( 
        <TouchableOpacity onPress={() => navigation('ProjectDetail', {
            itemId : item.id
          })}>
            <View style={{ height: 130, width: 130, marginLeft: 20, borderWidth: 0.5, borderColor: '#dddddd' }}>
                <View style={{ flex: 2 }}>
                    <Image source={{uri : item.file}}
                        style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
                    />
                </View>
                <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
                    <Text style={{ fontSize:14 }}>{item.title}</Text>
                    <Text style={{ fontSize:10, marginTop:2 }}>#{item.tags[0]} #{item.tags[1]} #{item.tags[2]}</Text>
                </View>
            </View>  
        </TouchableOpacity>          
        )
    }
    componentDidMount() {
        return fetch("https://raw.githubusercontent.com/merry555/json/master/json/projects/ing_projects.json")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                data : responseJson
            })
        })
        .catch((error) => {
            console.error(error)
        });
    }
    render() {
        return(
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                />
            </ScrollView>
        )
    }

}
export default MyIngProject;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});