import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title, Card, CardItem, Thumbnail } from 'native-base';
import { AsyncStorage, Image, Linking, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {RkButton} from 'react-native-ui-kitten';
import Menu from '../Menu/Menu';

const API = 'https://app.bekdos.etv.im/api/';
const DEFAULT_QUERY = 'todo/upload/';

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.goScan = this.goScan.bind(this);

    this.state = {
      valores: {step1:{},step2:{},step3:{}},
      isLoading: false,
      pagina: "",
    };
  }
 
  goScan() {
    Actions.Scan({key_file: this.props.key_file, title: this.props.title, subtitle: this.props.subtitle, status: this.props.status, action: this.props.action});
   
  }
  
  goTodo() {
    Actions.Todo(); 
   
  }
 

  shareVideo = async () => {
  
    token = await AsyncStorage.getItem('id_token');
    Actions.Detail({key_file: this.props.key_file, title: this.props.title, status: "Pending", action: this.props.action});
    fetch(API + DEFAULT_QUERY,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "token": token,
            "image": "video",
            "file": this.props.key_file
        }) 
    }) 
      .then(response => response.json())
      .then(data => this.setState({ valores: data, isLoading: false })) 
      .then((responseJson) => {
        console.log("Success:");
        console.log(responseJson);

      })
      .catch( );
  }
  
  


  render() {
    const { valores, isLoading } = this.state;
    const list = valores.step1;
    spiner=true
    
    if(valores.error){
      this.userLogout();
      return <Text>Sesion iniciada en otro dispositivo</Text>;
    }
    video = false;
    switch (this.props.status) {
      case 'Accepted':
        image = require('../../images/green.png');
        description="Done! Your requirement has been approved by our team.";
        disabledOpt = true;
        break;

      case 'Pending':
        image = require('../../images/yellow.png');
        description="Processing! Our team is reviewing this requirement. You will know that it has been approved when it turns green.";
        disabledOpt = false;

        if(this.props.action == "noupload"){
          disabledOpt = true;
        
        }

        if(this.props.action == "fromweb"){
          disabledOpt = true;
        
        }

        if(this.props.action == "video"){
          disabledOpt = true;
          
        }

        break;

      case 'Notified':
        image = require('../../images/blue.png');
        description="Place the document on a dark background and in a well-lit environment. Wait a few seconds, and go!";
        disabledOpt = false;

        if(this.props.action == "noupload"){
          disabledOpt = true;
          description="We will receive this document in our office. Our team will keep you informed.";
        }

        if(this.props.action == "fromweb"){
          disabledOpt = true;
          description="Please upload this document in the BK2 students web page.";
        }

        if(this.props.action == "video"){
          disabledOpt = true;
          video = true;
          description="Your videos must be uploaded to our shared cloud. If you have not loaded them yet, download the instructions to do so.";
        }

        break;  

      case 'Declined':
        image = require('../../images/red.png');
        description="Place the document on a dark background and in a well-lit environment. Wait a few seconds, and go!";
        disabledOpt = false;

        if(this.props.action == "noupload"){
          disabledOpt = true;
          description="We will receive this document in our office. Our team will keep you informed.";
        }

        if(this.props.action == "fromweb"){
          disabledOpt = true;
          description="Please upload this document in the BK2 students web page.";
        }

        if(this.props.action == "video"){
          disabledOpt = true;
          video = true;
          description="Your videos must be uploaded to our shared cloud. If you have not loaded them yet, download the instructions to do so.";
        }

        break;  
    
      default:
        image = require('../../images/red.png');
        description="Place the document on a dark background and in a well-lit environment. Wait a few seconds, and go!";
        disabledOpt = false;

        if(this.props.action == "noupload"){
          disabledOpt = true;
          description="We will receive this document in our office. Our team will keep you informed.";
        }

        if(this.props.action == "fromweb"){
          disabledOpt = true;
          description="Please upload this document in the BK2 students web page.";
        }

        if(this.props.action == "video"){
          disabledOpt = true;
          video = true;
          description="Your videos must be uploaded to our shared cloud. If you have not loaded them yet, download the instructions to do so.";
        }
        
        
        
        break;
    }

   

    

    return (
      <Container>
        <Header style={styles.header}>
            <Left/>
            <Body>
              <Title style={styles.white} >To-do</Title>
            </Body>
            <Right />
        </Header>
        <Content>     
        <Card>
            <CardItem>
              <Left>
                <Thumbnail source={image} />
                <Body>
                  <Text>{this.props.title}</Text>
                  <Text note>{this.props.status}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
              <Text>{description} </Text>
              <Text> </Text>
              <Text>{this.props.title}: {this.props.subtitle}</Text>
              
              </Body>
            </CardItem>
          </Card>

              {!disabledOpt &&
              <TouchableOpacity style={styles.buttonContainer}   >     
                <RkButton
                    onPress={() => this.goScan()}
                    style={styles.button}
                    contentStyle={styles.buttonIn}
                    disabled={disabledOpt}>
                    Scan Now
                </RkButton>
              </TouchableOpacity>
              }
              {video &&
              <TouchableOpacity style={styles.buttonContainer}   >   
              <RkButton
                    onPress={() => Linking.openURL('https://app.bekdos.etv.im/assets/images/api/video_tuto_en.pdf')}
                    style={styles.button2}
                    contentStyle={styles.buttonIn}>
                    View Instructions!
                </RkButton>  
                <RkButton
                    onPress={() => this.shareVideo()}
                    style={styles.button}
                    contentStyle={styles.buttonIn}>
                    I already shared them!
                </RkButton>
                
              </TouchableOpacity>
              }
              <TouchableOpacity style={styles.buttonContainer}  >     
                <RkButton
                    onPress={() => this.goTodo()}
                    style={styles.button2}
                    contentStyle={styles.buttonIn}>
                    Go Back
                </RkButton>
              </TouchableOpacity>
       

        
        </Content>
        <Footer >
              <Menu selected={"To-do"}></Menu>
            </Footer>
      </Container>

     
    );
  }
}


const styles = StyleSheet.create({
 


  progress: {
    color:'#24588C',
    borderColor:'#E6B365',

  },
  
  subtext: {
    backgroundColor: 'transparent',

    textAlign: 'center',
    color: '#7591af',
    padding:10,
    fontSize: 30,
    fontWeight: "100"
    
  },

  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:0,
    
  },
  bg: {
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#2b65a6',
  },
  footer: {
    backgroundColor: '#2b65a6',
  },

  white: {
    color:'#FFF', 
  },
  selected: {
    backgroundColor: '#df951c',
  },
  button:{
    backgroundColor: '#df951c',    
    height:50,
    borderRadius: 20,
    marginTop:20,
    width: '90%',
    
},
button2:{
  backgroundColor: '#2b65a6',    
  height:50,
  borderRadius: 20,
  marginTop:20,
  width: '90%',
  
},
buttonContainer:{
    justifyContent:'center',
    alignItems:'center',
    
},
  
  


});