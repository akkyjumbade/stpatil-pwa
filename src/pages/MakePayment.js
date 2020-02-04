import React from 'react';
import { StatusBar, View, Share, TouchableWithoutFeedback,AsyncStorage, ToastAndroid, SafeAreaView, BackHandler } from 'react-native';
import { ButtonGroup, Icon, ListItem, Text, Button, Image } from 'react-native-elements';
import { Container, Title, Loader, Heading } from '../components/UI';
import {baseURL, screenHeight, screenWidth, RAZORYPAY_KEY} from "../config";
import UPIPaymentComponent from "../components/UPIPaymentComponent";
import CardPaymentComponent from "../components/CardPaymentComponent";
import { buttons } from '../style';
import WebView from 'react-native-webview';
import Spinner from 'react-native-loading-spinner-overlay'
import { colors } from '../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

const WalletForm = (props) => {
   return (
      <View>

      </View>
   )
}

const paymentTabComponents = [
   <UPIPaymentComponent />,
   <CardPaymentComponent type={'debit'} />,
   <WalletForm type={'credit'} />,
]
function MakePayment(props) {
   const order_id = props.navigation.getParam('order')

   const paymentPageURL = 'https://stpatil.com/wp-json/pay/payment?order='+order_id

   const onResponse = ({nativeEvent}) => {
      try {
         let data = nativeEvent.data
         let response = JSON.parse(nativeEvent.data)
         console.log({data, response})
         props.navigation.navigate('Transaction', {
            order: order_id,
            response
         })
      } catch (error) {
         console.log({error})
      } finally {
         //
      }
   }

   return (
      <ScrollView>

         <WebView source={{uri: paymentPageURL, }}
            style={{flex: 1, width: screenWidth, height: screenHeight }} onMessage={(data) => onResponse(data)} />
      </ScrollView>
   )
}
MakePayment.navigationOptions = ({ navigation }) => {
   let pageTitle = navigation.getParam('title', 'Payment')
   return {
      headerTitle: <Title>{pageTitle}</Title>,
   }
}
const mapStateToProps = ({user}) => ({
   user,
})
export default connect(
   mapStateToProps
)(MakePayment)
