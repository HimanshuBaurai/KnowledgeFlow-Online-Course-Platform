import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const UpdateProfile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  return (
    <Container py={'16'} minH={'90vh'}>
      <form>
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
          <Button width={'full'} my={'4'} type='submit' colorScheme={'yellow'} children={'Update'} />
        </VStack>
      </form>
    </Container>
  )
}

export default UpdateProfile