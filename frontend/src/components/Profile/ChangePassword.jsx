import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../redux/Actions/profileAction'
import toast from 'react-hot-toast'

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(changePassword(oldPassword, newPassword));
    }

    const { loading, message, error } = useSelector(state => state.profile);
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
        <Container py={'16'} minH={'90vh'}>
            <form onSubmit={submitHandler}>
                <Heading children={'Change Password'} textTransform={'uppercase'} my={'16'} textAlign={['center', 'left']} />
                <VStack>
                    <Input
                        required
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder='Old Password'
                        type='password'
                        focusBorderColor='pink.400'
                    />
                    <Input
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder='New Password'
                        type='password'
                        focusBorderColor='pink.400'
                    />
                    <Button isLoading={loading} width={'full'} my={'4'} type='submit' colorScheme={'pink'} children={'Change Password'} />
                </VStack>
            </form>
        </Container>
    )
}

export default ChangePassword