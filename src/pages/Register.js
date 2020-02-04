import React from 'react';
// import SignUpForm from '../components/SignUpForm';
import { connect } from 'react-redux';
import Page from '../components/Page';

function Register(props) {
   return (
      <Page>
         {/* <SignUpForm /> */}
      </Page>
   )
}

const mapStateToProps = ({ user }) => ({
   user
})
export default React.memo(
   connect(
      mapStateToProps
   )(Register)
)
