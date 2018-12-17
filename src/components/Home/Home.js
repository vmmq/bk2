import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title } from 'native-base';
import { AsyncStorage, Alert, Linking, StyleSheet, View} from 'react-native';
import {  AnimatedCircularProgress } from 'react-native-circular-progress';
import styled from "styled-components/native"; 
import Carousel from 'react-native-snap-carousel'; 
import {Actions} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import Slider from './Slider.js';


const API = 'https://app.bekdos.etv.im/api/';
const DEFAULT_QUERY = 'home/';



export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valores: {profile:0,step1:0,step2:0,step3:0},
      isLoading: false,
    };
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
  

  goTodo() {
    Actions.Todo();  
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



  render() {
    const { valores, isLoading } = this.state;
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
              <Title style={styles.white} >Home</Title>
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
              <Button active vertical style={styles.selected}>
                <Icon style={styles.white} name="apps" />
                <Text style={styles.white} >Home</Text>
              </Button>
              <Button vertical onPress={this.goTodo.bind(this)} > 
                <Icon style={styles.white} name="list" />
                <Text style={styles.white} >To-Do</Text>
              </Button>
              <Button  vertical >
                <Icon style={styles.white} active name="book" />
                <Text style={styles.white}>Classrom</Text>
              </Button>
              <Button vertical  onPress={this.userLogout.bind(this)}>
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
              <Title style={styles.white} >Home</Title>
            </Body>
            <Right />
          </Header>
          
          <Content style={styles.bg} >
            <View style={styles.container} >
            <Title>News & Info</Title>
            <Slider></Slider>
            <Title>Dashboard</Title>
            <View style={{flexDirection: 'row', flex: 1, marginTop:10}}> 
              
              <View style={{paddingRight:10}}> 
                <AnimatedCircularProgress
                  size={150}
                  width={15}
                  backgroundWidth={5}
                  fill={ valores.profile }
                  tintColor="#24588C"
                  backgroundColor="#df951c"
                  arcSweepAngle={240}
                  rotation={240}
                  lineCap="round" >
                  {(fill) => ( <Text style={styles.porcentaje}> { valores.profile }%</Text> )}
                </AnimatedCircularProgress>   
                <Text style={styles.subtext } > Profile </Text>
              </View>

              <View >  
                <AnimatedCircularProgress
                  size={150}
                  width={15}
                  backgroundWidth={5}
                  fill={ valores.step1 }
                  tintColor="#24588C"
                  backgroundColor="#df951c"
                  arcSweepAngle={240}
                  rotation={240}
                  lineCap="round" >
                  {(fill) => ( <Text style={styles.porcentaje} onPress={this.goTodo.bind(this)}> { valores.step1 }% </Text>)}
                </AnimatedCircularProgress>   
                <Text style={styles.subtext} onPress={this.goTodo.bind(this)}> Step 1 </Text>
              </View>

            </View>

            <View style={{flexDirection: 'row', flex: 1}}> 
              <View style={{paddingRight:10}}> 
                <AnimatedCircularProgress
                  size={150}
                  width={15}
                  backgroundWidth={5}
                  fill={ valores.step2 }
                  tintColor="#24588C"
                  backgroundColor="#df951c"
                  arcSweepAngle={240}
                  rotation={240}
                  lineCap="round" >
                  {(fill) => ( <Text style={styles.porcentaje}> { valores.step2 }% </Text> )}
                </AnimatedCircularProgress>   
                <Text style={styles.subtext}> Step 2 </Text>
              </View>

              <View> 
                <AnimatedCircularProgress
                  size={150}
                  width={15}
                  backgroundWidth={5}
                  fill={ valores.step3 }
                  tintColor="#24588C"
                  backgroundColor="#df951c"
                  arcSweepAngle={240}
                  rotation={240}
                  lineCap="round" >
                  {(fill) => ( <Text style={styles.porcentaje}> { valores.step3 }% </Text> )}
                </AnimatedCircularProgress>   
                <Text style={styles.subtext}> Step 3 </Text>
              </View>
            </View> 
            </View>
          </Content>


          <Footer >
            <FooterTab style={styles.footer}>
              <Button active vertical style={styles.selected}>
                <Icon style={styles.white} name="apps" />
                <Text style={styles.white} >Home</Text>
              </Button>
              <Button vertical onPress={this.goTodo.bind(this)} > 
                <Icon style={styles.white} name="list" />
                <Text style={styles.white} >To-Do</Text>
              </Button>
              <Button  vertical >
                <Icon style={styles.white} active name="book" />
                <Text style={styles.white}>Classrom</Text>
              </Button>
              <Button vertical  onPress={this.userLogout.bind(this)}>
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
 
  porcentaje: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: 90,
    textAlign: 'center',
    color: '#7591af',
    fontSize: 35,
    fontWeight: "100"
  },
  
  subtext: {
    backgroundColor: 'transparent',
  
    width: 150,
    textAlign: 'center',
    color: '#7591af',
    top:-20,
    fontSize: 30,
    fontWeight: "100"
    
  },

  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:10,
    
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