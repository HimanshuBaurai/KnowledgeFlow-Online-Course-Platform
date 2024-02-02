import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../redux/Actions/userAction';


export const fileUploadCss = {
    cursor: 'pointer',
    color: '#ECC948',
    marginLeft: '-5%',
    width: '110%',
    border: 'none',
    height: '100%',
    backgroundColor: 'white',
}//for reusing it at various places

const fileUploadStyle = {
    '&::-webkit-file-upload-button': fileUploadCss,
};

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');

    const dispatch=useDispatch();

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

    const submitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.append('name', name);
        myForm.append('email', email);
        myForm.append('password', password);
        myForm.append('file', image); //file is the key and image is the value
        dispatch(register(myForm));
    }

    return (
        <Container h={'100vh'}>
            <VStack h={'full'} justifyContent={'center'} spacing={'10'}>
                <Heading children={'Registration'} textTransform={'uppercase'} />

                <form onSubmit={submitHandler} style={{ width: '100%' }}>

                    <Box my={'4'} justifyContent={'center'} display={'flex'}>
                        <Avatar size={'2xl'} src={imagePreview} />
                    </Box>
                    <Box my={'4'}>
                        <FormLabel htmlFor='name' children='Name' />
                        <Input
                            required
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='John Doe'
                            type='text'
                            focusBorderColor='pink.400'
                        />
                    </Box>
                    <Box my={'4'}>
                        <FormLabel htmlFor='email' children='Email Address' />
                        <Input
                            required
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='abc@gmail.com'
                            type='email'
                            focusBorderColor='pink.400'
                        />
                    </Box>
                    <Box my={'4'}>
                        <FormLabel htmlFor='password' children='Password' />
                        <Input
                            required
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='********'
                            type='password'
                            focusBorderColor='pink.400'
                        />
                    </Box>
                    <Box my={'4'}>
                        <FormLabel htmlFor='chooseAvatar' children='Choose Avatar' />
                        <Input
                            accept='image/*'
                            required
                            id='chooseAvatar'
                            type='file'
                            focusBorderColor='pink.400'
                            css={fileUploadStyle}
                            onChange={changeImageHandler}
                        />
                    </Box>

                    <Button my={'4'} type='submit' colorScheme={'pink'} children={'Sign Up'} />

                    <Box my={'4'}>
                        Registered User?{' '}
                        <Link to='/login'>
                            <Button fontSize={'sm'} variant={'link'} children={'Login'} colorScheme='green' />
                        </Link>
                        {' '} here
                    </Box>
                </form>
            </VStack>
        </Container>
    )
}

export default Register