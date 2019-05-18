import React, {Component} from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title, Accordion,View } from 'native-base';
import { AsyncStorage, Alert, Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements'
import Menu from '../Menu/Menu';

const dataArrayEN = [

  
  { title: "What services does BK2 offer?", content: "BK2 offers consulting services for University enrollment in the United States, guiding students in everything related to the process, from the moment they hire our services, until the moment they receive the letter of acceptance from the University. We manage the scholarships for all our students, depending on their profile they may opt for academic, athletic or international scholarships."},
  { title: "How do I apply for a university scholarship in the USA?", content: "In our Home Page, you will find the tab that says: SIGN UP NOW! Follow the steps and ask for an appointment so we can explain to you, in detail, all the services we offer."},
  { title: "What do I need to apply for an Academic Scholarship?", content: "This type of scholarships is for students that have kept an excellent academic grade point average all through high school. In addition to being very good students, they must have a very good test score in the  SAT/ACT this scores will be taken into consideration by the universities for this type of scholarship and are very important. Minimum grades to qualify for the Academic Scholarships GPA: 3.6 SAT: 1,200 (Critical: Reading and Math) TOEFL: 81 (If international)"},
  { title: "How is the process for the Athletic Scholarships", content: "This type of scholarships is for students that have kept an excellent academic grade point average all through high school. In addition to being very good students, they must have a very good level of English, SAT and TOEFL scores will be taken into consideration by the universities for this type of scholarship. Minimum grades to qualify for the Academic Scholarships GPA: 3.6 SAT: 1,200 (Critical: Reading and Math)."},
  { title: "What are Special Scholarships?", content: "This type of scholarship was implemented by BK2 thanks to the excellent relations developed with universities. Through agreements with such American universities, we have been allowed to offer this type of scholarship to any student who dreams of continuing their academic/athletic development in the United States. Minimum grades to qualify for the Special Scholarship GPA: 2.6, SAT: 950 TOEFL: 61 (if international)."},
  { title: "How is the registration process for the NCAA / NAIA?", content: "This process of registration with the NCAA / NAIA only applies to those students who have an interest in participating in sporting activities at the University. The registration process is not very complicated but it is important to understand that the results of this assessment will determine your eligibility (years available to play), so it must be treated very seriously. A negative decision by the league could complicate the negotiation of the scholarship with the coaches."},
  { title: "What is BK2 Elite?", content: "BK2 Elite is a program specially designed to help students achieve their goal of studying at one of the most prestigious schools in the United States. Our team approach is to help our potential clients with the entire application process and all the necessary requirements to be successfully accepted at the university of their choice."},
  { title: "How does the Financial Aid Program work?", content: "Every grant, scholarship, loan, or other form of student Financial Aid comes with its own set of criteria for eligibility. So, depending on what you apply for, you may need to meet financial aid requirements"},
 
];

const dataArrayES = [

  
  { title: "¿Qué servicios ofrece BK2?", content: "BK2 ofrece servicios de asesoría para la inscripción universitaria en Estados Unidos, guiando a los estudiantes en todo lo relacionado al proceso, desde el momento que contratan nuestros servicios, hasta el momento en el que recibimos la carta de aceptación y la visa estudiantil por parte de la universidad, además de 3 sesiones de seguimiento posteriores. Gestionamos becas para todos nuestros estudiantes, dependiendo de su perfil pueden optar por becas académicas, deportivas o especiales. También ofrecemos cursos de inglés en las universidades, esta es una opción muy interesante para jóvenes que quieren mejorar su nivel de inglés antes de empezar su carrera universitaria."},
  { title: "¿Cómo hago para optar por una beca universitaria en USA?", content: "¡En nuestro Home Page podrás encontrar el tab de ¡Inscríbete YA! Sigue los pasos y solicita una reunión para que podamos explicarte en detalle todos los servicios que ofrecemos."},
  { title: "¿Cómo es el proceso para las Beca Deportivas?", content: "Todos los estudiantes interesados en una beca deportiva deben tener un nivel sobresaliente dentro de la disciplina que practican. Dependiendo del deporte en el que se desarrollen es posible que exista la necesidad de realizar un video donde demuestren todas sus cualidades deportivas. Es importante mencionar que todos los deportistas deben pasar por un proceso de inscripción en las ligas universitarias americanas (NCAA/NAIA) para evaluar su estatus como jugador amateur. Este proceso debe ser llevado con mucha seriedad ya que su elegibilidad puede verse afectada por estos resultados. BK2 también los asesorará en todo lo relacionado a este proceso con las ligas universitarias. Notas mínimas para optar a las Becas Deportivas GPA: 2.5 TOEFL: 61 SAT: 850 (Critical Reading and Math)."},
  { title: "¿Qué son las Becas Especiales?", content: "Este tipo de beca fue implementada por BK2 gracias a las excelentes relaciones que se lograron desarrollar con las universidades. Por medio de convenios con dichas universidades americanas, se nos ha permitido ofrecerle este tipo de beca a cualquier estudiante que tenga la ilusión de continuar su desarrollo académico en los Estados Unidos. Notas mínimas para optar a las Becas Especiales GPA: 2.0 TOEFL: 61 SAT: 750 (Critical Reading and Math)."},
  { title: "¿Cómo es el proceso de inscripción para la NCAA/NAIA?", content: "Este proceso de inscripción con la NCAA/NAIA solo aplica para aquellos estudiantes que tengan interés en participar en actividades deportivas dentro de la universidad. El proceso de inscripción no es muy complicado pero es importante que entiendan que el resultado de esta evaluación determinará su elegibilidad (años disponibles para jugar), por lo tanto debe ser tratado con mucha seriedad. Una decisión negativa por parte de la liga pudiese complicar la negociación de la beca con los entrenadores."},
  { title: "¿Qué es BK2 Elite?", content: "BK2 elite, es un programa especialmente diseñado para ayudar a los estudiantes a alcanzar su objetivo de estudiar en una de las escuelas más prestigiosas dentro de los Estados Unidos. Nuestro enfoque de equipo es ayudar a nuestros clientes potenciales con todo el proceso de solicitud y todos los requisitos necesarios para ser aceptados con éxito en la universidad de su elección."},
  { title: "¿Cómo funciona el programa de ayuda financiera?", content: "Cada subvención, beca, préstamo u otra forma de ayuda financiera para estudiantes incluye su propio conjunto de criterios de elegibilidad. "},
 
];

 export default class Classroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      lang:"",
    };
  }
      goProfile() {
        Actions.Profile();  
      }
      componentDidMount = async () => {
        lang = await AsyncStorage.getItem('lang');
      this.setState({lang: lang })
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
        if (this.state.lang == 'ES') {
          dataArray = dataArrayES;
        } else {
          dataArray = dataArrayEN;
        }
        
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