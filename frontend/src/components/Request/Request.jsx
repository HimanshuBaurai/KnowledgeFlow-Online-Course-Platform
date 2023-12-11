import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Request = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');

    return (
        <Container h='90vh'>
            <VStack h='full' justifyContent={'center'} spacing={'16'}>
                <Heading children={'Request New Course'} my={'16'} textAlign={['center', 'left']} />

                <form style={{ width: '100%' }}>

                    <Box my={'4'}>
                        <FormLabel htmlFor='name' children='Name' />
                        <Input
                            required
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='abc'
                            type='text'
                            focusBorderColor='yellow.400'
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
                            focusBorderColor='yellow.400'
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
                            focusBorderColor='yellow.400'
                        />
                    </Box>


                    <Button my={'4'} type='submit' colorScheme={'yellow'} children={'Send Message'} />

                    <Box my={'4'}>
                        Explore the existing courses{' '}
                        <Link to='/courses'>
                            <Button variant={'link'} children={'Click'} colorScheme='purple' />
                        </Link>
                        {' '} here
                    </Box>

                </form>
            </VStack>
        </Container>
    )
}

export default Request