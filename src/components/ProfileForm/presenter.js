import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, Image, 
        TextInput,TouchableOpacity,ScrollView, Picker
       } from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';


///이미지, 이름, 주소, 학교, 전공, 웹사이트, bio(text..?), tags
const ProfileForm = (props) => {
     return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.header}></View>
           

            <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
            <View style={styles.body}>
              <View style={styles.bodyContent}>

                <TextInput style={styles.name} 
                            //placeholder={props.profileUsername}
                            //value = {props.profileUsername}
                            //onChangeText = {props.handleChangeText}
                            />

                <TextInput style={styles.name} 
                          //placeholder={props.profileName}
                          //value = {props.profileName}
                          //onChangeText = {props.handleChangeText}
                          />
        
                <View style={styles.item}>
                  <View style={styles.iconContent}>      
                    <Image style={styles.icon} source={{uri: 'https://png.icons8.com/home/win8/50/ffffff'}}/>
                  </View>

                  <View style={styles.infoContent}>
                  <Picker 
                    style={{width: '80%'}}
                    //selectedValue={props.profileAddress}
                    //onValueChange={props.handleInputPicker}
                  >
                  <Picker.item label="Select a option" value=""/>
                  <Picker.item label="수도권" value="수도권"/>
                  <Picker.item label="경기" value="경기"/>
                  <Picker.item label="강원" value="강원"/>
                  </Picker>
                
                  </View>
                </View>
                
              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Image style={styles.icon} source={{uri: 'https://png.icons8.com/windows/50/000000/gender-neutral-user.png'}}/>
                </View>
                <View style={styles.infoContent}>
               
                <TextInput style={styles.name} 
                          //placeholder={props.profileMajor}
                          //value = {props.profileMajor}
                          //onChangeText = {props.handleChangeText}
                          />
        
                </View>
              </View>
                
                <View style={styles.item}>
                
                <View style={styles.iconContent}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/shopping-basket/ios11/50/ffffff'}}/>
                </View>

                <View style={styles.infoContent}>
                <TextInput style={styles.name} 
                          //placeholder={props.profileWebsite}
                          //value = {props.profileWebsite}
                          //onChangeText = {props.handleChangeText}
                          />
                </View>
                </View>

                <View style={styles.item}>
                <View style={styles.iconContent}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/news/win8/50/ffffff'}}/>
                </View>
                <View style={styles.infoContent}>
                  <TextInput style={styles.name} 
                           //placeholder={props.profileWebsite}
                           //value = {props.profileWebsite}
                           //onChangeText = {props.handleChangeText}
                           />
                </View>
                </View>

                <View style={styles.item}>
                  <View style={styles.iconContent}>
                    <Image style={styles.icon} source={{uri: 'https://png.icons8.com/shopping-basket/ios11/50/ffffff'}}/>
                  </View>
                  <View style={styles.infoContent}>
                    <Text style={styles.info}>#서핑 #자바</Text>
                  </View>
                </View>
            </View>
        </View>
        </View>
    
    </ScrollView>
    
      );
  }
  export default ProfileForm;


   // image, Id(username), name, address, school, major, website, bio, tags
 /* ProfileForm.propTypes = {
      proifleImage: PropTypes.string.isRequired,
      profileUsername: PropTypes.String.isRequired,
      ProfileAddress: PropTypes.String.isRequired,
      ProfileSchool: PropTypes.String.isRequired,
      ProfileMajor: PropTypes.String.isRequired,
      ProfileWebsite: PropTypes.String.isRequired,
      ProfileBio: PropTypes.String.isRequired,
      ProfileTag: PropTypes.String.isRequired,

  }*/

  const styles = StyleSheet.create({
    header:{
      backgroundColor: "#00BFFF",
      height:200,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:130
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:40,
      height:500,
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
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    nick:{
      fontSize:16,
      color: "#00BFFF",
      marginTop:10
    },
    info:{
      fontSize:18,
      marginTop:25,
    },
    infoContent:{
      flex:1,
      alignItems:'flex-start',
      paddingLeft:5
    },
    buttonContainer: {
      marginTop: 40,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#00BFFF",
    },
      editbtn: {
        marginTop: 30,
        height:30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:150,
        borderRadius:30,
        backgroundColor: "#00BFFF",
  
    },
    item:{
      flexDirection : 'row',
    },
    iconContent:{
      paddingRight:5,
    },
    icon:{
      width:30,
      height:30,
      marginTop:20,
    },
    
  });
  