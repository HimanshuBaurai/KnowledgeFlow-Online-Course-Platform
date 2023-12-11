import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    return (
        <Container h='90vh'>
            <VStack h='full' justifyContent={'center'} spacing={'16'}>
                <Heading children={'Contact Us'} my={'16'} textAlign={['center', 'left']} />

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
                        <FormLabel htmlFor='message' children='Message' />
                        <Textarea
                            required
                            id='message'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder='Your Message'
                            focusBorderColor='yellow.400'
                        />
                    </Box>


                    <Button my={'4'} type='submit' colorScheme={'yellow'} children={'Send Message'} />

                    <Box my={'4'}>
                        Request For A Course?{' '}
                        <Link to='/request'>
                            <Button variant={'link'} children={'Click'} colorScheme='purple' />
                        </Link>
                        {' '} here
                    </Box>

                </form>
            </VStack>
        </Container>
    )
}

export default Contact