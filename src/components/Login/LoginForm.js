import React, {Component} from 'react';
import {Platform, StyleSheet, View, Text, Image, TextInput, TouchableOpacity} from 'react-native';

 export default class LoginForm extends Component {
     render(){
         return(
             <View style={styles.container} >
                <TextInput 
                    placeholder='Email' style={styles.input} 
                    returnKeyType='next'
                    onSubmitEditing = {()=>this.passwordInput.focus()}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}

                />
                <TextInput 
                    placeholder='Password' style={styles.input} 
                    returnKeyType='go'
                    secureTextEntry
                    ref={(input)=>this.passwordInput = input}
 
                />
                
                <TouchableOpacity style={styles.buttonContainer} >
                    <Text style={styles.button}  >LOGIN</Text>
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
        textAlign:'center',
        color:'#FFF',
        overflow:"hidden",
        borderRadius: 20,
        
        

    },
    buttonContainer:{
        backgroundColor: '#24588C',
        paddingVertical: 15
        
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