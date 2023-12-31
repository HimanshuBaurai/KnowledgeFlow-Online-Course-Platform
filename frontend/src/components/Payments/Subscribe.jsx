import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buySubscription } from '../../redux/Actions/userAction';
import axios from 'axios';
import { ServerURL } from '../../redux/Store.js';
import toast from 'react-hot-toast';
import vg from '../../assets/images/vg.jpeg';

const Subscribe = ({user}) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState('');

  const { loading, error, subscriptionId } = useSelector(state => state.subscription);

  const subscribeHandler = async () => {
    const { data } = await axios.get(`${ServerURL}/razorpaykey`);
    setKey(data.key);

    dispatch(buySubscription());
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionId) {
      //this means subscription have been created, thats why we have subscriptionId
      const openPopUp = async () => {
        const options = {
          key: key,
          name: "KnowlegdeFlow",
          description: "Get access to all premium content",
          image: vg,
          subscription_id: subscriptionId,
          callback_url: `${ServerURL}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: ""
          },
          notes: {
            address: "KnowlegdeFlow: the ultimate study platform"
          },
          theme: {
            color: "#FFC800"
          }

        };

        const razor = new window.Razorpay(options);
        razor.open();
      }

      openPopUp();

    }
  }, [dispatch, error, subscriptionId, key, user]);


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

          <Button isLoading={loading} onClick={subscribeHandler} my={'8'} width={'full'} colorScheme={'yellow'} children={'Buy Now'} />
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