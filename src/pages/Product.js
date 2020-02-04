import React from 'react';
import {ActivityIndicator, View, KeyboardAvoidingView, Dimensions, ToastAndroid} from 'react-native';
import {Icon, Text, Card, Image, ListItem, Button, Badge} from 'react-native-elements';
import { Container, Heading, Title, ALink } from '../components/UI';
import { http, screenHeight } from '../config';
import { ScrollView, RectButton } from 'react-native-gesture-handler';
import navigationService from '../navigationService';
import Carousel from "react-native-banner-carousel";
import { price, session, aspectRatio } from '../helpers';
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = screenHeight - 250;
import {AppContext} from "../AppContext";
import { Grid, Col, Row } from 'react-native-easy-grid';
import { buttons } from '../style';
import { addToCart } from '../functions/cart';
import { colors } from '../theme';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import WebView from 'react-native-webview';
import HTMLView from 'react-native-htmlview';
import { addToCartAction } from '../store/cart/actions';

const _itemComponent = (image, index) => {
   let imgSize = aspectRatio(BannerWidth - 20, "1:1")
   return (
      <View key={index} style={{padding: 0, paddingBottom: 0, }}>
         <Image
            style={{ ...imgSize, borderRadius: 4, }}
            resizeMode="cover"
            source={{ uri: image.src }} />
      </View>
   )
}
function discountInPercentage(regular, actual) {
   if(!regular || regular === '') { return '' }
   return '%' + Math.round((actual/regular) * 100) + ' Off'
}
const Product = React.memo(props => {
   const [ ready, setReady ] = React.useState(false)
   const [ product, setProduct ] = React.useState(null)
   React.useEffect(() => {
      const _product = props.navigation.getParam('product')
      setProduct(_product)
      setReady(true)
   }, [])
   const addToCartThenToCart = (_product) => {
      props.addToCart(_product)
      props.navigation.navigate('Cart')
   }
   if(!ready) {
      return <Spinner visible={true} />
   }
   return (
      <ScrollView>
         <Container style={{paddingTop: 0, margin: 0, }}>
            <Carousel
               autoplay
               autoplayTimeout={5000}
               loop
               index={0}
               pageSize={BannerWidth}
            >
               {product.images && product.images.map((image, index) => _itemComponent(image, index))}
            </Carousel>
            <Heading style={{ marginTop: 5, marginBottom: 0, }}>{product.name}</Heading>
            <View style={{paddingBottom: 10, alignItems: 'center', flex: 1, flexDirection: 'row' }}>
               <Text h4>Price: </Text>
               <Text style={{color: '#5fba7d'}} h4>{price(product.price)}</Text>
               <Text h4 style={{marginLeft: 5, }}>{discountInPercentage(product.regular_price, product.price)}</Text>
            </View>
            <View style={{ paddingTop: 0, paddingBottom: 10, alignItems: 'center', flex: 1, flexDirection: 'row' }}>
               {product.categories.map((cat, i) => (
                  <ALink key={i}
                     style={{paddiRight: 5, }}
                     onPress={() => props.navigation.navigate('ProductCategory', {category: cat})}>
                     #{cat.name}
                  </ALink>
               ))}
            </View>
            <Grid style={{paddingVertical: 10, }}>
               <Row>
                  <Col>
                     <View  style={{marginRight: 10}}>
                        <Button title="Add to Wishlist" type="clear" onPress={() => props.addToWishlist(product)} />
                     </View>
                  </Col>
                  <Col>
                     {product.purchasable ? (
                        <Button buttonStyle={buttons.primary} title="Buy Now" onPress={() => addToCartThenToCart(product) } />
                     ): null}
                  </Col>
               </Row>
            </Grid>
            <View style={{ paddingTop: 0, paddingBottom: 10, flex: 1 }}>
               <HTMLView value={product.description} style={{ ...styles.fullWidth, flex: 1, }} stylesheet={contentStyles} />
            </View>
         </Container>
      </ScrollView>
   )
})
const mapStateToProps = ({ user, cart }) => ({
   user,
   cart,
})
const mapActionsToProps = dispatch => ({
   addToCart: (product) => {
      dispatch(addToCartAction(product))
   },
   addToWishlist: (product) => dispatch({ type: '' })
})
let NavRightComponent = React.memo(props => {
   const cartItems = props.cart.items.length || null
   return (
      <View style={{paddingRight: 15, flexDirection: 'row', alignItems: 'center'}}>
         {cartItems ? <Badge value={cartItems} status={'primary'} />: null}
         <Icon type="feather" color={colors.primary} name="shopping-bag" onPress={() => props.navigation.navigate('Cart')} />
      </View>
   )
})
NavRightComponent = connect(mapStateToProps)(NavRightComponent)
Product.navigationOptions = ({navigation}) => {
   return {
      headerTitle: '',
      headerRight: <NavRightComponent navigation={navigation} />,
   }
}
const styles = {
   fullWidth: {
      // ...aspectRatio()
   }
}
const contentStyles = {
   // color: 'red',
   p: {
      color: colors.secondary,
   }
}

export default connect(
   mapStateToProps,
   mapActionsToProps
)(Product)
