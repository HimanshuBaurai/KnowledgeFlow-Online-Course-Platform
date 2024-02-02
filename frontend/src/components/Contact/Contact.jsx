import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { contactUs } from '../../redux/Actions/otherAction';
import toast from 'react-hot-toast';

const Contact = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const { loading, error, message: ContactUsMessage } = useSelector(state => state.other);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(contactUs(name, email, message));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (ContactUsMessage) {
            toast.success(ContactUsMessage);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, error, ContactUsMessage])

    return (
        <Container h='90vh'>
            <VStack h='full' justifyContent={'center'} spacing={'16'}>
                <Heading children={'Contact Us'} my={'16'} textAlign={['center', 'left']} />

                <form onSubmit={submitHandler} style={{ width: '100%' }}>

                    <Box my={'4'}>
                        <FormLabel htmlFor='name' children='Name' />
                        <Input
                            required
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='abc'
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
                        <FormLabel htmlFor='message' children='Message' />
                        <Textarea
                            required
                            id='message'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder='Your Message'
                            focusBorderColor='pink.400'
                        />
                    </Box>


                    <Button isLoading={loading} my={'4'} type='submit' colorScheme={'pink'} children={'Send Message'} />

                    <Box my={'4'}>
                        Request For A Course?{' '}
                        <Link to='/request'>
                            <Button variant={'link'} children={'Click'} colorScheme='green' />
                        </Link>
                        {' '} here
                    </Box>

                </form>
            </VStack>
        </Container>
    )
}

export default Contact