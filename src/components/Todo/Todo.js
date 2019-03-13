import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title } from 'native-base';
import { AsyncStorage, Alert, Linking, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import { List, ListItem } from 'react-native-elements'
import * as Progress from 'react-native-progress';
import Menu from '../Menu/Menu';



const API = 'https://app.bekdos.etv.im/api/';
const DEFAULT_QUERY = 'todo/';



export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.goScan = this.goScan.bind(this);

    this.state = {
      valores: {step1:{},step2:{},step3:{}},
      isLoading: false,
      pagina: "",
    };
  }
 
  goScan(element) {
    Actions.Scan({key_file: element.name, title: element.title});
   
  }
  async userLogout() {
    try {
      await AsyncStorage.removeItem('id_token');
      await AsyncStorage.removeItem('id_number');
      await AsyncStorage.removeItem('id_email');
      await AsyncStorage.removeItem('user_role');
      Alert.alert('Logout Success!');
      Actions.Login();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
  

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    token = await AsyncStorage.getItem('id_token');
    fetch(API + DEFAULT_QUERY,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "token": token
        }) 
    }) 
      .then(response => response.json())
      .then(data => this.setState({ valores: data, isLoading: false }))
      .catch( err => this.setState({isLoading: false }));  
      
  }

  PrintStep(stepContent) {
    const { valores, isLoading } = this.state;
    var lista = [];
    if(stepContent){
        for (let index = 0; index < stepContent.length; index++) {
          const element = stepContent[index];

          switch (element.status) {
            case 'Accepted':
              image = require('../../images/green.png');
              disabledOpt = true;
              break;

            case 'Pending':
              image = require('../../images/blue.png');
              disabledOpt = true;
              break;

            case 'Notified':
              image = require('../../images/yellow.png');
              disabledOpt = false;
              break;  

            case 'Declined':
              image = require('../../images/red.png');
              disabledOpt = false;
              break;  
          
            default:
              image = require('../../images/red.png');
              disabledOpt = false;
              break;
          }

          if (element.name) {
            lista.push( 
                        <TouchableOpacity disabled={disabledOpt} key={element.name} onPress={() => this.goScan(element)}> 
                        <ListItem roundAvatar
                        avatar={image}
                        
                        title={element.title} 
                        
                        >
                        </ListItem>
                        </TouchableOpacity>
                      );
          }
        }  
        return lista
    }
  }

  
 

  render() {
    const { valores, isLoading } = this.state;
    const list = valores.step1;
    spiner=true
    
    if(valores.error){
      this.userLogout();
      return <Text>Sesion iniciada en otro dispositivo</Text>;
    }

    if (isLoading) {
      return <Container>
        <Header style={styles.header}>
            <Left/>
            <Body>
              <Title style={styles.white} >To-do</Title>
            </Body>
            <Right />
          </Header>
          <Content>     
            <View style={styles.container}>
              <Spinner
                visible={spiner}
                textContent={''}
                textStyle={styles.spinnerTextStyle}
              />
        
            </View>
          </Content>
          <Footer >
              <Menu selected={"To-do"}></Menu>
            </Footer>
        
      </Container>;
       

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
        <Text style={styles.subtext} >Step 1</Text>
        <View style={styles.container} >
        <Progress.Bar progress={valores.completed_1} width={200} style={styles.progress} />
        </View>
        <List containerStyle={{marginBottom: 20}}>
          {this.PrintStep(valores.step1)}
        </List>

        <Text style={styles.subtext} >Step 2</Text>
        <View style={styles.container} >
        <Progress.Bar progress={valores.completed_2} width={200} style={styles.progress} />
        </View>
        <List containerStyle={{marginBottom: 20}}>
        {this.PrintStep(valores.step2)}
        </List>

        <Text style={styles.subtext} >Step 3</Text>
        <View style={styles.container} >
        <Progress.Bar progress={valores.completed_3} width={200} style={styles.progress} />
        </View>
        <List containerStyle={{marginBottom: 20}}>
        {this.PrintStep(valores.step3)}
        </List>
            
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
  }
  
  


});