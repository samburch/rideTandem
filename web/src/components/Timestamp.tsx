const Timestamp = () => {

  const date: Date = new Date();
  const day: String = date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'short'
  })
  const time: String = date.toLocaleString('en-GB', { 
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  return (
    <div>
        <small>Last updated: {`${day} at ${time}`}</small>
    </div>
  )
}

export default Timestamp;
