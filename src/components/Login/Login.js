import React, {Component} from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView} from 'react-native';
import LoginForm from './LoginForm';


 export default class Login extends Component {
     render(){
         return(
             <KeyboardAvoidingView behavior="position" style={styles.container} >
                
                <View style={styles.logoContainer} >
                

                    <Image source={require('../../images/BackgroundNEW.png')} />
                    
                </View>

                <View style={styles.formContainer} >
                    <LoginForm />
                </View>

             </KeyboardAvoidingView>
            
         );
     }
 }


 const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F1F2F5',
    },
    logoContainer: {

        alignItems: 'center',

      },

  });