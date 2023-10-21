import React, { useState } from 'react'
import useLoginhook from '../../helpers/useloginHook'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const { loginHook } = useLoginhook()
  const navigate = useNavigate();
const [loginCred , setloginCred] = useState({email:'' , password:''});

  const handleSubmit = async (event) => {
    // Prevent page reload
    event.preventDefault();
    const user =  await loginHook(loginCred.email , loginCred.password)
    if(user?.message == 'Welcome Back') {
      navigate('/adminpanel')
    }
    
  };
  const handleInput = (e) =>{
  setloginCred({...loginCred , [e.target.name] : e.target.value })
}
const renderForm = (
   <div className="w-full " onSubmit={handleSubmit}>
     <form className=''>
       <div className="flex flex-col gap-2 m-3   ">
         <label>Email </label>
         <input type="email" name="email" className='w-full p-3 h-10 border ' onChange={(e) => handleInput(e)} required />
       </div>
       <div className="flex flex-col gap-2 m-3">
         <label>Password </label>
         <input type="password" name="password" className='p-3 w-full  h-10 border '  onChange={(e) => handleInput(e)} required />
       </div>
       <div className="flex justify-center ">
         <input type="submit" className='mt-2 cursor-pointer text-lg bg-blue-500 border border-slate-400 text-white px-3 py-3 w-1/2    '  />
       </div>
     </form>
   </div>
   )
return (
    <div className="flex items-center justify-center flex-col gap-5 h-screen w-screen bg-slate-400 ">
      <div className="bg-white p-8 shadow-md w-1/3">
        <div className="text-2xl mb-8 ">Sign In</div>
        {renderForm}
      </div>
    </div>
  )
}

export default Login