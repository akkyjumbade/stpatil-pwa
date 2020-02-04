import React, { useEffect } from 'react';
import {ScrollView, ActivityIndicator, View, Dimensions, ToastAndroid} from 'react-native';
import { Container, Heading, Title } from '../components/UI';
import DTHRechargeComponent from '../components/DTHRechargeComponent';
import RecentTransactionsList from '../components/RecentTransactionsList';
import { connect } from 'react-redux';

function DTHBillPayment(props){
   // useEffect(() => {

   // }, [])
   return (
      <ScrollView>
         <Container style={{paddingTop: 20, margin: 0, }}>
            <DTHRechargeComponent />
         </Container>
         <RecentTransactionsList type={'dth'} />
      </ScrollView>
   );
}
DTHBillPayment.navigationOptions = {
   headerTitle: <Title>DTH Bill Payment</Title>,
   tabBarVisible: false,
}

const mapStateToProps = ({ user, resources, }) => ({
   user, resources,
})

export default connect(
   mapStateToProps
)(DTHBillPayment)

