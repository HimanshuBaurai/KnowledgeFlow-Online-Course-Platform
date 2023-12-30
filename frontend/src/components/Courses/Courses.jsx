import React, { useEffect, useState } from 'react'
import { Button, Container, HStack, Heading, Image, Input, Stack, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses } from '../../redux/Actions/courseAction.js'
import toast from 'react-hot-toast'
import Loader from '../Layout/Loader/Loader.jsx'


const Course = ({ views, title, imageSrc, id, addToPlaylistHandler, creator, description, lectureCount }) => {
    return (
        <VStack className='course' alignItems={['center', 'flex-start']}>

            <Image src={imageSrc} alt={title} boxSize='60' objectFit={'contain'} />

            <Heading
                children={title}
                textAlign={['center', 'left']}
                maxW='200px'
                size={'sm'}
                fontFamily={'sans-serif'}
                noOfLines={3}
            />

            <Text noOfLines={2} children={description} />

            <HStack>
                <Text
                    fontWeight={'bold'}
                    textTransform={'uppercase'}
                    children={'Creator'}
                />
                <Text
                    fontFamily={'body'}
                    textTransform={'uppercase'}
                    children={creator}
                />
            </HStack>

            <Heading
                textAlign={'center'}
                size={'xs'}
                children={`${lectureCount} Lectures`}
                textTransform={'uppercase'}
            />
            <Heading
                textAlign={'center'}
                size={'xs'}
                children={`${views} views`}
                textTransform={'uppercase'}
            />

            <Stack
                direction={['column', 'row']}
                alignItems={['center', 'flex-start']}
            >
                <Link to={`/course/${id}`} >
                    <Button colorScheme='yellow'>Watch Now</Button>
                </Link>
                <Button colorScheme='purple' variant='ghost' onClick={() => addToPlaylistHandler(id)} >Add to Playlist</Button>
            </Stack>
        </VStack>
    )
}

const Courses = () => {
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('All');
    const categories = ['Web Development', 'AI', 'App Development', 'Data Science', 'Machine Learning', 'Blockchain', 'Cyber Security', 'Cloud Computing', 'DevOps', 'Digital Marketing', 'Graphic Design', 'Mobile Development', 'Network & Security', 'Operating System', 'Programming', 'Software Testing', 'UI/UX Design', 'Video Editing', 'Web Design', 'Other'];

    const { loading, error, courses } = useSelector(state => state.course);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCourses(category, keyword));

        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
    }, [dispatch, category, keyword, error]);

    const addToPlaylistHandler = (id) => { console.log(id) }


    return (
        loading ? (<Loader />) : (
            <Container minH={'95vh'} maxW='container.lg' paddingY={'8'}>
                <Heading children="All Courses" m={'8'} />

                <Input
                    value={keyword}
                    placeholder="Search a course..."
                    variant="filled"
                    m={'8'}
                    onChange={(e) => setKeyword(e.target.value)}
                    type='text'
                    focusBorderColor='yellow.400'
                />

                <HStack overflowX={'auto'} paddingY={'8'} css={{ "&::-webkit-scrollbar": { display: 'none' } }}>
                    {
                        categories.map((item, index) => (
                            <Button key={index} onClick={() => setCategory(item)} minW={'60'}>
                                <Text children={item} />
                            </Button>
                        ))
                    }
                </HStack>

                <Stack
                    direction={['column', 'row']}
                    flexWrap={'wrap'}
                    justifyContent={['flex-start', 'space-evenly']}
                    alignItems={['center', 'flex-start']}
                >
                    {
                        courses.length > 0 ? (courses.map((item) => (
                            <Course
                                key={item._id}
                                id={item._id}
                                title={item.title}
                                description={item.description}
                                imageSrc={item.poster.url}
                                views={item.views}
                                creator={item.createdBy}
                                lectureCount={item.numOfVideos}
                                addToPlaylistHandler={addToPlaylistHandler}
                            />
                        ))
                        ) : (
                            <Heading opacity={0.7} mt={'4'} children='No courses found' />
                        )
                    }
                </Stack>
            </Container>
        )
    )
}

export default Courses