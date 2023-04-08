import React from 'react'

import { StarsCanvas } from './canvas'
import LoginContact from './LoginContact'
function Login() {
  return (
    <div>  <div className='relative z-0'>
    <LoginContact />
    <StarsCanvas />
  </div></div>
  )
}

export default Login