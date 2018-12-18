import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title } from 'native-base';
import { AsyncStorage, Alert, Linking, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import { List, ListItem } from 'react-native-elements'
import * as Progress from 'react-native-progress';



const API = 'https://app.bekdos.etv.im/api/';
const DEFAULT_QUERY = 'todo/';



export default class Todo extends Component {
  respuesta = 'holaaaa';
  constructor(props) {
    super(props);
    this.goScan = this.goScan.bind(this);

    this.state = {
      valores: {step1:{},step2:{},step3:{}},
      isLoading: false,
      pagina: "",
    };
  }
  goHome() {
    Actions.Home();
  }
  goScan(element) {
    Actions.Scan({name: element.name, title: element.title});
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
      .then(data => this.setState({ valores: data, isLoading: false }));  
      
  }

   PrintStep1() {
    const { valores, isLoading } = this.state;
    var lista = [];
    if(valores.step1){
        for (let index = 0; index < valores.step1.length; index++) {
          const element = valores.step1[index];

          if (element.name) {
            lista.push( 
                        <TouchableOpacity key={element.name} onPress={() => this.goScan(element)}> 
                        <ListItem roundAvatar
                        avatar={require('../../images/logo.png')}
                        
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
  PrintStep2() {
    const { valores, isLoading } = this.state;
    var lista = [];
    if(valores.step2){
        for (let index = 0; index < valores.step2.length; index++) {
          const element = valores.step2[index];

          if (element.name) {
            lista.push( 
              <TouchableOpacity key={element.name} onPress={() => this.goScan(element)}> 
              <ListItem roundAvatar
              avatar={require('../../images/logo.png')}
              
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
  PrintStep3() {
    const { valores, isLoading } = this.state;
    var lista = [];
    if(valores.step3){
        for (let index = 0; index < valores.step3.length; index++) {
          const element = valores.step3[index];

          if (element.name) {
            lista.push( 
              <TouchableOpacity key={element.name} onPress={() => this.goScan(element)}> 
              <ListItem roundAvatar
              avatar={require('../../images/logo.png')}
              
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
              <Title style={styles.white} >To-do List</Title>
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
            <FooterTab style={styles.footer}>
            <Button  vertical onPress={this.goHome.bind(this)}>
                <Icon style={styles.white} name="apps"  />
                <Text style={styles.white} >Home</Text>
              </Button>
              <Button active vertical style={styles.selected}  > 
                <Icon style={styles.white} name="list" />
                <Text style={styles.white} >To-Do</Text>
              </Button>
              <Button  vertical >
                <Icon style={styles.white} active name="book" />
                <Text style={styles.white}>Classrom</Text>
              </Button>
              <Button vertical  >
                <Icon style={styles.white} name="person" />
                <Text style={styles.white} >Profile</Text>
              </Button>
            </FooterTab>
          </Footer>
        
      </Container>;
       

    }

    

    return (
      <Container>
        <Header style={styles.header}>
            <Left/>
            <Body>
              <Title style={styles.white} >To-do List</Title>
            </Body>
            <Right />
        </Header>
        <Content>     
        <Text style={styles.subtext} >Step 1</Text>
        <View style={styles.container} >
        <Progress.Bar progress={valores.completed_1} width={200} style={styles.progress} />
        </View>
        <List containerStyle={{marginBottom: 20}}>
          {this.PrintStep1()}
        </List>

        <Text style={styles.subtext} >Step 2</Text>
        <View style={styles.container} >
        <Progress.Bar progress={valores.completed_2} width={200} style={styles.progress} />
        </View>
        <List containerStyle={{marginBottom: 20}}>
          {this.PrintStep2()}
        </List>

        <Text style={styles.subtext} >Step 3</Text>
        <View style={styles.container} >
        <Progress.Bar progress={valores.completed_3} width={200} style={styles.progress} />
        </View>
        <List containerStyle={{marginBottom: 20}}>
          {this.PrintStep3()}
        </List>
            
        </Content>
        <Footer >
            <FooterTab style={styles.footer}>
            <Button  vertical onPress={this.goHome.bind(this)}>
                <Icon style={styles.white} name="apps"  />
                <Text style={styles.white} >Home</Text>
              </Button>
              <Button active vertical style={styles.selected}  > 
                <Icon style={styles.white} name="list" />
                <Text style={styles.white} >To-Do</Text>
              </Button>
              <Button  vertical >
                <Icon style={styles.white} active name="book" />
                <Text style={styles.white}>Classrom</Text>
              </Button>
              <Button vertical  >
                <Icon style={styles.white} name="person" />
                <Text style={styles.white} >Profile</Text>
              </Button>
            </FooterTab>
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