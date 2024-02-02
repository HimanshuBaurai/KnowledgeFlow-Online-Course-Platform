import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { courseRequest } from '../../redux/Actions/otherAction';
import toast from 'react-hot-toast';

const Request = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');

    const dispatch = useDispatch();
    const { loading, error, message: CourseRequestMessage } = useSelector(state => state.other);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(courseRequest(name, email, course));
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (CourseRequestMessage) {
            toast.success(CourseRequestMessage);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, error, CourseRequestMessage])

    return (
        <Container h='90vh'>
            <VStack h='full' justifyContent={'center'} spacing={'16'}>
                <Heading children={'Request New Course'} my={'16'} textAlign={['center', 'left']} />

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
                        <FormLabel htmlFor='course' children='Course Name And Description(optional)' />
                        <Textarea
                            required
                            id='course'
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            placeholder='Your Requested Course and Description(optional)'
                            focusBorderColor='pink.400'
                        />
                    </Box>


                    <Button isLoading={loading} my={'4'} type='submit' colorScheme={'pink'} children={'Send Message'} />

                    <Box my={'4'}>
                        Explore the existing courses{' '}
                        <Link to='/courses'>
                            <Button variant={'link'} children={'Click'} colorScheme='green' />
                        </Link>
                        {' '} here
                    </Box>

                </form>
            </VStack>
        </Container>
    )
}

export default Request