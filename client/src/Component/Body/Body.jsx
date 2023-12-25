import React from 'react'
import { Button } from "@mui/material"
import "./Body.css"
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import SingleBlog from '../../pages/SingleBlog';


const Body = () => {
    const [blogs, setBlogs] = useState();

    const getAllBlogs = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/get-all-blog');
            if (data?.success) {
                setBlogs(data.blog)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllBlogs();
    }, [])


    return (
        <>
            <div className="body-container">
                <div className="bodyheader">
                    <p style={{ textAlign: 'center', fontSize: '3rem', marginTop: '2rem', fontWeight: '600' }}>
                        LIST OF ALL BLOGS....</p>
                </div>
                <div className="wrapper">
                    <div className="cards">
                        {
                            blogs && blogs?.map((blog) => (
                                <div className="card" key={blog._id} >
                                    <SingleBlog
                                        id={blog?._id}
                                        img={blog.image}
                                        title={blog.title}
                                        description={blog.description}
                                        isUser={localStorage.getItem('userId') === blog?.user?._id}
                                        name={blog.userName}
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

export default Body