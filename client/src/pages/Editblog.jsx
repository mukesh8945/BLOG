import styled from '@emotion/styled'
import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';




const Editblog = () => {
    const [blog, setBlog] = useState({})
    const [datas, setData] = useState({})

    const handleChange = (e) => setData({ ...datas, [e.target.name]: e.target.value })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`http://localhost:8000/update-blog/${id}`, {
                title: datas?.title,
                description: datas?.description,
                image: datas?.image,
                user: id
            })

            if (data?.success) {
                toast.success("updated successfuly");
                navigate('/')
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const id = useParams().id;

    const handleEdit = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8000/get-single-blog/${id}`);
            console.log(data);
            if (data?.success) {
                setBlog(data?.blog)
                setData({
                    title: data?.newBlog.title,
                    description: data?.newBlog.description,
                    image: data?.newBlog.image,
                });
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
        <form onSubmit={handleSubmit}>
            <Box>
                <Typography variant={'h2'} margin={'auto'} textAlign={'center'} mt={'10%'} color={'#2196f3'}>UPDATE BLOG </Typography>
                <Wraper>
                    <TextField
                        variant="standard"
                        name='title'
                        type={'title'}
                        value={datas.title}
                        onChange={e => handleChange(e)}
                        required
                    />
                    <TextField
                        variant="standard"
                        name='description'
                        type={'description'}
                        value={datas.description}
                        onChange={e => handleChange(e)}
                        required
                    />
                    <TextField
                        variant="standard"
                        name='image'
                        type={'text'}
                        value={datas.image}
                        onChange={e => handleChange(e)}
                        required
                    />
                    <CreateBlogBtn variant='contained' type='submit'>UPDATE </CreateBlogBtn>
                </Wraper>
            </Box>
        </form>
    )
}

export default Editblog

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
const CreateBlogBtn = styled(Button)`
    text-transform: none;
    background-color: #2196f3;
    color: #fff;
    height: 48px;
    border-radius: 2px;


`