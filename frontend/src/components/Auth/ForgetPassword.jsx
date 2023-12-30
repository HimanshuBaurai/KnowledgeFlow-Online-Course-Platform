import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/Actions/profileAction';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const { loading, message, error } = useSelector(state => state.profile);
  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(forgetPassword(email));
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
  }, [dispatch, message, error]);

  return (
    <Container py={'16'} h={'90vh'}>
      <form onSubmit={onSubmitHandler}>
        <Heading children={'Forget Password'} my={'16'} textTransform={'uppercase'} textAlign={['center', 'left']} />
        <VStack spacing={'8'}>
          <Input
            required
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='abc@gmail.com'
            type='email'
            focusBorderColor='yellow.400'
          />
          <Button isLoading={loading} my={'4'} type='submit' colorScheme={'yellow'} children={'Send Reset Link'} />
        </VStack>
      </form>
    </Container>
  )
}

export default ForgetPassword