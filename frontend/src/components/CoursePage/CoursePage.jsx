import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { getCourseLectures } from '../../redux/Actions/courseAction'
import Loader from '../Layout/Loader/Loader'

const CoursePage = ({ user }) => {
    const [lectureNumber, setLectureNumber] = useState(0)

    //no need of static data now, now we will get data from store
    const { lectures, loading } = useSelector(state => state.course);

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(getCourseLectures(params.id));
    }, [dispatch, params.id]);

    if (user.role !== 'admin' && (user.subscription === undefined || user.subscription.status !== 'active')) {
        return <Navigate to='/subscribe' />
    }

    return (
        loading ? (<Loader />) : (
            (lectures && lectures.length > 0) ? (
                <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
                    <Box>
                        <video
                            width={'100%'}
                            autoPlay
                            controls
                            controlsList='nodownload noremoteplayback'
                            disablePictureInPicture
                            disableRemotePlayback
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
                                        padding: '1.5rem',
                                        textAlign: 'center',
                                        margin: 0,
                                        borderBottom: '1px solid rgba(204, 204, 204, 0.4)', /* 80% opacity of #ccc */
                                    }}
                                >
                                    <Text noOfLines={1} children={`#${index + 1} ${item.title}`} />

                                </button>
                            ))
                        }
                    </VStack>
                </Grid>
            ) : (
                <Heading m={'4'} children='No lectures found' />
            )
        )
    )
}

export default CoursePage