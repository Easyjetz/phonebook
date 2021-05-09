import React from 'react';
import { IErrMesage } from './CreateNote';


type ErrorMessageProps = {
  errors: IErrMesage[]
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors }) => {


  return (
    <div className="errorMessage">
      {errors.map(err => <p key={err.id}>{err.name}</p>)}
    </div>
  )
}