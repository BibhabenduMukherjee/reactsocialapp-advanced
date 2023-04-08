import React, { useEffect, useRef, useState } from 'react'
import { store } from '../../store';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import {
    EmojiHappyIcon,
    PhotographIcon,
    XIcon,
  } from "@heroicons/react/outline";

  import { useDispatch } from 'react-redux';
import { logos } from '../assets';
import PostComponent from './PostComponent';
import axios from 'axios';
import { BASE_URL } from '../../env';

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
function PostSection() {
  const navigate = useNavigate()
    const logged_user = JSON.parse(localStorage.getItem("user"))
    const CONFIG_OBJ = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }
   //  console.log(logged_user)
   // const [currentUser  , setCurrentUser] = useState(true)
    const [input , setInput] = useState("")
    const [dummy , setDummy] = useState("")
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const filePickerRef = useRef(null);
    const dispatch = useDispatch()
   useEffect(()=>{
    window.scrollTo(0,0)
   } , [])
   const sendPost = async()=>{
    const stateUpdated = store.getState().postInputReducer;
    dispatch({type : "SELECTEDPOSTDATA" , payload : {
      text : input,
      image : stateUpdated.image
    }})
    
    const stateUpdatedFullPost = store.getState().postInputReducer;
    //setDummy(stateUpdated.text)
    console.log(stateUpdatedFullPost)
    debugger
    if(stateUpdatedFullPost.image === ""){
      console.log("empty");
    }
    const formData = new FormData();
    formData.append('file' ,stateUpdatedFullPost.image )
    var fileRef;
    if(stateUpdatedFullPost.image !== ""){
      const {data} = await axios.post(`${BASE_URL}/uploadfile` , formData)
      fileRef = data.fileName
    }
    // upload the image to the server storage

   const filenameup= fileRef ? `${BASE_URL}/files/${fileRef}` : ""
    const request = { description: stateUpdatedFullPost.text,image: filenameup }
   
   const postResponse = await axios.post(`${BASE_URL}/createpost`, request, CONFIG_OBJ)
   
   setInput("")
   dispatch({type : "SELECTEDPOSTDATA" , payload : {
    text : input,
    image : ""
  }})

  dispatch({type : "SETUSERBASICDETAILS" , payload : {
                user_id :  postResponse.data.user._id,
                user_name : postResponse.data.user.user_name,
                followers :postResponse.data.user.followers?.length,
                following : postResponse.data.user.following?.length,
                user_join : postResponse.data.user.user_join,
                posts_count: postResponse.data.user.posts?.length,
                location : postResponse.data.user.location,
                posts : postResponse.data.user.posts,
                education : postResponse.data.user.education,
                job : postResponse.data.user.job,
                profileImg : postResponse.data.user.profileImg
  }})
  showSuccessToast("Posted")
  setTimeout(()=>{
    location.reload()
  },1200)
   console.log(store.getState().UserUpdateDetails)
  
   //localStorage.removeItem("user")
   localStorage.setItem("userrecords",JSON.stringify(store.getState().UserUpdateDetails))
  const  local_seesion =  JSON.parse(localStorage.getItem("user"))
  local_seesion.posts = store.getState().UserUpdateDetails.posts
  localStorage.setItem("user" , JSON.stringify(local_seesion))
  console.log(JSON.parse(localStorage.getItem("user")))
  debugger;
  // console.log(localStorage.getItem("userrecords"))

  

    setSelectedFile("")
   console.log(postResponse.data)

  }

    const addImageToPost = (e) => {
      setSelectedFile(URL.createObjectURL(e.target.files[0]))
      dispatch({type : "SELECTEDPOSTDATA" , payload : {
        text : input,
        image : e.target.files[0]
      }})
    };


  return (
    <div className=" mt-[100px] m-4  w-[480px] md:w-[890px] mx-auto">
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
       {logged_user && (
        <div className="flex  border-b border-gray-200 p-3 space-x-3">
          <img
            // onClick={onSignOut}
             src={logged_user.profileImg}
            alt="user-img"
            onClick={() => navigate(`/profile/${logged_user._id}`)}
            className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
          />
          <div className="w-full divide-y divide-gray-200">
            <div className="">
              <textarea
                className="  rounded-lg w-full p-4 border-none focus:ring-0 text-lg tracking-wide min-h-[50px]"
                rows="2"
                placeholder={`Hello , "${logged_user.user_name}" share your story`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
            {selectedFile && (
              <div className="relative">
                <XIcon
                  onClick={() => setSelectedFile(null)}
                  className="border h-7 text-black absolute cursor-pointer shadow-md border-white m-1 rounded-full"
                />
                <img
                  src={selectedFile}
                  className={`${loading && "animate-pulse"}`}
                />
              </div>
            )}
            <div className="flex items-center justify-between pt-2.5">
              {!loading && (
                <>
                  <div className="flex">
                    <div
                      className=""
                      onClick={() => filePickerRef.current.click()}
                    >
                      <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>
                    <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button
                    onClick={sendPost}
                    disabled={!input.trim()}
                    className="bg-yellow-700 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-70"
                  >
                    Tweet
                  </button>
                </>
              )}

             
            </div>
            
          </div>
         
        </div>
      )}

      <PostComponent/>
    </div>
  )
}

export default PostSection