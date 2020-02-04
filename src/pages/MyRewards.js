import React from 'react';
import { ScrollView, AsyncStorage, View, ActivityIndicator, Linking, ToastAndroid } from 'react-native';
import { Loader, Container, Heading, Title } from '../components/UI';
import { Avatar, ListItem, Button, Text, Card } from 'react-native-elements';
import { baseURL, http } from '../config';
import { buttons } from '../style';
import { session } from '../helpers';
import ScratchCard from '../components/ScratchCard';
import { connect } from 'react-redux';
function getMyRewards(user) {
   return new Promise(async (resolve, reject) => {
      try {
         let { data } = await http.post('/wp-json/app/my_rewards', {
            uid: user.id
         })
         if(data && data.ok) {
            resolve(data.data)
         }
      } catch (error) {
         reject(error)
      }
   })
}
const MyRewards = React.memo(props => {
   const [ready, setReady] = React.useState(false)
   const [rewards, setRewards] = React.useState(null)
   const [reward, setReward] = React.useState(null)
   if (!ready) {
      return <Loader />
   }
   React.useEffect(() => {
      getMyRewards(props.user).then(setRewards)
      return () => {

      }
   }, [props.user])

   return (
      <ScrollView>
         <Container style={{ paddingTop: 15, }}>
            {reward ? (
               <View>
                  <ScratchCard data={reward} />
               </View>
            ) : null}
            {rewards ? (
               <View>
                  {rewards.map(item => (
                     <ListItem
                        bottomDivider
                        title={price(item.amount)}
                        rightSubtitle={item.date}
                        subtitle={item.details}></ListItem>
                  ))}
               </View>
            ) : null}

         </Container>
      </ScrollView>
   );
})

MyRewards.navigationOptions = {
   headerTitle: <Title>My Rewards</Title>,
   headerStyle: {
      shadowOpacity: 0,
      elevation: 0,
   },
}
const mapStateToProps = ({ user }) => ({
   user
})
export default connect(
   mapStateToProps
)(MyRewards)