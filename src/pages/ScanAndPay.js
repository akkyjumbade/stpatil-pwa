import React, { useState } from "react";
import { SafeAreaView,  } from "react-navigation";
import { Container, InputField, Title } from "../components/UI";
import { Formik } from "formik";
import { StyleSheet, KeyboardAvoidingView, Alert, View, ToastAndroid, Linking } from "react-native";
import { Button, Text } from "react-native-elements";
import { http, screenWidth, screenHeight } from "../config";
import { ScrollView } from "react-native-gesture-handler";
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from 'expo-camera';
import RecentTransactionsList from '../components/RecentTransactionsList';

import { connect } from 'react-redux'
import { aspectRatio } from "../helpers";

import { createOrder } from "../functions/orders";
 function ScanAndPay(props) {
   const [hasCameraPermission, setHasCameraPermission] = useState(false)
   const [scanned, setScanned] = useState(false)
   const [qrData, setQrData] = useState(null)
   const {user} = props

   const checkPermissions = async () => {
      try {
         const { status } = await Permissions.askAsync(Permissions.CAMERA);
         setHasCameraPermission(status === 'granted');
      } catch (error) {
         alert(error.message)
      }
   }

   React.useEffect(() => {
      checkPermissions()
   })


   const handleBarCodeScanned = ({data}) => {
      // alert(JSON.stringify({data}))
      ToastAndroid.show('Scanned QR Code.', ToastAndroid.LONG);
      setQrData(data)
      if(!data) { return }
      Linking.openURL(data)
      let order = null
      let title = 'UPI Payment'
      let values = {
         ...data
      }
      createOrder(values).then(savedOrder => {
         alert(JSON.stringify(savedOrder))
         props.navigation.navigate('MakePayment', { order, title })
      }).catch(error => {
         alert(JSON.stringify(error))
      }).finally(() => {

      })

   }

   return (
      <React.Fragment>
         <Camera style={styles.absoluteFillObject} onBarCodeScanned={handleBarCodeScanned}  />
         <View style={{ paddingVertical: 0, ...styles.absoluteFillContent }}>

            <View style={{ paddingHorizontal: 15, paddingTop: 15, }}>
               <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
            </View>
            <RecentTransactionsList type={'money-transfer'} />
         </View>
      </React.Fragment>
   )
}
const styles = {
   absoluteFillObject: {
      ...StyleSheet.absoluteFillObject,
      width: screenWidth,
      borderRadius: 6,
      overflow: 'hidden',
      // height: 200,
   },
   absoluteFillContent: {
      ...StyleSheet.absoluteFillObject,
      top: (screenHeight /2),
      backgroundColor: '#fff',
      // height: 200,
   },
}
ScanAndPay.navigationOptions = {
   headerTitle: <Title>Scan and Pay</Title>
}
const mapStateToProps = ({ user }) => ({
   user,
})
export default connect(
   mapStateToProps
)(ScanAndPay)
