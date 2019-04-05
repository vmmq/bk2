import React, {Component} from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title, Accordion } from 'native-base';
import { AsyncStorage, Alert, Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements'
import Menu from '../Menu/Menu';

const dataArray = [

  
  { title: "What services does BEKDOS offer?", content: "BEKDOS offers consulting services for University enrollment in the United States, guiding students in everything related to the process, from the moment they hire our services, until the moment we received the letter of acceptance and the Student Visa student from the University. We manage the scholarships for all our students, depending on their profile they may opt for academic, athletic or international scholarships. We also offer English courses at the universities; this is a very interesting option for young people who want to improve their level of English before they begin their college careers."},
  { title: "How do I apply for a university scholarship in the USA?", content: "In our Home Page, you will find the tab that says: sign up now! Follow the steps and ask for an appointment so we can explain to you, in detail, all the services we offer."},
  { title: "What do I need to opt for an Academic Scholarship?", content: "This type of scholarships is for students that have kept an excellent academic grade point average all through high school. In addition to being very good students, they must have a very good level of English, SAT and TOEFL scores will be taken into consideration by the universities for this type of scholarship. Minimum grades to qualify for the Academic Scholarships GPA: 3.6 SAT: 1,200 (Critical: Reading and Math) TOEFL: 81 (If international)"},
  { title: "How is the process for the Athletic Scholarships?", content: "All students interested in an athletic scholarship must have an outstanding level within the sports discipline they practice. Depending on the sport, it is possible that there is the need for a video where the student shows all his sporting qualities. It is important to mention that all athletes must undergo a registration process in the American University leagues (NCAA / NAIA) to evaluate their status as an amateur player. This process must be taken very seriously since their eligibility may be affected by these results. Bekdos will also advise them on everything related to this process with the University leagues. Minimum grades to qualify for the Athletic Scholarship GPA: 2.5 TOEFL: 61 SAT: 850 (Critical: Reading + Math)."},
  { title: "What are Special Scholarships?", content: "This type of scholarship was implemented by BEKDOS thanks to the excellent relations developed with universities. Through agreements with such American universities, we have been allowed to offer this type of scholarship to any student who dreams of continuing their academic athletic development in the United States. Minimum grades to qualify for the Special Scholarship GPA: 2.0 TOEFL: 61 (if international) SAT: 750."},
  { title: "What level of English do I need to have to study in a university in the USA if I am an international student?", content: "The level of English you have is important since it will determine if you have the ability to complete a university degree in this language. We have local partners in the different countries where we work, they could advise you during the initial stage of preparation for the TOEFL and SAT. BEKDOS also offers you the opportunity to take English courses in American universities. Thanks to our agreements we can offer these courses at a special price."},
  { title: "How is the whole subject of translation and certification of grades handled for international transcripts?", content: "Universities ask for the grades to be sent directly to them from the educational institution, sealed in an envelope from the school or university. We also need that the grades go through a certification process in the USA; this will determine the exact GPA according to the academic scale used by the American system."},
  { title: "Do you handle student visas with the US Embassy for international students?", content: "BEKDOS is responsible for counseling you during all the student visa process and ensures that all our students are prepared for the appointment at the Embassy. We know the processes and know what the most important points to take into consideration are, our experienced staff is 100% prepared and trained to guide them on everything related to the handling and approval of student visas."},
  { title: "How is the registration process for the NCAA / NAIA?", content: "This process of registration with the NCAA / NAIA only applies to those students who have an interest in participating in sporting activities at the University. The registration process is not very complicated but it is important to understand that the results of this assessment will determine your eligibility (years available to play), so it must be treated very seriously. A negative decision by the league could complicate the negotiation of the scholarship with the coaches."},

];

 export default class Classroom extends Component {
  
      goProfile() {
        Actions.Profile();  
      }
      async userLogout() {
        try {
          await AsyncStorage.removeItem('id_token');
          await AsyncStorage.removeItem('id_number');
          await AsyncStorage.removeItem('id_email');
          await AsyncStorage.removeItem('user_role');
          Alert.alert('Logout Success!');
          Actions.Login();
        } catch (error) {
          console.log('AsyncStorage error: ' + error.message);
        }
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
                  <Title style={styles.white} >FAQs</Title>
                  
                </Body>
                <Right />
              </Header>
              <Content>     
              <Content padder>
                  <Accordion dataArray={dataArray} expanded={0}/>
              </Content>
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
      }
  
  });