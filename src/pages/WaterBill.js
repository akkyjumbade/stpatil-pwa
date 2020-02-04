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
import RecentTransactionsList from '../components/RecentTransactionsList';
import WaterBillForm from "../components/WaterBillForm";

const WaterBill = React.memo(props => {
   const user = props.user

   return (
      <ScrollView>
         <Container style={{ paddingTop: 15, margin: 0, }}>
            <WaterBillForm />
         </Container>
         <RecentTransactionsList type={'water'} />
      </ScrollView>
   )
})

WaterBill.navigationOptions = {
   headerTitle: <Title>Water Bill</Title>
}
const mapStateToProps = ({ user }) => ({
   user,
})
export default connect(
   mapStateToProps
)(WaterBill)
