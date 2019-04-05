import React, {Component} from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title, Accordion } from 'native-base';
import { AsyncStorage, Alert, Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements'
import Menu from '../Menu/Menu';



 export default class Classroom extends Component {
  
      goProfile() {
        Actions.Profile();  
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
                <Left>
                <Button iconLeft  style={styles.header} onPress={this.goProfile.bind(this)}>
            <Icon name='arrow-back' style={styles.white}/>
            
          </Button>
                  </Left>
                <Body>
                  <Title style={styles.white} >Support</Title>
                  
                </Body>
                <Right />
              </Header>
              <Content>     
              <List >
                <TouchableOpacity key='usa' onPress={() => Linking.openURL('mailto:seguimiento1@bk2usa.com') }
      title="seguimiento1@bk2usa.com"> 
                        <ListItem  title='USA Support'/>
                </TouchableOpacity>

                <TouchableOpacity key='inter' onPress={() => Linking.openURL('mailto:seguimiento@bk2usa.com') }
      title="seguimiento@bk2usa.com"> 
                        <ListItem  title='International Support'/>
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