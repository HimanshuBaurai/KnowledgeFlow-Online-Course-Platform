import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/Actions/profileAction';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const [password, setPassword] = useState('');

    const { loading, message, error } = useSelector(state => state.profile);
    const dispatch=useDispatch();

    //can access token from useParams() hook
    const params = useParams();
    const navigate=useNavigate();
    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(resetPassword(params.token,password)); 
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
            navigate('/login');
        }
    }, [dispatch, message, error,navigate]);


    return (
        <Container py={'16'} h={'90vh'}>
            <form onSubmit={onSubmitHandler}>
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
                    <Button isLoading={loading} my={'4'} type='submit' colorScheme={'yellow'} children={'Reset Password'} />
                </VStack>
            </form>
        </Container>
    )
}

export default ResetPassword