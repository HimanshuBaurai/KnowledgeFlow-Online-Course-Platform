import { Button, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiAddCircleFill, RiDashboardFill, RiEyeFill, RiUser3Fill } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'


//as being used again and again we made it as a different componenet
const LinkButton = ({ url, Icon, text, active }) => {
    return (
        <Link to={`/admin/${url}`}>
            <Button colorScheme={active ? 'purple' : ''} fontSize={'larger'} variant={'ghost'}>
                <Icon style={{ margin: '4px' }} /> {text}
            </Button>
        </Link>
    )
}

const SideBar = () => {
    const location = useLocation();//to keep a track of at which address we are currently at 
    return (
        <VStack spacing={'8'} p={'16'} boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}>
            <LinkButton url={'dashboard'} Icon={RiDashboardFill} text={'Dashboard'} active={location.pathname === '/admin/dashboard'} />
            <LinkButton url={'createcourse'} Icon={RiAddCircleFill} text={'Create Course'} active={location.pathname === '/admin/createcourse'} />
            <LinkButton url={'courses'} Icon={RiEyeFill} text={'Courses'} active={location.pathname === '/admin/courses'} />
            <LinkButton url={'users'} Icon={RiUser3Fill} text={'Users'} active={location.pathname === '/admin/users'} />
        </VStack>
    )
}

export default SideBar