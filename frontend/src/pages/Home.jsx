import React, { useContext } from 'react'
import { Context } from '../context/Context'

export default function Home() {
  const { displayText, body } = useContext(Context)
  return (
    <>
      {
        displayText ?
          <div></div>
          :
          <div>
            <p>Welcome page!</p>
          </div>
      }
    </>
  )
}
