import React, { useState } from 'react'
import { Button, Container, HStack, Heading, Image, Input, Stack, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


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
                // spacing={'4'}
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

    const addToPlaylistHandler = (id) => { console.log(id) }


    return (
        <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
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
                <Course
                    id={1}
                    title={'Web Development'}
                    description={'Learn web development from top-rated instructors. Learn how to build a website, web design, and the most relevant web development frameworks used today in the tech industry'}
                    imageSrc={'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221222184908/web-development1.png'}
                    views={1000}
                    creator={'John Doe'}
                    lectureCount={10}
                    addToPlaylistHandler={addToPlaylistHandler}
                />  
            </Stack>
        </Container>
    );
}

export default Courses