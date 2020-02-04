import React, { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { Text, Image } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { screenWidth } from '../config';
import { aspectRatio } from '../helpers';

const horizontalMargin = 15;
const slideWidth = (screenWidth - 15);

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;

export class HomeAdCarousel extends Component {
   _renderItem({ item, index }) {
      let imgSize = aspectRatio((itemWidth) - 0, '22:9')
      return (
         <View style={{...imgSize, paddingHorizontal: horizontalMargin}}>
            <View style={styles.slideInnerContainer}>
               <Image
               style={{...imgSize, borderRadius: 5, }}
               resizeMode="contain"
               source={{ uri: item.image }} />
               <Text>{item.title}</Text>
            </View>
         </View>
      );
   }

   render() {
      // const sliderWidth = (screenWidth - 20)
      // const itemWidth = (screenWidth - 20)
      return (
         <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.props.slides}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
         />
      );
   }
}


const styles = StyleSheet.create({
   slideInnerContainer: {
      width: slideWidth,
      flex: 1
      // other styles for the inner container
   }
})
