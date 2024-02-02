import { Avatar, Button, Container, HStack, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { fileUploadCss } from '../Auth/Register'
import { removeFromPlaylist, updateProfilePicture } from '../../redux/Actions/profileAction'
import { useDispatch, useSelector } from 'react-redux'
import { cancelSubscription, loadUser } from '../../redux/Actions/userAction'
import toast from 'react-hot-toast'




//see documentation of chakra ui, it pops up a modal box on clicking the button below it 
const ChangePhotoBox = ({ isOpen, onClose, changeImageSubmitHandler, loading }) => {
    const [imagePreview, setImagePreview] = useState('');
    const [image, setImage] = useState('');

    const changeImageHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagePreview(reader.result);
                setImage(file);
            }
        };
    };

    const closeHandler = () => {
        onClose();
        setImagePreview('');
        setImage('');
    }//so previously choosen image doesnt reapper when we open the modal again


    return (
        <Modal isOpen={isOpen} onClose={closeHandler}>
            <ModalOverlay backdropFilter={'blur(10px)'} />
            <ModalContent>
                <ModalHeader> change Profile Photo  </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Container>
                        <form onSubmit={(e) => { changeImageSubmitHandler(e, image) }}>
                            <VStack spacing={'8'}>
                                {imagePreview && <Avatar src={imagePreview} boxSize={'48'} />}
                                <Input
                                    type='file'
                                    css={{ '&::file-selector-button': fileUploadCss }}
                                    onChange={changeImageHandler}
                                />
                                <Button isLoading={loading} w={'full'} type='submit' colorScheme='pink' children='Change' />
                            </VStack>
                        </form>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='red' mr={'3'} onClick={closeHandler}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}






const Profile = ({ user }) => {
    //temp data
    // const user = {
    //     name: 'sample',
    //     email: 'abc@gmail.com',
    //     createdAt: String(new Date().toISOString()),
    //     role: 'user',
    //     subscription: {
    //         status: 'inactive',
    //     },
    //     playlist: [
    //         {
    //             course: 'vgvbvb',//denotes course id
    //             poster: 'https://th.bing.com/th/id/OIP.l8kGzfQsw5dPihvVhPO-5wHaHa?w=680&h=680&rs=1&pid=ImgDetMain',
    //         }
    //     ]
    // }


    const { isOpen, onOpen, onClose } = useDisclosure();//to keep a track of whether the modal is open or not

    const dispatch = useDispatch();
    const { loading, message, error } = useSelector(state => state.profile);
    const { loading: subscriptionLoading, error: subscriptionError, message: subscriptionMessage } = useSelector(state => state.subscription);


    const removeFromPlaylistHandler = async (courseId) => {
        await dispatch(removeFromPlaylist(courseId));
        dispatch(loadUser());
    }


    const changeImageSubmitHandler = async (e, image) => {
        e.preventDefault();

        const myForm = new FormData();
        myForm.append('file', image); //file is the key and image is the value
        await dispatch(updateProfilePicture(myForm));
        dispatch(loadUser());
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }

        if (subscriptionError) {
            toast.error(subscriptionError);
            dispatch({ type: 'clearError' });
        }
        if (subscriptionMessage) {
            toast.success(subscriptionMessage);
            dispatch({ type: 'clearMessage' });
            dispatch(loadUser());
        }
    }, [dispatch, message, error, subscriptionMessage, subscriptionError]);

    const cancelSubscriptionHandler = async () => {
        await dispatch(cancelSubscription());
    }

    return (
        <Container minH={'95vh'} maxW={'container.lg'} py={'8'} >
            <Heading children='Profile' m={8} textTransform={'uppercase'} />
            <Stack
                justifyContent={'flex-start'}
                alignItems={'center'}
                direction={['column', 'row']}
                spacing={['8', '16']}
                padding={'8'}
            >
                <VStack>
                    <Avatar boxSize={'48'} src={user.avatar.url} />
                    <Button onClick={onOpen} colorScheme='pink' variant={'ghost'} children='Change Profile Picture' />
                </VStack>

                <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
                    <HStack>
                        <Text fontWeight={'bold'} children='Name:' />
                        <Text children={user.name} />
                    </HStack>{' '}
                    <HStack>
                        <Text fontWeight={'bold'} children='Email:' />
                        <Text children={user.email} />
                    </HStack>
                    <HStack>
                        <Text fontWeight={'bold'} children='Created At:' />
                        <Text children={user.createdAt.split("T")[0]} />
                    </HStack>
                    {
                        user.role !== 'admin' && (
                            <HStack>
                                <Text children='Subscription:' fontWeight={'bold'} />
                                {
                                    user.subscription && user.subscription.status === 'active' ? (
                                        <Button isLoading={subscriptionLoading} onClick={cancelSubscriptionHandler} colorScheme='red' children='Cancel Subscription' />
                                    ) : (
                                        <Link to='/subscribe'>
                                            <Button colorScheme='green' variant={'ghost'} children='Subscribe' />
                                        </Link>
                                    )

                                }
                            </HStack>
                        )
                    }

                    <Stack
                        alignItems={'center'}
                        direction={['column', 'row']}
                    >
                        <Link to='/updateprofile'>
                            <Button colorScheme='pink' children='Update Profile' />
                        </Link>
                        <Link to='/changepassword'>
                            <Button colorScheme='pink' children='Change Password' />
                        </Link>
                    </Stack>
                </VStack>
            </Stack>
            <Heading children='Playlist' size={'md'} my={'8'} />
            {
                user.playlist.length > 0 ? (
                    <Stack
                        direction={['column', 'row']}
                        alignItems={'center'}
                        flexWrap={'wrap'}
                        p={'4'}
                    >
                        {
                            user.playlist.map((item, index) => (
                                <VStack w={'48%'} key={index} m={'2'}>
                                    <Image
                                        boxSize={'full'}
                                        objectFit={'contain'}
                                        src={item.poster}
                                    />
                                    <HStack>
                                        <Link to={`/course/${item.course}`}>
                                            <Button variant={'ghost'} colorScheme={'pink'} children='Watch Now' />
                                        </Link>
                                        <Button isLoading={loading} variant={'ghost'} colorScheme={'red'} onClick={() => removeFromPlaylistHandler(item.course)}>
                                            <RiDeleteBin7Fill />
                                            <Text children='Remove from Playlist' />
                                        </Button>
                                    </HStack>
                                </VStack>
                            ))
                        }
                    </Stack>)
                    : (
                        <Text children='No Courses in Playlist' />
                    )
            }

            <ChangePhotoBox isOpen={isOpen} onClose={onClose} changeImageSubmitHandler={changeImageSubmitHandler} loading={loading} />
        </Container>
    )
}

export default Profile