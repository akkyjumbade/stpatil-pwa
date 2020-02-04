import { AsyncStorage, Linking, ToastAndroid, Dimensions } from 'react-native'
import Storage from 'react-native-storage';
import * as WebBrowser from 'expo-web-browser';
import { baseURL, http } from "./config";
import navigationService from "./navigationService";
import store from './store';
import { SET_OPERATORS_ACTION } from './store/reducers/operatorsReducers';
const currencyFormatter = require('currency-formatter');
const ScreenWidth = Dimensions.get('window').width;


export const session = new Storage({
   storageBackend: AsyncStorage,
   defaultExpires: null,
})
session.sync = {
   operators: async function() {
      let _data = [];
      try {
         const { data } = await http.get('/wp-json/pay/operators-all')
         if(data.ok) {
            _data = data.data
            // alert(JSON.stringify({_data}))
         }
      } catch (error) {

      } finally {
         store.dispatch({ type: SET_OPERATORS_ACTION, payload: _data })
         await session.save({ key: 'operators', data: _data })
         // console.log({_data})
      }
   },
}
export function chunkArray(myArray, chunk_size) {
   let index = 0;
   let arrayLength = myArray.length;
   let tempArray = [];

   for (index = 0; index < arrayLength; index += chunk_size) {
      let myChunk = myArray.slice(index, index + chunk_size);
      // Do something if you want with the group
      tempArray.push(myChunk);
   }

   return tempArray;
}

export const _storeData = async (key, value) => {
   try {
      await AsyncStorage.setItem(key, value, (error) => {
         if(error) {
            ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG)
         }
         ToastAndroid.show(key+' Value stored', ToastAndroid.LONG)
      });
   } catch (error) {
      // Error saving data
      ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG)
   }
}

export const _retrieveData = async (key) => {
   try {
      let value = await AsyncStorage.getItem(key, null, (err, result) => {
         return result;
      });
      if (value !== null) {
         // Our data is fetched successfully
         return value;
      }
      return null;
   } catch (error) {
      return null;
   }
}

export const _logout = async () => {
   try {
      await AsyncStorage.removeItem('auth_user');
   } catch (error) {
      // Error saving data
   }
}
export const openLink = async (url = baseURL) => {
   await WebBrowser.openBrowserAsync(url);
}

export const price = (amt) => {
   return currencyFormatter.format(amt, {
      code: 'INR'
   })
}

export const resetStack = () => {
   navigationService.dispatch(StackActions.reset({
      index: 0,
      actions: [
         NavigationActions.navigate({
            routeName: 'Home',
         }),
      ],
   }))
}

export const aspectRatio = (width = ScreenWidth, ratio = '16:9') => {
   let ratioArr = ratio.split(':')
   let ratioX = ratioArr[0]
   let ratioY = ratioArr[1]
   let height = Math.round((ratioY/ratioX) * width)
   return {width, height}
}
