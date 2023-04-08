import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate , Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import axios from "axios";
import { BASE_URL } from "../../env";


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


const LoginContact = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    
    user_email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  

  const handleSubmit = async(e) => {
    e.preventDefault();
   
   //console.log(form)

   const requested_payload = form
   setLoading(true);
   try{
     const {data} = await axios.post(`${BASE_URL}/login` , requested_payload);
     localStorage.setItem("token", data.result.token);
     localStorage.setItem('user', JSON.stringify(data.result.user));
     //console.log()
     console.log(JSON.parse(localStorage.getItem("user")))
     debugger;


     setForm({user_name : "" , user_email : "" , password : "" , con_p : ""})
     setLoading(false);

     navigate("/postfeed")
   }catch(err){
     const {response} = err
     debugger;
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
        <p className={`${styles.sectionSubText} mt-[20px] animate-pulse`}>Join The Community</p>
        <h3 className={styles.sectionHeadText}>Log <span className="text-red-500">In</span></h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-[110px] flex flex-col gap-8 h-[400px]'
        >
         
          <label className='flex flex-col'>
            <span className='text-green-500 font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='user_email'
              value={form.user_email}
              onChange={(e)=>{setForm({...form , user_email : e.target.value})}}
              placeholder="What's your web address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          
          <label className='flex flex-col'>
            <span className='text-green-500 font-medium mb-4'>Your Password</span>
            <input
              type='pasword'
              name='password'
              value={form.password}
              onChange={(e)=> setForm({...form , password : e.target.value})}
              placeholder="What's your web address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          
         
        <div>
            <span className="pl-2">Create Account-- </span> <Link className="text-red-500" to ={"/"}>Sign Up</Link>
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

export default SectionWrapper(LoginContact, "contact");
