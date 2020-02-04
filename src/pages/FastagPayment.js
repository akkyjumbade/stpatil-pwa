import React, { useState } from "react";
import { SafeAreaView,  } from "react-navigation";
import { Container, InputField, Title } from "../components/UI";
import { Formik } from "formik";
import { StyleSheet, KeyboardAvoidingView, Alert, View, ToastAndroid } from "react-native";
import { Button, Text } from "react-native-elements";
import { http, screenWidth, screenHeight } from "../config";
import { ScrollView } from "react-native-gesture-handler";
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from "expo-barcode-scanner";


import { connect } from 'react-redux'
import FastagPaymentForm from "../components/FastagPaymentForm";
function FastagPayment(props) {
   const [hasCameraPermission, setHasCameraPermission] = useState(false)
   const [scanned, setScanned] = useState(false)
   const [qrData, setQrData] = useState(null)
   const {user} = props

   return (
      <React.Fragment>
         <Container style={{ paddingTop: 15, }}>
            <FastagPaymentForm />
         </Container>
      </React.Fragment>
   )
}
FastagPayment.navigationOptions = {
   headerTitle: <Title>FASTag payment</Title>
}
const mapStateToProps = ({ user }) => ({
   user,
})
export default connect(
   mapStateToProps
)(FastagPayment)
