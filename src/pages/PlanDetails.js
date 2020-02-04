import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import WebView from 'react-native-webview';
import { Loader, Title, Container } from '../components/UI';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ListItem, Button, Text } from 'react-native-elements';
import { operatorPlans } from '../functions/operators';
import { connect } from 'react-redux';
import { SELECTED_OPERATOR } from '../store/reducers/operatorsReducers';
import { groupBy, map, uniqBy, filter } from 'lodash'
import { colors } from '../theme';

function PlanDetails(props) {
   // let allPlans = []
   const [ready, setReady] = useState(false)
   const [allPlans, setAllPlans] = useState([])
   const [plans, setPlans] = useState(null)
   const [planGroup, setPlanGroup] = useState('All')
   const [sortedPlans, setSortedPlans] = useState(null)
   const [returnPageNav, setReturnPageNav] = useState('MobileRecharge')
   useEffect(() => {
      const operatorId = props.navigation.getParam('operator')
      setReturnPageNav(props.navigation.getParam('returnPage', 'MobileRecharge'))
      operatorPlans(operatorId).then(data => {
         setAllPlans(data)
         let _plansGroup = uniqBy(data, 'Type')
         _plansGroup = [
            { Type: 'All',  },
            ..._plansGroup
         ]
         setSortedPlans(_plansGroup)
         setPlans(data)
      }).catch(error => {
         alert(error.message)
      }).finally(() => {
         setReady(true)
      })
      return () => {
         // cleanup function
      }
   })
   const selectAndGoBack = planObj => {
      props.chooseOperator(planObj)
      props.navigation.goBack()
   }
   useEffect(() => {
      let _sorted = filter(allPlans, {
         Type: planGroup
      })
      console.log('sorting with: '+planGroup, _sorted)
      setPlans(_sorted)
      return () => {
         // cleanup function
      }
   }, [planGroup])
   if(!ready) {
      return <Loader />
   }

   return (
      <React.Fragment>
         <ScrollView>
            <Container>
               <ScrollView horizontal={true} style={{ overflow: 'scroll',  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                     {sortedPlans && sortedPlans.map((item, key) => {
                        let activeClass = {
                           borderBottomWidth: 2,
                           borderBottomColor: '#fff'
                        }
                        let activeLabelStyle = {
                           color: '#ccc',
                        }
                        if(item.Type == planGroup) {
                           activeClass = {
                              ...activeClass,
                              borderBottomColor: colors.primary
                           }
                           activeLabelStyle = {}
                        }
                        return (
                           <View key={key} style={activeClass}>
                              <Button title={item.Type} titleStyle={{ ...activeLabelStyle }}  small={true} type="clear" onPress={() => setPlanGroup(item.Type)}  />
                           </View>
                        )
                     })}
                  </View>
               </ScrollView>
               <View>
                  <Text style={{ color: '#777', fontSize: 13, marginTop: 6, }}>
                     Note - While we support most recharges, we request you to verify with your operator once before proceeding any recharge with these plans.
                  </Text>
               </View>
               {plans && plans.length ? plans.map((item, keyIndex) => {
                  return (
                  <ListItem
                     key={keyIndex}
                     title={item.Type +' - '+ item.Amount}
                     subtitle={(
                        <View>
                           <Text>Talktime: {item.Talktime} </Text>
                           <Text>Validity: {item.Validity}</Text>
                        </View>
                     )}
                     rightElement={<Button title={'Choose'} onPress={() => selectAndGoBack(item)} />}
                        />
                  )
               }): (
                  <Container>
                     <Loader />
                  </Container>
               )}
            </Container>
         </ScrollView>
      </React.Fragment>
   )
}
PlanDetails.navigationOptions = {
   headerTitle: <Title>Plans</Title>
}
const mapStateToProps = ({operators}) => ({
   operators,
})
const mapActionsToProps = (dispatch) => ({
   chooseOperator: (operator) => dispatch({ type: SELECTED_OPERATOR, payload: operator })
})

export default connect(
   mapStateToProps,
   mapActionsToProps
)(PlanDetails)
