import React from 'react';
import { ActivityIndicator, View, TouchableOpacity } from 'react-native';
import { Text, Card, Image, ListItem, Tile, Button, Icon } from 'react-native-elements';
import { Container, Heading, Title, Loader } from '../components/UI';
import { Col, Row, Grid } from "react-native-easy-grid";
import { http, screenWidth, } from '../config';
import { colors } from '../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { chunkArray, price } from "../helpers";
import { connect } from 'react-redux';
import { StoreCategoriesGrid } from './Home';
import { withNavigation } from 'react-navigation';

const CategoryFigure = React.memo(withNavigation(props => {
   return (
      <TouchableOpacity style={{ marginBottom: 15, }} onPress={() => props.navigation.navigate('Product', { product: item })}>
         {item.images && item.images.length ? (<Image resizeMode={'contain'} style={{ flex: 1, height: 200, resizeMode: "contain", }} source={{ uri: item.images[0].src }} />) : (<Image resizeMode={'contain'} style={{ flex: 1, height: 200, resizeMode: "contain", }} source={{ uri: 'http://placehold.it/400?text=' + item.name }} />)}
         <View style={{ padding: 8, }}>
            <Text style={{ color: colors.primary, fontSize: 15, }}>{item.name}</Text>
            <Text>{price(item.price)}</Text>
         </View>
      </TouchableOpacity>
   )
}))

function Explore(props) {
   const [featuredProducts, setFeaturedProducts] = React.useState(null)
   const storeCategories = props.storeCategories

   return (
      <ScrollView>
         <Container style={{ paddingTop: 20, margin: 0, }}>
            <StoreCategoriesGrid data={props.storeCategories} title={'Explore products'} />
            <Grid>
               {featuredProducts && featuredProducts.map((row, rowKey) => {
                  return (
                     <Row key={rowKey} style={{ marginBottom: 15, }}>
                        {row.map((item, itemKey) => (
                           <Col key={itemKey}>
                              <CategoryFigure item={item} />
                           </Col>
                        ))}
                     </Row>
                  )
               })}
            </Grid>
         </Container>
      </ScrollView>
   );

}
Explore.navigationOptions = {
   headerTitle: <Title style={{ paddingLeft: 15 }}>ST Patil Store</Title>,
   headerRight: withNavigation(props => (
      <View style={{ paddingRight: 15 }}>
         <Icon type="feather" color={colors.primary} name="shopping-bag" onPress={() => props.navigation.navigate('Cart')} />
      </View>
   )),
}
const mapStateToProps = ({ products }) => ({
   store: products,
   storeCategories: products ? products.categories: [],
})
export default connect(
   mapStateToProps
)(React.memo(Explore))
