import React, { useState } from "react";
import { SafeAreaView } from "react-navigation";
import { Container, InputField } from "../components/UI";
import { Formik } from "formik";
import { KeyboardAvoidingView, Alert, View, ToastAndroid } from "react-native";
import context from "../store/context";
import { Button, Text } from "react-native-elements";
import { http } from "../config";
import { ScrollView } from "react-native-gesture-handler";

const registerSenderAsync = (values) => {
   return new Promise(async (resolve, reject) => {
      try {
         const {data} = await http.post('/wp-json/pay/save_sender', {
            user_id: values.id
         })
         if(data && data.ok) {
            resolve({...data})
         } else {
            reject({...data})
         }
      } catch (error) {
         reject({...error})
      }
   })
}
const verifyOTPAsync = (values) => {
   return new Promise(async (resolve, reject) => {
      try {
         const {data} = await http.post('/wp-json/pay/verify_sender', {...values})
         if(data && data.ok) {
            resolve({...data})
         } else {
            reject({...data})
         }
      } catch (error) {
         reject({...error})
      }
   })
}

export default function RegisterForPaySender(props) {
   const [submitting, setSubmitting] = useState(false)
   const [isOtpSent, setIsOtpSent] = useState(false)
   const [otpValue, setOtpValue] = useState(null)
   const [sender, setSender] = useState(null)


   const {user} = context
   onSubmit = async (values) => {
      setSubmitting(true)
      alert(JSON.stringify({values}))
      registerSenderAsync(values).then(registeredSender => {
         setSender(registeredSender)
         setIsOtpSent(true)
         setSubmitting(false)
      }).catch(error => {
         setSubmitting(false)
         console.log({error})
         // alert(JSON.stringify({error}))
      })
   }
   onVerify = (otp) => {
      setSubmitting(true)
      const values = {
         otp,
         user_id: user.id,
         sender_id: sender.sender_id
      }
      verifyOTPAsync(values).then(verifiedSender => {
         setSubmitting(false)
         context.setPaySender(verifiedSender)
         ToastAndroid.show('OTP Verified!', ToastAndroid.LONG)
      }).catch(error => {
         setSubmitting(false)
         alert(`Invalid OTP. Please try again!`)
      })
   }

   return (
      <React.Fragment>
         <Container>
            {isOtpSent ? (
               <KeyboardAvoidingView>
                  <View>
                     <InputField label={'Enter OTP'} onChangeText={setOtpValue} />
                     <Text>{otpValue}</Text>
                  </View>
                  <View>
                     <Button title="Verify OTP" loading={submitting} onPress={() => onVerify(otpValue)} />
                  </View>
               </KeyboardAvoidingView>
            ): (
               <View>
                  <Button title="Verify as Sender" loading={submitting} onPress={() => onSubmit(user)} />
               </View>
            )}
         </Container>
      </React.Fragment>
   )
}
