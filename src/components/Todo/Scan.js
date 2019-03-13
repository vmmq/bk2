import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,Image,TouchableOpacity,AsyncStorage,Alert} from 'react-native';
import Scanner from 'react-native-document-scanner';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Left, Body, Right, Title } from 'native-base';
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
    Actions.Todo();  
   
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
        Actions.Todo(); 
      })
      .catch( err => this.setState({isLoading: false }));
      
      console.log(image);
      
  }


  renderWait() {
    if(!this.state.stableCounter ){
      return "";
    }else{
      return "Wait for " + (8 - parseInt(this.state.stableCounter || 0 )) + " seconds";
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
      <Container>
        <Header style={styles.header}>
            <Button transparent onPress={this.goTodo.bind(this)} >
              <Icon name='arrow-back' />
            </Button>
          <Body>
            <Title style={styles.white} >Scan {this.props.title}</Title>
          </Body>
          <Right />
        </Header> 
       
        
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
        <Text style={styles.instructions}>
          {this.renderWait()}          
        </Text>
      
        {this.state.image ?
          <TouchableOpacity style={[styles.buttonDown, styles.left, styles.dorado]} onPress={() => this.setState({ image: "" })}>
            <Text>Take another picture</Text>
          </TouchableOpacity> :
          <Text> </Text>
        }

        {this.state.image ?
          <TouchableOpacity style={[styles.buttonDown, styles.right, styles.azul]} onPress={this.uploadImage.bind(this)}>
            <Text>Upload</Text>
          </TouchableOpacity> :
          <Text> </Text>
        }

  

        <TouchableOpacity style={[styles.button, styles.right]} onPress={() => this.setState({ flashEnabled: !this.state.flashEnabled })}>
          <Text>📸 Flash</Text>
        </TouchableOpacity>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
    top: 70,
    bottom: 20,
    height: 40,
    width: 120,
    backgroundColor: '#FFF',
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
    color: '#333333',
    
  },
  scanner: {
    flex: 1,
    width: 400,
    height: 200,
    borderColor: 'orange',
    borderWidth: 1
  },



  white: {
    color:'#FFF', 
  },
  header: {
    backgroundColor: '#2b65a6',
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