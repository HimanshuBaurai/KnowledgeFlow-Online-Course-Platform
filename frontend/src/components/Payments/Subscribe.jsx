import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Subscribe = () => {
  return (
    <Container h='90vh' p={'16'}>
      <Heading children='Welcome' my={'8'} textAlign={'center'} />

      <VStack boxShadow={'lg'} alignItems={'stretch'} borderRadius={'lg'} spacing={'0'}>

        <Box bg={'yellow.400'} p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
          <Text color={'black'} children={'Pro Plan - ₹299.00'} />
        </Box>

        <Box p={'4'}>
          <VStack textAlign={'center'} px={'8'} mt={
            '4'} spacing={'8'}>
            <Text children={'Join Pro Plan and Get access to all the courses'} />
            <Heading size={'md'} children={'₹299 only'} />
          </VStack>

          <Button my={'8'} width={'full'} colorScheme={'yellow'} children={'Buy Now'} />
        </Box>

        <Box bg={'blackAlpha.500'} p={'4'} css={{ borderRadius: '0 0 8px 8px' }}>
          <Heading size={'sm'} color={'white'} textTransform={'uppercase'} children={'100%  refund at cancellation'} />
          <Text fontSize={'xs'} color={'white'} children={'Terms and Conditions Apply'} />
        </Box>

      </VStack>
    </Container>
  )
}

export default Subscribe