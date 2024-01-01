import { Box, Button, Grid, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { fileUploadCss } from '../../Auth/Register'


const VideoCard = ({ title, description, num, lectureId, courseId, loading, deleteButtonHandler }) => {
    return (
        <Stack direction={['column', 'row']} my={'8'} borderRadius={'lg'} boxShadow={'0 0 10px rgba(107,70,193,0.5)'} justifyContent={['flex-start', 'space-between']} p={['4', '8']}>
            <Box>
                <Heading size={'sm'} children={`#${num} ${title}`} />
                <Text children={description} />
            </Box>
            <Button isLoading={loading} color={'purple.600'} onClick={() => deleteButtonHandler(lectureId, courseId)}>
                <RiDeleteBin7Fill />
            </Button>
        </Stack>
    )
}


const CourseModal = ({ isOpen, onClose, courseTitle, id, loading, deleteButtonHandler, addLectureHandler, lectures = [] }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [video, setVideo] = useState()
    const [videoPreview, setVideoPreview] = useState('')

    const changeVideoHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.readyState === 2) {
                setVideoPreview(reader.result);
                setVideo(file);
            }
        };
    };

    const handleClose = () => {
        onClose();
        setTitle('');
        setDescription('');
        setVideo('');
        setVideoPreview('');
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} size={'full'} scrollBehavior='outside'>
            <ModalOverlay backdropFilter={'blur(10px)'} />
            <ModalContent>
                <ModalHeader>
                    {courseTitle}
                </ModalHeader>
                <ModalCloseButton onClick={onClose} />
                <ModalBody p={'16'}>
                    <Grid templateColumns={['1fr', '3fr 1fr']}>
                        <Box px={['0', '16']}>
                            <Box my={'5'}>
                                <Heading children={courseTitle} />
                                <Heading children={`#${id}`} size={'sm'} opacity={0.4} />
                            </Box>
                            <Heading children={'Lectures'} size={'lg'} />
                            {
                                lectures.map((item, i) => (
                                    <VideoCard
                                        key={i}
                                        title={item.title}
                                        description={item.description}
                                        num={i + 1}
                                        lectureId={item._id}
                                        courseId={id}
                                        loading={loading}
                                        deleteButtonHandler={deleteButtonHandler}
                                    />
                                ))
                            }
                        </Box>
                        <Box>
                            <form onSubmit={(e) => addLectureHandler(e, id, title, description, video)}>
                                <VStack spacing={'4'}>
                                    <Heading children={'Add Lecture'} size={'md'} textTransform={'uppercase'} />
                                    <Input
                                        focusBorderColor='purple.400'
                                        placeholder='Title'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <Input
                                        focusBorderColor='purple.400'
                                        placeholder='Description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <Input
                                        accept='video/mp4'
                                        required
                                        type='file'
                                        focusBorderColor='purple.400'
                                        css={{
                                            '&::-webkit-file-upload-button': {
                                                ...fileUploadCss,
                                                color: 'purple',
                                            }
                                        }}
                                        onChange={changeVideoHandler}
                                    />
                                    {
                                        videoPreview && <video controlsList='noDownload' src={videoPreview} controls width={'full'} />
                                    }
                                    <Button isLoading={loading} w={'full'} type='submit' colorScheme='purple' children={'Upload'} />
                                </VStack>
                            </form>
                        </Box>
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='red' onClick={handleClose}>
                        Close
                    </Button>
                </ModalFooter>

            </ModalContent>
        </Modal>
    )
}

export default CourseModal