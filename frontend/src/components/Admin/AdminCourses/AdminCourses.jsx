import { Box, Button, Grid, HStack, Heading, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import cursor from '../../../assets/images/cursor.png'
import SideBar from '../SideBar'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import CourseModal from './CourseModal'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses, getCourseLectures } from '../../../redux/Actions/courseAction'
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/Actions/adminAction'
import toast from 'react-hot-toast'




const Row = ({ item, courseDetailsHandler, deleteButtonHandler, loading }) => {
    return (
        <Tr>
            <Td>#{item._id}</Td>
            <Td>
                <Image src={item.poster.url} alt={item.title} boxSize={'fit-content'} />
            </Td>
            <Td>{item.title}</Td>
            <Td textTransform={'uppercase'}>{item.category}</Td>
            <Td>{item.createdBy}</Td>
            <Td isNumeric>{item.views}</Td>
            <Td isNumeric>{item.numOfVideos}</Td>
            <Td isNumeric>
                <HStack justifyContent={'flex-end'}>
                    <Button
                        isLoading={loading}
                        variant={'outline'}
                        colorScheme={'purple'}
                        onClick={() => courseDetailsHandler(item._id, item.title)}
                    >View Lectures</Button>
                    <Button
                        isLoading={loading}
                        color={'purple.600'}
                        onClick={() => deleteButtonHandler(item._id)}>
                        <RiDeleteBin7Fill />
                    </Button>

                </HStack>
            </Td>
        </Tr>

    )
}

const AdminCourses = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();//to keep a track of whether the modal is open or not

    const { courses, lectures } = useSelector(state => state.course);
    const { loading, error, message } = useSelector(state => state.admin);
    const dispatch = useDispatch();

    const [courseId, setCourseId] = useState('');//for storing course id, so that we can send it to course modal, and get lectures of that course
    const [courseTitle, setCourseTitle] = useState('');//for storing course title, so that we can send it to course modal, and get lectures of that course

    const courseDetailsHandler = (id, title) => {
        dispatch(getCourseLectures(id));//get course lectures
        onOpen();//for opening up course pop-up modal 
        setCourseId(id);//set course id, so that we can send it to course modal, and get lectures of that course
        setCourseTitle(title);//set course title, so that we can send it to course modal, and get lectures of that course
    }

    const deleteButtonHandler = (id) => {
        dispatch(deleteCourse(id));
    }

    const deleteLectureButtonHandler = async (lectureId, courseId) => {
        await dispatch(deleteLecture(courseId, lectureId));
        dispatch(getCourseLectures(courseId));
    }


    const addLectureHandler = async (e, courseId, title, description, video) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.append('title', title);
        myForm.append('description', description);
        myForm.append('file', video);

        await dispatch(addLecture(courseId, myForm));
        dispatch(getCourseLectures(courseId));
    }


    useEffect(() => {
        dispatch(getAllCourses());
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, error, message, onClose])


    return (
        <Grid
            templateColumns={['1fr', '5fr 1fr']}
            minH={'100vh'}
            css={{ cursor: `url(${cursor}), default` }}
        >
            <Box p={['0', '8']} overflowX={'auto'}>
                <Heading
                    textTransform={'uppercase'}
                    children={'All Users'}
                    my={'16'}
                    textAlign={['center', 'left']}
                />
                <TableContainer w={['100vw', 'full']}>
                    <Table variant="simple" size={'lg'}>
                        <TableCaption>All available courses in the database</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Poster</Th>
                                <Th>Title</Th>
                                <Th>Category</Th>
                                <Th>Creator</Th>
                                <Th isNumeric>Views</Th>
                                <Th isNumeric>Lectures</Th>
                                <Th isNumeric>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                courses.map((item) => (
                                    <Row
                                        key={item._id}
                                        item={item}
                                        loading={loading}
                                        courseDetailsHandler={courseDetailsHandler}
                                        deleteButtonHandler={deleteButtonHandler}
                                    />
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
                <CourseModal
                    isOpen={isOpen}
                    onClose={onClose}
                    id={courseId}
                    courseTitle={courseTitle}
                    lectures={lectures}
                    loading={loading}
                    deleteButtonHandler={deleteLectureButtonHandler}
                    addLectureHandler={addLectureHandler}
                />
            </Box>
            <SideBar />
        </Grid>
    )
}
export default AdminCourses