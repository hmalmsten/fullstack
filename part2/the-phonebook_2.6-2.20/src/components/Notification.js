const Notification = ({ message, err }) => {
    if (message === null) {
      return null
    }

    if (err)
    return (
      <div className='error'>
        {message}
      </div>
    )
    else 
    return (
      <div className='success'>
        {message}
      </div>
    )
  }

  export default Notification