import React from 'react';
import {ScrollView, View} from 'react-native';

import { Loader, Container, Title, ButtonLabel } from '../components/UI';
import { Button, Text, Divider  } from 'react-native-elements';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

export const AddressItem = React.memo(withNavigation(props => {
   const address = props.address
   return (
      <View>
         <Text style={{ fontFamily: 'Karla-Bold' }}>{address.first_name} {address.last_name}</Text>
         <Text>{address.email}</Text>
         <Text>{address.phone}</Text>
         <Text>{address.company}</Text>
         <Text>{address.address_1}, {address.address_2}</Text>
         <Text>{address.city}, {address.postalcode}</Text>
         <Text>{address.state}, {address.country}</Text>
         {props.actions ? (
            <View style={{ flexDirection: 'row', paddingTop: 5, }}>
               <ButtonLabel label={'Edit'} type="outline" onPress={() => props.navigation.navigate('UpdateMyAddress', {
                  address,
               })} />
               {/* <ButtonLabel label={'Delete'} onPress={() => props.navigation.navigate('UpdateMyAddress', {
                  address,
               })} /> */}
            </View>
         ): null}
      </View>
   )
}))

const MyAddress = React.memo(props => {
   const [ready, setReady] = React.useState(false);
   const [billing, setBilling] = React.useState({});
   const [shipping, setShipping] = React.useState({});
   const { user } = props;

   React.useEffect(() => {
      setBilling(user.billing)
      setShipping(user.shipping)
      setReady(true)
   }, [props.user])

   if(!ready) {
      return <Loader />
   }
   return (
      <ScrollView>
         <Container style={{paddingTop: 15, }}>
            <AddressItem address={billing} />
            <AddressItem address={shipping} />
         </Container>
      </ScrollView>
   )
})
MyAddress.navigationOptions = {
   headerTitle: <Title>My Addresses</Title>,
}
const mapStateToProps = ({ user }) => ({
   user,
})
export default connect(
   mapStateToProps
)(MyAddress)
