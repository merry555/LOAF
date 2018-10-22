import React, { Component } from 'react';
import { Card, CardItem, Thumbnail, Body, Left } from 'native-base';
import hashtagB from '../../image/hashtagB.png';
import defaultImg from '../../image/loginBack_background.png';

import Modal from 'react-native-modal';
import { Constants, ImagePicker, Permissions } from 'expo';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Button,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Alert

} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class ProjectForm extends React.Component  {
    constructor(props) {
        super(props)
        this.state = {
          modalVisible: false,
          uploading: false,
          file : null,
          title : "",
          caption: "",
          schedule : "",
          max_member: "",
          tags0: "",
          tags1:"",
          tags2:"",
          apt0:"",
          apt1:"",
          apt2:"",
        }
    }

    _onPressButton()  {
        Alert.alert("can't connect to server")
      }

      _maybeRenderImage = () => {
        let {
                file
        } = this.state;
       console.log("image!!??"+file);
        if (!file) {
          return(

          <Image source={defaultImg} style={styles.projectImg}/>) ;
        }

        return (
              <Image source={{ uri: file }} style={styles.projectImg} />

        );
      };

    render() {
        const { navigation } = this.props;
        console.log(this.state);

        return (
            <KeyboardAvoidingView behavior="position" >
            <ScrollView>
            <View style={styles.container}>
            {this._maybeRenderImage()}
            <View style={{justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity
                style={styles.board}
                onPress={() => {
                this._toggleModal(!this.state.modalVisible)}}>
            <Text>사진</Text>
            </TouchableOpacity>
            </View>

             <Modal
              style={{justifyContent:'center', alignItems:'center'}}
              backdroColor='black'
              animationIn={'slideInLeft'}
              animationOut={'slideOutRight'}
              isVisible = {this.state.modalVisible}
              onBackButtonPress = {() => { console.log("Modal has been closed.") } }>
            <View style={styles.modal}>

            <View style={styles.modalTitle}>
            <Text style={{fontSize: 20}}>
            프로필 사진 선택{"\n"}
            </Text>
            </View>

            <View style={styles.modalItem}>
              <TouchableHighlight
                onPress = {this._takePhoto}>
                <Text style = {{fontSize: 16}}>사진 촬영</Text>
              </TouchableHighlight>
            </View>

            <View style={styles.modalItem}>
              <TouchableHighlight
                onPress = {this._pickImage}>
                <Text style ={{paddingBottom: 5 ,fontSize: 16 }}>앨범에서 사진 선택</Text>
              </TouchableHighlight>
            </View>


            <View style={styles.modalItem}>
            <Button
                style={{paddingBottom: 10,width: width-5}}
                raised
                color = '#055a47'
                icon={{name: 'close' }}
                title="Close"
                backgroundColor="#055a47"
                onPress = {() => {
                this._toggleModal(!this.state.modalVisible)}}
              />
                </View>
                </View>
            </Modal>

                <View style={styles.body}>
                    <View style={styles.projectHead}>


                        <TextInput
                        style={styles.projectName}
                        value={this.state.title}
                        multiline={true}
                        placeholder="프로젝트 제목"
                        onChangeText={(text)=> this._updateValue(text,'title')} >
                        </TextInput>

                    <View style={{flexDirection:'row'}}>
                      <Image source={hashtagB} style={{width:20, height:20, marginLeft: 4, marginTop:9}}/>
                        <TextInput
                        style={styles.projectTag}
                        value={this.state.tags0}
                        placeholder="프로젝트 태그"
                        onChangeText={(text)=> this._updateValue(text,'tags[0]')} >
                        </TextInput>
                    </View>

                    <View style={{flexDirection:'row' }}>
                    <Image source={hashtagB} style={{width:20, height:20,  marginLeft: 4, marginTop:9}}/>
                        <TextInput
                        style={styles.projectTag}
                        value={this.state.tags1}
                        placeholder="프로젝트 태그"
                        onChangeText={(text)=> this._updateValue(text,'tags[1]')} >
                        </TextInput>
                    </View>


                    <View style={{flexDirection:'row'}}>
                    <Image source={hashtagB} style={{width:20, height:20, marginLeft: 4, marginTop:9 }}/>
                        <TextInput
                        style={styles.projectTag}
                        value={this.state.tags2}
                        placeholder="프로젝트 태그"
                        onChangeText={(text)=> this._updateValue(text,'tags[2]')} >
                        </TextInput>
                      </View>


                    </View>
                </View>

                <View style={{ alignItems:'center',justifyContent: 'center', flexDirection:'row' , marginLeft: 20}}>
                <Text style={{fontSize: 15, marginBottom:2}}>참여 가능한 인원 수  : </Text>
                <TextInput
                style={{width: 50}}
                value={this.state.max_member}
                placeholder="인원" onChangeText={(text)=> this._updateValue(text,'max_member')} />

                </View>

                <Card>
                    <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 20, marginTop:10 }}>프로젝트 개요</Text>
                    <TextInput style={{ fontSize: 17, fontWeight: '200', paddingHorizontal: 20, marginTop: 5, marginBottom:10, width: width-40 ,marginLeft:20}}
                          multiline={true} value={this.state.caption}  onChangeText={(text)=> this._updateValue(text,'caption')}/>
                </Card>
                <Card>
                    <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 20, marginTop:10 }}>프로젝트 일정</Text>
                    <TextInput style={{ fontSize: 17, fontWeight: '200', paddingHorizontal: 20, marginTop: 5, marginBottom:10 ,width: width-40,marginLeft:20 }}
                        placeholder="2018.11.01~2018.12.31"
                        value={this.state.schedule}  onChangeText={(text)=> this._updateValue(text,'schedule')}/>

                </Card>
                <Card>

                    <Text style={{ fontSize: 20, fontWeight: '500', paddingHorizontal: 20, marginTop:10 }}>프로젝트에 필요한 능력 </Text>



                    <TextInput style={{ fontSize: 17, fontWeight: '200', paddingHorizontal: 20, marginTop: 5, marginBottom:10, width: width-40 ,marginLeft:20 }}
                         multiline={true}  placeholder="ex) 사교성, 책임감, 리더십"
                         value={this.state.apt0}  onChangeText={(text)=> this._updateValue(text,'apt[0]')}/>



                    <TextInput style={{ fontSize: 17, fontWeight: '200', paddingHorizontal: 20, marginTop: 5, marginBottom:10, width: width-40 ,marginLeft:20 }}
                          placeholder="ex) 사교성, 책임감, 리더십"
                          multiline={true} value={this.state.apt1}  onChangeText={(text)=> this._updateValue(text,'apt[1]')}/>


                    <TextInput style={{ fontSize: 17, fontWeight: '200', paddingHorizontal: 20, marginTop: 5, marginBottom:10, width: width-40 ,marginLeft:20}}
                          placeholder="ex) 사교성, 책임감, 리더십"
                         multiline={true} value={this.state.apt2}  onChangeText={(text)=> this._updateValue(text,'apt[2]')}/>


                </Card>

                <View style={{justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity style={styles.board}
                  onPress={this._onPressButton} >
               <Text>등록하기</Text>
                </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
        );
    }

    _takePhoto = async () => {
        //camera permission
        const {
          status: cameraPerm
        } = await Permissions.askAsync(Permissions.CAMERA);
        //album permission
        const {
          status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only if user allows permission to camera AND camera roll
        if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
          let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            base64: true,
          });

           //this._handleImagePicked(pickerResult); original!!
           this.setState({ modalVisible: false });

           // pick a image
           this.setState({
             file: pickerResult.uri
           });
        }
      };

      _pickImage = async () => {
        //album permission
        const {
          status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only if user allows permission to camera roll
        if (cameraRollPerm === 'granted') {
        //image result
          let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            base64: true,
          });

          //this._handleImagePicked(pickerResult); original!!
          this.setState({ modalVisible: false });

          // pick a image
          this.setState({
            file: pickerResult.uri
          });
          ///
        }
      };
      _toggleModal(visible) {
        console.log("visible!!!"+visible);
        this.setState({ modalVisible: visible });
     }

      _updateValue(text, field){

        if(field=='title'){
          this.setState({
            title: text,
          })
        }else if(field=='file'){
          this.setState({
            file: text,
          })
        }else if(field=='caption'){
          this.setState({
            caption: text,
          })
        }else if(field==='schedule'){
          this.setState({
            schedule : text,
          })
        }else if(field=='max_member'){
          this.setState({
            max_member : text,
          })
        }else if(field=='tags[0]'){
          this.setState({
            tags0: text,

          })
        }else if(field=='tags[1]'){
          this.setState({
            tags1 : text,
          })
        }
        else if(field=='tags[2]'){
          this.setState({
            tags2 : text,
          })
        }else if(field=='apt[0]'){
            this.setState({
              apt0 : text,
            })
        }else if(field=='apt[1]'){
            this.setState({
            apt1 : text,
            })
          }else if(field=='apt[2]'){
            this.setState({
              apt2 : text,
            })
          }

      }


}

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
        backgroundColor: "transparent",
        height:250,
    },
    projectName:{
        width: width-40,
        fontSize:30,
        color:'black',
        fontWeight:'600',
    },
    projectTag:{
        width: width-50,
        fontSize:20,
        color: 'black',
        marginTop:15
    },
    num: {
        width: width-40,
        fontSize:20,
        color:'black',
        marginTop:10,
    },

    info:{
        fontSize:18,
        marginTop:25,
    },

    board: {
        marginTop:10,
        height:40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:140,
        borderRadius:30,
        borderColor: '#000',
        borderWidth: 0.5,
    },
    item:{
        flexDirection : 'row',
    },
    iconContent:{
        paddingRight:5,
    },
modal: {
  height: 270,
  width:width,
  alignItems: 'center',
  backgroundColor: '#ffffff',
  padding: 20,
},
modalTitle:{
 justifyContent: 'center',
 alignItems: 'center',
 paddingBottom:20,

},
modalItem: {
  height: 60,
  justifyContent:'center',
  alignItems: 'center',
  paddingBottom:5,

}
});