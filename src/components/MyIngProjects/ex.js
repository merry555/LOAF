class myProfileBody extends Component {
    constructor() {
      super()
      this.state = {
        data : []
      }
    } 
    renderItem = ({ item }) => {
      return(
        <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{uri : item.image}}/>
        <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{item.book_title}</Text>
          <Text style={styles.nick}>{item.author}</Text>
          <View style={styles.item}>
          <View style={styles.iconContent}>
          <Image style={styles.icon} source={{uri: 'https://png.icons8.com/home/win8/50/ffffff'}}/>
          </View>
          <View style={styles.infoContent}>
          <Text style={styles.info}>{item.author}</Text>
          </View>
          </View>
          <View style={styles.item}>
          <View style={styles.iconContent}>
          <Image style={styles.icon} source={{uri: 'https://png.icons8.com/windows/50/000000/gender-neutral-user.png'}}/>
          </View>
          <View style={styles.infoContent}>
          <Text style={styles.info}>{item.author}</Text>
          </View>
          </View>
          <View style={styles.item}>
          <View style={styles.iconContent}>
          <Image style={styles.icon} source={{uri: 'https://png.icons8.com/shopping-basket/ios11/50/ffffff'}}/>
          </View>
          <View style={styles.infoContent}>
          <Text style={styles.info}>{item.image}</Text>
          </View>
          </View>
  
          <View style={styles.item}>
          <View style={styles.iconContent}>
          <Image style={styles.icon} source={{uri: 'https://png.icons8.com/news/win8/50/ffffff'}}/>
          </View>
          <View style={styles.infoContent}>
          <Text style={styles.info}>{item.book_title}</Text>
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
      ) 
    }
    componentDidMount() {
      return fetch('https://www.json-generator.com/api/json/get/ccLAsEcOSq?indent=1')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson.book_array
        })
      })
      .catch((error)=> {
        console.error(error)
      });
    } 
    render() {
      return(
        <ScrollView>
            <FlatList
              data={this.state.data} //[{key: 'a'}, {key: 'b'}]
              renderItem={this.renderItem} //({user})=> <Text>{user.key}</Text>
            />
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>프로젝트 경험</Text>  
            </TouchableOpacity> 
        </ScrollView>
      )
    }
  }