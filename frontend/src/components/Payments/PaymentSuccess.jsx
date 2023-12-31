import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { Link, useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {
    const reference = useSearchParams()[0].get('reference');

    return (
        <Container h='90vh' p={'16'}>
            <Heading children='You have a Pro Plan' my={'8'} textAlign={'center'} />

            <VStack boxShadow={'lg'} pb={'10'} alignItems={'center'} borderRadius={'lg'} spacing={'0'}>
                <Box w={'full'} bg={'yellow.400'} p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
                    <Text color={'black'} children={'Payment Success'} />
                </Box>

                <Box p={'4'}>
                    <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
                        <Text children={'You have successfully subscribed to Pro Plan'} />
                        <Heading size={'4xl'}>
                            <RiCheckboxCircleFill />
                        </Heading>
                    </VStack>
                </Box>

                <Link to={'/profile'}>
                    <Button my={'8'} width={'full'} colorScheme={'purple'} variant={'ghost'} children={'Go to Profile'} />
                </Link>

                <Heading size={'xs'} children={`Reference: ${reference}`} />
            </VStack>
        </Container>
    )
}

export default PaymentSuccess