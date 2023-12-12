import { Button, Container, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiErrorWarningFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const PaymentFail = () => {
    return (
        <Container h='90vh' p={'16'}>
            <VStack h='full' justifyContent={'center'} spacing={'4'}>
            <RiErrorWarningFill size={'8rem'}/>
            <Heading children='Payment Failed' />
                <Link to={'/subscribe'}>
                    <Button width={'full'} variant={'ghost'} children={'Retry'} />
                </Link>
            </VStack>
        </Container>
    )
}

export default PaymentFail