import React, { useEffect, useState } from 'react'
import {store} from "../../store"
import { BASE_URL } from '../../env'
import axios from 'axios'
function PostsUserWise({posts}) {
  const [userpost , setUserPost] = useState([])
  const [loading , setLoading] = useState(false)
   const state  = store.getState().UserUpdateDetails.posts
   console.log(state)
  // const data = state.posts
   
  
    useEffect(()=>{
      async function fetchPost(){
         setLoading(true)
        const response = await axios.post(`${BASE_URL}/finduserposts` ,  {postId : state}  )
        //debugger;
       // console.log(response)
        setUserPost(response.data)
        setLoading(false)
      }
      fetchPost();
    },[])

  return (
    <div>
  
  <section className='max-w-7xl mx-auto mt-1'>
   <div>

           {loading ? <>Loading</> : <div>
           {
            userpost.length > 0 ?  <div className='mt-10'>
              {userpost.map((p)=>(
                <div key={p._id} className= ' my-14 border shadow-md max-w-3xl mx-auto p-2 mt-2 flex flex-col'>
                  <p className='p-2 text-white font-medium'>{new Date(p.created_at).toLocaleDateString('IN',{
                    day : 'numeric',
                    month : 'long',
                    year : 'numeric'
                  })}</p>
                  {p.image !== "" ? <div>
                    <img src={p.image} alt='post_image' className=' object-contain p-1 mb-2'/>
                  </div>: <></>}
                   <div className=''>
                   <p className='text-md'>{p.description}</p>
                   </div>
                 
                </div>
              ))}
            </div> : "no post"
          }
           </div>}
         
   </div>
  </section>
    
    </div>
  )
}

export default PostsUserWise