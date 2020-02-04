import React, { useEffect } from 'react';
import Page from '../components/Page';
import { connect } from 'react-redux';

function Home(props) {
   const { storeCategories } = props
   const { hero_carousel, vendor_carousel, } = props.resources
   const heroCarousels = hero_carousel
   const vendorCarousels = vendor_carousel

   return (
      <Page title={'Home page'}>

      </Page>
   );
}

const mapStateToProps = ({ user, resources, products }) => ({
   user,
   resources,
   storeCategories: products ? products.categories: [],
})
const mapActionsToProps = (dispatch) => ({
   loadCategories: () => {

   },
})

export default connect(
   mapStateToProps,
   mapActionsToProps
)(React.memo(Home))

