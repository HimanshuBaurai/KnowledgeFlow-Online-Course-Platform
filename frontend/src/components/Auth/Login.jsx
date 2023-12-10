import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Form, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Container h={'100vh'}>
            <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
                <Heading children={'Welcome to the KnowledgeFlow'} />

                <form style={{ width: '100%' }}>

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
                        <FormLabel htmlFor='password' children='Password' />
                        <Input
                            required
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='********'
                            type='password'
                            focusBorderColor='yellow.400'
                        />
                    </Box>

                    <Box>
                        <Link
                            to='/forgotpassword'>
                            <Button fontSize={'sm'} variant={'link'} children={'Forgot Password?'} />
                        </Link>
                    </Box>

                    <Button my={'4'} type='submit' colorScheme={'yellow'} children={'Login'} />

                    <Box my={'4'}>
                        New User?{' '}
                        <Link to='/register'>
                            <Button fontSize={'sm'} variant={'link'} children={'Sign Up'} colorScheme='purple' />
                        </Link>
                        {' '} here
                    </Box> 
                </form>
            </VStack>
        </Container>
    )
}

export default Login