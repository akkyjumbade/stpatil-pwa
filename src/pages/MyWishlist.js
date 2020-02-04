import React from 'react';
import { ScrollView, AsyncStorage, View, ActivityIndicator, Linking, ToastAndroid } from 'react-native';
import { Loader, Container, Heading, Title } from '../components/UI';
import { Avatar, ListItem, Button, Text, Card } from 'react-native-elements';
import { baseURL, http } from '../config';
import { buttons } from '../style';
import navigationService from '../navigationService';
import { session } from '../helpers';

export default class MyWishlist extends React.Component {
   static navigationOptions = {
      headerTitle: <Title>My Wishlist</Title>,
      headerStyle: {
         shadowOpacity: 0,
         elevation: 0,
      },
   }
   constructor(props) {
      super(props)
      this.state = {
         user: null,
         ready: false,
         products: null,
      }
   }
   async componentDidMount() {
      const user = await session.load({ key: 'loginState' })
      let products = []
      try {
         let {data} = await http.post('/wp-json/app/my_wishlist', {
            uid: user.id
         })
         if(data && data.ok) {
            products = data.data
         }
      } catch ({message}) {
         ToastAndroid.show(message, ToastAndroid.LONG)
      }
      if (user && products) {
         this.setState({
            user,
            products,
            ready: true,
         })
      } else {
         navigationService.navigate('Auth')
      }
   }
   render() {
      const { ready, user, orders } = this.state
      if (!ready) {
         return <Loader />
      }
      return (
         <ScrollView>
            <Container style={{ paddingTop: 15, }}>
               {orders ? (
                  <View>
                     {orders.map(item => (
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
}
