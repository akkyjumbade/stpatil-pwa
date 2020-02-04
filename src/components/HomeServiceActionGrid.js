import React from 'react';
import { Linking, View, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { Text, Tile, Button, Icon,Image } from 'react-native-elements';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { colors } from '../theme';
import { Title, Heading } from './UI';
import { baseURL } from '../config';
import { aspectRatio, openLink } from '../helpers';
import { withNavigation } from 'react-navigation';

const BtnCard = props => {
   return (
      <TouchableOpacity onPress={props.onPress} style={{alignItems: 'center'}}>
         <Image source={props.image}
               PlaceholderContent={<ActivityIndicator />}
               style={{...aspectRatio(45, '1:1'), borderRadius: 10000, justifyContent: 'center',  alignSelf: 'center', marginBottom: 5}} />
         <Text style={{textAlign: 'center', color: '#fff', fontSize: 10, }}>
            {props.label}
         </Text>
      </TouchableOpacity>
   )
}
const HomeServiceActionGrid = props => {
   const [isExpanded, setIsExpanded] = React.useState(false)
   return (
      <View style={{backgroundColor: colors.secondary, paddingVertical: 10, }}>
         <Heading style={{textAlign: 'center', color: '#fff'}}>Recharge & Bill Payments</Heading>
         <Grid>
            <Row style={styles.row}>
               <Col style={styles.col}>
                  <BtnCard label="Prepaid"
                     onPress={() => props.navigation.navigate('MobileRecharge')}
                     image={require('../../assets/images/stp-service-mobile-recharge.png')} />
               </Col>
               <Col style={styles.col}>
                  <BtnCard label="DTH"
                     onPress={() => props.navigation.navigate('DTHBillPayment')}
                     image={require('../../assets/images/stp-service-dth.png')} />
               </Col>
               <Col style={styles.col}>
                  <BtnCard label="Electricity"
                     onPress={() => props.navigation.navigate('ElectricityBillPayment')}
                     image={require('../../assets/images/stp-service-electricity.png')} />
               </Col>
               <Col style={styles.col}>
                  <BtnCard label="Broadband"
                     onPress={() => props.navigation.navigate('BroadbandPayment')}
                     image={require('../../assets/images/stp-service-broadband.png')} />
               </Col>
            </Row>
            <Row style={styles.row}>
               <Col style={styles.col}>
                  <BtnCard label="FASTag"
                     onPress={() => props.navigation.navigate('FastagPayment')}
                     image={require('../../assets/images/service-fastag-icon.png')} />
               </Col>
               <Col style={styles.col}>
                  <BtnCard label="Wallet Topup"
                     onPress={() => props.navigation.navigate('WalletTopup')}
                     image={require('../../assets/images/stp-service-wallet.png')} />
               </Col>
               <Col style={styles.col}>
                  <BtnCard label="Money Transfer"
                     onPress={() => props.navigation.navigate('ScanAndPay')}
                     image={require('../../assets/images/stp-service-money-transfer.png')} />
               </Col>
               <Col style={styles.col}>
                  <BtnCard label="More"
                     onPress={() => setIsExpanded(!isExpanded)}
                     image={require('../../assets/images/more_icon.png')} />
               </Col>
            </Row>
            {isExpanded ? (
               <>
                  <Row style={styles.row}>
                     <Col style={styles.col}>
                        <BtnCard label="Hotel Booking"
                           onPress={() => props.navigation.navigate('HotelBooking')}
                           image={require('../../assets/images/hotel_booking.png')} />
                     </Col>
                     <Col style={styles.col}>
                        <BtnCard label="Flight Booking"
                           onPress={() => props.navigation.navigate('FlightBooking')}
                           image={require('../../assets/images/flight_booking_icon.png')} />
                     </Col>
                     <Col style={styles.col}>
                        <BtnCard label="Bus Booking"
                           onPress={() => props.navigation.navigate('BusBooking')}
                           image={require('../../assets/images/bus_booking_icon.png')} />
                     </Col>
                     <Col style={styles.col}>
                        <BtnCard label="Refer a Friend"
                           onPress={() => props.navigation.navigate('ShareApp')}
                           image={require('../../assets/images/stp-invite-friends.png')} />
                     </Col>
                  </Row>
                  <Row style={styles.row}>
                     <Col style={styles.col}>
                        <BtnCard label="Insurance"
                           onPress={() => props.navigation.navigate('Insurance')}
                           image={require('../../assets/images/insurance_icon.png')} />
                     </Col>
                     <Col style={styles.col}>
                        <BtnCard label="Property Tax"
                           onPress={() => props.navigation.navigate('PropertyTax')}
                           image={require('../../assets/images/property_tax_icon.png')} />
                     </Col>
                     <Col style={styles.col}>
                        <BtnCard label="Water bill"
                           onPress={() => props.navigation.navigate('WaterBill')}
                           image={require('../../assets/images/water_bill_icon.png')} />
                     </Col>
                     <Col style={styles.col}>
                        <BtnCard label="ST Patil Store"
                           onPress={() => openLink('https://www.stpatil.com/st-patil-shop/')}
                           image={require('../../assets/images/shopping-icon.png')} />
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                        {/* <Toucha */}
                     </Col>
                  </Row>
               </>
            ): null}

         </Grid>
      </View>
   )
}
export default withNavigation(HomeServiceActionGrid)
const styles = {
   col: {
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
   },
   row: {
      paddingVertical: 0,
   },
}
