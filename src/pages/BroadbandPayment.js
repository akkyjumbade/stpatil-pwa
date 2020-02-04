import React from 'react';
import {ScrollView, ActivityIndicator, View, Dimensions, ToastAndroid} from 'react-native';
import {Text, Image} from 'react-native-elements';
import { Container, Heading, Title } from '../components/UI';
import { http } from '../config';
import BroadbandComponent from '../components/BroadbandComponent';
import RecentTransactionsList from '../components/RecentTransactionsList';
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux'

function BroadbandPayment(props) {
   const [ready, setReady] = React.useState(false)
   React.useEffect(() => {
      setReady(true)
   })
   return (
      <ScrollView>
         <Spinner visible={!ready} />
         <Container style={{paddingTop: 20, margin: 0, }}>
            <BroadbandComponent />
         </Container>
         <RecentTransactionsList type={'broadband'} />
      </ScrollView>
   )
}
BroadbandPayment.navigationOptions = {
   headerTitle: <Title>Broadband Payment</Title>,
}
const mapStateToProps = ({ user }) => ({ user })
export default connect(
   mapStateToProps
)(React.memo(BroadbandPayment))
