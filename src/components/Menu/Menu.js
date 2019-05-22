import React, {Component} from 'react';
import { List, ListItem, Thumbnail, Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title } from 'native-base';
import { WebView,AsyncStorage, Alert, Linking, StyleSheet, View} from 'react-native';
import {Actions} from 'react-native-router-flux';


import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import fontelloConfig from '../../selection.json';
const IconNew = createIconSetFromIcoMoon(fontelloConfig);


const API = 'https://app.bekdos.etv.im/api/';
const DEFAULT_QUERY = 'account_info/';


export default class Menu extends Component {
      goHome() {
        Actions.Home();
      }
      goProfile() {
        Actions.Profile();  
      }
      goTodo() {
        Actions.Todo();  
      }
      goClassroom() {
        Actions.Classroom();  
      }

      async saveItem(item, selectedValue) {
        try {
          await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
          console.error('AsyncStorage error: ' + error.message);
        }
    }



      componentDidMount = async () => {
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
        .then((response) => response.json())
        .then((responseJson) => {    
            if(responseJson) {         
                this.saveItem('id_number', responseJson.id_number);
                this.saveItem('email', responseJson.email);
                this.saveItem('full_name', responseJson.full_name);
                this.saveItem('user_role', responseJson.user_role);
                this.saveItem('phone_number', responseJson.phone_number);
                this.saveItem('birthdate', responseJson.birthdate);
                this.saveItem('citizenship_primary', responseJson.citizenship_primary);
                this.saveItem('scholarship', responseJson.scholarship);
                this.saveItem('wes_id', responseJson.wes_id);
                this.saveItem('naia_id', responseJson.naia_id);
                this.saveItem('ncaa_id', responseJson.ncaa_id);
                this.saveItem('applying_for', responseJson.applying_for);
                this.saveItem('lang', responseJson.lang);
            }        
        })
          .catch( err => this.setState({isLoading: false }));
          
      }



     

      createButton(Name, icon){
        
        if(this.props.selected == Name){
            selected = true;
            style = styles.selected;
        }else{
            selected = false;
            style = styles.isSelected;
        }
        
        if(Name == "Home"){
            goPage = this.goHome.bind(this);
        }else if(Name == "To-do"){
            goPage = this.goTodo.bind(this);
        }else if(Name == "Classroom" || Name=="News"){
            goPage = this.goClassroom.bind(this);
        }else if(Name == "Profile"){
            goPage = this.goProfile.bind(this);
        }else{
            goPage = null;
        }
        
      
        
        

        boton = <Button  active={selected} vertical style={style} onPress={goPage} >
                    <IconNew style={styles.Icon} name={icon} />
                    <Text style={styles.white} >{Name}</Text>
                  </Button>;
        return boton;
      }
     render(){
         return( 

                <FooterTab style={styles.footer}>
                  
                  {this.createButton("Home","Home")}

                  {this.createButton("To-do","To-do")}

                  {this.createButton("News","News")}

                  {this.createButton("Profile","Profile")}

                </FooterTab>


            
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
      Icon: {
        color:'#FFF', 
        fontSize:15
        ,
      },
      selected: {
        backgroundColor: '#df951c',
      },
      isSelected: {
       
      }
  
  });