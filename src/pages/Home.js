import React, { useEffect } from 'react';
import { Text, Button, Image, Icon } from 'react-native-elements';
import { Container, Heading, Loader } from '../components/UI';
import HomeServiceActionGrid from '../components/HomeServiceActionGrid';
import {screenWidth, http, screenHeight, baseURL, StoreAPI,} from '../config';
import {WebView} from "react-native-webview";
import {_logout, _retrieveData, session, aspectRatio, openLink} from "../helpers";
import {default as Carousels} from "react-native-snap-carousel";
import { connect } from 'react-redux';
import { getOperatorsAction } from '../store/actions/operatorsActions';
import { TYPE_SET_CATEGORIES } from '../store/products/products.reducer';
import { chunk, filter } from 'lodash';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { TouchableOpacity } from 'react-native-gesture-handler';
const BannerWidth = Dimensions.get('window').width;
import { withNavigation } from 'react-navigation';
import ProductFigure from '../components/ProductFigure';
import { colors } from '../theme';
export const ImagePlaceholder = () => {
   return (
      <View style={{ alignSelf: 'center', paddingVertical: 15 }}>
         <Image
            resizeMode="cover"
            source={{ uri: 'http://placehold.it/400?text=loading...' }}
            style={{...aspectRatio(250, '21:9'), borderRadius: 6, }} />
      </View>
   )
}
export const HeroCarousel = React.memo(props => {
   if(!props.data) {
      return <ImagePlaceholder />
   }
   const heroCarousels = props.data
   return (
   <View style={{paddingVertical: 15, }}>
      {heroCarousels && (
         <Carousels
            data={heroCarousels}
            sliderWidth={BannerWidth}
            autoplay={true}
            loop={true}
            layoutCardOffset={6}
            itemWidth={250}
            renderItem={({item}) => (
               <View key={item.thumbnail_url} style={{...aspectRatio(250, '21:9')}}>
                  <Image
                     resizeMode="cover"
                     source={{ uri: item.thumbnail_url }}
                     style={{...aspectRatio(250, '21:9'), borderRadius: 6, }} />
               </View>
            )}
         />
      )}
   </View>
   )
})

export const VendorCarousel = React.memo(props => {
   if(!props.data) {
      return <ImagePlaceholder />
   }
   const vendorCarousels = props.data
   return (
   <View style={{paddingLeft: 0, paddingBottom: 15}}>
      {vendorCarousels && (
         <Carousels
            data={vendorCarousels}
            sliderWidth={BannerWidth}
            autoplay={true}
            loop={true}
            layoutCardOffset={0}
            itemWidth={250}
            renderItem={({item}) => (
               <View style={{...aspectRatio(250, '21:9')}}>
                  {item.image && (
                     <TouchableNativeFeedback onPress={() => openLink(item.url)}>
                        <Image resizeMode='cover' source={{uri: item.image}} style={{...aspectRatio(250, '21:9'), borderRadius: 6,}} />
                     </TouchableNativeFeedback>
                  )}
               </View>
            )}
         />
      )}
   </View>
   )
})

export const StoreCategoriesGrid = withNavigation(React.memo(props => {
   if(!props.data) {
      return <Loader />
   }
   const title = props.title || 'Browse products at STPatil Store'
   const categories = props.data
   const chunkedCategories = chunk(categories, 3)
   return (
      <React.Fragment>
      <Container style={{marginBottom: 0, paddingBottom: 0}}>
         <Heading style={{paddingBottom: 0, }} alignSelf="center">{title}</Heading>
         <Grid>
            {chunkedCategories && chunkedCategories.map((row, rowkey) => (
               <Row style={{ marginHorizontal: -5, }} key={rowkey}>
                  {row && row.map((cat, catkey) => (
                     <Col style={{ paddingHorizontal: 5, }} key={cat}>
                        <TouchableOpacity onPress={() => props.navigation.navigate('ProductCategory', { category: cat })}>
                           <View style={{ marginBottom: 0, }}>
                              <Image PlaceholderContent={<ActivityIndicator />} source={{ uri: cat.image ? cat.image.src: 'http://placehold.it' }} style={{ ...aspectRatio((screenWidth / 3), '1:1') }} />
                              <Text style={{ marginTop: 5, }}>{cat.name}</Text>
                           </View>
                        </TouchableOpacity>
                     </Col>
                  ))}
               </Row>
            ))}
         </Grid>
      </Container>
   </React.Fragment>
   )
}))

const ProductsRow = React.memo(props => {
   if(!props.products) {
      return (
         <Image source={{ uri: 'http://placehold.it/400?text=Loading...' }} style={{ ...aspectRatio(screenWidth, '21:9') }} />
      )
   }
   // const productCategories = props.
   const products = props.products
   return (
      <View style={{ marginBottom: 0, }}>
         <ScrollView horizontal={true} contentContainerStyle={{ padding: 0, margin: 0, }} >
            <View style={{ marginHorizontal: -5, marginBottom: 0, flexDirection: 'row' }}>
               {products && products.map((product, ik) => (
                  <ProductFigure product={product} key={ik} />
               ))}
            </View>
         </ScrollView>
      </View>
   )
})
const mapProductsToProps = ({ products }) => ({
   products: products.products,
})
export const ProductsSections = withNavigation(connect(
   mapProductsToProps
)(React.memo(props => {
   if(!props.categories) {
      return <Loader />
   }
   const categories = props.categories
   return (
      <React.Fragment>
      <Container style={{marginBottom: 0, paddingBottom: 0, paddingBottom: 0, }}>
         {categories && categories.map((cat, ik2) => {
            const [ products, setProducts ] = React.useState(null)

            React.useEffect(() => {
               let queryParams = new URLSearchParams
               queryParams.append('category', cat.id)
               queryParams.append('per_page', 10)
               http.get(`/wp-json/wc/v1/products?`+queryParams.toString()).then(({data}) => {
                  // if(!data instanceof Array) { return }
                  setProducts(data)
               }).catch(error => {
                  setProducts([])
               })
               return () => {

               }
            }, [cat])
            let className = styles.bgSectionClass
            if(ik2 % 2 == 1) {
               className = styles.bgSectionClass2
            }
            return (
               <View key={ik2} style={className}>
                  {products && products.length ? (
                     <React.Fragment>
                        <Grid>
                           <Col size={80}>
                              <Heading style={{ fontSize: 16, paddingBottom: 0, marginTop: 0 }} alignSelf="center">{cat.name}</Heading>
                           </Col>
                           <Col size={20}>
                              <Icon type="feather" color={colors.primary} name="arrow-right" onPress={() => props.navigation.navigate('ProductCategory', { category: cat })} />
                           </Col>
                        </Grid>
                        <ProductsRow products={products} category={cat} />
                     </React.Fragment>
                  ): null}
               </View>
            )
         })}
      </Container>
   </React.Fragment>
   )
})))


function Home(props) {
   const { storeCategories } = props
   const { hero_carousel, vendor_carousel, } = props.resources
   const heroCarousels = hero_carousel
   const vendorCarousels = vendor_carousel

   return (
      <ScrollView style={{paddingTop: 0}}>
         {/* <Spinner visible={!ready} /> */}
         <HomeServiceActionGrid />
         <HeroCarousel data={heroCarousels} />
         <VendorCarousel data={vendorCarousels} />
         {/* <StoreCategoriesGrid data={storeCategories} /> */}
         <ProductsSections categories={storeCategories} />

      </ScrollView>
   );
}
Home.navigationOptions = {
   header: null
}

const mapStateToProps = ({ user, resources, products }) => ({
   user,
   resources,
   storeCategories: products ? products.categories: [],
})
const mapActionsToProps = (dispatch) => ({
   fetchOperators: () => dispatch(getOperatorsAction()),
   loadCategories: () => {
      StoreAPI.get('products/categories').then((response) => {
         // console.log({response})
         dispatch({ type: TYPE_SET_CATEGORIES, payload: response })
      }).catch(error => {
         console.log({error})
      })
   },
})
export default connect(
   mapStateToProps,
   mapActionsToProps
)(React.memo(Home))


const styles = {
   webview: {
      width: screenWidth,
      height: screenHeight * 4
   },
   bgSectionClass: {
      // backgroundColor: '#aecbff'
   },
   bgSectionClass2: {
      // backgroundColor: '#f8f8f8'
   },
}
