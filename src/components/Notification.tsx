import React from 'react';


type NotificationProps = {
  message: string[];
  success: boolean;
}

export const Notification: React.FC<NotificationProps> = ({ message, success }) => {

  if (success) {
    return (
      <div>Успешно!</div>
    )
  }

  return (
    <div className="notification">
      {message.map(err => <p>{err}</p>)}
    </div>
  )
}