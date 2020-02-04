import React from 'react'

const Page = React.memo(props => {
   return (
      <div>
         {props.children}
      </div>
   )
});

export default Page;
