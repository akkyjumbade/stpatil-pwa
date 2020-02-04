import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import WebView from 'react-native-webview';

export default class Page extends React.Component {
   constructor(props) {
      super(props);
   }
   componentDidMount() {
      const props = this.props.navigation;
      console.log(props)
   }
   render() {
      return (
         <View>
            <WebView />
         </View>
      );
   }
}
