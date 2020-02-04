import React from 'react';
import Carousel from 'react-native-banner-carousel';
import { StyleSheet, Image, View, Dimensions } from 'react-native';
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 200;

const _itemComponent = (image, index) => {
   return (
      <View key={index} style={{padding: 10, paddingBottom: 30, }}>
         <Image
            style={{ width: (BannerWidth - 20), height: BannerHeight, borderRadius: 4, }}
            resizeMode="stretch"
            source={{ uri: image.thumbnail_url }} />
      </View>
   )
}
export default (props) => {
   return (
      <Carousel
         autoplay
         autoplayTimeout={5000}
         loop
         index={0}
         pageSize={BannerWidth}
      >
         {props.data && props.data.map((image, index) => _itemComponent(image, index))}
      </Carousel>
   )
}
