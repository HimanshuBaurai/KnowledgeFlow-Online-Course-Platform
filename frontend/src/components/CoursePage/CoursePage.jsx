import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import Intro from '../../assets/videos/Intro.mp4'

const CoursePage = () => {
    const [lectureNumber, setLectureNumber] = useState(0)

    const lectures = [
        {
            _id: 'sahghvjv',
            title: 'sample',
            video: {
                url: 'https://youtu.be/i_LwzRVP7bg?si=uWkO2mJEgMrp18C0',
            },
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
        },
        {
            _id: 'sahghvjv2',
            title: 'sample2',
            video: {
                url: 'https://youtu.be/URp9G16iH4U?si=AhJZHzSM2jKhSVVO',
            },
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
        },
        {
            _id: 'sahghvjv',
            title: 'sample3',
            video: {
                url: 'https://youtu.be/URp9G16iH4U?si=AhJZHzSM2jKhSVVO',
            },
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
        }
    ]

    return (
        <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
            <Box>
                <video
                    width={'100%'}
                    autoPlay
                    controls
                    controlsList='nodownload noremoteplayback'
                    disablePictureInPicture
                    disableRemotePlayback
                    // src={Intro} />
                    src={lectures[lectureNumber].video.url} />
                <Heading m={'4'} children={`#${lectureNumber + 1} ${lectures[lectureNumber].title}`} />
                <Heading m={'4'} size={'lg'} children='Description' />
                <Text m='4' children={lectures[lectureNumber].description} />
            </Box>
            <VStack>
                {
                    lectures.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setLectureNumber(index)}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                textAlign: 'center',
                                margin: 0,
                                borderBottom: '1px solid #ccc',
                            }}
                        >
                            <Text noOfLines={1} children={`#${index + 1} ${item.title}`} />

                        </button>
                    ))
                }
            </VStack>
        </Grid>
    )
}

export default CoursePage