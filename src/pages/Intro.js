import React from 'react';
import { StyleSheet, Dimensions, View, ActivityIndicator } from 'react-native';
import { Text, Image, } from 'react-native-elements';
import Home from './Home';
import { Container } from '../components/UI';
import { Asset, } from 'expo-asset';
import AppIntroSlider from 'react-native-app-intro-slider';
import Constants from 'expo-constants';
import { baseURL } from '../config';

const screen = Dimensions.get('window')

const slides = [
   {
      key: 'intro_1',
      img: baseURL+ '/assets/images/intro/intro_1.jpg',
   },
   {
      key: 'intro_2',
      img: baseURL+ '/assets/images/intro/intro_2.jpg',
   },
   {
      key: 'intro_3',
      img: baseURL+ '/assets/images/intro/intro_3.jpg',
   }
];
export default class Intro extends React.Component {
   constructor(props) {
      super(props);
   }
   state = {
      showRealApp: false
   }
   _renderItem = ({item}) => {
      console.log({obj: item})
      return (
         <View style={{ padding: 0, flex: 1, flexGrow: 1, alignItems: 'stretch',}}>
            <Image
               source={{uri: item.img}}
               style={styles.image}

               resizeMode='stretch'
            />
         </View>
      );
   }
   _onDone = () => {
      // User finished the introduction. Show real app through
      // navigation or simply by controlling state
      this.props.navigation.navigate('App')
      // this.setState({ showRealApp: true });
   }
   render() {
      if (!this.state.showRealApp) {
         return <AppIntroSlider renderItem={this._renderItem} slides={slides} onDone={this._onDone} />;
      }
   }
}
const styles = StyleSheet.create({
   slide: {

   },
   buttonCircle: {
      width: 40,
      height: 40,
      backgroundColor: '#ccc',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
   },
   image: {
      width: screen.width,
      height: (screen.height - (Constants.statusBarHeight)),
      margin: 0,
      alignSelf: 'stretch'
   },
});
