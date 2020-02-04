import React from 'react';
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { Container, Title } from '../components/UI';
import { http } from '../config';

export default class CouponMerchants extends React.Component {
   state = {
      merchantCoupons: null,
   }
   static navigationOptions = ({navigation}) => {
      return {
         headerTitle: <Title>Deals & Coupons</Title>,
         // headerTransparent: true,
         headerStyle: {
            shadowOpacity: 0,
            elevation: 0,
         },
      }
   }

   async _fetchMerchantCoupons() {
      try {
         const {data} = await http.get('/wp-json/app/get_merchant_coupons')
         this.setState({merchantCoupons: data})
      } catch (error) {
         console.log(error)
      }
   }
   componentDidMount() {
      this._fetchMerchantCoupons()
   }
   toPage(page, params) {
      this.props.navigation.navigate(page, params)
   }
   render() {
      if(!this.state.merchantCoupons) {
         return <Container><ActivityIndicator /></Container>
      }
      const { merchantCoupons, } = this.state
      console.log({merchantCoupons})
      return (
         <ScrollView style={{paddingTop: 35}}>
            <Container>
               {merchantCoupons && merchantCoupons.map(({thumbnail, title}, index) => {
                  if(thumbnail) {
                     return (
                     <Image
                        key={title + index}
                        source={{uri: thumbnail}}
                        width={{width: 100, height: 100}}
                        PlaceholderContent={<ActivityIndicator />}
                        resizeMode="contain"
                     />
                     )
                  }
               })}
            </Container>
         </ScrollView>
      );
   }
}

