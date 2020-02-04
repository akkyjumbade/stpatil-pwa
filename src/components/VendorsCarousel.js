import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text, Image, } from 'react-native-elements';
import { Container } from './UI';
import Carousel, { Pagination } from 'react-native-snap-carousel';


import { http, screenWidth, screenHeight } from '../config';

export default class VendorCarousel extends React.Component {
   state = {
      activeSlide: 1,
   }
   get pagination () {
      const { activeSlide } = this.state;
      const {data} = this.props
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

   _renderItem({ item }) {
      return (
         <View style={{width: 180, height: 150, margin: 15, }}>
            {item.thumbnail ? (
               <Image
               PlaceholderContent={<ActivityIndicator />}
               source={{ uri: item.thumbnail, }}
               resizeMode="stretch"
               style={{ width: 180, height: 100 }} />
            ): (
               <Image
               PlaceholderContent={<ActivityIndicator />}
               source={{ uri: 'http://placehold.it/100', }}
               resizeMode="stretch"
               style={{ width: 180, height: 100 }} />
            )}
         </View>
      )
   }
   render() {

      if(!this.props.data) {
         return (
            <Image style={{ width: 50, height: 50, alignSelf: 'center' }}
               source={{ uri: 'http://placehold.it/400?text=...' }}
               PlaceholderContent={<ActivityIndicator />} />
         )
      }
      return (
         <React.Fragment>
            <Carousel
               style={{...this.props.style, marginBottom: 100}}
               data={this.props.data}
               sliderWidth={screenWidth}
               sliderHeight={200}
               itemWidth={180}
               itemHeight={100}
               renderItem={this._renderItem}
               layout={'default'}
               layoutCardOffset={0}
               onSnapToItem={(index) => this.setState({ activeSlide: index }) }
            />
            {this.pagination}
         </React.Fragment>
      )
   }
}
const styles = StyleSheet.create({
   carouselItem: {
      backgroundColor: '#ccc',
      height: 168,
      borderRadius: 4,
      marginBottom: 20
   },
   paginationStyle: {
      padding: 0,
      margin: 0,
   },
   paginationContainerStyle: {
      padding: 0,
      marginTop: 0,
      position: 'absolute',
      top: 180,
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

const _style = {
   slide1: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: "#a3c9a8"
   },
   slide2: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: "#84b59f"
   },
   slide3: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: "#69a297"
   },
   text: {
     color: "#1f2d3d",
     opacity: 0.7,
     fontSize: 48,
     fontWeight: "bold"
   }
};
