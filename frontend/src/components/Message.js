import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant = 'info',isDismissible=true, children }) => {
  const [show, setShow] = useState(true)

  const renderAlert = () =>{
    if (show) { 
      if(isDismissible){
        return (<Alert variant={variant} onClose={() => setShow(false)} dismissible>
        {children}
      </Alert>)
      }else{
        return (<Alert variant={variant} onClose={() => setShow(false)} >
        {children}
      </Alert>)
      }

      }
  }

  return <>{renderAlert()}</>
}

export default Message
