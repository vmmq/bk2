import React, {Component} from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title } from 'native-base';
import { AsyncStorage, Alert, Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements'
import Menu from '../Menu/Menu';

 export default class Classroom extends Component {

      goFaqs() {
        Actions.Faqs();  
      }
      goSupport() {
        Actions.Support();  
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
     render(){
         return(
            <Container>
            <Header style={styles.header}>
                <Left/>
                <Body>
                  <Title style={styles.white} >Profile</Title>
                  
                </Body>
                <Right />
              </Header>
              <Content>     
                <List >
                <TouchableOpacity key='cerrarsesion' onPress={this.userLogout.bind(this)}> 
                        <ListItem  title='Logout'/>
                </TouchableOpacity>

                <TouchableOpacity key='faqs' onPress={this.goFaqs.bind(this)}> 
                        <ListItem  title='FAQs'/>
                </TouchableOpacity>

                <TouchableOpacity key='support' onPress={this.goSupport.bind(this)}> 
                        <ListItem  title='Support'/>
                </TouchableOpacity>


                </List>
              </Content>
              <Footer >
                <Menu selected={"Profile"}></Menu>
            </Footer>
          </Container>
            
         );
     }
 }


 const styles = StyleSheet.create({

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