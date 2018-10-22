import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


var radio_props = [
    {label: '상', value: 0 },
    {label: '중', value: 1 },
    {label: '하', value: 2 }
];

class AbilityForm extends Component {
    static navigationOptions= ({navigation}) =>({
        title: 'Ability Form',	
    }); 
    constructor(props) {
        super(props)
        this.state = {
          file : "",
          title : "",
          caption: "",
          schedule : "",
          max_member: "",
          apt: [],
          tags:[],
          creator : ""
        } 
    } 
    componentDidMount() {
        const {navigation} = this.props;
        const itemId = navigation.getParam('itemId','NO-ID');    
        return fetch("https://raw.githubusercontent.com/merry555/json/master/json/projects/projectDetail/"+ itemId +".json")
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                file: responseJson.file,
                title: responseJson.title,
                caption : responseJson.caption,
                schedule: responseJson.schedule,
                max_member: responseJson.max_member,
                apt : responseJson.apt,
                tags : responseJson.tags,
                creator: responseJson.creator,
                id : responseJson.id
            })
        })
        .catch((error) => {
            console.error(error)
        }); 
    }
    render() {
        const {navigation} = this.props;
        return (
        <ScrollView>
            <View style={styles.container}>
                <Image style={styles.projectImg} source={{uri : this.state.file}}/>
                <View style={styles.body}>
                    <View style={styles.projectHead}>
                        <Text style={styles.projectName}>{this.state.title}</Text>
                        <Text style={styles.projectTag}>#{this.state.tags[0]} #{this.state.tags[1]} #{this.state.tags[2]}</Text>
                    </View>
                </View>
                <View style={{ alignItems:"center", fontWeight:'400'}}>
                    <Text style={{fontSize:16}}>다음의 능력에 대해 "상" "중" "하" 로 평가해 주세요.</Text>
                </View>
                <Card>
                <View style={{ alignItems:"center", marginTop:5}}>
                <View>
                    <Text style={styles.aptTag}>{this.state.apt[0]}</Text>
                </View>
                <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    onPress={(value) => {this.setState({value:value})}}
                    formHorizontal={true}
                    labelHorizontal={false}
                    />
                <View>
                    <Text style={styles.aptTag}>{this.state.apt[1]}</Text>
                </View>
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        onPress={(value) => {this.setState({value:value})}}
                        formHorizontal={true}
                        labelHorizontal={false}
                        maginLeft = {5}
                        borderWidth={1}
                        />
                <View>
                    <Text style={styles.aptTag}>{this.state.apt[2]}</Text>
                </View>
                    <RadioForm
                        radio_props={radio_props}
                        initial={0}
                        onPress={(value) => {this.setState({value:value})}}
                        formHorizontal={true}
                        labelHorizontal={false}
                        borderWidth={1}
                        />                                        
                </View> 
                </Card>      
                <View style={{ alignItems:"center"}}>
                    <TouchableOpacity 
                        style={styles.board} 
                        onPress={() => Alert.alert("제출 완료!")}>
                    >
                        <Text>제출하기</Text>  
                    </TouchableOpacity>  
                </View>        
            </View>
        </ScrollView>
        );
    }
}
 
export default AbilityForm;

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
        marginTop:15
    },
    aptTag: {
        fontSize:20,
        color: 'black',
        marginTop:20,
        marginBottom:10
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
        height:40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:100,
        borderRadius:30,
        borderColor: '#000',
        borderWidth: 0.5,
        marginTop: 5
    },
    item:{
        flexDirection : 'row',
    },
    iconContent:{
        paddingRight:5,
    }
});