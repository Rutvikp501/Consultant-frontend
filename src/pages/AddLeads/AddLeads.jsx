import { Button, Flex, Grid, Image, Input, Text, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import Card1 from '../../components/Cards/Card1'
import { FaPlus } from 'react-icons/fa'
import { dummyLeadsCall, postCommonApi } from '../../services/ApiCalls'
import LoderAnimation from '../../components/Loader/LoderAnimation'
import InputWrapper from '../../components/InputWrapper'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { toastFormatter } from '../../services/formatter'

const AddLeads = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const initialData = {name:'',email:'',phone:'',pincode:'',homeaddress:''}
    const [isLoading, setisLoading] = useState(true)
    const [leads, setleads] = useState(initialData)
    // const getLeads = useCallback(async () => {
    //     try {
    //         setisLoading(true)
    //         const res = await postCommonApi(`/leadapi/addLead`)
    //         if (res?.success) {
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setisLoading(false)
    //     }
    // }, [])
    const goToEvents = () => {
        const { name, email, phone, pincode, homeaddress } = leads;
        
        // Regular Expressions for email, phone, and pincode validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[0-9]{10}$/;
        const pincodeRegex = /^[0-9]{6}$/;
        
        // Check if all fields are filled and valid
        if (!name || !email || !phone || !pincode || !homeaddress) {
            toast(toastFormatter('Error', 'All fields are required', 'error'));
            return;
        }
    
        // Validation checks
        if (!emailRegex.test(email)) {
            toast(toastFormatter('Error', 'Invalid email format', 'error'));
            return;
        }
    
        if (!mobileRegex.test(phone)) {
            toast(toastFormatter('Error', 'Mobile number must be 10 digits', 'error'));
            return;
        }
    
        if (!pincodeRegex.test(pincode)) {
            toast(toastFormatter('Error', 'Pincode must be 6 digits', 'error'));
            return;
        }
    
        // Proceed to next step if all validations pass
        navigate('/addLeads/events', { state: leads });
    };
    
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
                        <Text ml={'0.5rem'} fontWeight={600}>Customer Details</Text>
                        <InputWrapper title={'Name'}>
                            <Input value={leads?.name} onChange={(e)=>{setleads((prev)=>({...prev,name:e.target.value}))}} type={'text'} placeholder={'Enter name'} />
                        </InputWrapper>
                        <InputWrapper title={'Email'}>
                            <Input value={leads?.email} onChange={(e)=>{setleads((prev)=>({...prev,email:e.target.value}))}} type={'email'} placeholder={'Enter email'} />
                        </InputWrapper>
                        <InputWrapper title={'Mobile'}>
                            <Input value={leads?.phone} onChange={(e)=>{setleads((prev)=>({...prev,phone:e.target.value}))}} type={'number'} maxLength={10} placeholder={'Enter mobile'} />
                        </InputWrapper>
                        <InputWrapper title={'Pincode'}>
                            <Input value={leads?.pincode} onChange={(e)=>{setleads((prev)=>({...prev,pincode:e.target.value}))}} type={'number'} placeholder={'Enter pincode'} />
                        </InputWrapper>
                        <InputWrapper title={'Home Address'}>
                            <Input value={leads?.homeaddress} onChange={(e)=>{setleads((prev)=>({...prev,homeaddress:e.target.value}))}} type={'text'} placeholder={'Enter Home Address'} />
                        </InputWrapper>
                        <Button onClick={goToEvents} w={'full'} bg={'#59509B'} _hover={{bg:'#59509B'}} color={'white'} size={'sm'} py={'1.4rem'} borderRadius={'lg'} rightIcon={<IoIosArrowForward />}>
                            Continue
                        </Button>
                    </Flex>
                </Flex>
            </>

        </Flex>
    )
}

export default AddLeads