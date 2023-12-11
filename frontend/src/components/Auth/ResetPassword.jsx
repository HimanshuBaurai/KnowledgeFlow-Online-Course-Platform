import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');

    //can access token from useParams() hook
    const params = useParams();
    console.log(params.token);//token is the name of the parameter in the route

    return (
        <Container py={'16'} h={'90vh'}>
            <form>
                <Heading children={'Reset Password'} my={'16'} textTransform={'uppercase'} textAlign={['center', 'left']} />
                <VStack spacing={'8'}>
                    <Input
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='New Password'
                        type='password'
                        focusBorderColor='yellow.400'
                    />
                    <Button my={'4'} type='submit' colorScheme={'yellow'} children={'Reset Password'} />
                </VStack>
            </form>
        </Container>
    )
}

export default ResetPassword