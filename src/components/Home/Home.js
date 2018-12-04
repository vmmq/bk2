import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Badge, Left, Body, Right, Title } from 'native-base';
import { PanResponder,StyleSheet, TouchableOpacity, View, ActivityIndicator, Alert, Image} from 'react-native';
import { CircularProgress, AnimatedCircularProgress } from 'react-native-circular-progress';




export default class Home extends Component {




  render() {
    return (
      <Container>

       <Header>
          <Left/>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>

        <Content style={styles.bg} >
        <View style={styles.container} >
        
       

        <AnimatedCircularProgress
          size={150}
          width={15}
          backgroundWidth={5}
          fill={100}
          tintColor="#24588C"
          backgroundColor="#E6B365"
          arcSweepAngle={240}
          rotation={240}
          lineCap="round"
          
        >
        {(fill) => (
            <Text style={styles.points2}>
              100%
            </Text>
            
          )}
        </AnimatedCircularProgress>   
        <Text style={styles.subtext}>
          Step 1
        </Text>

        

         <AnimatedCircularProgress
          size={150}
          width={15}
          backgroundWidth={5}
          fill={60}
          tintColor="#24588C"
          backgroundColor="#E6B365"
          arcSweepAngle={240}
          rotation={240}
          lineCap="round"
          
        >
        {(fill) => (
            <Text style={styles.points2}>
              60%
            </Text>
            
          )}
        </AnimatedCircularProgress>   
        <Text style={styles.subtext}>
          Step 2
        </Text>




    <AnimatedCircularProgress
          size={150}
          width={15}
          backgroundWidth={5}
          fill={60}
          tintColor="#24588C"
          backgroundColor="#E6B365"
          arcSweepAngle={240}
          rotation={240}
          lineCap="round"
          
        >
        {(fill) => (
            <Text style={styles.points2}>
              60%
            </Text>
            
          )}
        </AnimatedCircularProgress>   
        <Text style={styles.subtext}>
          Step 3
        </Text>


      </View>


  
        </Content>


        <Footer>
          <FooterTab>
            <Button active vertical>
              <Icon name="apps" />
              <Text>Home</Text>
            </Button>
            <Button vertical>
              <Icon name="list" />
              <Text>To-Do</Text>
            </Button>
            <Button  vertical >
              <Icon active name="book" />
              <Text>Classrom</Text>
            </Button>
            <Button vertical  >
              <Icon name="person" />
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}



const styles = StyleSheet.create({
 


  points2: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: 90,
    textAlign: 'center',
    color: '#7591af',
    fontSize: 35,
    fontWeight: "100"
  },
  

  subtext: {
    backgroundColor: 'transparent',
  
    width: 150,
    textAlign: 'center',
    color: '#7591af',
    top:-20,
    fontSize: 30,
    fontWeight: "100"
    
  },

  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:10,
    
  },
  pointsDelta: {
    color: '#4c6479',
    fontSize: 50,
    fontWeight: "100"
  },
  pointsDeltaActive: {
    color: '#fff',
  },
  bg: {
    backgroundColor: '#FFF',
  }
});

