import React, {Component} from 'react';
import {AsyncStorage, Platform, StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert, Keyboard} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {  Button } from 'native-base';
import {RkButton} from 'react-native-ui-kitten';



 export default class LoginForm extends Component {
    constructor() {
        super();
        this.state = { username: null, password: null };
    }

    async saveItem(item, selectedValue) {
        try {
          await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
          console.error('AsyncStorage error: ' + error.message);
        }
    }


    userLogin() {
        Keyboard.dismiss;
        fetch('https://app.bekdos.etv.im/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": this.state.username,
                "password": this.state.password    
            }) 
        })    
        
        .then((response) => response.json())
        .then((responseJson) => {
       
            if(responseJson.token) {
                
                this.saveItem('id_token', responseJson.token);
                this.saveItem('id_number', responseJson.id_number);
                this.saveItem('email', responseJson.email);
                this.saveItem('user_role', responseJson.user_role);
                Actions.Home();
                //Alert.alert("Token:  " + responseJson.token);
            } else {
                Alert.alert("The username or password you entered is incorrect");
            }        
        })
        .catch((error) => {
            console.error(error);
        }); 
      }

      

     render(){
         return(
             <View style={styles.container} >
                <TextInput 
                    placeholder='ID number' 
                    style={styles.input} 
                    returnKeyType='next'
                    onSubmitEditing = {()=>this.passwordInput.focus()}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}

                    onChangeText={(username) => this.setState({username})}
                
                    ref='username'
            
                    value={this.state.username}

                />
                <TextInput 
                    placeholder='Password' 
                    style={styles.input} 
                    returnKeyType='go'
                    secureTextEntry
                    ref={(input)=>this.passwordInput = input}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}

 
                />

                
                
                <TouchableOpacity style={styles.buttonContainer}  >
                   
                <RkButton
                    onPress={this.userLogin.bind(this)}
                    style={styles.button}
                    contentStyle={styles.buttonIn}>
                    Login
                </RkButton>
                </TouchableOpacity>
                

             </View>
             
             
            
         );
     }
 }


 const styles = StyleSheet.create({
    container: {
      padding:30,
      
      
      
    },
    button:{
        backgroundColor: '#df951c',    
        height:40,
        borderRadius: 20,
        marginBottom:20,
        width: '100%',
        
    },
    buttonContainer:{
        justifyContent:'center',
        alignItems:'center',
        
    },

    input: {
        height:40,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderColor:'#E6B365',
        borderRadius: 20,
        borderWidth:1,
        marginBottom:20,
        paddingHorizontal:10
        
        
      },


  });