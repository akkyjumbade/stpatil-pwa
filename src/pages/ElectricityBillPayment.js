import React from 'react';
import {ScrollView, ActivityIndicator, View, Dimensions, ToastAndroid} from 'react-native';
import {Text, Image} from 'react-native-elements';
import { Container, Heading, Title, Loader } from '../components/UI';
import { http } from '../config';
import ElectricityBillPaymentForm from '../components/ElectricityBillPaymentForm'
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux'
import RecentTransactionsList from '../components/RecentTransactionsList';

function ElectricityBillPayment(props) {
   const [ready, setReady] = React.useState(false)
   const { user, wallet, orders } = props
   React.useEffect(() => {
      setReady(true)
   })
   return (
      <ScrollView>
         <Spinner visible={!ready} />
         <Container style={{paddingTop: 20, margin: 0, }}>
            <ElectricityBillPaymentForm />
            <RecentTransactionsList type={'electricity'} />
         </Container>
      </ScrollView>
   );
}

ElectricityBillPayment.navigationOptions = {
   headerTitle: <Title>Electricity Bill Payment</Title>,
   tabBarVisible: false,
}

const mapStateToProps = ({ user, wallet, orders }) => ({
   user,
   wallet,
   orders: orders.all,
})
export default connect(
   mapStateToProps
)(ElectricityBillPayment)
