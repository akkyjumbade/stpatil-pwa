import React from 'react'
import { TouchableNativeFeedback, Text } from 'react-native'
// import styled from 'styled-components'

const Button = (props) => {
   const {
      label, onPress, iconLeft, iconRight,
   } = props
   return (
      <TouchableNativeFeedback onPress={onPress}>
         {iconLeft ? (
         <Text style={styles.label}>{iconLeft}</Text>
         ): null}
         {label ? (
         <Text style={styles.label}>{label}</Text>
         ): null}
         {iconRight ? (
         <Text style={styles.label}>{iconRight}</Text>
         ): null}
      </TouchableNativeFeedback>
   )
}
const styles = {
   label: {

   }
}
export default Button;
