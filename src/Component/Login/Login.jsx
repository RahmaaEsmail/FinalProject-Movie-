import axios from 'axios';
import React from 'react';
import joi from 'joi';
import { useState } from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

export default function Login(props) {
  let [user,setUser]=useState({
    email:'',
    password:''
   })
   let[error,setError]=useState();
   let[btnLoading,setBtnLoading]=useState(false);
   let [validateError,setValidateError]=useState([])
   let navigate=useNavigate();


   function goToHome()
   {
     navigate('/home')
   }


   async function submitForm(e)
   {
    e.preventDefault();
    setBtnLoading(true)
    let validateRespone=validationInput()
    if(validateRespone.error)
    {
         setValidateError(validateRespone.error.details)
    }
    else{
      let {data}=await axios.post('https://routeegypt.herokuapp.com/signin',user)
      if(data.message=='success')
      {
        localStorage.setItem('userToken',data.token)
        props.saveData();
        goToHome()
      }
      else{
        setError(data.message);
      }
    } 
    setBtnLoading(false)
   }
   

   function getInputValue(e)
   {
      setValidateError([])
      let myUser={...user};
      myUser[e.target.name]=e.target.value;
      setUser(myUser)
   }


   function validationInput(){
    const validInput=joi.object({
      email:joi.string().required().email({tlds:{allow:['com','net']}}),
      password:joi.string().required().min(5)
    })
    return validInput.validate(user,{abortEarly:false})
   }


    function getError(key)
    {
      for(const error of validateError)
      {
        if(error.context.key == key)
        {
          return error.message;
        }
       
      }
      return '';
    }
  return (
    <>
    <div className='w-75 m-auto py-4'>
     <h1>Login Form</h1>
       {error? <div className='alert alert-danger'>{error}</div> :''}
     <form onSubmit={submitForm}>

        <div className="input-gp my-3">
          <label htmlFor="email">Email:</label>
          <input onChange={getInputValue} type="email" name='email' className='form-control'/>
          {getError('email')?<div className='text-danger mt-3'>{getError('email')}</div>:''}
        </div>

        <div className="input-gp my-3">
          <label htmlFor="password">Password:</label>
          <input onChange={getInputValue} type="password" name='password' className='form-control'/>
          {getError('password')?<div className='text-danger mt-3'>{getError('password')}</div>:''}
        </div>


        <button className='btn btn-info rounded-3 my-3 text-white float-end'>{btnLoading?<span className='text-white'>Waiting <i className='fa fa-spinner fa-spin'></i></span>:'Register'}</button>
        <div className="clearfix"></div>
     </form>
   </div>
    </>
  )
}
