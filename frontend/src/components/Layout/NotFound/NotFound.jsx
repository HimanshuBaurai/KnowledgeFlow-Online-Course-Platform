import { Button, Container, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <Container h='90vh' p={'16'}>
            <VStack h='full' justifyContent={'center'} spacing={'4'}>
            <RiErrorWarningFill size={'8rem'}/>
            <Heading children='Page Not Found' />
                <Link to={'/'}>
                    <Button width={'full'} variant={'ghost'} children={'Go to home'} />
                </Link>
            </VStack>
        </Container>
    )
}

export default NotFound