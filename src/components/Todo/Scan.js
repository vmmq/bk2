import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,Image,TouchableOpacity,View} from 'react-native';
import Scanner from 'react-native-document-scanner';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Left, Body, Right, Title } from 'native-base';
export default class Scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      flashEnabled: false,
      useFrontCam: false,
    };
  }



  renderWait() {
    if(!this.state.stableCounter ){

      return "Waiting for document...";
    }else{
      return "Wait for " + (8 - parseInt(this.state.stableCounter || 0 )) + " seconds";
    }
    
  }

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left/>
          <Body>
            <Title style={styles.white} >Scan</Title>
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
      
        {this.state.image === null ?
          null :
          <TouchableOpacity style={styles.newPic} onPress={() => this.setState({ image: "" })}>
            <Text>Take another picture</Text>
          </TouchableOpacity>
        }

       
        
     

        <TouchableOpacity style={[styles.button]} onPress={() => this.setState({ flashEnabled: !this.state.flashEnabled })}>
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
    
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  
    backgroundColor: '#FFF',
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
});