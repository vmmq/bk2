import React, {Component} from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title, Accordion } from 'native-base';
import { AsyncStorage, Alert, Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import {RkButton} from 'react-native-ui-kitten';
import Menu from '../Menu/Menu';

const API = 'https://app.bekdos.etv.im/api/';
const DEFAULT_QUERY = 'todo/upload/';

 export default class Classroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_number: "",
      full_name:"",
      email:"",
      phone_number:"",
    };
  }

      goProfile() {
        Actions.Profile();  
      }


      shareVideo = async () => {
  
        token = await AsyncStorage.getItem('id_token');
        Actions.Profile();  
        fetch(API + DEFAULT_QUERY,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "token": token,
       
            }) 
        }) 
          .then(response => response.json())
          .then(data => this.setState({ valores: data, isLoading: false })) 
          .then((responseJson) => {
            console.log("Success:");
            console.log(responseJson);
    
          })
          .catch( );
      }

      componentDidMount = async () => {
        id_number_value = await AsyncStorage.getItem('id_number');
        this.setState({id_number: id_number_value })    
        
        full_name_value = await AsyncStorage.getItem('full_name');
        this.setState({full_name: full_name_value })   

        email_value = await AsyncStorage.getItem('email');
        this.setState({email: email_value })   

        phone_number = await AsyncStorage.getItem('phone_number');
        this.setState({phone_number: phone_number })   

        birthdate = await AsyncStorage.getItem('birthdate');
        this.setState({birthdate: birthdate })   

        citizenship_primary = await AsyncStorage.getItem('citizenship_primary');
        this.setState({citizenship_primary: citizenship_primary })   

        scholarship = await AsyncStorage.getItem('scholarship');
        this.setState({scholarship: scholarship })   

        wes_id = await AsyncStorage.getItem('wes_id');
        this.setState({wes_id: wes_id })   

        naia_id = await AsyncStorage.getItem('naia_id');
        this.setState({naia_id: naia_id })   

        ncaa_id = await AsyncStorage.getItem('ncaa_id');
        this.setState({ncaa_id: ncaa_id })   


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
                  <Title style={styles.white} >Account Info</Title>
                  
                </Body>
                <Right />
              </Header>
              <Content>     
             
              <FormLabel>Full Name</FormLabel>
              <FormInput >{this.state.full_name}</FormInput>

              <FormLabel>Email</FormLabel>
              <FormInput>{this.state.email}</FormInput>

              <FormLabel>Phone Number </FormLabel>
              <FormInput keyboardType="numeric" >{this.state.phone_number}</FormInput>
         

              <FormLabel>Birthdate</FormLabel>
              <FormInput>{this.state.birthdate}</FormInput>

              <FormLabel>Citizenship</FormLabel>
              <FormInput>{this.state.citizenship_primary}</FormInput>

              <FormLabel>WES ID</FormLabel>
              <FormInput>{this.state.wes_id}</FormInput>

              <FormLabel>NAIA ID</FormLabel>
              <FormInput>{this.state.naia_id}</FormInput>

              <FormLabel>NCAA ID</FormLabel>
              <FormInput>{this.state.ncaa_id}</FormInput>

              <FormLabel>Scholarship Type</FormLabel>
              <FormInput>{this.state.scholarship}</FormInput>

              <TouchableOpacity style={styles.buttonContainer}   >   
                <RkButton
                    onPress={() => this.shareVideo()}
                    style={styles.button}
                    contentStyle={styles.buttonIn}>
                    Save!
                </RkButton>
                
              </TouchableOpacity>


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
      },
      button:{
        backgroundColor: '#df951c',    
        height:50,
        borderRadius: 20,
        marginTop:20,
        marginBottom:20,
        width: '90%',
        
    },
    button2:{
      backgroundColor: '#2b65a6',    
      height:50,
      borderRadius: 20,
      marginTop:20,
      marginBottom:20,
      width: '90%',
      
    },
    buttonContainer:{
        justifyContent:'center',
        alignItems:'center',
        

        
    },
  
  });