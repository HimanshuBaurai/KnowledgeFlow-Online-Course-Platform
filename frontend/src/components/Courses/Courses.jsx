import React, { useEffect, useState } from 'react'
import { Button, Container, HStack, Heading, Image, Input, Stack, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses } from '../../redux/Actions/courseAction.js'
import toast from 'react-hot-toast'
import Loader from '../Layout/Loader/Loader.jsx'
import { addToPlaylist } from '../../redux/Actions/profileAction.js'
import { loadUser } from '../../redux/Actions/userAction.js'

const Course = ({ views, title, imageSrc, id, addToPlaylistHandler, creator, description, lectureCount, loading }) => {
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
                textTransform={'uppercase'} 
            />

            <Text noOfLines={2} children={description} />

            <HStack>
                <Heading
                    fontWeight={'bold'}
                    textTransform={'uppercase'}
                    children={'Creator: '}
                    size={'xs'}
                />
                <Heading
                    fontFamily={'body'}
                    // textTransform={'uppercase'}
                    children={creator}
                    size={'xs'}
                    textDecoration={'underline'}
                />
                {/* <Text
                    fontWeight={'bold'}
                    textTransform={'uppercase'}
                    children={'Creator'}
                    fontSize={'xs'}
                />
                <Text
                    fontFamily={'body'}
                    textTransform={'uppercase'}
                    children={creator}
                /> */}
            </HStack>

            <Heading
                textAlign={'center'}
                size={'xs'}
                children={`Lectures: ${lectureCount}`}
                textTransform={'uppercase'}
            />
            <Heading
                textAlign={'center'}
                size={'xs'}
                children={`Views: ${views}`}
                textTransform={'uppercase'}
            />

            <Stack
                direction={['column', 'row']}
                alignItems={['center', 'flex-start']}
            >
                <Link to={`/course/${id}`} >
                    <Button colorScheme='pink'>Watch Now</Button>
                </Link>
                <Button isLoading={loading} colorScheme='green' variant='ghost' onClick={() => addToPlaylistHandler(id)} >Add to Playlist</Button>
            </Stack>
        </VStack>
    )
}

const Courses = () => {
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const categories = ['Web Development', 'AI', 'App Development', 'Data Science', 'Machine Learning', 'Blockchain', 'Cyber Security', 'Cloud Computing', 'DevOps', 'Digital Marketing', 'Graphic Design', 'Mobile Development', 'Network & Security', 'Operating System', 'Programming', 'Software Testing', 'UI/UX Design', 'Video Editing', 'Web Design', 'Other'];

    const { loading, error, courses, message } = useSelector(state => state.course);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCourses(category, keyword));

        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, category, keyword, error, message]);


    const addToPlaylistHandler = async(id) => {
        await dispatch(addToPlaylist(id));
        dispatch(loadUser());
    }


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
                    focusBorderColor='pink.400'
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
                                loading={loading}
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