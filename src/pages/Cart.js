import React from 'react';
import _ from 'lodash'
import { View, ToastAndroid, ScrollView, ActivityIndicator } from 'react-native';
import { ListItem, Text, Button, Image, Overlay, Icon } from 'react-native-elements';
import { Container, Title, Loader, Heading } from '../components/UI';
import { screenWidth, http, StoreAPI } from "../config";
import { session, price, aspectRatio } from '../helpers';
import { buttons, } from '../style';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { cartAsync, removeFromCart } from '../functions/cart';
import { withNavigation } from 'react-navigation';
import { connect, } from 'react-redux'
import { TYPE_CART_REMOVE } from '../store/cart';
import { colors } from '../theme';

export const CartItem = React.memo(props => {
   const item = props.product
   let productThumbnail = (item && item.images) ? item.images[0].src : 'http://placehold.it/40'
   return (
      <Grid style={{ paddingHorizontal: 15, marginBottom: 10, }}>
         <Col style={{ width: 50, marginRight: 10, }}>
            <Image resizeMode={'cover'}
               style={{ flex: 1, width: 50, height: 50, resizeMode: "cover", }}
               source={{ uri: productThumbnail }} />
         </Col>
         <Col size={60} >
            <View>
               <Text>{item.name}</Text>
               <Text>{price(item.price)}</Text>
            </View>
            {props.actions ? (
               <Grid style={{ width: 100, marginLeft: 0, marginTop: 5, paddingLeft: 0, }}>
                  <Col>
                     <Icon type="feather" color={colors.secondary} size={24} name="minus-circle" onPress={() => props.onDecrement(item)} />
                  </Col>
                     <Text>{item.qty || 1}</Text>
                  <Col>
                     <Icon type="feather" color={colors.secondary} size={24} name="plus-circle" onPress={() => props.onIncrement(item)} />
                  </Col>
               </Grid>
            ): null}
         </Col>
         <Col size={25} style={{ paddingVertical: 15, alignItems: 'flex-end' }}>
            <Icon type="feather" color={colors.danger} size={24} name="x-circle" onPress={() => props.onRemove(item)} />
         </Col>
      </Grid>
   )
})

const OrderSummary = React.memo(props => {
   const subtotal = props.subtotal
   const tax = props.tax
   const total = props.total
   return (
      <View>
         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7, }}>
            <Text>Subtotal</Text>
            <Text>{subtotal}</Text>
         </View>
         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7, }}>
            <Text>Tax</Text>
            <Text>{tax}</Text>
         </View>
         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7, }}>
            <Heading>Total</Heading>
            <Heading>{total}</Heading>
         </View>
      </View>
   )
})
const Cart = React.memo(props => {
   const [ready, setReady] = React.useState(false)
   const [cartItems, setCartItems] = React.useState(null)
   const [addresses, setAddresses] = React.useState(null)
   const [askForDelivery, setAskForDelivery] = React.useState(false)

   const onPlaceOrder = () => {
      props.navigation.navigate('Checkout')
   }
   const onIncrement = _product => {

   }
   const onDecrement = _product => {

   }

   React.useEffect(() => {
      setCartItems(props.cart.items)
      setReady(true)
   }, [props.cart])
   if (!ready) {
      <Loader />
   }
   return (
      <React.Fragment>
         <ScrollView contentContainerStyle={{ flex: 1, alignContent: 'flex-start' }}>
            <View style={{ flex: 1, }}>
               {!cartItems || cartItems.length == 0 ? (
                  <View>
                     <Image
                        PlaceholderContent={<ActivityIndicator />}
                        style={{ ...aspectRatio(screenWidth, '1:1') }}
                        source={require('../../assets/images/empty-cart.png')} />
                  </View>
               ) : (
                  <View style={{ flex: 1, flexGrow: 1, }}>
                     {cartItems && cartItems.map((item, ik) => (
                        <CartItem key={ik} product={item} onIncrement={onIncrement} onDecrement={onDecrement} onRemove={() => props.removeFromCart(item)} actions={true} />
                     ))}
                  </View>
               )}
               <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
                  <OrderSummary subtotal={price(_.sumBy(cartItems, 'price'))} tax={price(0)} total={price(_.sumBy(cartItems, 'price'))} />
                  <Button buttonStyle={buttons.primary} onPress={() => onPlaceOrder()} title="Place Order" />
               </View>
            </View>
            {addresses && askForDelivery ? (
               <Overlay
                  width={(screenWidth - 30)}
                  containerStyle={{ bottom: 0, backgroundColor: 'rgba(0, 0, 0, .5)' }}
                  overlayStyle={{ bottom: 0, }}
                  overlayBackgroundColor="#fff"
                  isVisible={askForDelivery}
                  onBackdropPress={() => setAskForDelivery(true)}
               >
                  <View style={{ padding: 15, }}>
                     <Text h4>Select Delivery Address</Text>
                     <View>
                        {addresses && addresses.map((addr, addrIndex) => {
                           return (
                              <ListItem
                                 key={addrIndex}
                                 title={addr.address_1}
                                 subtitle={`${addr.first_name} ${addr.last_name},
                                 ${addr.email}, ${addr.phone},
                                 ${addr.company},
                                 ${addr.address_1}, ${addr.address_2},
                                 ${addr.city}, ${addr.postalcode},
                                 ${addr.state}, ${addr.country}
                                 `}
                                 checkmark={selectedAddrIndex == addrIndex}
                                 bottomDivider
                                 onPress={() => this.setState({ selectedAddrIndex: addrIndex })}
                              />
                           )
                        })}
                     </View>
                     <View style={{ paddingVertical: 5 }}>
                        <Button title="Deliver Here" onPress={() => this.onAddressPicked(selectedAddrIndex)} />
                     </View>
                  </View>
               </Overlay>
            ) : null}
         </ScrollView>
      </React.Fragment>
   );
})
Cart.navigationOptions = ({navigation}) => {
   return {
      headerTitle: <Title>My Cart</Title>,
      headerRight: (
         <View style={{ paddingRight: 15 }}>
            <Icon type="feather" name="heart" color={colors.primary} size={30} onPress={() => navigation.navigate('MyWishlist')}  />

         </View>
      ),
   }
}

const mapStateToProps = ({ user, cart }) => ({
   user,
   cart,
});
const mapActionsToProps = dispatch => ({
   removeFromCart: product => dispatch({ type: TYPE_CART_REMOVE, payload: product })
});


export default connect(mapStateToProps, mapActionsToProps)(Cart)
