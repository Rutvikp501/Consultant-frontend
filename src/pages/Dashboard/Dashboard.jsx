import { Button, Flex, Grid, Image, TabList, Tabs, Tab, Text, TabPanels, TabPanel } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import Card2 from '../../components/Cards/Card2'
import { getCommonApi } from '../../services/ApiCalls'
import LoderAnimation from '../../components/Loader/LoderAnimation'
import { FiHome, FiUser } from 'react-icons/fi'
import { FaList, FaPlus } from 'react-icons/fa'
import { LuCopyCheck } from 'react-icons/lu'
import Profile from '../../components/Sections/Profile/Profile'
import { getSessionUserName } from '../../services/formatter'
import Converted from '../../components/Sections/Converted/Converted'
import Leads from '../../components/Sections/Leads/Leads'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const [selectedTab, setSelectedTab] = useState("Tab 1");
    const token = sessionStorage.getItem('token')
    const [isLoading, setisLoading] = useState(false)
    const [leads, setleads] = useState([])
    const getLeads = async () => {
        try {
            setisLoading(true)
            const res = await getCommonApi('/leadapi/getDashboardData')
            if (res?.success) {
                setleads(res?.data)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setisLoading(false)
        }
    };
    useEffect(() => {
        getLeads()
    }, [])
    const [index, setIndex] = useState(0);

    const handleChangeIndex = (newIndex) => {
        setIndex(newIndex);
    };
    const name = getSessionUserName()
    return (
        <Flex bg={'var(--blue-color)'} h={'100vh'} flexDir={'column'} pos={'relative'}>
            <Image src='/images/bg-design1.png' pos={'fixed'} width={'50%'} top={'-4rem'} right={'-7rem'} zIndex={0} />
            {/* User profile */}
            <Flex minH={'8vh'} px={'1rem'} gap={'1rem'} alignItems={'center'} justify={'space-between'}>
                <Text noOfLines={1} fontWeight={600} color={'white'} fontSize={'1rem'}>{name}</Text>
                <Image src='/images/image-top.png' h={'2rem'} />
            </Flex>
            {/* User profile */}
            <Flex flexDir={'column'} h={'92vh'} bg={'white'} pos={'relative'} zIndex={1}>
                <Tabs>
                    <TabList w={'full'} h={'7vh'}>
                        <Tab w={'full'} p={'0.8rem'}><FiHome fontSize={'1.2rem'} /></Tab>
                        <Tab w={'full'} p={'0.8rem'}><FaList fontSize={'1.2rem'} /></Tab>
                        <Tab w={'full'} p={'0.8rem'}><LuCopyCheck fontSize={'1.2rem'} /></Tab>
                        <Tab w={'full'} p={'0.8rem'}><FiUser fontSize={'1.2rem'} /></Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Flex flexDir={'column'} gap={'0.8rem'} h={'80vh'} overflowY={'auto'}>
                                <Text fontWeight={600}>What do you want to do today?</Text>
                                {
                                    isLoading ? <LoderAnimation /> :
                                        <Grid templateColumns={'repeat(1,1fr)'} className='leadCards' gap={'0.8rem'}>
                                            {
                                                leads?.map((item, index) => (
                                                    <Card2 key={index} item={item} />
                                                ))
                                            }
                                        </Grid>
                                }
                                <Link to={'/addLeads'} style={{display:'flex',width:'fit-content',position:'fixed',right:'25px',bottom:'35px'}}>
                                    <Button bg={'#59509B'} _hover={{ bg: '#59509B' }} color={'white'} w={'3.5rem'} h={'3.5rem'} borderRadius={'full'}>
                                    <FaPlus />
                                    </Button>
                                </Link>
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex flexDir={'column'} gap={'0.8rem'} h={'80vh'} overflowY={'auto'}>
                                <Leads />
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex flexDir={'column'} gap={'0.8rem'} h={'80vh'} overflowY={'auto'}>
                                <Converted />
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex flexDir={'column'} gap={'0.8rem'} h={'80vh'} overflowY={'auto'}>
                                <Profile />
                            </Flex>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Flex>
    )
}

export default Dashboard