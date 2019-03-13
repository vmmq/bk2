import React, {Component} from 'react';
import { List, ListItem, Thumbnail, Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title } from 'native-base';
import { WebView,AsyncStorage, Alert, Linking, StyleSheet, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
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
                    <Icon style={styles.white} name={icon} />
                    <Text style={styles.white} >{Name}</Text>
                  </Button>;
        return boton;
      }
     render(){
         return( 

                <FooterTab style={styles.footer}>
                  
                  {this.createButton("Home","apps")}

                  {this.createButton("To-do","list")}

                  {this.createButton("News","paper")}

                  {this.createButton("Profile","person")}

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
      selected: {
        backgroundColor: '#df951c',
      },
      isSelected: {
       
      }
  
  });