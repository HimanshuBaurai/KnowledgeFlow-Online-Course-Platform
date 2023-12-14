import { Box, Grid } from '@chakra-ui/react'
import React from 'react'
import cursor from '../../../assets/images/cursor.png'
import SideBar from '../SideBar'

const Users = () => {
    return (
        <Grid
            templateColumns={['1fr', '5fr 1fr']}
            minH={'100vh'}
            css={{ cursor: `url(${cursor}), default` }}
        >
            <Box></Box>
            <SideBar />
        </Grid>
    )
}  
export default Users