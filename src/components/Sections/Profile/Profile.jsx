import { Button, Flex, Grid, Image, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { memo, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSessionprofilePhotoUrl, getSessionUserName } from '../../../services/formatter'
import { IoIosArrowForward } from 'react-icons/io'

const Profile = () => {
    const navigate = useNavigate()
    const name = getSessionUserName()
    const profilePhotoUrl = getSessionprofilePhotoUrl()
    return (
        <Flex flexDir={'column'} gap={'1rem'} flex={'1'}>
            <Link to={'/profile'}>
            <Flex bg={'var(--blue-color)'} color={'white'} borderRadius={'xl'} p={'0.5rem'} alignItems={'center'} gap={'1rem'}>
                <Image borderRadius={'full'} src={profilePhotoUrl} width={'3rem'} />
                <Text fontWeight={600}>{name}</Text>
                <IoIosArrowForward style={{marginLeft:'auto',marginRight:'1rem'}} />
            </Flex>
            </Link>
            <Link to={''}></Link>
            <Button colorScheme='blue' py={'1.5rem'} w={'full'}>
                Commissions
                <IoIosArrowForward style={{marginLeft:'auto'}} />
            </Button>
            {/* <Link to={'/pdf'}>
            <Flex bg={'var(--blue-color)'} color={'white'} borderRadius={'xl'} p={'0.5rem'} alignItems={'center'} gap={'1rem'}>
            
                <Text fontWeight={600}>PDF</Text>
                <IoIosArrowForward style={{marginLeft:'auto',marginRight:'1rem'}} />
            </Flex>
            </Link> */}
            <Button colorScheme='red' mt={'auto'} mb={'3.5rem'} onClick={() => {
                sessionStorage.clear()
                navigate('/')
            }}>Log Out</Button>
        </Flex>
    )
}

export default memo(Profile)