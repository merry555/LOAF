import React, { Component } from 'react';

import Modal from 'react-native-modal';
import logoImg from '../../image/logoImg.png';
import addressImg from '../../image/address.png';
import schoolImg from '../../image/school.png';
import majorImg from '../../image/major.png';
import websiteImg from '../../image/website.png';
import bioImg from '../../image/bio.png';
import hashtagImg from '../../image/hashtag.png';
import CameraRollPicker from 'react-native-camera-roll-picker';

import {
  ActivityIndicator,
  Button,
  Clipboard,
  CameraRoll,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableHighlight,
  ScrollView,
  TextInput,
  Dimensions,
  AsyncStorage,
  KeyboardAvoidingView,
  PermissionsAndroid
} from 'react-native';

//import { Constants, ImagePicker, Permissions } from 'expo';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class ProfileFrom extends Component {

  constructor(){
    super();
    this.state = {
    index: null,
    photos: [ ],
      tokenV : '',
      Gallery: false,
      modalVisible: false,
      image: null,
      uploading: false,
      //profile_imageV: '',
      usernameV:'mouse',
      nameV:'마우스',
      addressV: '서울',
      schoolV: '마우대학교',
      majorV: '컴퓨터공학과',
      bioV: '안녕하세요 마우스입니다. \r\n제가 가진 장점은 바로 근면과 성실함 입니다. 더 특별한 장점은 없지만 성실하게 일하는 것 만큼은 자신있습니다. 또한 끝까지 맡은 일을 마무리 하는 것 만큼은 자신이 있습니다.\r\n담당한 일에 매진하여서 꼭 전문가가 되고 싶습니다.\r\n감사합니다.',
      websiteV: 'http://www.mouse.com',
      tagsV0:'프로그래밍',
      tagsV1:'NCS',
      tagsV2:'딥러닝',
    }
  }


  componentDidMount(){
    this._showData().done();
  }

  _onPressButton()  {
    Alert.alert('Network error!!')
  }


  render() {

    return (
    <KeyboardAvoidingView behavior="position" >
      <ScrollView >
        <View style={styles.header}></View>

        {this._maybeRenderImage()}


            <Modal
              style={{justifyContent:'center', alignItems:'center'}}
              backdroColor='ffa503'
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




                <Modal
                  animationType={"slide"}
                  transparent={false}
                  visible={this.state.Gallery}
                  onRequestClose={() => console.log('closed')}
                >
                  <View style={styles.modalContainer}>
                    <Button
                      title='Close'
                      onPress={this._toggleGallery}
                    />
                    <ScrollView
                      contentContainerStyle={styles.scrollView}>
                      {
                        this.state.photos.map((p, i) => {
                          return (
                            <TouchableHighlight
                              style={{opacity: i === this.state.index ? 0.5 : 1}}
                              key={i}
                              underlayColor='transparent'
                              onPress={() => this.setIndex(i)}
                            >
                              <Image
                                style={{
                                  width: width/3,
                                  height: width/3
                                }}
                                source={{uri: p.node.image.uri}}
                              />
                            </TouchableHighlight>
                          )
                        })
                      }
                    </ScrollView>

                  </View>
                </Modal>




        <View style={styles.body}>


        <TouchableOpacity
          style={styles.editbtn}
          onPress={
          this.getPhotos
          }>
          <Text style={{color: '#ffffff'}}>사진</Text>
        </TouchableOpacity>

        <Text style={styles.name}>{this.state.usernameV}</Text>
              <View style={styles.bodyContent}>
                <TextInput
                style={styles.nick}
                placeholder="이름"
                value={this.state.nameV}
                onChangeText={(text)=> this._updateValue(text,'nameV')}/>




              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Image style={styles.icon} source={addressImg}/>
                </View>
                <View style={styles.infoContent}>
                  <TextInput
                  style={styles.info}
                  placeholder="지역"
                  value={this.state.addressV}
                  onChangeText={(text)=>this._updateValue(text,'addressV')}/>
                  </View>
                </View>


              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Image style={styles.icon} source={schoolImg}/>
                </View>
                <View style={styles.infoContent}>

                  <TextInput
                  style={styles.info}
                  placeholder="학교"
                  value={this.state.schoolV}
                  onChangeText={(text)=>this._updateValue(text,'schoolV')}/>

                </View>
              </View>


              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Image style={styles.icon} source={majorImg}/>
                </View>
                <View style={styles.infoContent}>
                  <TextInput
                  style={styles.info}
                  placeholder="전공"
                  value={this.state.majorV}
                  onChangeText={(text)=>this._updateValue(text,'majorV')}/>
                </View>
              </View>

                <View style={styles.item}>
                <View style={styles.iconContent}>
                <Image style={styles.icon} source={websiteImg}/>
                </View>
                <View style={styles.infoContent}>
                <TextInput
                  style={styles.info}
                  placeholder="웹사이트"
                  value={this.state.websiteV}
                  onChangeText={(text)=>this._updateValue(text,'websiteV')}/>
                </View>
                </View>

                <View style={styles.item}>
                <View style={styles.iconContent}>
                <Image style={styles.icon} source={bioImg}/>
                </View>
                <View style={styles.infoContent}>
                  <TextInput
                  style={styles.info}
                  multiline={true}
                  placeholder="자기소개"
                  value={this.state.bioV}
                  onChangeText={(text)=>this._updateValue(text,'bioV')}/>
                </View>
                </View>

                <View style={styles.item}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={hashtagImg}/>
                  </View>
                  <View style={styles.tagsContent}>
                    <TextInput
                    style={styles.info}
                    placeholder="관심사"
                    multiline={true}
                    value={this.state.tagsV0}
                    onChangeText={(text)=>this._updateValue(text,'tagsV[0]')}/>
                  </View>
                </View>


                <View style={styles.item}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={hashtagImg}/>
                  </View>
                  <View style={styles.tagsContent}>
                    <TextInput
                    style={styles.info}
                    placeholder="관심사"
                    multiline={true}
                    value={this.state.tagsV1}
                    onChangeText={(text)=> this._updateValue(text,'tagsV[1]')}/>
                  </View>
                  </View>

                  <View style={styles.item}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={hashtagImg}/>
                  </View>
                  <View style={styles.tagsContent}>
                    <TextInput
                    style={styles.info}
                    placeholder="관심사"
                    multiline={true}
                    value={this.state.tagsV2}
                    onChangeText={(text)=>this._updateValue(text,'tagsV[2]')}/>
                </View>
                </View>


                <View style={styles.tagsitem}>
                  <View style={styles.infoContent}>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this._onPressButton}>
                      <Text style={{color: '#ffffff'}}>완료</Text>
                  </TouchableOpacity>
                </View>
              </View>
              </View>

            </View>


      </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  _toggleModal(visible) {
    console.log("visible!!!"+visible);
    this.setState({ modalVisible: visible });
 }
   _toggleGallery = () => {
     this.setState({ Gallery: !this.state.Gallery });
  }


  _handleSubmit = () => {

    console.log("is this handleSubmit state ");
    console.log(this.state);

   /*
    const data = new FormData();
    let uri = this.state.image;
    let uriParts = this.state.image.split('.');
    let fileType = uriParts[uriParts.length - 1];
    let tagsArray = [this.state.tagsV0,this.state.tagsV1,this.state.tagsV2];
    console.log("-----tagsarray-------");
    console.log(tagsArray)


    data.append("profile_image",{
        uri:`${this.state.image}`,
        name: `photo.${this.state.usernameV}`,
        type: `image/${fileType}`,
      });
    data.append("address",this.state.addressV);
    data.append("school",this.state.schoolV);
    data.append("major",this.state.majorV);
    data.append("website",this.state.websiteV);
    data.append("bio",this.state.bioV);
    data.append("tags",tagsArray);
    data.append("gender","Male");
    data.append("name",this.state.nameV);
    console.log("this is what post");
    console.log(data);
    */

    //another version


    let collection = {}
    collection.profile_image= this.state.image,
    collection.address= this.state.addressV,
    collection.school= this.state.schoolV,
    collection.major= this.state.majorV,
    collection.website= this.state.websiteV,
    collection.bio= this.state.bioV,
   // collection.tags = [this.state.tagsV0,this.state.tagsV1,this.state.tagsV2],
    collection.gender = "Male",
    collection.name = this.state.nameV,
    //collection.token = token;
    console.log(collection.tags);
    console.log("this is collection")
    console.log(collection)
    console.log("tokenV?")
    console.log(this.state.tokenV)
    console.log("-------------JSON.stringify(c---------")
    console.log(JSON.stringify({
      profile_image : this.state.image,
      address : this.state.addressV,
      school : this.state.schoolV,
      major : this.state.majorV,
      website:  this.state.websiteV,
      bio :  this.state.bioV,
      tags : [this.state.tagsV0,this.state.tagsV1,this.state.tagsV2],
      //gender = "Male",
      //name = this.state.nameV,
    }))


////////

    fetch(`http://192.168.0.3:8000/users/forehead/`, {
      method: 'POST',
      credentials: 'include',
      headers:{
        'Accept': 'application/json',
        'Authorization' : `JWT ${this.state.tokenV}`,
        'Content-Type' : 'application/json',
      },
      //body: JSON.stringify(data),
      body: JSON.stringify({
      })
    })


    .then(response => {
      console.log('RESONSE!!  ' , response)
      if(response.status === 404){
        console.log("404 error!!")
      }
    })
    .catch(error => console.log('Error:', error));
  }


  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let {
      image
    } = this.state;
   console.log("image!!??"+image);
    if (!image) {
      return  <Image source={{uri: 'https://randomuser.me/api/portraits/women/12.jpg' }} style={styles.maybeRenderImage}/>;
    }

    return (
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />

    );
  };

  _share = () => {
      alert(this.state.image)
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    })
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard')
  };

  getSelectedImages(images){
  if(image[0])
         // pick a image
         this.setState({
            image: image[0].uri
           //image: pickerResult.uri
         });

    }

   _getPhotos = async () => {
    this._toggleGallery();
                  //album permission
                  const {
                    status: cameraRollPerm
                  } = await PermissionsAndroid.askAsync(PermissionsAndroid.READ_EXTERNAL_STORAGE);

                  // only if user allows permission to camera roll
                  if (cameraRollPerm === 'granted') {
                                CameraRoll.getPhotos({
                                  first: 20,
                                  assetType: 'All'
                                })
                                .then(r => this.setState({ photos: r.edges }))
                    };
                    ///
                  };


  _takePhoto = async () => {
    //camera permission
    const {
      status: cameraPerm
    } = await PermissionsAndroid.askAsync(PermissionsAndroid.CAMERA);
    //album permission
    const {
      status: cameraRollPerm
    } = await PermissionsAndroid.askAsync(PermissionsAndroid.READ_EXTERNAL_STORAGE);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
       //2 <CameraRollPicker callback={this.getSelectedImages} maximum={1}/>
     /* let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
      });*/



       //this._handleImagePicked(pickerResult); original!!
       this.setState({ modalVisible: false });

       // pick a image
       this.setState({

         //image: pickerResult.uri
       });
    }
  };

  _pickImage = async () => {
    //album permission
    const {
      status: cameraRollPerm
    } = await PermissionsAndroid.askAsync(PermissionsAndroid.READ_EXTERNAL_STORAGE);

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
        image: pickerResult.uri
      });
      ///
    }
  };

  _handleImagePicked = async pickerResult => {
    console.log("this is base64")
    //console.log(pickerResult.base64);

    let uploadResponse, uploadResult;
    try {
      this.setState({
        uploading: true
      });

      if (!pickerResult.cancelled) {
        //upload image to server
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
        this.setState({
          image: uploadResult.uri
        });

      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({
        uploading: false
      });
    }
  };

  _onPressButton()  {
    Alert.alert("can't connect to server")
  }

  _showData = async() => {
    AsyncStorage.getItem('token').then((value) => {
      this.setState({tokenV: value});
    }).then(res=> console.log(res));
    console.log("token");
    console.log(this.state.tokenV);
    }


  _updateValue(text, field){

      if(field=='nameV'){
        this.setState({
          nameV: text,
        })
      }else if(field=='addressV'){
        this.setState({
          addressV: text,
        })
      }else if(field=='schoolV'){
        this.setState({
          schoolV: text,
        })
      }else if(field==='majorV'){
        this.setState({
          majorV : text,
        })
      }else if(field=='bioV'){
        this.setState({
          bioV : text,
        })
      }else if(field=='websiteV'){
        this.setState({
          websiteV : text,
        })
      }else if(field=='tagsV[0]'){
        this.setState({
          tagsV0 : text,
        })
      }else if(field=='tagsV[1]'){
        this.setState({
          tagsV1 : text,
        })
      }
      else if(field=='tagsV[2]'){
        this.setState({
          tagsV2 : text,
        })
      }
    }
}

async function uploadImageAsync(uri) {
    //change this
    let apiUrl = 'https://';

  // Note:
  // Uncomment this if you want to experiment with local server
  //
  // if (Constants.isDevice) {
  //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // } else {
  //   apiUrl = `http://localhost:3000/upload`
  // }

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
}



const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    backgroundColor: "#055a47",
    height:100,
  },
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  maybeRenderContainer: {
    elevation: 2,
    marginTop: 10,
    justifyContent:'center',
    width: width,

  },
  maybeRenderImage: {
    height: 130,
    width: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop: 30,
    marginBottom: 10,
  },
body:{
  marginTop:40,
  height:900,
  alignItems:'center',
},
bodyContent: {
  flex: 1,
  alignItems: 'center',
  paddingTop:10,
  paddingLeft:30,
  paddingRight:30,
  paddingBottom:30,
},
name:{
  paddingLeft: 5,
  width: 100,
  height: 30,
  fontSize:28,
  color: "#696969",
  fontWeight: "600"

},
nick:{
  fontSize:16,
  color: "#055a47",
  marginTop:10,
  width: 150,
},
info:{
  fontSize:18,
  marginTop:25,
  width: width-100,

},
infoContent:{
  flex:1,
  alignItems:'flex-start',
  paddingLeft:5,
},
buttonContainer: {
  marginTop: 40,
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 70,
  width:250,
  borderRadius:30,
  backgroundColor: "#055a47",
},
  editbtn: {
    marginTop: 30,
    height:30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:150,
    borderRadius:30,
    backgroundColor: "#055a47",

},
item:{
  flexDirection : 'row',
},
tagsitem:{
  justifyContent:'center',
  alignItems:'center',
},

iconContent:{
  paddingRight:5,
},
icon:{
  width:30,
  height:30,
  marginTop:20,
},
image: {
  height: 300,
  width: 200,
  borderRadius: 30,
},
headerStyle:{
  height: 40,
  justifyContent: 'center',
  alignItems:'center',
  backgroundColor:'#2196f3'
},
contentStyle:{
  height : 40,
  justifyContent: 'center',
  alignItems:'center',
  backgroundColor:'#2196f3'
},
contnetRowStyle: {
  flex:1,
  flexDirection: 'row',
  justifyContent:'center',
  alignItems: 'center',
},
modal: {
  height: 270,
  width:width,
  alignItems: 'center',
  backgroundColor: '#ffffff',
  padding: 20
},
modalTitle:{
 justifyContent: 'center',
 alignItems: 'center',
 paddingBottom:20

},
modalItem: {
  height: 60,
  justifyContent:'center',
  alignItems: 'center',
  paddingBottom:5

},
modalContainer: {
    paddingTop: 20,
    flex: 1
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row'
  },

});
///down