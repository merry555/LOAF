
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
      
        <View style={{height: 150}}>
          <View style= {{flex:1, height: 150, borderWidth: 0.5, justifyContent: 'center',
                alignItems: 'center' }}> 
            <TouchableHighlight 
            onPress={() => navigation.navigate('MyProfile')}
            >
          <Image source={{uri:"http://file.osen.co.kr/article/2018/10/16/201810160932772430_5bc534204a8d4.jpg"}} style={{height: 50, width: 50}}/>
          </TouchableHighlight>
          <Text> USER NAME </Text>
          </View>
        </View>
        
        <View style={{height: 150}}>
          <View style= {{flex:1, height: 150, borderWidth: 0.5, justifyContent: 'center',
                    alignItems: 'center' }}>
            <TouchableHighlight
            onPress={() => navigation.navigate('MyProject')}
           // onPress={() => navigation.navigate('MyProject'
            //navigation.navigate(MyProfile)
          >
            <View style= {{width: 50, height: 50, backgroundColor: 'gray'}}/>
          </TouchableHighlight>
        <Text>MY PROJECT</Text>
          </View>
        </View>

        <View style={{height: 150,flexDirection: 'row'} }>

          <View style= {{flex:1,borderWidth: 0.5, justifyContent: 'center',
                    alignItems: 'center' }}>
            <TouchableHighlight  onPress={() => navigation.navigate('Projects')}>
            <View style= {{width: 50, height: 50, backgroundColor: 'gray'}}/>
            </TouchableHighlight >
              <Text>PROJECT</Text>
            </View>

          <View style= {{flex:1,borderWidth: 0.5, justifyContent: 'center',
                    alignItems: 'center' }}>
            <TouchableHighlight  onPress={() => navigation.navigate('Friends')}>
            <View style= {{width: 50, height: 50, backgroundColor: 'gray'}}/>
            </TouchableHighlight>
              <Text>FRIENDS</Text>
          </View>

        </View>


        <View style={{height: 100,flexDirection: 'row'} }>
          <View style= {{flex:1,borderWidth: 0.5, justifyContent: 'center',
                    alignItems: 'center' }}>
            <TouchableHighlight  onPress={()=>alert("can't connect to server")}>
            <View style= {{width: 50, height: 50, backgroundColor: 'gray'}}/>
            </TouchableHighlight >
              <Text>Logout</Text>
            </View>

            <View style= {{flex:1,borderWidth: 0.5, justifyContent: 'center',
                    alignItems: 'center' }}>
              <TouchableHighlight onPress={() => navigation.navigate('ContestInfo')}>        
            <View style= {{width: 50, height: 50, backgroundColor: 'gray'}}/>
            </TouchableHighlight>
              <Text>NOTICE</Text>
            
            </View>

          </View>

        </View>
    );
    