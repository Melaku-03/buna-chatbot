import React, { useContext } from 'react'
import { Context } from '../context/Context'

export default function Home() {
  const { body } = useContext(Context)
  return (
    <div>{body}</div>
  )
}
