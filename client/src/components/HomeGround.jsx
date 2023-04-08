import React, { useEffect } from 'react'
import Navbar from './Navbar'
import PostSection from './PostSection'
import { useNavigate } from 'react-router-dom'
import "./HomeGround.css"
function HomeGround() {
  const navigate = useNavigate()
  const user = (JSON.parse(localStorage.getItem("user")))



useEffect(()=>{
  if(!user){
    navigate("/")
    return
  }
} , [])
  return (
   
    <div className='flex flex-col'>
   
      <Navbar/>
      <PostSection/>
  
 
    </div>
    
  
  )
}

export default HomeGround