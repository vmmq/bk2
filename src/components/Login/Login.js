import React, {Component} from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, Dimensions, ImageBackground} from 'react-native';
import LoginForm from './LoginForm';
import Onboarding from 'react-native-onboarding-swiper';


 export default class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isDone: false,
        };
      }
     render(){
      
  
        if (!this.state.isDone) {
            return (
                
                    
   

                <ImageBackground source={require('../../images/onboard_bg.png')} style={{width: '100%', height: '100%'}}>
                <Onboarding
                
                onSkip={() => this.setState({ isDone: true })}
                onDone={() => this.setState({ isDone: true })}
                pages={[
                    {
                    
                        backgroundColor: 'rgba(255,255,255,0)',
                        image: <View><Image style={styles.pantalla} source={require('../../images/onboard_1.png')} /></View>,
                        title: '',
                        subtitle: '',
                        
                    },
                    {
                        backgroundColor: 'rgba(255,255,255,0)',
                        image: <View><Image style={styles.pantalla} source={require('../../images/onboard_2.png')} /></View>,
                        title: '',
                        subtitle: '',
                    },
                    {
                        backgroundColor: 'rgba(255,255,255,0)',
                        image: <View><Image style={styles.pantalla} source={require('../../images/onboard_3.png')} /></View>,
                        title: '',
                        subtitle: '',
                    },
                    {
                        backgroundColor: 'rgba(255,255,255,0)',
                        image: <View><Image style={styles.pantalla} source={require('../../images/onboard_4.png')} /></View>,
                        title: '',
                        subtitle: '',
                    },
                    {
                        backgroundColor: 'rgba(255,255,255,0)',
                        image: <View><Image style={styles.pantalla} source={require('../../images/onboard_5.png')} /></View>,
                        title: '',
                        subtitle: '',
                    }
                     
                    
                ]}
                />
            </ImageBackground>
        
            );
        }
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
      pantalla:{
        flex: 1,
  
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        top:40,

  
    },
      

  });