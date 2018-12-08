import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Badge, Left, Body, Right, Title } from 'native-base';
import { PanResponder,StyleSheet, TouchableOpacity, View, ActivityIndicator, Alert, Image} from 'react-native';
import { CircularProgress, AnimatedCircularProgress } from 'react-native-circular-progress';
import { Card,List, ListItem } from 'react-native-elements'
import * as Progress from 'react-native-progress';




const users = [
  {
     name: 'Resumen documento',
     avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
  },
 
 ]


export default class Todo extends Component {




  render() {
    return (
      <Container>

       <Header>
          <Left/>
          <Body>
            <Title>To-Do</Title>
          </Body>
          <Right />
        </Header>

        <Content>
      
        <Card title="Documento 1">
          {
            users.map((u, i) => {
              return (
                <View key={i} style={styles.user}>
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: u.avatar }}
                  />
                  <Text style={styles.name}>{u.name}</Text>
                  
                </View>
              );
            })
          }
        </Card>
  
        </Content>


        <Footer>
          <FooterTab>
            <Button  vertical>
              <Icon name="apps" />
              <Text>Home</Text>
            </Button>
            <Button active vertical>
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
 


  progress: {
    color:'#24588C',
    borderColor:'#E6B365',

  },
  
  subtext: {
    backgroundColor: 'transparent',

    textAlign: 'center',
    color: '#7591af',
    padding:10,
    fontSize: 30,
    fontWeight: "100"
    
  },

  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding:0,
    
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

