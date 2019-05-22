import React, {Component} from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title, Accordion } from 'native-base';
import { AsyncStorage, Alert, Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import {RkButton} from 'react-native-ui-kitten';
import Menu from '../Menu/Menu';

const API = 'https://app.bekdos.etv.im/api/';
const DEFAULT_QUERY = 'profile/modify/';

 export default class Classroom extends Component {
  constructor(props) {
    super(props);
    full_name_updated = "";
    this.state = {
      id_number: " ",
      full_name:" ",
      email:" ",
      birthdate:" ",
      citizenship_primary:" ",
      scholarship:" ",
      wes_id:" ",
      naia_id:" ",
      ncaa_id:" ",
      applying_for: "",
      lang:"",
    };
  }

      goProfile() {
        Actions.Profile();  
      }


      loadInfo = async () => {
        
        if(this.state.full_name){
          await AsyncStorage.setItem('full_name', this.state.full_name);
        }

        if(this.state.email){
          await AsyncStorage.setItem('email', this.state.email);
        }

        if(this.state.phone_number){
          await AsyncStorage.setItem('phone_number', this.state.phone_number);
        }

        if(this.state.citizenship_primary){
          await AsyncStorage.setItem('citizenship_primary', this.state.citizenship_primary);
        }

        if(this.state.scholarship){
          await AsyncStorage.setItem('scholarship', this.state.scholarship);
        }
        
 
        /*await AsyncStorage.setItem('wes_id', this.state.wes_id);*/
        /*await AsyncStorage.setItem('naia_id', this.state.naia_id);*/
        /*await AsyncStorage.setItem('ncaa_id', this.state.ncaa_id);*/


        token = await AsyncStorage.getItem('id_token');


        fetch(API + DEFAULT_QUERY,{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "token": token,
              "full_name": this.state.full_name,
              "email": this.state.email,
              "scholarship": this.state.scholarship,
              "phone_number": this.state.phone_number,
              "citizenship_primary": this.state.citizenship_primary,
              "birthdate": this.state.birthdate,
          

           
          }) 
      }) 
        .then(response => response.json())
        .then(data => this.setState({ valores: data})) 
        .then((responseJson) => {
          console.log("Success:");
          console.log(responseJson);
          this.goProfile();
        })
        .catch( err => {

          Alert.alert("There was a problem , please try again!");
        });



        



        
      }

      componentDidMount = async () => {

        lang = await AsyncStorage.getItem('lang');
        this.setState({lang: lang })

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

        applying_for = await AsyncStorage.getItem('applying_for');
        this.setState({applying_for: applying_for }) 


      }
      
     render(){
      if (this.state.lang == 'ES') {
        name = 'Nombre y Apellido';
        email = "Email";
        phone = "Número de teléfono";
        birthdate = "Cumpleaños";
        cityzenship = "Ciudadanía";
        wes ="Recibo de evaluación de credenciales";
        naia ="NAIA";
        ncaa ="NCAA";
        scholarship ="Tipo de Beca";
        applyfor ="Periodo";
        goback="Regresar";
        

      } else {
        name = 'Full Name';
        email = "Email";
        phone = "Phone Number";
        birthdate = "Birthdate";
        cityzenship = "Citizenship";
        wes ="Credential Evaluation Voucher";
        naia ="NAIA";
        ncaa ="NCAA";
        scholarship ="Scholarship Type";
        applyfor ="Apply For";
        goback="Go Back";
      }

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
             
              <FormLabel>{name}</FormLabel>
              <FormInput editable={false}  onChangeText={(text) => this.setState({full_name: text})}>
                {this.state.full_name}
              </FormInput>

              <FormLabel>{email}</FormLabel>
              <FormInput editable={false}  onChangeText={(text) => this.setState({email: text})}>{this.state.email}</FormInput>

              <FormLabel>{phone}</FormLabel>
              <FormInput editable={false}  onChangeText={(text) => this.setState({phone_number: text})} keyboardType="numeric" >{this.state.phone_number}</FormInput>
         
              <FormLabel>{birthdate}</FormLabel>
              <FormInput editable={false}  onChangeText={(text) => this.setState({birthdate: text})} >{this.state.birthdate}</FormInput>

              <FormLabel>{cityzenship}</FormLabel>
              <FormInput editable={false}  onChangeText={(text) => this.setState({citizenship_primary: text})} >{this.state.citizenship_primary}</FormInput>

              <FormLabel>{wes}</FormLabel>
              <FormInput editable={false}  onChangeText={(text) => this.setState({wes_id: text})} >{this.state.wes_id}</FormInput>

              <FormLabel>{naia}</FormLabel>
              <FormInput editable={false}  onChangeText={(text) => this.setState({naia_id: text})} >{this.state.naia_id}</FormInput>

              <FormLabel>{ncaa}</FormLabel>
              <FormInput editable={false} onChangeText={(text) => this.setState({ncaa_id: text})} >{this.state.ncaa_id}</FormInput>

              <FormLabel>{scholarship}</FormLabel>
              <FormInput editable={false}  onChangeText={(text) => this.setState({scholarship: text})} >{this.state.scholarship}</FormInput>

              <FormLabel>{applyfor}</FormLabel>
              <FormInput editable={false}  onChangeText={(text) => this.setState({applying_for: text})} >{this.state.applying_for}</FormInput>

              <TouchableOpacity style={styles.buttonContainer}   >   
                <RkButton
                    onPress={() => this.loadInfo()}
                    style={styles.button}
                    contentStyle={styles.buttonIn}>
                    {goback}
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