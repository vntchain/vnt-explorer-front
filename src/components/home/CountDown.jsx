import React, { useState, useEffect } from 'react'
import { calcAge } from 'utils/time'

export default function CountDown(props) {
  const [time, setTime] = useState(calcAge(props.orignTime, props.language))

  useEffect(() => {
    const id = setInterval(() => {
      setTime(calcAge(props.orignTime, props.language))
    }, 1000)
    return () => clearInterval(id)
  })

  return <span>{time}</span>
}
