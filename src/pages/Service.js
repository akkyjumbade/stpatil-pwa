import React from 'react';
import {ScrollView, ActivityIndicator, View, Dimensions, ToastAndroid} from 'react-native';
import {Text, Image} from 'react-native-elements';
import { Container, Heading, Title } from '../components/UI';
import { http } from '../config';
import navigationService from '../navigationService';
import MobileRechargeComponent from '../components/MobileRechargeComponent'
import DTHRechargeComponent from '../components/DTHRechargeComponent'
import ElectricityBillPayment from '../components/ElectricityBillPayment'
import GasPaymentComponent from '../components/GasPaymentComponent'
const Component = (props) => {
   if(props.name == 'MobileRechargeComponent') {
      return <MobileRechargeComponent />
   } else if(props.name == 'DTHRechargeComponent') {
      return <DTHRechargeComponent />
   } else if(props.name == 'ElectricityBillPayment') {
      return <ElectricityBillPayment />
   } else if(props.name == 'GasPaymentComponent') {
      return <GasPaymentComponent />
   }
}

export default class Service extends React.Component {
   static navigationOptions = ({navigation}) => {
      let title = navigation.getParam('title', 'Mobile Recharge')
      return {
         headerTitle: '',
         headerStyle: {
            shadowOpacity: 0,
            elevation: 0,
         },
         tabBarVisible: false
      }
   }
   state = {
      wallet: null,
      data: null,
      component: 'MobileRechargeComponent',
   }
   async componentDidMount() {
      let compnent = this.props.navigation.getParam('component', 'MobileRechargeComponent')
      this.setState({
         component: compnent
      })
   }

   render() {
      return (
         <ScrollView>
            <Container style={{paddingTop: 20, margin: 0, }}>
               <Component name={this.state.component} />
            </Container>
         </ScrollView>
      );
   }
}
