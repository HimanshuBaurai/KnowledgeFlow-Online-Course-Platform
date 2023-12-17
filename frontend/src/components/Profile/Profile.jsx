import { Avatar, Button, Container, HStack, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { fileUploadCss } from '../Auth/Register'




//see documentation of chakra ui, it pops up a modal box on clicking the button below it 
const ChangePhotoBox = ({ isOpen, onClose, changeImageSubmitHandler }) => {
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
                                <Button w={'full'} type='submit' colorScheme='yellow' children='Change' />
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






const Profile = () => {
    const user = {
        name: 'sample',
        email: 'abc@gmail.com',
        createdAt: String(new Date().toISOString()),
        role: 'user',
        subscription: {
            status: 'inactive',
        },
        playlist: [
            {
                course: 'vgvbvb',//denotes course id
                poster: 'https://th.bing.com/th/id/OIP.l8kGzfQsw5dPihvVhPO-5wHaHa?w=680&h=680&rs=1&pid=ImgDetMain',
            }
        ]
    }

    const removeFromPlaylistHandler = (courseId) => {
        console.log(courseId);
    }

    const { isOpen, onOpen, onClose } = useDisclosure();//to keep a track of whether the modal is open or not

    const changeImageSubmitHandler = (e, image) => {
        e.preventDefault();
        console.log(image);
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
                    <Avatar boxSize={'48'} />
                    <Button onClick={onOpen} colorScheme='yellow' variant={'ghost'} children='Change Profile Picture' />
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
                                    user.subscription.status === 'active' ? (
                                        <Button colorScheme='red' children='Cancel Subscription' />
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
                            <Button colorScheme='yellow' children='Update Profile' />
                        </Link>
                        <Link to='/changepassword'>
                            <Button colorScheme='yellow' children='Change Password' />
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
                                            <Button variant={'ghost'} colorScheme={'yellow'} children='Watch Now' />
                                        </Link>
                                        <Button variant={'ghost'} colorScheme={'red'} onClick={() => removeFromPlaylistHandler(item.course)}>
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

            <ChangePhotoBox isOpen={isOpen} onClose={onClose} changeImageSubmitHandler={changeImageSubmitHandler} />
        </Container>
    )
}

export default Profile