import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from "@mui/material"
import axios from 'axios'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

const CreateBlog = () => {
    const id = localStorage.getItem('userId')
    const [datas, setData] = useState({
        title: "",
        description: "",
        image: ""
    })

    const handleChange = (e) => setData({ ...datas, [e.target.name]: e.target.value })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:8000/create-blog", {
                title: datas.title,
                description: datas.description,
                image: datas.image,
                user: id
            })
            if (data?.success) {
                alert("blog created");
                navigate('/')
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Wrappar>
            <StyledForm onSubmit={handleSubmit} >
                <Box>
                    <Typography variant={'h4'} margin={'auto'} textAlign={'center'} mt={'10%'} color={'#2196f3'}>
                        CREATE  BLOG
                    </Typography>
                    <Wraper>
                        <TextField
                            variant="standard"
                            name='title'
                            type={'title'}
                            value={datas.title}
                            onChange={e => handleChange(e)}
                            label="Enter title here"
                            required
                        />
                        <TextField
                            variant="standard"
                            name='description'
                            type={'description'}
                            value={datas.description}
                            onChange={e => handleChange(e)}
                            label="Enter description here"
                            required
                        />
                        <TextField
                            variant="standard"
                            name='image'
                            type={'text'}
                            value={datas.image}
                            onChange={e => handleChange(e)}
                            label="Enter image url here"
                            required
                        />
                        <CreateBlogBtn variant='contained' type='submit'>CREATE </CreateBlogBtn>
                    </Wraper>
                </Box>
            </StyledForm>
        </Wrappar>

    )
}

export default CreateBlog

const Wrappar = styled(Box)`
    background-image:url("https://img.freepik.com/premium-photo/cup-coffee-eyeglasses-book-pencil-holder-white-table_649760-377.jpg?w=360");
    background-repeat:no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100%;
    margin-top: 0;
    overflow: hidden;
    overflow-x: none;
    background-position: center;
    

`
const StyledForm = styled('form')({
    opacity: '1',
    zIndex: '1'
})

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
    z-index:0 ;
`
const CreateBlogBtn = styled(Button)`
    text-transform: none;
    background-color: #2196f3;
    color: #fff;
    height: 48px;
    border-radius: 2px;


`