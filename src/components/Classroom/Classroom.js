import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Icon, Text, Left, Body, Right, Title } from 'native-base';
import { AsyncStorage, Alert, Linking, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import { List, ListItem,Card, Button } from 'react-native-elements'
import Menu from '../Menu/Menu';



const API = 'https://app.bekdos.etv.im/api/';
const DEFAULT_QUERY = 'home/';



export default class Classroom extends Component {
  constructor(props) {
    super(props);


    this.state = {
      valores: {news:{},featured:{}},
      isLoading: false,
      pagina: "",
      lang:"",
    };
  }
 
  goScan(element) {
    Actions.Scan({key_file: element.name, title: element.title});
   
  }

  goDetail(element) {
    Actions.Detail({key_file: element.name, title: element.title, status: element.status, action: element.action});
   
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
    lang = await AsyncStorage.getItem('lang');
    this.setState({lang: lang })
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
      .catch( err => console.log('error: ' + err));  
      
  }

  PrintStep(stepContent) {
    if (this.state.lang == 'ES') {
      readmore = 'Continuar Leyendo';
      
    } else {
      readmore = 'Read More';
      
      
    }

    console.log('step: ' + stepContent)
    const { valores, isLoading } = this.state;
    var lista = [];
    if(stepContent){
        for (let index = 0; index < stepContent.length; index++) {
          const element = stepContent[index];

         image=null;

          if (element.title) {
            lista.push( 
              <Card 
              key={element.id}
              title={element.title} 
              containerStyle={{ borderColor: "#2b65a6",borderWidth: 1,
              borderRadius: 0,
     
              borderBottomWidth: 0,
              shadowColor: '#036',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 1,
              marginLeft: 12,
              marginRight: 12,
              marginBottom: 12,
              marginTop: 12,}}
              image={{uri: element.thumbnail}}>
              
                <Text style={{textAlign: 'justify',marginBottom: 10}}>
                {element.intro} 
                </Text>

                <TouchableOpacity> 
                  <Button
                    onPress={() => Linking.openURL(element.url) }
                    backgroundColor='#2b65a6'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title={readmore} />
                </TouchableOpacity>
              </Card>
              


              );
          }
        }  
        return lista
    }
  }

  
 

  render() {
    const { valores, isLoading } = this.state;
    const list = valores;
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
              <Title style={styles.white} >News</Title>
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
              <Menu selected={"News"}></Menu>
            </Footer>
        
      </Container>;
       

    }

    

    return (
      <Container>
        <Header style={styles.header}>
            <Left/>
            <Body>
              <Title style={styles.white} >News</Title>
            </Body>
            <Right />
        </Header>
        <Content>     


      
          {this.PrintStep(valores.news)}
      

            
        </Content>
        <Footer >
              <Menu selected={"News"}></Menu>
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