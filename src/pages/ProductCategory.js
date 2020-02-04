import React from 'react';
import { ActivityIndicator, View, TouchableOpacity } from 'react-native';
import { Text, Card, Image, ListItem, Tile, Button, Icon } from 'react-native-elements';
import { Container, Heading, Title, Loader } from '../components/UI';
import { Col, Row, Grid } from "react-native-easy-grid";
import {http, screenWidth, StoreAPI,} from '../config';
import { colors } from '../theme';
import { ScrollView } from 'react-native-gesture-handler';
import {chunkArray, price} from "../helpers";
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux';
import ProductFigure from '../components/ProductFigure';
const loadProductsAsync = category => {
   return new Promise(async (resolve, reject) => {
      try {
         const { data } = await http.get('wp-json/wc/v1/products?category='+category.id+'&per_page=100')
         console.log({ data })
         return resolve(data)
      } catch (error) {
         console.log({ loadProductError: error })
         return reject(error)
      }
   })
}
const ProductCategory = React.memo(props => {
   const [ready, setReady] = React.useState(false)
   const [products, setProducts] = React.useState(null)

   React.useEffect(() => {
      const category = props.navigation.getParam('category')
      loadProductsAsync(category).then(data => {
         if(data instanceof Array) {
            setProducts(chunkArray(data, 2))
         }
      }).finally(() => {
         setReady(true)
      })
   }, [props.user])
   if(!ready) {
      <Spinner visible={true} />
   }
   return (
      <ScrollView>
         <Container style={{paddingTop: 20, margin: 0, }}>
            <Grid>
               {products && products.map((row, rowKey) => {
                  return (
                     <Row key={rowKey} style={{marginBottom: 15,}}>
                        {row.map((item, itemKey) => (
                           <Col key={itemKey}>
                              <ProductFigure product={item} />
                           </Col>
                        ))}
                     </Row>
                  )
               })}
            </Grid>
         </Container>
      </ScrollView>
   );
})
ProductCategory.navigationOptions = ({navigation}) => {
   const category = navigation.getParam('category')
   const categoryTitle = category.name
   return {
      headerTitle: <Title style={{paddingLeft: 15}}>{categoryTitle}</Title>,
      headerRight: (
         <View style={{paddingRight: 15}}>
            <Icon type="feather" color={colors.primary} name="shopping-bag" onPress={() => navigation.navigate('Cart')} />
         </View>
      ),
   }
}
const mapStateToProps = ({ products, categories, }) => ({
   products, categories,
})
export default connect(
   mapStateToProps
)(ProductCategory)
