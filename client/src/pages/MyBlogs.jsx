import { Button } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import SingleBlog from './SingleBlog';


const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    const gettingSigleBlog = async () => {
        try {
            const id = localStorage.getItem('userId')
            const { data } = await axios.get(`http://localhost:8000/all-blog/${id}`)
            if (data?.success) {
                setBlogs(data?.userBlog.blogs)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        gettingSigleBlog();
    }, [])

    return (
        <>
            <div className="body-container">
                <div className="bodyheader">
                    <p style={{ textAlign: 'center', fontSize: '3rem', marginTop: '2rem', fontWeight: '600' }}>
                        MY BLOGS....</p>
                </div>
                <div className="wrapper">
                    <div className="cards">
                        {
                            blogs && blogs?.map((blog) => (
                                <div className="card">
                                    <SingleBlog 
                                        id={blog._id}
                                        isUser={true}
                                        description={blog.description}
                                        img={blog.image}
                                        name={blog.userName}
                                        title={blog.title}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyBlogs