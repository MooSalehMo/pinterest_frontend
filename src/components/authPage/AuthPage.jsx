import { useState } from 'react'
import Image from '../Image/Image'
import './AuthPage.css'
import apiRequest from '../../utils/apiRequest'
import {useNavigate} from "react-router"
import useAuthStore from '../../utils/authStore'

const AuthPage = () => {
  
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const {setcurrentUser} = useAuthStore()

  const handleSubmit = async e => {

    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    try {
      const res = await apiRequest.post(`/users/auth/${isRegister ? "register": "login"}`, data);
      setcurrentUser(res.data)
      navigate('/')
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <div className='Auth-page'>
      <div className="container">
        <Image className='logo' path={"/pinterest/logo/logo.jpeg"} w={50} h={50} alt={"logo"}/>
        <h2 className='header'> { isRegister ? "Join to our platform " : "Login to your account" } </h2>
        {
        isRegister ? 
        <>
          <form key="register" onSubmit={handleSubmit} className="form">
            <input type="text" name='name' className='name' id="name" placeholder='Type your name'/>
            <input type="text" required name='username' className='username' id="username" placeholder='Type your username'/>
            <input type="text" required name='email' className='email' id="email" placeholder='Type your E-mail'/>
            <input type="text" required name='password' className='password' id="password" placeholder='Create your password '/>
            <button className='btn btn-user' type='submit'>Register</button>
          </form>
          <p className='login-regis' onClick={() => setIsRegister(false)}>
            Do you have an account? <b>Login</b>
          </p>
          {error && <p className='error'>{error}</p>}
        </>
        : 
        <>
          <form onSubmit={handleSubmit} key="login" className="form">
            <input type="text" required name='email' className='email' id="email" placeholder='Type your E-mail here to loging '/>
            <input type="text" required name='password' className='password' id="password" placeholder='Type your password here to loging '/>
            <button className='btn btn-user' type='submit'>Login</button>
          </form>
          <p className='login-regis' onClick={() => setIsRegister(true)}>
            Don&apos;t have an account? <b>Register</b>
          </p>
          {error && <p className='error'>{error}</p>}
        </>
        }
      </div>
    </div>
  )
}

export default AuthPage