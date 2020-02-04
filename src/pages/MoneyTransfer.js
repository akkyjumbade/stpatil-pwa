import React from 'react';
import {ScrollView, ActivityIndicator, View, Dimensions, ToastAndroid, Alert} from 'react-native';
import {Text, Image, ListItem, Button} from 'react-native-elements';
import { Container, Heading, Title, InputField } from '../components/UI';
import { http } from '../config';
import MoneyTransferComponent from '../components/MoneyTransferComponent';
import Spinner from 'react-native-loading-spinner-overlay'
import { fetchOperatorsAsync } from '../functions/operators';
import { getBeneficiaries } from '../services/MoneyTransfer';
import RecentTransactionsList from '../components/RecentTransactionsList';

function MoneyTransfer(props) {
   const [ready, setReady] = React.useState(false)

   if(!ready) {
      return <Spinner visible={true} />
   }
   return (
      <ScrollView>
         <Container style={{paddingTop: 20, margin: 0, }}>
            <MoneyTransferComponent />
         </Container>
         <RecentTransactionsList type={'money-transfer'} />
      </ScrollView>
   );
}

MoneyTransfer.navigationOptions = ({navigation}) => {
   return {
      headerTitle: <Title>Money Transfer</Title>,
   }
}

export default MoneyTransfer
