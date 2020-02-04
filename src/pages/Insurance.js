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
import InsuranceForm from "../components/InsuranceForm";

const Insurance = React.memo(props => {
   const user = props.user

   return (
      <ScrollView>
         <Container style={{ paddingTop: 15, margin: 0, }}>
            <InsuranceForm />
         </Container>
         <RecentTransactionsList type={'insurance'} />
      </ScrollView>
   )
})

Insurance.navigationOptions = {
   headerTitle: <Title>Insurance</Title>
}
const mapStateToProps = ({ user }) => ({
   user,
})
export default connect(
   mapStateToProps
)(Insurance)
