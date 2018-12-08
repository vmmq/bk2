import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title } from 'native-base';
import { StyleSheet, View} from 'react-native';
import { List, ListItem } from 'react-native-elements'
import * as Progress from 'react-native-progress';
import {Actions} from 'react-native-router-flux';

const list = [
  {
    name: 'Documento 1',
    
    subtitle: 'Descripcion'
  },
  {
    name: 'Documento 2',
   
    subtitle: 'Descripcion'
  },
  {
    name: 'Documento 3',
   
    subtitle: 'Descripcion'
  },
  {
    name: 'Documento 4',
   
    subtitle: 'Descripcion'
  },
  
]  


export default class Todo extends Component {


  goHome() {
    Actions.Home();
  }

  render() {
    return (
      <Container>

       <Header>
          <Left/>
          <Body>
            <Title>To-Do List</Title>
          </Body>
          <Right />
        </Header>
        <Content>
      
        <Text style={styles.subtext} >Step 1</Text>
        <View style={styles.container} >
        <Progress.Bar progress={0.3} width={200} style={styles.progress} />
        </View>
        <List containerStyle={{marginBottom: 20}}>
          {
            list.map((l) => (
              <ListItem
                key={l.name}
                title={l.name}
              />
            ))
          }
        </List>


        <Text style={styles.subtext} >Step 2</Text>
        <View style={styles.container} >
        <Progress.Bar progress={0.3} width={200} style={styles.progress} />
        </View>
        <List containerStyle={{marginBottom: 20}}>
          {
            list.map((l) => (
              <ListItem
                key={l.name}
                title={l.name}
              />
            ))
          }
        </List>


        <Text style={styles.subtext} >Step 3</Text>
        <View style={styles.container} >
          <Progress.Bar progress={0.3} width={200} style={styles.progress} />
        </View>
        <List containerStyle={{marginBottom: 20}}>
          {
            list.map((l) => (
              <ListItem
                key={l.name}
                title={l.name}
              />
            ))
          }
        </List>

  
        </Content>


        <Footer>
          <FooterTab>
            <Button  vertical onPress={this.goHome.bind(this)}>
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

