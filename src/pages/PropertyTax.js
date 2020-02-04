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
import PropertyTaxPayForm from "../components/PropertyTaxPayForm";

const PropertyTax = React.memo(props => {
   const user = props.user

   return (
      <ScrollView>
         <Container style={{ paddingTop: 15, margin: 0, }}>
            <PropertyTaxPayForm />
         </Container>
         <RecentTransactionsList type={'property'} />
      </ScrollView>
   )
})

PropertyTax.navigationOptions = {
   headerTitle: <Title>Online Property Tax Payment</Title>
}
const mapStateToProps = ({ user }) => ({
   user,
})
export default connect(
   mapStateToProps
)(PropertyTax)
