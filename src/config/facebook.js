import React from 'react';
import { ToastAndroid } from 'react-native';
import { services, baseURL, http } from '../config'
import { _logout, _retrieveData, session } from "../helpers";
import * as Facebook from 'expo-facebook';
import Axios from 'axios';

export const loginFacebook = async (token) => {
    await session.save({
        key: 'facebookAuthToken',
        data: token
    })
    // Get the user's name using Facebook's Graph API
    let fieldsToFetch = "email,name,first_name,last_name"
    let uid = "me"
    let graphFetchUrl = `https://graph.facebook.com/me?access_token=${token}&fields=${fieldsToFetch}`
    let fbCallback = await fetch(graphFetchUrl)
    fbCallback = await fbCallback.json()
    const user = fbCallback
    alert(JSON.stringify({ user, }))
    const { data } = http.post('/wp-json/app/oauth_signin_facebook', {
        auth_type: 'facebook',
        ...user,
        token
    })
    await session.save({
        key: 'loginState',
        data: data.data
    })
}