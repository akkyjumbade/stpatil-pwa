import React from 'react'
import { View } from 'react-native'
import { Loader, Heading } from './UI'
import { connect } from 'react-redux'
import { Text, ListItem } from 'react-native-elements';


function RecentTransactionsList(props) {
   const [ ready, setReady ] = React.useState(false)
   const [ orders, setOrders ] = React.useState(props.orders)

   React.useEffect(() => {
      setReady(true)
   }, [props.orders])

   React.useEffect(() => {
      if(props.type) {
         let mapedOrders = orders.filter(i => { return i.service_type == props.type })
         setOrders(mapedOrders)
      }
   }, [props.type])

   if(!ready) {
      return <Loader />
   }
   return (
      <React.Fragment>
         <View style={{ paddingHorizontal: 15, }}>
            <Heading>Recent transactions</Heading>
         </View>
         {orders && orders.map((order, keyOfOrder) => (
            <ListItem
               key={keyOfOrder}
               title={order.consumer_num}
               subtitle={(order.created_at)}
               rightElement={<Text>Rs. {order.amount}</Text>} />
         ))}
      </React.Fragment>
   )
}

const mapStateToProps = ({ user, wallet, orders }) => ({
   user,
   wallet,
   orders: orders.all,
})
export default connect(
   mapStateToProps
)(RecentTransactionsList)
