import React, {Component} from 'react';
import {Platform, StyleSheet, View, Text, Image} from 'react-native';

 export default class Splash extends Component {
     render(){
         return(
             <View style={styles.container} >
                <View style={styles.flex}>
                    <Image source={require('../../images/logo.png')} />
                </View>
                 

                 <Text style={styles.company} >Bekdos 2018</Text>
             </View>
            
         );
     }
 }


 const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3498db',
    },
    welcome: {
      fontSize: 35,
      textAlign: 'center',
      margin: 10,
      color: '#ffffff',
    },
    company: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 10,
    },
    flex:{
        justifyContent: 'center',
        flex:1,
    }
  });