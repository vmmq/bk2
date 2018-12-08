import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Left, Body, Right, Title } from 'native-base';
import { AsyncStorage, Alert, Linking, StyleSheet, View} from 'react-native';
import {  AnimatedCircularProgress } from 'react-native-circular-progress';
import styled from "styled-components/native"; 
import Carousel from 'react-native-snap-carousel'; 
import {Actions} from 'react-native-router-flux';



export default class Home extends Component {

  constructor(props){
    super();
    
    this.state = {
      errors: []
    }
    this.props = props;
    this._carousel = {};
    this.init();
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem('id_token');
      Alert.alert('Logout Success!');
      Actions.Login();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }


  init(){
    this.state = {
      videos: [
        {
          id: "WpIAc9by5iU",
          thumbnail: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
          title: "TOEFL",
          url: "http://www.bk2usa.com/en/"
        }, {
          id: "sNPnbI1arSE",
          thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
          title: "SAT",
          url: "http://www.bk2usa.com/en/"
        }, {
          id: "VOgFZfRVaww",
          thumbnail: "https://images.unsplash.com/photo-1533854775446-95c4609da544?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
          title: "TESTIMONIOS",
          url: "https://api.whatsapp.com/send?phone=584141600955&text=."
        }
      ]
    };

    console.log("ThumbnailCarousel Props: ", this.props)
  }

  handleSnapToItem(index){
    console.log("snapped to ", index)
  }


  _renderItem = ( {item, index} ) => {
    console.log("rendering,", index, item)
    return (
        <ThumbnailBackgroundView>
          <CurrentVideoTO
             onPress={ () => { 
                console.log("clicked to index", index)
                this._carousel.snapToItem(index);
                if(item.url){
                  Linking.openURL(item.url)
                }
                
              }}
          >
            <CurrentVideoImage source={{ uri: item.thumbnail }} />
          </CurrentVideoTO>
            {/*<NextVideoImage source={{ uri: this.state.currentVideo.nextVideoId }}/>*/}
            <VideoTitleText>{item.title}</VideoTitleText>
        </ThumbnailBackgroundView>
    );
  }

  goTodo() {
    Actions.Todo();
    
  }
  

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
          

            <CarouselBackgroundView>
            <Carousel
              ref={ (c) => { this._carousel = c; } }
              data={this.state.videos}
              renderItem={this._renderItem.bind(this)}
              onSnapToItem={this.handleSnapToItem.bind(this)}
              sliderWidth={360}
              itemWidth={256}
              layout={'default'}
              firstItem={0}
            />
          </CarouselBackgroundView>

            
          <View style={{flexDirection: 'row', flex: 1}}> 
            
            <View style={{paddingRight:10}}> 
              <AnimatedCircularProgress
                size={150}
                width={15}
                backgroundWidth={5}
                fill={90}
                tintColor="#24588C"
                backgroundColor="#E6B365"
                arcSweepAngle={240}
                rotation={240}
                lineCap="round" >
                {(fill) => ( <Text style={styles.points2}> 90% </Text> )}
              </AnimatedCircularProgress>   
              <Text style={styles.subtext } > Profile </Text>
            </View>

            <View >  
              <AnimatedCircularProgress
                size={150}
                width={15}
                backgroundWidth={5}
                fill={100}
                tintColor="#24588C"
                backgroundColor="#E6B365"
                arcSweepAngle={240}
                rotation={240}
                lineCap="round" >
                {(fill) => ( <Text style={styles.points2} onPress={this.goTodo.bind(this)}> 100% </Text>)}
              </AnimatedCircularProgress>   
              <Text style={styles.subtext} onPress={this.goTodo.bind(this)}> Step 1 </Text>
            </View>

          </View>

          <View style={{flexDirection: 'row', flex: 1}}> 
            <View style={{paddingRight:10}}> 
              <AnimatedCircularProgress
                size={150}
                width={15}
                backgroundWidth={5}
                fill={70}
                tintColor="#24588C"
                backgroundColor="#E6B365"
                arcSweepAngle={240}
                rotation={240}
                lineCap="round" >
                {(fill) => ( <Text style={styles.points2}> 70% </Text> )}
              </AnimatedCircularProgress>   
              <Text style={styles.subtext}> Step 2 </Text>
            </View>

            <View> 
              <AnimatedCircularProgress
                size={150}
                width={15}
                backgroundWidth={5}
                fill={10}
                tintColor="#24588C"
                backgroundColor="#E6B365"
                arcSweepAngle={240}
                rotation={240}
                lineCap="round" >
                {(fill) => ( <Text style={styles.points2}> 10% </Text> )}
              </AnimatedCircularProgress>   
              <Text style={styles.subtext}> Step 3 </Text>
            </View>
          </View> 
          </View>
        </Content>


        <Footer>
          <FooterTab>
            <Button active vertical>
              <Icon name="apps" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={this.goTodo.bind(this)} > 
              <Icon name="list" />
              <Text>To-Do</Text>
            </Button>
            <Button  vertical >
              <Icon active name="book" />
              <Text>Classrom</Text>
            </Button>
            <Button vertical  onPress={this.userLogout.bind(this)}>
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
  bg: {
    backgroundColor: '#FFF',
  }
});




const VideoTitleText = styled.Text`
  color: white;
  top: -20;
  fontSize:20;
  
`
const CurrentVideoImage = styled.Image`
  top: 10;
  box-shadow: 5px 10px;
  width: 256;
  height: 144;
  border-radius: 5;
`;

const ThumbnailBackgroundView = styled.View`
  justify-content: center;
  align-items: center;
  width: 256; 
`;

const CurrentVideoTO = styled.TouchableOpacity`
`
const CarouselBackgroundView = styled.View`
  background-color: white;
  height: 180;
  width: 100%;
`