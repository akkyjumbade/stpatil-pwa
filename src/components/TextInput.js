import React from 'react'


const TextInput = React.memo(props => {
   return (
      <div>
         {props.children}
      </div>
   )
})

export default TextInput
