import React from 'react';


type ErrorMessageProps = {
  message: string[];
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {


  return (
    <div className="errorMessage">
      {message.map(err => <p>{err}</p>)}
    </div>
  )
}