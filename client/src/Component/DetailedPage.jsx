import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from "@mui/material"

const DetailedPage = () => {
    const [blog, setBlog] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()
    const handleEdit = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/get-single-blog/${id}`);
            console.log(data)
            console.log(data.newBlog);
            if (data?.success) {
                setBlog(data?.newBlog)
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleEdit()
    }, [id])

    return (
        <div className='container-Detail'>
            <div id="img">
                <img src={blog.image} alt="" />
            </div>
            <div className="data">
                <h1> {blog.title}</h1>
                <p> {blog.description}</p>
                <div className="btns">
                    <Button variant='outlined' className='btn1' onClick={() => navigate("/")}>Back to Home</Button>
                    <Button variant='outlined' className='btn1' onClick={() => navigate(`/edit-blog/${blog._id}`)} >UPDATE</Button>
                </div>
            </div>
        </div>
    )
}

export default DetailedPage