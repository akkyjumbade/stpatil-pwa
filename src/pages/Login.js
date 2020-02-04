import React from 'react';
import SignInForm from '../components/SignInForm';
import { connect } from 'react-redux';
import Page from '../components/Page';

const Login = React.memo(props => {
   const [loggedin, setLoggedin] = React.useState(props.user)

   React.useEffect(() => {
      if(props.user) {
         setLoggedin(props.user)
      }
   }, [props.user])

   return (
      <Page>
         login
      </Page>
   )
})
const mapStateToProps = ({ user }) => ({
   user
})
export default connect(
   mapStateToProps
)(Login)
