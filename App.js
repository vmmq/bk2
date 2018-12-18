/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AsyncStorage, StyleSheet, ActivityIndicator, View} from 'react-native';
import Splash from './src/components/Splash/Splash';
import Login from './src/components/Login/Login';
import Home from './src/components/Home/Home';
import Todo from './src/components/Todo/Todo';
import Scan from './src/components/Todo/Scan';
import TodoDetail from './src/components/TodoDetail/TodoDetail';

import {Router, Scene} from 'react-native-router-flux';




export default class App extends Component {
  constructor() {
    super();
    this.state = { hasToken: false };
  }
  componentDidMount() {
    AsyncStorage.getItem('id_token').then((token) => {
      this.setState({ hasToken: token !== null, isLoaded: true })
    });
  }



  render() {
    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator />
      )
    } else { 
      return (
      

      <Router>
        <Scene key='root' duration={0} gesturesEnabled={false}>
          <Scene
            component={Login}
            hideNavBar={true}
            initial={!this.state.hasToken}
            key='Login'
            renderBackButton={()=>(null)}

          />
          <Scene
            component={Home}
            title='Home Page'
            key='Home'
            hideNavBar={true}
            initial={this.state.hasToken}
          />
          <Scene 
            component={Todo}
            title='To-Do List'
            key='Todo'
            hideNavBar={true}
          />
          
          <Scene 
            component={Scan}
            title='Scan'
            key='Scan'
            hideNavBar={true}
          />
          </Scene>
          
          
      </Router>
    ); 
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
