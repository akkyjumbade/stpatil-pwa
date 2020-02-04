import React, { useState } from "react";
import { SafeAreaView,  } from "react-navigation";
import { Container, InputField, Title } from "../components/UI";
import { Formik } from "formik";
import { StyleSheet, KeyboardAvoidingView, Alert, View, ToastAndroid } from "react-native";
import { Button, Text, Image } from "react-native-elements";
import { http, screenWidth, screenHeight } from "../config";
import { ScrollView } from "react-native-gesture-handler";
import { aspectRatio } from '../helpers';
import { connect } from 'react-redux'
import FastagPaymentForm from "../components/FastagPaymentForm";
import RecentTransactionsList from '../components/RecentTransactionsList';

function FlightBooking(props) {
   const {user} = props
   const imageURL = require('../../assets/images/coming_soon.png')
   return (
      <React.Fragment>
         <Container style={{ paddingTop: 15, }}>
            <Image source={imageURL} style={{...aspectRatio(screenWidth, '1:1')}} />
            <Text h2>Coming Soon...</Text>
            {/* <FastagPaymentForm /> */}
            {/* <RecentTransactionsList type={'insurance'} /> */}
         </Container>
      </React.Fragment>
   )
}
FlightBooking.navigationOptions = {
   headerTitle: <Title>Flight Booking</Title>
}
const mapStateToProps = ({ user }) => ({
   user,
})
export default connect(
   mapStateToProps
)(FlightBooking)
