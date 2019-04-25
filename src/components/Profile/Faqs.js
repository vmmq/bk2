import React, {Component} from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title, Accordion,View } from 'native-base';
import { AsyncStorage, Alert, Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements'
import Menu from '../Menu/Menu';

const dataArray = [

  
  { title: "What services does BK2 offer?", content: "BK2 offers consulting services for University enrollment in the United States, guiding students in everything related to the process, from the moment they hire our services, until the moment they receive the letter of acceptance from the University. We manage the scholarships for all our students, depending on their profile they may opt for academic, athletic or international scholarships."},
  { title: "How do I apply for a university scholarship in the USA?", content: "In our Home Page, you will find the tab that says: SIGN UP NOW! Follow the steps and ask for an appointment so we can explain to you, in detail, all the services we offer."},
  { title: "What do I need to apply for an Academic Scholarship?", content: "This type of scholarships is for students that have kept an excellent academic grade point average all through high school. In addition to being very good students, they must have a very good test score in the  SAT/ACT this scores will be taken into consideration by the universities for this type of scholarship and are very important. Minimum grades to qualify for the Academic Scholarships GPA: 3.6 SAT: 1,200 (Critical: Reading and Math) TOEFL: 81 (If international)"},
  { title: "How is the process for the Athletic Scholarships", content: "This type of scholarships is for students that have kept an excellent academic grade point average all through high school. In addition to being very good students, they must have a very good level of English, SAT and TOEFL scores will be taken into consideration by the universities for this type of scholarship. Minimum grades to qualify for the Academic Scholarships GPA: 3.6 SAT: 1,200 (Critical: Reading and Math)."},
  { title: "What are Special Scholarships?", content: "This type of scholarship was implemented by BK2 thanks to the excellent relations developed with universities. Through agreements with such American universities, we have been allowed to offer this type of scholarship to any student who dreams of continuing their academic/athletic development in the United States. Minimum grades to qualify for the Special Scholarship GPA: 2.6, SAT: 950 TOEFL: 61 (if international)."},
  { title: "How is the registration process for the NCAA / NAIA?", content: "This process of registration with the NCAA / NAIA only applies to those students who have an interest in participating in sporting activities at the University. The registration process is not very complicated but it is important to understand that the results of this assessment will determine your eligibility (years available to play), so it must be treated very seriously. A negative decision by the league could complicate the negotiation of the scholarship with the coaches."},
  { title: "What is BK2 Elite?", content: "BK2 Elite is a program specially designed to help students achieve their goal of studying at one of the most prestigious schools in the United States. Our team approach is to help our potential clients with the entire application process and all the necessary requirements to be successfully accepted at the university of their choice."},
  { title: "How does the Financial Aid Program work?", content: "Every grant, scholarship, loan, or other form of student Financial Aid comes with its own set of criteria for eligibility. So, depending on what you apply for, you may need to meet financial aid requirements"},
 
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
      _renderHeader(item, expanded) {
        return (
          <View style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center" ,
            backgroundColor: "#2b65a6"}}>
          <Text style={{ fontWeight: "600", color:"#fff", fontSize: 18, width:"90%" }}>
              {" "}{item.title}
            </Text>
            {expanded
              ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
              : <Icon style={{ fontSize: 18 }} name="add-circle" />}
          </View>
        );
      }
      _renderContent(item) {
        return (
          <Text
            style={{
              backgroundColor: "#fff",
              padding: 10,
              
            }}
          >
            {item.content}
          </Text>
        );
      }
      render() {
        return (
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

            <Content padder style={{ backgroundColor: "white" }}>
              <Accordion
                dataArray={dataArray}
                animation={true}
                expanded={true}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
              />
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