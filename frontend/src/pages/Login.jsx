import React from 'react'
import { useState, useEffect } from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'


function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user, isLoading, isSuccess, message, isError} = useSelector(state => state.auth)

    const {email, password} = formData

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        //redirect when logged in
        if(isSuccess || user) {
            navigate('/')
        }
        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }
        dispatch(login(userData))
      
    }

    if(isLoading) {
        return <Spinner />
    }


  return (
    <>
        <section className="heading">
            <h1>
                <FaSignInAlt /> Login
            </h1>
            <p>Please login to get support</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="email" className="form-control" id='email' value={email} onChange={onChange} placeholder='Enter your email' name={email} required/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id='password' value={password} onChange={onChange} placeholder='Enter your password' name={password} required/>
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type='submit'>Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login
