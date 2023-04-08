import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate , Link} from "react-router-dom";
import {BASE_URL} from "../../env"
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const showSuccessToast = (msg) => {
  toast.success(msg || `Added Successfully!`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    
  });
};


const showErrorToast = (msg) => {
  toast.error(msg || `Added Successfully!`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    
  });
};



const Contact = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    password: "",
    con_p : ""
  });

  const [loading, setLoading] = useState(false);
  const [ma , setMa] = useState(false)

  function checkMatch(a,b){
   if(a !== b){
      setMa(true)
    }else{
      setMa(false)
    }
  }

  const handleSubmit = async(e) => {

    e.preventDefault();
    console.log(form)

    const requested_payload = form
    setLoading(true);
    try{
      const {data} = await axios.post(`${BASE_URL}/register` , requested_payload);
      showSuccessToast("User Registerd")
      setForm({user_name : "" , user_email : "" , password : "" , con_p : ""})
      setLoading(false);
    }catch(err){
      const {response} = err
      console.log(response)
      showErrorToast(response.data.error)
      setLoading(false);

    }
    
   
   
   

    
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
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
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={`${styles.sectionSubText} animate-pulse`}>Join The Community</p>
        <h3 className={styles.sectionHeadText}>Sign <span className="text-red-500">Up</span></h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-green-500 font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.user_name}
              autoComplete="off"
              onChange={(e)=>{setForm({...form , user_name : e.target.value })}}
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-green-500 font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              autoComplete="off"
              value={form.user_email}
              onChange={(e)=>{
                setForm({...form , user_email : e.target.value})
               
                }}
              placeholder="What's your web address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-green-500 font-medium mb-4'>Your Password</span>
            <input
              type='text'
              name='password'
              autoComplete="off"
              value={form.password}
              onChange={(e)=>setForm({...form , password:e.target.value})}
              placeholder="What's your web address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-green-500 font-medium mb-4'>Confirm Password
             {ma && <span className=" opacity-89 ml-5 p-1 text-pink-400 animate-pulse">Password not matched</span>}
            </span>
            <input
              type='text'
              autoComplete="off"
              name='con_p'
              value={form.con_p}
              onChange={(e) =>{setForm({...form , con_p : e.target.value})
            
              checkMatch(form.password , e.target.value)
              }}
              placeholder="What's your web address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
         
         <div>
         <span className="">Have Account already ?  </span> <Link className="text-red-500" to ={"/login"}>Log In</Link>
         </div>
        
 
          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
