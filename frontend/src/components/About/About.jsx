import { Avatar, Box, Button, Container, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

import dp from '../../assets/images/profilePic.jpg'
import Intro from '../../assets/videos/Intro.mp4'
import data from '../../assets/docs/termsAndCondition'
import { RiSecurePaymentFill } from 'react-icons/ri'


const Founder = () => {
    return (
        <Stack direction={['column', 'row']} spacing={['4', '16']} padding={'8'}>
            <VStack>
                <Avatar boxSize={['40', '48']} src={dp} />
                <Text children={'Co-Founder'} opacity={0.7} />
            </VStack>
            <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
                <Heading children={'Himanshu Baurai'} size={['md', 'xl']} />
                <Text children={'Hi, I am a full stack developer and a tech enthusiast. Our aim is to make things simple to use but  yet elegant and functional in all aspects.'} textAlign={['center', 'left']} />
            </VStack>
        </Stack>
    )
}

const VideoPlayer = () => {
    return (
        <Box>
            <video
                autoPlay
                muted
                loop
                controls
                controlsList='nodownload nofullscreen noremoteplayback'
                disablePictureInPicture
                disableRemotePlayback
                src={Intro}>
            </video>
        </Box>
    );
}

const TandC = ({ termsAndConditions }) => {
    return (
        <Box padding={'8'} boxShadow={'lg'} overflowY={'scroll'}>
            <Heading
                size={'md'}
                textAlign={['center', 'left']}
                fontFamily={'body'}
                color={'pink.400'}
                children='Terms and Conditions'
            />
            <Box h='sm' p={'4'}>
                <Text
                    textAlign={['center', 'left']}
                    fontFamily={'heading'}
                    children={termsAndConditions}
                />
                <Heading my={'4'} size={'xs'} children={'Refund only applicable for cancellation within 7days'} />
            </Box>
        </Box>
    )
}

const About = () => {
    return (
        <Container maxW="container.lg" padding={'16'} boxShadow={'lg'}>

            <Heading children={'About us'} textAlign={['center', 'left']} />

            <Founder />

            <Stack direction={['column', 'row']} alignItems={'center'} padding={'8'}>
                <Text children={'Embark on a journey of knowledge and entertainment with our exclusive video streaming platform. Elevate your learning experience with a curated selection of premium courses, accessible only to our valued premium users. Unlock a world of insights, skill-building, and personal growth at your fingertips. Join our community and indulge in the best of education and entertainment, tailored just for you. Enrich your mind, empower your skills, and become a part of a platform that goes beyond streaming – its an immersive educational experience for our premium members.'} textAlign={['center', 'left']} fontFamily={'cursive'} />
                {/* <Text children={'We are a video streaming platform with some premium courses available only for premiuim users'} textAlign={['center', 'left']} fontFamily={'cursive'} /> */}
                <Link to={'/subscribe'}>
                    <Button variant={'ghost'} colorScheme={'green'} children={'Check Out Our Plans'} />
                </Link>
            </Stack>

            <VideoPlayer />

            <TandC termsAndConditions={data} />

            <HStack my={'4'} p={'4'}>
                <RiSecurePaymentFill />
                <Heading
                    size={'xs'}
                    fontFamily={'sans-serif'}
                    textTransform={'uppercase'}
                    children={'Payment is 100% secure by Razorpay'} />
            </HStack>


        </Container>
    )
}

export default About