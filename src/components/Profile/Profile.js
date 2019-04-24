import React, {Component} from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title } from 'native-base';
import { AsyncStorage, Alert, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements'
import Menu from '../Menu/Menu';
import PhotoUpload from 'react-native-photo-upload'
import Video from 'react-native-video';

const API = 'https://app.bekdos.etv.im/api/';
const DEFAULT_QUERY = 'profile/upload/';

 export default class Classroom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_number: "",
      full_name: "",
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    id_number_value = await AsyncStorage.getItem('id_number');
    this.setState({id_number: id_number_value })        

    full_name_value = await AsyncStorage.getItem('full_name');
    this.setState({full_name: full_name_value })   
  }


      goFaqs() {
        Actions.Faqs();  
      }
      goAccountInfo() {
        Actions.AccountInfo();  
      }
      goSupport() {
        Actions.Support();  
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

      uploadImage = async (avatar) => {
        this.setState({ isLoading: true });
        token = await AsyncStorage.getItem('id_token');


        fetch(API + DEFAULT_QUERY,{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "token": token,
              "image": avatar,
           
          }) 
      }) 
        .then(response => response.json())
        .then(data => this.setState({ valores: data})) 
        .then((responseJson) => {
          this.setState({isLoading: false });
          console.log("Success:");
          console.log(responseJson);
          
        })
        .catch( err => {
          this.setState({isLoading: false });
          Alert.alert("There was a problem uploading your file, please try again!");
        });
        
        


        
        
      }
     render(){
      const { isLoading } = this.state;
      if (isLoading) {
        return (
          <Video 
          source={require('../../images/loading.mp4')}   
          style={styles.backgroundVideo} 
          rate={1.0}
          volume={1.0}
          muted={false}
          resizeMode={"cover"}
          repeat
         />);
      }
         return(
            <Container>
            <Header style={styles.header}>
                <Left/>
                <Body>
                  <Title style={styles.white} >Profile</Title>
                  
                </Body>
                <Right />
              </Header>
              <Content>     
            
              <Image style={styles.header2} source={require('../../images/dark-material-bg.jpg')}/>
              <View style={styles.imageUpload} >
                <PhotoUpload
                  format={"PNG"}
                  quality={5}
                  onPhotoSelect={avatar => {this.uploadImage(avatar)}}

                  
                >
                  <Image
                    style={styles.avatar}
                    
                    source={{uri: 'https://app.bekdos.etv.im/api/profile/public_picture/index.php?id_number='+this.state.id_number}}
                  />
                </PhotoUpload>
              </View>              
                <View style={styles.body}>
                  <View style={styles.bodyContent}>
                    <Text style={styles.name}>{this.state.full_name}</Text>
                    <Text style={styles.info}>Account ID: {this.state.id_number}</Text>
                    
                  </View>
              </View>

                <List >
                

                <TouchableOpacity key='profile' onPress={this.goAccountInfo.bind(this)}> 
                        <ListItem  title='Account Info'/>
                </TouchableOpacity>

                <TouchableOpacity key='faqs' onPress={this.goFaqs.bind(this)}> 
                        <ListItem  title='FAQs'/>
                </TouchableOpacity>

                <TouchableOpacity key='support' onPress={this.goSupport.bind(this)}> 
                        <ListItem  title='Support'/>
                </TouchableOpacity>

                <TouchableOpacity key='cerrarsesion' onPress={this.userLogout.bind(this)}> 
                        <ListItem  title='Logout'/>
                </TouchableOpacity>


                </List>
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



      header2:{
        backgroundColor: "#00BFFF",
        height:200,
        alignSelf: 'stretch',
        maxWidth: '100%',
   
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        
     
      },
      imageUpload: {
        marginTop:130,
        alignSelf:'center',
        position: 'absolute',
        
      },
      name:{
        fontSize:22,
        color:"#FFFFFF",
        fontWeight:'600',
      },
      body:{
        marginTop:40,
      },
      bodyContent: {
        flex: 1,
        alignItems: 'center',
        marginTop:30,
      },
      name:{
        fontSize:28,
        color: "#000",
        fontWeight: "600"
      },
      info:{
        fontSize:16,
        color: "#2b65a6",
        marginTop:10
      },
      description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'center'
      },
      buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#00BFFF",
      },
      backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor:'#2b65a6',
      },
  
  });