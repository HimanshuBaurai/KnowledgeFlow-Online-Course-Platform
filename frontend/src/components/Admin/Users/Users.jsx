import { Box, Button, Grid, HStack, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import cursor from '../../../assets/images/cursor.png'
import SideBar from '../SideBar'
import { RiDeleteBin7Fill } from 'react-icons/ri'




const Row = ({ item, updateHandler,deleteButtonHandler }) => {
    return (
        <Tr>
            <Td>#{item._id}</Td>
            <Td>{item.name}</Td>
            <Td>{item.email}</Td>
            <Td>{item.role}</Td>
            <Td>{item.subscription.status === 'active' ? 'Active' : 'Not Active'}</Td>
            <Td isNumeric>
                <HStack justifyContent={'flex-end'}>
                    <Button variant={'outline'} colorScheme={'purple'} onClick={()=>updateHandler(item._id)}>Change Role</Button>
                    <Button color={'purple.600'} onClick={()=>deleteButtonHandler(item._id)}>
                        <RiDeleteBin7Fill />
                    </Button>

                </HStack>
            </Td>
        </Tr>

    )
}

const Users = () => {
    const users = [{
        _id: 1,
        name: 'John Doe',
        email: 'absc@gmail.com',
        role: 'admin',
        subscription: {
            status: 'active'
        },
        action: 1
    }]//temp data

    const updateHandler = (id) => {
        console.log(id)
    }
    const deleteButtonHandler = (id) => {
        console.log(id)
    }

    return (
        <Grid
            templateColumns={['1fr', '5fr 1fr']}
            minH={'100vh'}
            css={{ cursor: `url(${cursor}), default` }}
        >
            <Box p={['0', '16']} overflowX={'auto'}>
                <Heading
                    textTransform={'uppercase'}
                    children={'All Users'}
                    my={'16'}
                    textAlign={['center', 'left']}
                />
                <TableContainer w={['100vw', 'full']}>
                    <Table variant="simple" size={'lg'}>
                        <TableCaption>All available users in the database</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Role</Th>
                                <Th>Subscription</Th>
                                <Th isNumeric>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                users.map((item) => (
                                    <Row key={item._id} item={item} updateHandler={updateHandler} deleteButtonHandler={deleteButtonHandler}/>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
            <SideBar />
        </Grid>
    )
}
export default Users