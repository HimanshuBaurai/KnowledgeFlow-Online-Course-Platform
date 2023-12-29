import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../redux/Actions/profileAction'
import { loadUser } from '../../redux/Actions/userAction'
import { useNavigate } from 'react-router-dom'

const UpdateProfile = ({ user }) => {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email));
    dispatch(loadUser());
    navigate('/profile')
  }
  const { loading } = useSelector(state => state.profile);

  return (
    <Container py={'16'} minH={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading children={'Update Profile'} textTransform={'uppercase'} my={'16'} textAlign={['center', 'left']} />
        <VStack>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter Name'
            type='text'
            focusBorderColor='yellow.400'
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Email'
            type='email'
            focusBorderColor='yellow.400'
          />
          <Button isLoading={loading} width={'full'} my={'4'} type='submit' colorScheme={'yellow'} children={'Update'} />
        </VStack>
      </form>
    </Container>
  )
}

export default UpdateProfile