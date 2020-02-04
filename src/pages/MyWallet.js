import React from 'react';
import { RefreshControl, ScrollView, View, ActivityIndicator } from 'react-native';

import { Loader, Container, Heading, Title } from '../components/UI';
import { Avatar, ListItem, Button, Text, Divider  } from 'react-native-elements';
import { baseURL, http } from '../config';
import { buttons } from '../style';
import {openLink, _logout, _retrieveData, price, session} from "../helpers";
import { colors } from '../theme';
import { connect } from 'react-redux';
import RecentTransactionsList from '../components/RecentTransactionsList';

const MyWallet = React.memo(props => {
   const [ready, setReady] = React.useState(false)
   const [wallet, setWallet] = React.useState(null)

   const fetchWalletFunc = async (_user) => {
      try {
         const {data} = await http.post('/wp-json/app/wallet/balance', {
            user_id: _user.id
         })
         if(!data.data) {
            return Promise.reject(data)
         }
         return Promise.resolve(data.data)
      } catch (error) {
         return Promise.resolve({ amount: 0 })
         // throw error
      }
   }
   React.useEffect(() => {
      setReady(true)
      fetchWalletFunc(props.user).then(_w => {
         let {amount} = _w
         amount = amount.replace('</span>', '')
         setWallet({ balance: amount })
      })
   }, [props.user])
   if(!ready) {
      return <Loader />
   }
   return (
      <ScrollView>
         <Container style={{paddingTop: 15, paddingHorizontal: 0 }}>
            <View style={{flexDirection: 'row', paddingVertical: 30, paddingHorizontal: 15 }}>
               <View style={{paddingRight: 20, flex: 1,}}>
                  {wallet ? (
                     <Title style={{color: colors.primary, letterSpacing: 1, fontSize: 44 }}>
                        {price(wallet.balance)}
                     </Title>
                  ): <View>
                        <Text>...</Text>
                     </View>}
                  <Text>Available balance</Text>
               </View>
               <Avatar
                  source={{ uri: props.user.avatar, }}
                  rounded
                  onPress={() => props.navigation.push('MyAccount')}
               />
            </View>
            <View style={{paddingHorizontal: 15}}><Heading>Do more with your wallet</Heading></View>
            <ListItem bottomDivider button onPress={() => props.navigation.push('MyRewards')} chevron title="My Rewards" subtitle="Earned by Scratch Cards/ Referral"></ListItem>
            <ListItem bottomDivider button onPress={() => props.navigation.push('MobileRecharge')} chevron title="Mobile Recharge" subtitle="Prepaid/ Postpaid"></ListItem>
            <ListItem bottomDivider button onPress={() => props.navigation.push('ElectricityBillPayment')} chevron title="Bill Payment" subtitle="Electricity"></ListItem>
            <ListItem bottomDivider button
               onPress={() => props.navigation.push('ScanAndPay')} chevron title="Money Transfer"></ListItem>
            <ListItem bottomDivider button
               style={{ marginBottom: 15 }}
               onPress={() => props.navigation.push('ShareApp')} chevron title="Refer & Earn"></ListItem>
            <RecentTransactionsList />
         </Container>
      </ScrollView>
   );
})
MyWallet.navigationOptions = {
   header: null,
}
const mapStateToProps = ({ user, wallet }) => ({
   user, wallet
})
export default connect(
   mapStateToProps
)(MyWallet)
