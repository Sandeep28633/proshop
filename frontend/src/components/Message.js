import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant = 'info', children }) => {
  const [show, setShow] = useState(true)

  const renderAlert = () =>{
    if (show) {
        return (<Alert variant={variant} onClose={() => setShow(false)} dismissible>
        {children}
      </Alert>)
      }
  }

  return <>{renderAlert()}</>
}

export default Message
