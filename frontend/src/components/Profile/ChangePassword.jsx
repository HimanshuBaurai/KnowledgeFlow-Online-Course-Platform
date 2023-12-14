import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    return (
        <Container py={'16'} minH={'90vh'}>
            <form>
                <Heading children={'Change Password'} textTransform={'uppercase'} my={'16'} textAlign={['center', 'left']} />
                <VStack>
                    <Input
                        required
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder='Old Password'
                        type='password'
                        focusBorderColor='yellow.400'
                    />
                    <Input
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder='New Password'
                        type='password'
                        focusBorderColor='yellow.400'
                    />
                    <Button width={'full'} my={'4'} type='submit' colorScheme={'yellow'} children={'Change Password'} />
                </VStack>
            </form>
        </Container>
    )
}

export default ChangePassword