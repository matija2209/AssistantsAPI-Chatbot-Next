import React from 'react'

const Message = ({message}) => (
    <div  className={`clear-both relative overflow-hidden ${message.role === 'assistant' ? 'float-left' : 'float-right'}`}>
      <div className={`rounded-lg py-3 px-4 mb-3 ${message.role === 'assistant' ? 'bg-gray-200 text-black' : 'bg-blue-500 text-white'}`}>
        <p>{JSON.stringify(message.content[0]?.text?.value)}</p>
      </div>
    </div>
  );
  

export default Message