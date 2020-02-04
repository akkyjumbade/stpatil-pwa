import React, {useEffect, useState} from 'react'
import {ActivityIndicator} from 'react-native'
import * as app from '../app.json'
import {_logout, _retrieveData, _storeData} from "./helpers";
import {http} from "./config";

export const AppContext = React.createContext()

export const authContext = async () => {
   let [user, setUser] = useState(null)

   useEffect(async  state => {
      await loginSession()
   },)
   const loginSession = async () => {
      let userData = await _retrieveData('auth_user')
      setUser(JSON.parse(userData))
   }
   const doLogin = async (username, password) => {
      try {
         const {data} = await http.post('/wp-json/app/auth_login', {username, password})
         if(data && data.ok) {
            const user = data.data
            await _storeData('auth_user', JSON.stringify(user))
            await loginSession()
         }
      } catch (e) {
         console.log(e)
      }
   }
   return {
      user,
      setUser,
      doLogin,
      loginSession
   }
}

class AppContextProvider extends React.Component  {
   constructor(props) {
      super(props)
      this.verifyAuth()
   }
   state = {
      app: app.expo,
   }
   async verifyAuth() {
      if(!this.props.values.auth_user) {
        await _logout();
      }
   }
   async login(userdata) {
      await _storeData('auth_user', JSON.stringify(userdata))
   }

   render() {
      const {login} = this
      return (
         <AppContext.Provider value={{...this.state, ...this.props.values, login}}>
            {this.props.children}
         </AppContext.Provider>
      )
   }
}
export default AppContextProvider;
