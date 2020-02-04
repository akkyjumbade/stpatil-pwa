import React, { useContext, } from 'react';
import { ScrollView, View, } from 'react-native';
import { Container, Heading, Loader } from '../components/UI';
import { Avatar, ListItem, Button, Text  } from 'react-native-elements';
import { baseURL } from '../config';
import { buttons } from '../style';
import { USER_LOGOUT_TYPE } from '../store/reducers/userReducers';
import {openLink, session, _logout, _retrieveData} from "../helpers";
import { connect } from 'react-redux';

const MyAccount = React.memo(props => {
   const { user } = props
   const logout = async () => {
      await session.remove({ key: 'loginState' })
      props.logout()
      props.navigation.navigate('Auth')
   }
   if(!user) {
      return <Loader />
   }
   return (
      <ScrollView>
         <Container style={{paddingTop: 15, paddingHorizontal: 0 }}>
            <View style={{flexDirection: 'row', paddingVertical: 30, paddingHorizontal: 15 }}>
               <Avatar
                  source={{ uri: 'https://api.adorable.io/avatars/115/'+user.email,}}
                  rounded
                  size="large"
                  onPress={() => alert('')}
                  showEditButton
               />
               <View style={{paddingLeft: 20}}>
                  <Heading>{user.name} {user.last_name}</Heading>
                  <Text>{user.name}</Text>
               </View>
            </View>
            <ListItem bottomDivider button onPress={() => props.navigation.navigate('EditProfile')} chevron title="Edit Profile"></ListItem>
            <ListItem bottomDivider button onPress={() => props.navigation.navigate('MyAddress')} chevron title="My Addresses"></ListItem>
            <ListItem bottomDivider button onPress={() => props.navigation.navigate('MyWishlist')} chevron title="My Wishlist"></ListItem>
            <ListItem bottomDivider button onPress={() => props.navigation.navigate('MyOrders')} chevron title="My Orders"></ListItem>
            <ListItem bottomDivider button onPress={() => props.navigation.navigate('ChangePassword')} chevron title="Change Password"></ListItem>
            <ListItem bottomDivider button onPress={() => props.navigation.navigate('ShareApp')} chevron title="Refer & Earn"></ListItem>
            <ListItem bottomDivider button onPress={() => openLink(baseURL+'/privacy-policy/')} chevron title="Privacy Policy"></ListItem>
            <ListItem bottomDivider button onPress={() => openLink(baseURL+'/terms-and-conditions/')} chevron title="Terms of Service"></ListItem>
            <ListItem button title="App Version" subtitle={'v1.0.0'}></ListItem>
            <View style={{paddingHorizontal: 15,}}>
               <Button buttonStyle={buttons.primary} leftIcon="logout" onPress={() => openLink('https://www.stpatil.com/about/')} title="About App"></Button>
               <Button type="outline" onPress={() => logout()} title="Logout"></Button>
            </View>
         </Container>
      </ScrollView>
   )
})

const mapStateToProps = ({ user }) => ({
   user
})
const mapActionsToProps = (dispatch) => ({
   logout: () => dispatch({ type: USER_LOGOUT_TYPE })
})
export default connect(
   mapStateToProps,
   mapActionsToProps
)(MyAccount)
