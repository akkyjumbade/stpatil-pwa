import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Image, Button, Input, Text} from 'react-native-elements';
import { http, baseURL, screenWidth } from '../config';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { aspectRatio, price } from '../helpers';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../theme';

const ProductFigure = React.memo(props => {
   const product = props.product
   const imageSrc = product.images && product.images.length ? product.images[0].src : 'http://placehold.it/300?text='+product.name
   const size = aspectRatio(screenWidth / 3, '3:7')
   return (
      <React.Fragment>
         <TouchableOpacity onPress={() => props.navigation.navigate('Product', { product })}>
            <View style={{ marginHorizontal: 5, marginBottom: 0, ...size }} >
               <View style={{ borderRadius: 2, overflow: 'hidden' }}>
                  <Image PlaceholderContent={<ActivityIndicator />}
                     source={{ uri: imageSrc }}
                     style={{ ...aspectRatio((screenWidth / 3), '3:4'), }} resizeMode={'cover'} resizeMethod={'scale'} />
               </View>

               <Text style={styles.productTitle}>{product.name}</Text>
               <Text style={styles.productPrice}>{price(product.regular_price)}</Text>
            </View>
         </TouchableOpacity>
      </React.Fragment>
   )
})
const mapStateToProps = ({ user, }) => ({
   user,
})
const mapActionsToProps = dispatch => ({
   // addToCart: (product) => dispatch(setAuthUser(product))
})
export default connect(
   mapStateToProps,
   mapActionsToProps
)(withNavigation(ProductFigure))

const styles = {
   productTitle: {
      marginTop: 5,
      fontSize: 13,
      color: colors.secondary,
   },
   productPrice: {
      marginTop: 5,
      fontSize: 13,
      color: colors.success,
   }
}
