import React from 'react';
import {ScrollView, ActivityIndicator, View, Dimensions, ToastAndroid} from 'react-native';
import { Container, Heading, Title } from '../components/UI';
import ElectricityBillPaymentForm from '../components/ElectricityBillPaymentForm';
import { connect } from 'react-redux';

function ElectrictyBillPayment(props){
   return (
      <ScrollView>
         <Container style={{paddingTop: 20, margin: 0, }}>
            <ElectricityBillPaymentForm />
         </Container>
      </ScrollView>
   );
}

const mapStateToProps = state => ({

})
ElectrictyBillPayment.navigationOptions = {
   headerTitle: <Title>Electricty Bill Payment</Title>
}
export default connect(
   mapStateToProps
)(ElectrictyBillPayment)

