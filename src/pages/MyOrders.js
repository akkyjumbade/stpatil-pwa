import React, { useEffect } from 'react';
import { ScrollView, AsyncStorage, View, ActivityIndicator, Linking, ToastAndroid } from 'react-native';
import { Loader, Container, Heading, Title } from '../components/UI';
import { Avatar, ListItem, Button, Text, Card } from 'react-native-elements';
import { baseURL, http, StoreAPI } from '../config';
import { connect } from 'react-redux';

function MyOrders(props) {
   const [ready, setReady] = React.useState(false)
   const [orders, setOrders] = React.useState(null)
   const { user, } = props
   useEffect(() => {
      setReady(true)
      let uri = 'orders?customer='+user.id
      StoreAPI.get(uri, {
         customer: user.id
      }).then(result => {
         // setOrders(result)
         console.log({result, uri})
      }).catch(error => {
         ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG)
      })
   }, [user])
   if (!ready) {
      return <Loader />
   }
   return (
      <ScrollView>
         <Container style={{ paddingTop: 15, }}>
            {orders ? (
               <View>
                  {orders && orders.map(item => (
                     <ListItem
                        bottomDivider
                        title={price(item.amount)}
                        rightSubtitle={item.date}
                        subtitle={item.details}></ListItem>
                  ))}
               </View>
            ) : null}
         </Container>
      </ScrollView>
   );
}
MyOrders.navigationOptions = {
   headerTitle: <Title>My Orders</Title>,
}
const mapStateToProps = ({ user }) => ({
   user
})
export default connect(
   mapStateToProps
)(MyOrders)
