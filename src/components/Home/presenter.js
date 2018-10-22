import React , { Component } from 'react';
import { 
  Alert , 
  Dimensions,
  StyleSheet, 
  Text, 
  View, 
  Image,
  TouchableOpacity ,
  StatusBar,
  ScrollView,
  AsyncStorage,
  ImageBackground
} from 'react-native';
import {createStackNavigator, StackNavigator} from 'react-navigation';

// import eunwoo from '../image/eunwoo.jpg';
import logoImg from '../../image/logoImg.png';
import third from '../../image/third.png';
import second from '../../image/second.png'; 
import first from '../../image/first.png';

import user from '../../image/user.png';
import myproject from '../../image/myproject.png';
import project from '../../image/project.png';
import friends from '../../image/friends.png';
import logout from '../../image/logout.png';
import notice from '../../image/notice.png';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Home extends Component {
  static navigationOptions= ({navigation}) =>({
    title: 'Home',	
  }); 
  _onPressButton()  {
    Alert.alert('Network error!!')
  }
  render() {
    const { navigate } = this.props.navigation;
    return(
      <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content"/>
      <View style = {{ height: 250}}>
      <ScrollView  
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          pagingEnabled={true}>
      <ImageBackground source={first} style={{flex: 1}}>
      <View style={{
            height:250,
            width: width,
            justifyContent: 'center', 
            alignItems:'center'}}>
          <TouchableOpacity>
             <Text style={{fontSize: 20, color: 'white', padding: 5, textAlign:'left'}}>
              mouse 님 {"\n"}
              대학생들의 경계없는 성장공간,{"\n"}
              Loaf에 오신 것을 환영합니다. 
             </Text>
          </TouchableOpacity >
        </View>
        </ImageBackground>

        <ImageBackground source={second} style={{flex: 1,}}>
        <View style={{  
            height:250,
            width: width,
            justifyContent: 'center',
            alignItems:'center',}}>   
             <Text style={{fontSize: 18, color: 'white'}}>
               생각만 하던 프로젝트를 올려{"\n"}
               다양한 사람들과 함께할 수 있습니다.  {"\n"}
               당신이 하고 싶은 프로젝트를 추천받아 보세요.{"\n"}{"\n"} 
             </Text>
              <TouchableOpacity  
                onPress={() => navigate('Projects')}>
              <Text style={{fontSize: 18, color:'white', backgroundColor:'#FFA503'}}>
              프로젝트 찾기 바로가기
              </Text>
              </TouchableOpacity >
        </View>
        </ImageBackground>
        <ImageBackground source={third} style={{flex: 1,}}> 
        <View style={{  
            height:250,
            width: width,
            justifyContent: 'center',
            alignItems:'center',}}>
           
             <Text style={{fontSize: 18, color: 'white', paddingLeft: 3}}>
               관심사가 유사한 친구를 추천받을 수 있습니다.{"\n"}
               당신과 함께 프로젝트를 진행하고{"\n"}
               싶은 친구를 찾아보세요.{"\n"}{"\n"} 
             </Text>
          <TouchableOpacity  
                onPress={() => navigate('Friends')}>
              <Text style={{fontSize: 18, color:'white', backgroundColor:'#FFA503'}}>
              팀원 찾기 바로가기
             </Text>
              </TouchableOpacity >
             
        </View>
        </ImageBackground >
        </ScrollView>
        </View>
        <View style={{height: 150,flexDirection: 'row', paddingTop: 10 } }>
            <View style= {{flex:1, justifyContent: 'center',
                      alignItems: 'center'  }}>
             <TouchableOpacity onPress={() => navigate('MyProfile')}>
             <Image source={user} style={{height: 90, width:90}}/>
              </TouchableOpacity >
                <Text style={{fontSize: 15, paddingTop: 5, color: '#ffa503'}}>나의 프로필</Text>
              </View>

            <View style= {{flex:1, justifyContent: 'center',
                      alignItems: 'center' }}>
              <TouchableOpacity  
               onPress={() => navigate('MyProject')}>
              <Image source={myproject} style={{height: 95, width:95}}/>
              </TouchableOpacity>
                <Text style={{fontSize: 15, paddingTop: 5, color: '#ffa503'}}>나의 프로젝트</Text>
            </View>
          </View>
          <View style={{height: 150,flexDirection: 'row'} }>

            <View style= {{flex:1, justifyContent: 'center',
                      alignItems: 'center'}}>
             <TouchableOpacity  onPress={() => navigate('Projects')}>
             <Image source={project} style={{height: 90, width:90}}/>
              </TouchableOpacity >
                <Text style={{fontSize: 15, paddingTop: 5, color: '#ffa503'}}>프로젝트 찾기</Text>
              </View>

            <View style= {{flex:1, justifyContent: 'center',
                      alignItems: 'center'}}>
              <TouchableOpacity  
               onPress={() => navigate('Friends')}>
              <Image source={friends} style={{height: 100, width:100}}/>
              </TouchableOpacity>
                <Text style={{fontSize: 15, paddingTop: 5, color: '#ffa503'}}>팀원 찾기</Text>
            </View>

          </View>
          <View style={{height: 80,flexDirection: 'row', paddingBottom:20 } }>
            <View style= {{flex:1, justifyContent: 'center',
                      alignItems: 'center'}}>
              <TouchableOpacity  
               onPress={() => Alert.alert("can't connect to server")}>
             <Image source={logout} style={{height:50, width:50}}/>
              </TouchableOpacity >
                <Text style={{fontSize: 15, paddingTop: 3, color: '#ffa503'}}>로그아웃</Text>
              </View>

              <View style= {{flex:1, justifyContent: 'center',
                      alignItems: 'center' }}>
               <TouchableOpacity
                  onPress={() => navigate('ContestInfo')}>
             <Image source={notice} style={{height:50, width:50}}/>
              </TouchableOpacity>
                <Text style={{fontSize: 15,paddingTop:3, color: '#ffa503' }}>공모전 정보</Text>             
              </View>

            </View>
         </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex :1,
  },
  button:{
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10
  }
});
  