import React, { useState } from 'react'
import { Box, Button, styled, TextField } from '@mui/material'
import { toast } from 'react-hot-toast'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authAction } from '../redux/store'


const Login = () => {
    const [users, setUser] = useState({ email: "", password: "" })
    const handleChange = (e) => setUser({ ...users, [e.target.name]: e.target.value })
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginUser = async (e) => {
        try {
            const { data } = await axios.post("http://localhost:8000/login", users)
            if (data.success) {
                dispatch(authAction.login())
                localStorage.setItem('userId', data?.User._id)
                toast.success("Login succesfully ")
                navigate('/')
            }
            setUser({ userName: "", email: "", password: "" })
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <form>
                <Wraper>
                    <TextField
                        variant="standard"
                        name='email'
                        type={'email'}
                        value={users.email}
                        onChange={e => handleChange(e)}
                        label="Enter Email"
                        required
                    />
                    <TextField
                        variant="standard"
                        name='password'
                        type={'password'}
                        value={users.password}
                        onChange={e => handleChange(e)}
                        label="Enter Password"
                        required
                    />
                    <LoginBtn variant='contained' onClick={() => loginUser()}>Login</LoginBtn>
                    <LoginBtn variant='contained' style={{ fontSize: '12px' }} onClick={() => navigate("/register")}>Not a user Register now </LoginBtn>
                </Wraper>
            </form>
        </div>
    )
}

export default Login
const Wraper = styled(Box)`
    display: flex;
    width: 50%;
    margin: auto;
    flex-direction: column;
    padding: 25px 35px;
    flex: 1;
    & > div ,& > button ,& >p{
        margin-top: 20px;
    }

`

const LoginBtn = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    backgroundcolor: '#2a3239',
    color: '#fff',
    height: '48px',
    borderRadius: '2px',
    [theme.breakpoints.down('md')]: {
        fontSize: "15px"
    }
}
))
