import React from 'react'

const ResponseMessage = ({ messageType, responseMessage }) => {
  return (
    <div
      className={`p-4 rounded-md text-center ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
    >
      {responseMessage}
    </div>

  )
}

export default ResponseMessage;