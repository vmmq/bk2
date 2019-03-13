import React, {Component} from 'react';
import { List, ListItem, Thumbnail, Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title } from 'native-base';
import { WebView,AsyncStorage, Alert, Linking, StyleSheet, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Menu from '../Menu/Menu';

export default class Classroom extends Component {

     render(){
         return(
            <Container style={styles.footer}>
              <WebView
                source={{uri: 'https://www.youtube.com/channel/UCdvPVzobFKznmz3uyvo48WQ/videos'}}
                style={{marginTop: 20}}
              />  
  
            <Footer >
              <Menu selected={"News"}></Menu>
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