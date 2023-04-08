import React, { useEffect , useState} from 'react'

import { posts } from '../../data'

import axios from "axios"
import {BASE_URL} from "../../env"
import { useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
function Loader (){
    return (
        <>loading</>
    )
}
function Search(){
    const [input , setInput] = useState("")
    const [searchData ,  setSearchData] = useState([])
    const [on , setOn] = useState(false)
    useEffect(()=>{
        const timeId = setTimeout(()=>{
            async function SearchUsers(){
                setSearchData([])
                if(input === "") return;
               const {data}  = await axios.get(`${BASE_URL}/searchuser?q=${input}`)
               setSearchData(data)
            }

            SearchUsers()

        },500)

        return () => clearTimeout(timeId);
    } , [input])

    const handleDebounce = (e)=>{
        
        setOn(true)
        setInput(e.target.value)
        if(e.target.value.length === 0){
            setOn(false)
            setSearchData([])
        }
    }
    return (
        <div className='flex flex-col p-4'>
            <div className='flex flex-col'>
         
            <input value={input} onChange={(e)=>{handleDebounce(e)}} type="text" placeholder="Search here" className="p-2 input input-bordered input-success w-full max-w-7xl" />
            <div className='flex flex-col max-h-[230px] overflow-y-scroll p-2 mt-2'>
                 
                { on && searchData.length>0 && <div>
                    {searchData.map((i,index)=>(
                      <p className='p-1 text-md text' key={index}>{i.user_name}</p>
                    ))}
                </div>}

               
            </div>
            </div>
            
        </div>
    )
}

function Card({post}){
    return <div className='flex flex-col mt-8'>
        <div className='flex space-x-2 items-center'>
           <img src = {post.profile_image} className='w-10 h-10 object-contain  rounded-full'/>
           <p className=' font-semibold text-white text-md'>{post.user_name}</p>
           <div className=''>
           <p className='  ml-2 text-[12px]'>{post.created_at}</p>
           </div>
           
        </div>
        <div className='flex mt-2'>
            {post.description}
        </div>

        <div className=''>
            <img src= {post.image_url} alt = "post_image"/>
        </div>
    </div>
}

function LoadDemoUser(){
    const [demouser , setDemoUser] = useState([])
    const [loading , setLoading] = useState(false)
    const dispatch = useDispatch()
   
    useEffect(()=>{
       


         async function getDemoUser(){
           try{
            setLoading(true)
            const {data} = await axios.get(`${BASE_URL}/user`)
            debugger;
            setDemoUser(data)
            setLoading(false)
            dispatch({type : "SETUSERBASICDETAILS" , payload : {
                user_id : data._id,
                user_name : data.user_name,
                followers :data.followers?.length,
                following : data.following?.length,
                user_join : data.user_join,
                posts_count: data.posts?.length,
                location : data.location,
                posts : data.posts,
                education : data.education,
                job : data.job,
                profileImg : data.profileImg
  }})
        
           }catch(err){}
         }

         getDemoUser()
     }, [])

    return (
        <div>

            {loading ? <div className='text-center '>
                  <p>Loading data...</p>
            </div> : <div>
            {demouser.length > 0 && <div className='flex flex-col items-center justify-center pl-2'>
                {demouser.map((user , index)=>(
                    <div className='flex  flex-col  w-full p-2 ' key={index}>
                    <div className='flex space-x-2 p-2  '>
                        <img src = {user.profileImg} className='h-[32px] w-[32px] rounded-full' alt='user_image' />
                        <Link to={`/profile/${user._id}`} className='  text-white'>{user.user_name}</Link>
                    </div>
                       
                    </div>
                ))}

               <div>
               <label htmlFor="my-modal-5" className="btn">Search User</label>

         {/* Put this part before </body> tag */}
              <input type="checkbox" id="my-modal-5" className="modal-toggle" />
              <div className="modal">
              <div className="modal-box h-[460px] opacity-95 absolute top-[230px] w-11/12 max-w-5xl">
               <Search/>
              <div className="modal-action">
              <button className='bg-yellow-500 text-white h-[45px]  w-[90px] rounded'>hello</button>
             <label htmlFor="my-modal-5" className="btn">Close</label>
      
      

     
    </div>
  </div>
</div>
               </div>

            </div>}
            </div>} 

          
        </div>
    )
}

function PostComponent() {

    const [post , setPosts] = useState([])
    

  return (
    <div className='flex flex-row sm:space-x-1'>
        <div className='hidden sm:flex mt-4 w-[260px] border-gray-300  h-[600px]'>
        
          <LoadDemoUser/>
       
        </div>
        <div className='  flex flex-col pl-10 pt-7 mt-4 w-full  h-auto '>
          {posts.map((p)=>(<div key={p.id} className='flex flex-col'>
               <Card post = {p}/>
          </div>))}
        </div>
    </div>
  )
}

export default PostComponent