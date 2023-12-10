import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import { TiSocialLinkedinCircular, TiSocialInstagramCircular, TiSocialGithub } from 'react-icons/ti'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <Box bg={'blackAlpha.800'} padding={'4'} minH={'10vh'} >
            <Stack direction={['column', 'row']} justifyContent={['center', 'space-evenly']} alignItems={'center'} >
                <VStack alignItems={['center', 'flex-start']} width={'full'}>
                    <Heading children='All Rights Reserved' color={'white'} />
                    <Heading
                        fontFamily={'body'}
                        size={'sm'}
                        children='© 2021'
                        color={'yellow.400'}
                    />
                </VStack>
                <HStack spacing={['2', '10']} justifyContent={'center'}>
                    <Link to={'www.linkedin.com/in/himanshu-baurai-283b4022a'} target='_blank' rel='noreferrer'>
                        <TiSocialLinkedinCircular size={'2rem'} color={'white'} />
                    </Link>
                    <Link to={'https://instagram.com/himanshu_baurai?igshid=MzMyNGUyNmU2YQ=='} target='_blank' rel='noreferrer'>
                        <TiSocialInstagramCircular size={'2rem'} color={'white'} />
                    </Link>
                    <Link to={'https://github.com/HimanshuBaurai'} target='_blank' rel='noreferrer'>
                        <TiSocialGithub size={'2rem'} color={'white'} />
                    </Link>
                </HStack>
            </Stack>
        </Box >
    )
}

export default Footer