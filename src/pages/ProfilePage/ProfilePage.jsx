import { Button, Flex, Grid, Image, Input, Text, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import Card1 from '../../components/Cards/Card1'
import { FaPlus } from 'react-icons/fa'
import { dummyLeadsCall, getCommonApi, postCommonApi } from '../../services/ApiCalls'
import LoderAnimation from '../../components/Loader/LoderAnimation'
import InputWrapper from '../../components/InputWrapper'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { getSessionUserID, toastFormatter } from '../../services/formatter'

const ProfilePage = () => {
    const [isLoading, setisLoading] = useState(true)
    const [leads, setleads] = useState({})
    const getLeads = useCallback(async () => {
        console.log(leads);
        
        try {
            setisLoading(true)
            let payload = {
                UserId: getSessionUserID()
            }
            const res = await postCommonApi(`/adminapi/getUserData`, payload)
            if (res?.success) {
                setleads(res?.data)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setisLoading(false)
        }
    }, [])
    useEffect(() => {
        getLeads()
    }, [])
    return (
        <Flex bg={'var(--blue-color)'} h={'100vh'} flexDir={'column'} pos={'relative'}>
            <Image src='/images/bg-design1.png' pos={'fixed'} width={'50%'} top={'-4rem'} right={'-7rem'} zIndex={1} />
            <>
            <Flex minH={'8vh'} px={'1rem'} gap={'1rem'} alignItems={'center'} justify={'space-between'}>
            <Link to={'/dashboard'}>
                        <Flex gap={'0.8rem'} color={'white'}>
                            <IoIosArrowBack fontSize={'1.5rem'} />
                            <Text>Home</Text>
                        </Flex>
                    </Link>
                <Image src='/images/image-top.png' h={'2rem'} />
            </Flex>
                <Flex pos={'relative'} zIndex={2} flexDir={'column'} flex={'1'} bg={'white'} borderRadius={'10px 10px 0 0'} p={'1rem'}>
                    <Flex gap={'1.2rem'} flexDir={'column'}>
                        <Text ml={'0.5rem'} fontWeight={600}>Profile</Text>
                        {
                            isLoading ?
                                <>
                                    <LoderAnimation />
                                </> :
                                <Grid templateColumns={'repeat(1,1fr)'} gap={'1rem'}>
                                    <InputWrapper title={'Code'}>
                                        <Input isDisabled value={leads?.code} onChange={(e) => { setleads((prev) => ({ ...prev, code: e.target.value })) }} type={'text'} placeholder={'Enter name'} />
                                    </InputWrapper>
                                    <InputWrapper title={'Name'}>
                                        <Input isDisabled value={leads?.name} onChange={(e) => { setleads((prev) => ({ ...prev, name: e.target.value })) }} type={'text'} placeholder={'Enter name'} />
                                    </InputWrapper>
                                    <InputWrapper title={'Email'}>
                                        <Input isDisabled value={leads?.email_id} onChange={(e) => { setleads((prev) => ({ ...prev, email_id: e.target.value })) }} type={'email'} placeholder={'Enter email'} />
                                    </InputWrapper>
                                    <InputWrapper title={'Mobile'}>
                                        <Input isDisabled value={leads?.mobile_no} onChange={(e) => { setleads((prev) => ({ ...prev, mobile_no: e.target.value })) }} type={'number'} placeholder={'Enter mobile'} />
                                    </InputWrapper>
                                </Grid>
                        }
                        <Text ml={'0.5rem'} fontWeight={600}>Consultant Assistant</Text>
                        {
                            isLoading ?
                                <>
                                    <LoderAnimation />
                                </> :
                                <Grid templateColumns={'repeat(1,1fr)'} gap={'1rem'}>
                                    <InputWrapper title={'Name'}>
                                        <Input isDisabled value={leads?.sales_assistan.name} onChange={(e) => { setleads((prev) => ({ ...prev, code: e.target.value })) }} type={'text'} placeholder={'Enter name'} />
                                    </InputWrapper>
                                    <InputWrapper title={'Mobile'}>
                                        <Input isDisabled value={leads?.sales_assistan.mobile_no} onChange={(e) => { setleads((prev) => ({ ...prev, name: e.target.value })) }} type={'text'} placeholder={'Enter mobile'} />
                                   
                                    </InputWrapper>
                                </Grid>
                        }
                    </Flex>
                </Flex>
            </>

        </Flex>
    )
}

export default ProfilePage