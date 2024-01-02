import { Box, Grid, HStack, Heading, Progress, Stack, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import cursor from '../../../assets/images/cursor.png'
import SideBar from '../SideBar'
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri'
import { DoughnutChart, LineChart } from './Chart'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboardStats } from '../../../redux/Actions/adminAction'
import Loader from '../../Layout/Loader/Loader'
import toast from 'react-hot-toast'


const DataBox = ({ title, qty, qtyPercentage, profit }) => {
    return (
        <Box
            w={['full', '20%']}
            boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
            p={'8'}
            borderRadius={'lg'}
        >
            <Text children={title} />
            <HStack spacing={'6'}>
                <Text fontSize={'2xl'} fontWeight={'bold'} children={qty} />
                <HStack>
                    <Text children={`${qtyPercentage}%`} />
                    {
                        profit ? <RiArrowUpLine color={'green'} /> : <RiArrowDownLine color={'red'} />
                    }
                </HStack>
            </HStack>
            <Text children={'Since last month'} opacity={0.5} />
        </Box>
    )
}

const Bar = ({ title, value, profit }) => {
    return (
        <Box py={'4'} px={['0', '20']}>
            <Heading size={'sm'} children={title} mb={'2'} />
            <HStack w={'full'} alignItems={'center'}>
                <Text children={profit ? '0%' : `${-value}%`} />
                <Progress w={'full'} colorScheme='purple' value={profit ? value : 0} />
                <Text children={`${value > 100 ? value : 100}`} />
            </HStack>
        </Box>
    )
}

const DashBoard = () => {
    const dispatch = useDispatch();
    const {
        loading,
        error,
        stats,
        usersCount,
        subscriptionCount,
        viewsCount,
        usersPercentage,
        subscriptionPercentage,
        viewsPercentage,
        usersProfit,
        subscriptionProfit,
        viewsProfit,
    } = useSelector(state => state.admin);


    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }

        dispatch(getDashboardStats());
    }, [dispatch, error])


    return (
        <Grid
            templateColumns={['1fr', '5fr 1fr']}
            minH={'100vh'}
            css={{ cursor: `url(${cursor}), default` }}
        >
            {
                loading || !stats ? (<Loader color='purple.400' />) : (
                    <Box boxSizing='border-box' py={'16'} px={['4', '0']}>
                        <Text
                            textAlign='center'
                            opacity={0.5}
                            children={`Last Change was on ${String(new Date(stats[11].createdAt)).split('G')[0]}`}
                        />

                        <Heading
                            children='Dashboard'
                            textTransform={'uppercase'}
                            textAlign={['center', 'left']}
                            ml={['0', '16']}
                            mb={'16'}
                        />

                        <Stack
                            direction={['column', 'row']}
                            justifyContent={'space-evenly'}
                            minH={'24'}
                        >
                            <DataBox title="Views" qty={viewsCount} qtyPercentage={viewsPercentage} profit={viewsProfit} />
                            <DataBox title="Users" qty={usersCount} qtyPercentage={usersPercentage} profit={usersProfit} />
                            <DataBox title="Subscription" qty={subscriptionCount} qtyPercentage={subscriptionPercentage} profit={subscriptionProfit} />
                        </Stack>

                        <Box
                            m={['0', '16']}
                            borderRadius={'lg'}
                            p={['0', '16']}
                            mt={['4', '16']}
                            boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
                        >
                            <Heading
                                textAlign={['center', 'left']}
                                size={'md'}
                                children="Views Graph"
                                pt={['8', '0']}
                                ml={['0', '16']}
                            />
                            {/* line graph here  */}
                            <LineChart dataArray={stats.map(item => item.views)} />
                            {/* send only views, as stats is an object of various things */}
                        </Box>

                        <Grid templateColumns={['1fr', '2fr 1fr']}>
                            <Box p={'4'}>
                                <Heading
                                    textAlign={['center', 'left']}
                                    size={'md'}
                                    children='Progress Bar'
                                    my={'8'}
                                    ml={['0', '16']}
                                />
                                <Box>
                                    <Bar profit={viewsProfit} title={'Views'} value={viewsPercentage} />
                                    <Bar profit={usersProfit} title={'Users'} value={usersPercentage} />
                                    <Bar profit={subscriptionProfit} title={'Subscription'} value={subscriptionPercentage} />
                                </Box>
                            </Box>
                            <Box p={['0', '16']} boxSizing='border-box' py={'4'}>
                                <Heading textAlign={'center'} size={'md'} children={'Subscribed Users'} />
                                {/* Donut chart here */}
                                <DoughnutChart dataArray={[subscriptionCount, usersCount - subscriptionCount]} />
                            </Box>
                        </Grid>
                    </Box>
                )
            }
            <SideBar />
        </Grid>
    )
}

export default DashBoard