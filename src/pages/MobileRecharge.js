import React, { useState, useEffect } from 'react';
import {ScrollView, ActivityIndicator, View, Dimensions, ToastAndroid} from 'react-native';
import {Text, Image, ListItem} from 'react-native-elements';
import { Container, Heading, Title, Loader } from '../components/UI';
import { http } from '../config';
import MobileRechargeComponent from '../components/MobileRechargeComponent';
import { connect } from 'react-redux';
import RecentTransactionsList from '../components/RecentTransactionsList';

function MobileRecharge(props) {
   const [ready, setReady] = useState(false)
   const { orders, user, wallet, } = props

   useEffect(() => {
      setReady(true)
   })
   if(!ready) {
      return <Loader />
   }
   return (
      <ScrollView>
         <Container style={{paddingTop: 20, margin: 0, }}>
            <MobileRechargeComponent />
         </Container>
         <RecentTransactionsList type={'mobile'} />
      </ScrollView>
   )
}
MobileRecharge.navigationOptions = {
   headerTitle: <Title>Mobile Recharge</Title>
}

const mapStateToProps = ({ user, wallet, orders }) => ({
   user,
   wallet,
   orders: orders.all,
})
export default connect(
   mapStateToProps
)(MobileRecharge)
