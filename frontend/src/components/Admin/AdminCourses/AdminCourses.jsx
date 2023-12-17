import { Box, Button, Grid, HStack, Heading, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import cursor from '../../../assets/images/cursor.png'
import SideBar from '../SideBar'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import CourseModal from './CourseModal'




const Row = ({ item, courseDetailsHandler, deleteButtonHandler }) => {
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
                    <Button variant={'outline'} colorScheme={'purple'} onClick={() => courseDetailsHandler(item._id)}>View Lectures</Button>
                    <Button color={'purple.600'} onClick={() => deleteButtonHandler(item._id)}>
                        <RiDeleteBin7Fill />
                    </Button>

                </HStack>
            </Td>
        </Tr>

    )
}

const AdminCourses = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();//to keep a track of whether the modal is open or not

    const courses = [{
        _id: 1,
        title: 'React Course',
        category: 'web development',
        poster: {
            url: 'https://th.bing.com/th/id/OIP.l8kGzfQsw5dPihvVhPO-5wHaHa?w=680&h=680&rs=1&pid=ImgDetMain'
        },
        createdBy: 'John Doe',
        views: 100,
        numOfVideos: 10

    }]//temp data

    const courseDetailsHandler = (id) => {
        onOpen();//for opening up course pop-up modal
        // console.log(id)
    }
    const deleteButtonHandler = (id) => {
        console.log(id)
    }
    const deleteLectureButtonHandler = (lectureId, courseId) => {
        console.log(lectureId, courseId)
    }
    const addLectureHandler = (e,courseId,title,description,video) => {
        e.preventDefault(); 
    }


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
                                    <Row key={item._id} item={item} courseDetailsHandler={courseDetailsHandler} deleteButtonHandler={deleteButtonHandler} />
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
                <CourseModal isOpen={isOpen} onClose={onClose} id={'avhsvagvsgh'} courseTitle={'React Course'} deleteButtonHandler={deleteLectureButtonHandler} addLectureHandler={addLectureHandler} />
            </Box>
            <SideBar />
        </Grid>
    )
}
export default AdminCourses