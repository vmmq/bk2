import React, {Component} from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView} from 'react-native';
import LoginForm from './LoginForm';


 export default class Login extends Component {
     render(){
         return(
             <KeyboardAvoidingView behavior="position" style={styles.container} >
                
                <View style={styles.logoContainer} >
                

                    <Image style={{width: '100%'}}source={require('../../images/BackgroundNEW.png')} />
                    
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
      backgroundColor: '#2b65a6',

    },
    logoContainer: {
        maxHeight:'60%',
        alignItems: 'center',

      },
      

  });