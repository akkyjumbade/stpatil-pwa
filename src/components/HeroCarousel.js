import React from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import {Text, Image, } from 'react-native-elements';
import {Container} from './UI';
import Axios from 'axios';
import { http, screenWidth, screenHeight } from '../config';

export default class HeroCarousel extends React.Component {
   state = {
      slides: this.props.data,
      activeSlide: 1,
   }
   get pagination () {
      const { slides, activeSlide } = this.state;
      const data = this.props.data
      return (
         <Pagination
            style={styles.paginationStyle}
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainerStyle}
            dotStyle={styles.paginationDotStyle}
            inactiveDotStyle={{ backgroundColor: '#ccc' }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
         />
      );
  }
   renderItem ({item}) {
      return (
         <View style={styles.carouselItem}>
            <Image
               PlaceholderContent={<ActivityIndicator />}
               source={{uri: item.thumbnail_url, }}
               // resizeMode="contain"
               style={{width: screenWidth - 20, height: 168}}  />
         </View>
      )
   }
   componentDidMount() {
      console.log(this.props.data)
   }
   render() {
      return (
         this.props.data ? (
            <React.Fragment>
               <Carousel
                  style={{...this.props.style}}
                  data={this.props.data}
                  sliderWidth={screenWidth}
                  sliderHeight={200}
                  itemWidth={screenWidth - 30}
                  renderItem={this.renderItem}
                  layout={'default'}
                  layoutCardOffset={0}
                  onSnapToItem={(index) => this.setState({ activeSlide: index }) }
               />
               {this.pagination}
            </React.Fragment>
         ) : (
            <Image style={{width: screenWidth - 30, height: 180, alignSelf: 'center'}}
               source={{uri: 'http://placehold.it/400?text=...'}}
               PlaceholderContent={<ActivityIndicator />} />
         )
      )
   }
}
const styles = StyleSheet.create({
   carouselItem: {
      // backgroundColor: '#ccc',
      height: 168,
      borderRadius: 4,
      marginBottom: 0
   },
   paginationStyle: {
      padding: 0,
      margin: 0,
   },
   paginationContainerStyle: {
      padding: 0,
      marginTop: 0,
      // position: 'absolute',
      // top: 180,
      width: screenWidth
      // backgroundColor: 'rgba(0, 0, 0, 0.75)'
   },
   paginationDotStyle: {
      width: 8,
      height: 8,
      borderRadius: 5,
      margin: 0,
      padding: 0,
      marginHorizontal: 2,
      marginVertical: 0,
      backgroundColor: '#000'
   }
})
