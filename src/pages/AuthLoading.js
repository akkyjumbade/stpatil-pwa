import React, { useState, useEffect } from 'react';
import {
   View,
} from 'react-native';
import { Container, } from '../components/UI'
import {_logout, _retrieveData, session, aspectRatio} from "../helpers";
import { NavigationEvents } from 'react-navigation';
import { fetchAuthUserAction } from '../store/actions';
import { Image } from 'react-native-elements';
import { screenWidth } from '../config';
import { connect } from 'react-redux';

const AuthLoading = React.memo(props => {
   const verifyAuth = () => {
      const { user } = props
      if(user) {
         props.navigation.navigate('App')
      } else {
         props.navigation.navigate('SignIn')
      }
      // return
   }

   return (
      <React.Fragment>
         <NavigationEvents
            onWillFocus={() => verifyAuth()}
            onWillBlur={() => verifyAuth()}
            onDidBlur={() => verifyAuth()}
            onDidFocus={() => verifyAuth()}
         />
         <Container>
            <View style={{alignSelf: 'center'}}>
               <Image style={{...aspectRatio((screenWidth / 2), '1:1'), alignSelf: 'center'}} source={require('../../assets/icon.png')} />
            </View>
         </Container>
      </React.Fragment>
   )
})
const mapStateToProps = ({ user }) => ({
   user
})
export default connect(
   mapStateToProps
)(AuthLoading)
