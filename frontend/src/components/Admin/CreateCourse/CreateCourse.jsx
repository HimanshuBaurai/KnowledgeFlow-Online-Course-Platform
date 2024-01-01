import { Button, Container, Grid, Heading, Image, Input, Select, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import cursor from '../../../assets/images/cursor.png'
import SideBar from '../SideBar'
import { fileUploadCss } from '../../Auth/Register'
import { useDispatch, useSelector } from 'react-redux'
import { createCourse } from '../../../redux/Actions/adminAction'
import toast from 'react-hot-toast'

const CreateCourse = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [createdBy, setCreatedBy] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [imagePreview, setImagePreview] = useState('')

    const categories = ['Web Development', 'AI', 'App Development', 'Data Science', 'Machine Learning', 'Blockchain', 'Cyber Security', 'Cloud Computing', 'DevOps', 'Digital Marketing', 'Graphic Design', 'Mobile Development', 'Network & Security', 'Operating System', 'Programming', 'Software Testing', 'UI/UX Design', 'Video Editing', 'Web Design', 'Other'];//from courses

    const changeImageHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagePreview(reader.result);
                setImage(file);
            }
        };
    };


    const dispatch = useDispatch();
    const { loading, error, message } = useSelector(state => state.admin);
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('createdBy', createdBy);
        formData.append('category', category);
        formData.append('file', image);
        dispatch(createCourse(formData));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [error, message, dispatch])

    return (
        <Grid
            templateColumns={['1fr', '5fr 1fr']}
            minH={'100vh'}
            css={{ cursor: `url(${cursor}), default` }}
        >
            <Container py={'16'}>
                <form onSubmit={submitHandler}>
                    <Heading
                        textTransform={'uppercase'}
                        children={'Create Course'}
                        my={'16'}
                        textAlign={['center', 'left']}
                    />
                    <VStack m={'auto'} spacing={'8'}>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Title'
                            type='text'
                            focusBorderColor='purple.400'
                        />
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder='Description'
                            type='text'
                            focusBorderColor='purple.400'
                        />
                        <Input
                            value={createdBy}
                            onChange={(e) => setCreatedBy(e.target.value)}
                            placeholder='Creater Name'
                            type='text'
                            focusBorderColor='purple.400'
                        />
                        <Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            focusBorderColor='purple.400'
                        >
                            <option value=''>Select Category</option>
                            {
                                categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))
                            }
                        </Select>
                        <Input
                            accept='image/*'
                            required
                            type='file'
                            focusBorderColor='purple.400'
                            css={{
                                '&::-webkit-file-upload-button': {
                                    ...fileUploadCss,
                                    color: 'purple',
                                }
                            }}
                            onChange={changeImageHandler}
                        />
                        {
                            imagePreview && (
                                <Image src={imagePreview} boxSize={'64'} alt={title} objectFit={'contain'} />
                            )
                        }
                        <Button isLoading={loading} width={'full'} my={'4'} type='submit' colorScheme={'purple'} children={'Create'} />
                    </VStack>
                </form>
            </Container>
            <SideBar />
        </Grid>
    )
}

export default CreateCourse