import { StyleSheet, } from 'react-native';
import { colors } from './theme';

const style = StyleSheet.create({
   inputField: {
      flex: 1,
      marginBottom: 10,
   },
   heading: {
      fontSize: 20,
   },
   errorLabel: {
      color: 'red',
      marginBottom: 10,
   },
});
export default style
export const buttons = {
   primary: {
      backgroundColor: colors.primary,
   },
   primaryOutline: {
      borderColor: colors.primary,
      color: colors.primary,
   },
}
