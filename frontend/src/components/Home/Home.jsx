import { Box, Button, HStack, Heading, Image, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import './Home.scss'
import { Link } from 'react-router-dom'

import vg from '../../assets/images/vg.jpeg'
import { CgGoogle, CgYoutube } from 'react-icons/cg'
import { SiCoursera, SiUdemy } from 'react-icons/si'
import { DiAws } from 'react-icons/di'

import Intro from '../../assets/videos/Intro.mp4'

const Home = () => {
    return (
        <section className='home'>
            <div className='container'>
                <Stack
                    direction={['column', 'row']}
                    height='100%'
                    justifyContent={['center', 'space-between']}
                    alignItems='center'
                    spacing={['16', '56']}
                    // className='container-stack'
                >
                    <VStack width={'full'} alignItems={['center', 'flex-end']} spacing={'6'}>
                        <Heading size={'2xl'} children='IGNITE YOUR KNOWLEDGE' />
                        {/* <Heading size={'2xl'} children='LEARN FROM THE EXPERTS' /> */}
                        <Text textAlign={['center','left']} fontFamily={'cursive'} children='"Discover Premium Knowledge at Affordable Rates."' />
                        {/* <Text textAlign={['center','left']} fontFamily={'cursive'} children='Find Valuable Content At Reasonable Price' /> */}
                        <Link to={'/courses'}>
                            <Button size={'lg'} colorScheme='pink'>
                                Explore Now
                            </Button>
                        </Link>
                    </VStack>
                    <Image className='vector-graphics' boxSize={'sm'} src={vg} objectFit='contain' />
                </Stack>
            </div>
            <Box padding={'8'} bg={'blackAlpha.800'}>
                <Heading
                    textAlign={'center'}
                    fontFamily={'body'}
                    color={'pink.400'}
                    children='OUR PARTNERS'
                />
                <HStack className='brandsBanner' justifyContent={'space-evenly'} marginTop={'4'}>
                    <CgGoogle />
                    <CgYoutube />
                    <SiCoursera />
                    <SiUdemy />
                    <DiAws />
                </HStack>
            </Box>
            <div className='container-2'>
                <video 
                autoPlay  
                controls 
                controlsList='nodownload nofullscreen noremoteplayback'
                disablePictureInPicture
                disableRemotePlayback 
                src={Intro}></video>
            </div>
        </section>
    )
}

export default Home
