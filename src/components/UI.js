import React from 'react';
import { Button, Text, Input,Overlay  } from 'react-native-elements';
import { StyleSheet, View, KeyboardAvoidingView, SafeAreaView, ActivityIndicator  } from 'react-native';
import { fontFace, colors } from '../theme';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

export const Link = (props) => {
   return (
      <View style={[styles.link, {...props.style}]} {...props} >
         {props.label}
      </View>
   )
}

export const Container = (props) => {
   return (
      <View style={[styles.container, {...props.style}]}>
         {props.children}
      </View>
   )
}
export const ALink = (props) => {
   return (
      <Text style={[styles.linkTag, {...props.style}]} {...props}>
         {props.children}
      </Text>
   )
}
export const InlineList = (props) => {
   return (
   <View style={[props.style, styles.InlineList]}>
      {props.children}
   </View>
   )
}
export const ErrorMessage = (props) => {
   return (
   <Text style={styles.ErrorMessage}>
      {props.title}
   </Text>
   )
}
export const Title = (props) => {
   return (
   <Text style={{...styles.titleStyle, ...props.style}}>
      {props.children}
   </Text>
   )
}
export const Heading = (props) => {
   let style = {
      color: '#000',
   }
   if(props.primary) {
      style = {
         color: colors.primary
      }
   }
   return (
   <Text style={[styles.heading, style, props.style,]}>
      {props.children}
   </Text>
   )
}
export const InputField = (props) => {
   return (
   <View>
      <Input {...props} />
   </View>
   )
}
export const Loader = (props) => {
   return (
      <Container>
         <ActivityIndicator size="large" color={colors.primary} />
      </Container>
   )
}

export const ButtonLabel = props => {
   let style = {

   }
   if(props.type == 'outline') {
      style = {
         ...style,
         borderColor: '#000',
         borderWidth: 1,
         borderRadius: 4,
      }
   }
   return (
      <TouchableNativeFeedback onPress={props.onPress} style={{ padding: 5, paddingHorizontal: 8, ...style}}>
         <Text style={{ color: '#000', textTransform: 'uppercase', }}>{props.label}</Text>
      </TouchableNativeFeedback>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
      padding: 10,
      // paddingTop: 30,
      backgroundColor: 'transparent',
      justifyContent: 'center',
   },
   InlineList: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
   },
   heading: {
      fontSize: 19,
      marginBottom: 15,
      letterSpacing: 0,
      fontFamily: fontFace
   },
   titleStyle: {
      fontFamily: 'Karla-Bold',
      // fontWeight: "bold",
      color: colors.secondary,
      letterSpacing: -1,
      fontSize: 22,
   },
   ErrorMessage: {
      color: 'red',
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderColor: 'red',
   },
   linkTag: {
      color: colors.primary,
      fontFamily: 'Karla-Regular',
   },
   Loader: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
   }
});
