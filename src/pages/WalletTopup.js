import React from 'react';
import {ScrollView, ActivityIndicator, View, Dimensions, ToastAndroid} from 'react-native';
import {Text, Image} from 'react-native-elements';
import { Container, Heading, Title, Loader } from '../components/UI';
import { http, screenHeight } from '../config';
import WalletTopupForm from '../components/WalletTopupForm'
import WebView from 'react-native-webview';
import { connect } from 'react-redux';

function WalletTopup(props) {
   const {user} = props
   return (
      <ScrollView>
         <WebView style={{ flex: 1, height: screenHeight }} source={{uri: 'https://stpatil.com/wp-json/pay/wallet_topup/'+user.id}} />
      </ScrollView>
   )
}
WalletTopup.navigationOptions = {
   headerTitle: <Title>Wallet Topup</Title>,
}
const mapStateToProps = ({ user }) => ({
   user
})
export default connect(
   mapStateToProps
)(React.memo(WalletTopup))
