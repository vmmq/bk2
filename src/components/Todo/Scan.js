import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,Image,TouchableOpacity,AsyncStorage,Alert} from 'react-native';
import Scanner from 'react-native-document-scanner';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Left, Body, Right, View } from 'native-base';
import {Actions} from 'react-native-router-flux';
import Video from 'react-native-video';

const API = 'https://app.bekdos.etv.im/api/';
const DEFAULT_QUERY = 'todo/upload/';

export default class Scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      flashEnabled: false,
      useFrontCam: false,
      isLoading: false,
      data: {},
    };
  }


  goTodo= async () => {
    Actions.Detail({key_file: this.props.key_file, title: this.props.title, subtitle: this.props.subtitle,status: this.props.status, action: this.props.action});  
   
  }

  uploadImage = async () => {
    this.setState({ isLoading: true });
    const { image, isLoading } = this.state;
    token = await AsyncStorage.getItem('id_token');
    
    fetch(API + DEFAULT_QUERY,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "token": token,
            "image": image,
            "file": this.props.key_file
        }) 
    }) 
      .then(response => response.json())
      .then(data => this.setState({ valores: data, isLoading: false })) 
      .then((responseJson) => {
        console.log("Success:");
        console.log(responseJson);
      
        Actions.Detail({key_file: this.props.key_file, title: this.props.title, status: "Pending", action: this.props.action}); 
      })
      .catch( err => {
        this.setState({isLoading: false });
        Alert.alert("There was a problem uploading your file, please try again!");
      });
      
      console.log(image);
      
  }


  renderWait() {
    if(!this.state.stableCounter ){
      return "8";
    }else{
      return (8 - parseInt(this.state.stableCounter || 0 )) ;
    }
    
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <Video 
        source={require('../../images/loading.mp4')}   
        style={styles.backgroundVideo} 
        rate={1.0}
        volume={1.0}
        muted={false}
        resizeMode={"cover"}
        repeat
       />);
    }
    return (
      <Container style={styles.container}>
        
            
           
          
       
        
        {this.state.image ?
          <Image style={{ flex: 1, width: 400, height: 200 }} source={{ uri: `data:image/jpeg;base64,${this.state.image}`}} resizeMode="contain" /> :
          <Scanner
            useBase64
            onPictureTaken={data => this.setState({ image: data.croppedImage })}
            overlayColor="rgba(255,130,0, 0.6)"
            enableTorch={this.state.flashEnabled}
            useFrontCam={this.state.useFrontCam}
            brightness={0}
            quality={0.1}
            onRectangleDetect={({ stableCounter, lastDetectionType }) => this.setState({ stableCounter, lastDetectionType })}
            detectionCountBeforeCapture={6}
            detectionRefreshRateInMS={50}
            style={styles.scanner}
          />
        }
        
        {!this.state.image && <View style={styles.instructions}>
          <Text>
          <Icon name='md-radio-button-off' style={styles.icon3}/>  
          </Text>
          <Text style={styles.inMessage}> 
            {this.renderWait()}          
          </Text>
                 
        </View>}

        
        
      
        {this.state.image ?
          <TouchableOpacity style={[styles.buttonDown, styles.left, styles.dorado]} onPress={() => this.setState({ image: "" })}>
            <Text>Take another picture</Text>
          </TouchableOpacity> :
          <Text style={styles.nulo}> </Text>
        }

        {this.state.image ?
          <TouchableOpacity style={[styles.buttonDown, styles.right, styles.azul]} onPress={this.uploadImage.bind(this)}>
            <Text>Upload</Text>
          </TouchableOpacity> :
          <Text style={styles.nulo}> </Text>
        }

  

        <TouchableOpacity style={[styles.button, styles.right]} onPress={() => this.setState({ flashEnabled: !this.state.flashEnabled })}>
        <Icon name='ios-flash' style={styles.icon2}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.left]} onPress={this.goTodo.bind(this)}>
        <Icon name='close' style={styles.icon}/>
        </TouchableOpacity>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#000',
  },
  newPic: {
   
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    top: 20,
    bottom: 20,
    height: 50,
    width: 50,

  },
  icon:{
    fontSize:50,
    color:'#FFF'
  },
  icon2:{
    fontSize:40,
    color:'#FFF'
  },
  icon3:{
    fontSize:70,
    color:'#FFF'
  },
  inMessage:{
    fontSize:25,
    color:'#FFF',
    top:-57,
    left:21
  },
  buttonDown: {
    color: '#FFF',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    bottom: 20,
    height: 50,
    width: 160,
    
  },
  azul:{
    backgroundColor: '#24588C',
  },

  dorado:{
    backgroundColor: '#df951c',
  },

  right: {
    right: 20,
  },

  left: {
    left: 20,
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    position: 'absolute',
    left:'44%',
    bottom: 30,
    height: 80, 
  },

  scanner: {
    flex: 1,
    width: 500,
    height: 500,
    borderColor: 'black',
    borderWidth: 0
  },

  nulo: {
    width: 0,
    height: 0,

  },



  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor:'#2b65a6',
  },
});