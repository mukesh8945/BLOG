import { Box, Button, styled, TextField } from '@mui/material'
import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';


const Register = () => {
    const navigate = useNavigate();
    const [users, setUser] = useState({
        userName: "", email: "", password: ""
    })

    const handleChange = (e) => setUser({ ...users, [e.target.name]: e.target.value })

    const signUpUser = async (e) => {
        // e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:8000/register", users)
            if (data.success) {
                toast.success("Registerd succesfully ")
            }
            navigate('/login')
            setUser({ userName: "", email: "", password: "" })
        } catch (error) {
            toast.error(" Something went wrong or maybe duplicate data entry ")
            console.log(error);
        }

    }
    return (
        <form>
        <h1 style={{textAlign:'center' , marginTop:'2rem'}}>REGISTER NOW</h1>
            <Wraper>
                <TextField
                    variant="standard"
                    name='userName'
                    value={users.userName}
                    onChange={e => handleChange(e)}
                    label="Enter Your Name"
                    type={'userName'}
                    required
                />
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
                <LoginBtn variant='contained' onClick={() => signUpUser()}>Register</LoginBtn>
                {/* <LoginBtn variant='contained' onClick={() => signUpUser()}>Register</LoginBtn> */}
            </Wraper>
        </form>
    )
}

export default Register

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
const LoginBtn = styled(Button)`
    text-transform: none;
    background-color: #2196f3;
    color: #fff;
    height: 48px;
    border-radius: 2px;
    /* & : hover {
        background: #2196f3;
    } */


`