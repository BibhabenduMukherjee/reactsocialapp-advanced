import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import {store} from "../../store"
//mport PostsUserWise from './PostsUserWise'
import { Link ,useParams} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { useDispatch } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../../env'



const showSuccessToast = (msg) => {
  toast.success(msg || `Added Successfully!`, {
    position: "top-right",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    
  });
};

function ProfileView() {

  // const current = store.getState().UserUpdateDetails;
   //console.log(current)
    const logged_user = JSON.parse(localStorage.getItem("user"))
    const logged_user_records = JSON.parse(localStorage.getItem("userrecords"))
    const [isCurrentUser , setIsCurrentUser] = useState(false)
    const [userDetails , setUserDetails] = useState({})
    const [preview , setPreviewImage] = useState("")
    const [loading , setLoading] = useState(false)
    const [upimg , setUpImg] = useState(true)
    const [updateUserInfo , setUpdateUserInfo] = useState({
      user_name : logged_user.user_name,
      job : logged_user.job,
      education : logged_user.education,
      location : logged_user.location,
      image : ""
    })
    //console.log(updateUserInfo)
    const [userPst , setUserPst] = useState([])
    const dispatch = useDispatch()
    const params =  useParams();
    const requested_id = params.id;
    //console.log(requested_id)


    async function updateProfileUser(){
      let imgRef;
      if(updateUserInfo.image !== ""){
        const formData = new FormData();
        formData.append('file' ,updateUserInfo.image )
        const {data} = await axios.post(`${BASE_URL}/uploadfile` , formData)
        debugger;
        imgRef = data.fileName

      }
      const imageUrl = imgRef ? imgRef : logged_user.profileImg
      const requested_update_data= {
        user_name : updateUserInfo.user_name,
        profileImg :  imgRef ? `${BASE_URL}/files/${imageUrl}` : `${imageUrl}`,
        job : updateUserInfo.job,
        education : updateUserInfo.education,
        location : updateUserInfo.location
      }
     // console.log(requested_update_data)
     //debugger;
      const update_server_user = await axios.put(`${BASE_URL}/updateuserinfo/${logged_user._id}`, {requested_update_data})

      debugger
      // if(imgRef){

      // }

      localStorage.setItem("user" , JSON.stringify(update_server_user.data))
      console.log(JSON.parse(localStorage.getItem("user")))
      showSuccessToast("Profile Updated")
      setTimeout(()=>{
        location.reload()
       
      },1100)
      
      
      //debugger

    }

   // console.log(logged_user)
    //console.log(logged_user_records)
    //console.log(updateUserInfo)
  //console.log(store.getState().UserUpdateDetails)
  

    useEffect(()=>{
      if(logged_user._id === requested_id){

        async function callMat(){
          const response_posts = await axios.post(`${BASE_URL}/finduserposts` ,  {postId : logged_user.posts}  )
          setUserPst(response_posts.data)
        }
       
        console.log("matched")
        setIsCurrentUser(true);
        callMat();
      }else{

        async function userFetch ()
        {
          try{
            const {data} = await axios.get(`${BASE_URL}/specificuser/${requested_id}`)
            const userUpdatedw = store.getState().UserUpdateDetails;
       // console.log(userUpdatedw)
         //  ebugger

            dispatch({type : "SETUSERBASICDETAILS" , payload :{
              user_id : data[0]._id,
              user_name : data[0].user_name,
                followers :data[0].followers?.length,
                following : data[0].following?.length,
                posts_count: data[0].posts.length,
                posts : data[0].posts,
                location : data[0].location,
                education : data[0].education,
                user_join : data[0].user_join,
                job : data[0].job,
                profileImg : data[0].profileImg
            }})

            const userUpdated = store.getState().UserUpdateDetails;
            setLoading(true)
         //   const requested_User = await axios.get(`${BASE_URL}/specificuser/`)
            const response_posts = await axios.post(`${BASE_URL}/finduserposts` ,  {postId : userUpdated.posts}  )
            debugger
            setUserPst(response_posts.data)
            setLoading(false)
            //debugger;
            //console.log(userUpdated)
            setUserDetails(userUpdated)
            
           
          }catch(err){
            console.log(err)
          }

        }
        userFetch();
        
      }
    },[])

  return (
    <div>
     <Navbar/>
     <ToastContainer
        position="top-right"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
     
{/* <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css">
<link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"> */}

<main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')"
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-gray-300">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={ isCurrentUser ?  logged_user.profileImg  : store.getState().UserUpdateDetails.profileImg}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                        style={{ maxWidth: "150px" }}
                      />
                    </div>
                  </div>
                  <div className="w-full mt-[52px] lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-7 sm:mt-0">

                    {
                      isCurrentUser ? <>
                      <label htmlFor="my-modal-5" className="btn"> Update Profile</label>
                       
                      
                      </> : <>
                      <label htmlFor="my-modal-5" className="btn">Follow</label>
                      
                      
                      </>
                    }
                      
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">

                       {/* followers */}
                      <div className="mr-4 p-3 text-center">

                        {
                          isCurrentUser ? <>
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          {logged_user_records ? logged_user_records.followers : logged_user.followers.length}
                        </span>
                        <span className="text-sm text-gray-500">followers</span>
                          </> : <>
                          {/* userDetails */}
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          {userDetails.followers}
                         
                        </span>
                        <span className="text-sm text-gray-500">followers</span>
                          </>
                        }

                        
                      </div>


                      {/* followings */}
                      <div className="mr-4 p-3 text-center">
                      {
                          isCurrentUser ? <>
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          {logged_user_records ? logged_user_records.following :logged_user.following.length}
                        </span>
                        <span className="text-sm text-gray-500">followings</span>
                          </> : <>
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          {userDetails.followers}
                        </span>
                        <span className="text-sm text-gray-500">followings</span>
                          </>
                        }
                      </div>


                      {/* posts */}

                      <div className="lg:mr-4 p-3 text-center">
                      {
                          isCurrentUser ? <>
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          {logged_user_records ? logged_user_records.posts_count : logged_user.posts.length}
                        </span>
                        <span className="text-sm text-gray-500">posts</span>
                          </> : <>
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          {userDetails.posts_count}
                        </span>
                        <span className="text-sm text-gray-500">posts</span>
                          </>
                        }
                        
                      </div>
                    </div>
                  </div>
                </div>

                {/* username */}
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal  text-gray-800 mb-2">
                  {
                          isCurrentUser ? <>
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          {logged_user.user_name}
                        </span>
                      
                          </> : <>
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          {userDetails.user_name}
                        </span>
                          </>
                        }
                  </h3>

                  {/* location */}

                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                    {
                          isCurrentUser ? <>
                          <span className="text-xl font-bold block uppercase tracking-wide text-gray-400">
                          {logged_user.location}
                          {/* demo location */}
                        </span>
                       
                          </> : <>
                          <span className='className="text-xl font-bold block uppercase tracking-wide text-gray-700"'>
                           {userDetails.location}
                          </span>
                             
                          </>
                        }
                  </div>

                  {/* user description */}

                  <div className="mb-2 text-gray-700 mt-10">


                       {isCurrentUser ? <>
                        <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                        <>{logged_user.job}</>
                       </> : <>
                       <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                       {userDetails.job}
                       </>}

                    
                   
                  </div>

                  <div className="mb-2 text-gray-700">
                 
                    {isCurrentUser ? <>
                      <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                        <>{logged_user.education}</>
                       </> : <>
                       <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                       {userDetails.education}
                       </>}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                 
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* {isCurrentUser ? <PostsUserWise posts ={logged_user_records ? logged_user_records.posts : logged_user.posts}/> : <PostsUserWise posts={userDetails.posts}/>} */}
      

      {
        !loading ? <>
         { userPst.length > 0 && userPst.map((p)=>(
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
        </> : "loading"
      }
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
<div className="modal">
  <div className="modal-box w-11/12 max-w-4xl absolute top-[70px]">
  <div className='max-w-4xl md:mx-[200px]'>
  <h3 className="font-bold text-lg m-2">Select profile picture</h3>
    <input onChange={(e)=>{
      setUpdateUserInfo({...updateUserInfo , image :e.target.files[0] })
      setPreviewImage(URL.createObjectURL(e.target.files[0]))
      setUpImg(true)
    }} type="file" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
    {upimg && <div className='max-w-[327px] p-2'>
      <img src={preview}/>
    </div>}
    <h3  className="font-bold text-lg m-2">Name</h3>
    <input onChange={(e)=>{setUpdateUserInfo({...updateUserInfo , user_name:e.target.value})}} value={updateUserInfo.user_name} type="text" placeholder= "Type here" className="input input-bordered input-info w-full max-w-xs" />
    <h3 className="font-bold text-lg m-2">Education</h3>
    <input value={updateUserInfo.education}  onChange={(e)=>{setUpdateUserInfo({...updateUserInfo , education:e.target.value})}}  type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
    <h3 className="font-bold text-lg m-2">Current Job</h3>
    <input  value={updateUserInfo.job}  onChange={(e)=>{setUpdateUserInfo({...updateUserInfo , job:e.target.value})}} type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
    <h3 className="font-bold text-lg m-2">Location</h3>
    <input  value={updateUserInfo.location} onChange={(e)=>{setUpdateUserInfo({...updateUserInfo , location:e.target.value})}} type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
  </div>
   
    <div className="modal-action">
      <button className='btn p-2 text-green-400 cursor-pointer hover:text-green-300 ' onClick={updateProfileUser}>Update</button>
      <label htmlFor="my-modal-5" className="btn">Yay!</label>
    </div>
  </div>
</div>
        
    </div>
  )
}

export default ProfileView