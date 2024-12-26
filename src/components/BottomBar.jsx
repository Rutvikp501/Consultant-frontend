import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { FaList } from 'react-icons/fa'
import { FiHome, FiUser } from 'react-icons/fi'
import { LuCopyCheck } from 'react-icons/lu'
import { Link, useLocation } from 'react-router-dom'

const BottomBar = () => {
    const { pathname } = useLocation()
    const navList = [
        {
            label: 'Home',
            icon: <FiHome fontSize={'1.2rem'} />,
            url: '/dashboard'
        },
        {
            label: 'Your Leads',
            icon: <FaList fontSize={'1.2rem'} />,
            url: '/leads'
        },
        {
            label: 'Converted',
            icon: <LuCopyCheck fontSize={'1.2rem'} />,
            url: '/converted'
        },
        {
            label: 'Profile',
            icon: <FiUser fontSize={'1.2rem'} />,
            url: '/profile'
        },
    ]
    return (
        <Flex bg={'white'} zIndex={'9999'} pos={'fixed'} bottom={0} w={'full'} mt={'auto'} color={'var(--black-color)'} h={'10vh'} px={'1.5rem'} alignItems={'center'} justifyContent={'space-between'} boxShadow={' rgba(149, 157, 165, 0.2) 0px 0px 15px'}>
            {
                navList?.map((nav, index) => {
                    return <Link key={index} to={nav?.url}>
                        <Flex color={pathname == nav?.url ? 'var(--blue1-color)' : ''} gap={'0.3rem'} flexDir={'column'} alignItems={'center'}>
                            {nav?.icon}
                            <Text fontSize={'0.7rem'}>{nav?.label}</Text>
                        </Flex>
                    </Link>
                })
            }
        </Flex>
    )
}

export default BottomBar