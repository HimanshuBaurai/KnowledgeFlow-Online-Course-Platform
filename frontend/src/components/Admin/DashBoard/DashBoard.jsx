import { Box, Grid, HStack, Heading, Progress, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import cursor from '../../../assets/images/cursor.png'
import SideBar from '../SideBar'
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri'


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
    return (
        <Grid
            templateColumns={['1fr', '5fr 1fr']}
            minH={'100vh'}
            css={{ cursor: `url(${cursor}), default` }}
        >
            <Box boxSizing='border-box' py={'16'} px={['4', '0']}>
                <Text
                    textAlign='center'
                    opacity={0.5}
                    children={`Last Change was on ${String(new Date()).split('G')[0]}`}
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
                    <DataBox title="Views" qty={123} qtyPercentage={30} profit={true} />
                    <DataBox title="Users" qty={23} qtyPercentage={78} profit={true} />
                    <DataBox title="Subscription" qty={12} qtyPercentage={20} profit={false} />
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
                            <Bar profit={true} title={'Views'} value={30} />
                            <Bar profit={true} title={'Users'} value={78} />
                            <Bar profit={false} title={'Subscription'} value={20} />
                        </Box>
                    </Box>
                    <Box p={['0', '16']} boxSizing='border-box' py={'4'}>
                        <Heading textAlign={'center'} size={'md'} children={'Subscribed Users'} />
                        {/* Donut chart here */}
                    </Box>
                </Grid>
            </Box>
            <SideBar />
        </Grid>
    )
}

export default DashBoard