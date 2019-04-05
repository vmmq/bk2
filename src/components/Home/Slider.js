import React, { Component } from 'react';
import { AsyncStorage, Text, Linking, StyleSheet, View} from 'react-native';
import styled from "styled-components/native"; // 3.1.6
import Carousel from 'react-native-snap-carousel'; // 3.6.0


const API = 'https://app.bekdos.etv.im/api/';
const DEFAULT_QUERY = 'home/';
_isMounted = false;

export default class Slider extends Component {

  constructor(props){
    super(props);
    this.state = {
      errors: [],
      videos: [],
      valores: {profile:0,step1:0,step2:0,step3:0},
      isLoading: false,
    }
    this.props = props;
    this._carousel = {};
    
  }

  

  componentDidMount = async () => {
    this._isMounted = true;
    this.setState({ isLoading: true });
    token = await AsyncStorage.getItem('id_token');
    fetch(API + DEFAULT_QUERY,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "token": token
        }) 
    }) 
      .then(response => response.json())
      .then(data => {
        if (this._isMounted) {
        this.setState({ 
            videos: data.featured, isLoading: false 
        });
        }
      });  
      
  }

  componentWillUnmount() {
    this._isMounted = false;
  }






  handleSnapToItem (index){
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

  render() {

    const { videos, isLoading } = this.state;
    if (isLoading) {
        return <Text></Text>;
    }
    return (
      <CarouselBackgroundView>
        <Carousel
          ref={ (c) => { this._carousel = c; } }
          data={this.state.videos}
          renderItem={this._renderItem.bind(this)}
          onSnapToItem={this.handleSnapToItem.bind(this)}
          sliderWidth={360}
          itemWidth={300}
          layout={'default'}
          firstItem={0}
        />
      </CarouselBackgroundView>
    );
  }
}


const VideoTitleText = styled.Text`
  color: white;
  top: -20;
  fontSize:20;
  
`
const CurrentVideoImage = styled.Image`
  top: 10;
  box-shadow: 5px 10px;
  width: 300;
  height: 144;
  border-radius: 5;
`;

const ThumbnailBackgroundView = styled.View`
  justify-content: center;
  align-items: center;
  width: 300; 
`;

const CurrentVideoTO = styled.TouchableOpacity`
`
const CarouselBackgroundView = styled.View`
  background-color: white;
  height: 180;
  width: 100%;
`