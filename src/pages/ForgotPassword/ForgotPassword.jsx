import { Button, Flex, Image, Input, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { loginCall, postCommonWithoutPayloadApi } from '../../services/ApiCalls';
import { toastFormatter } from '../../services/formatter';


const ForgotPassword = () => {
    const toast = useToast()
    const [passType, setpassType] = useState('password')
    const navigate = useNavigate()
    const [formData, setformData] = useState({email_id:''})
    const [isLoading, setisLoading] = useState(false)
    const forgotPassFn = async () => {
        try {
            if(formData.email_id == ''){
                toast(toastFormatter('Error',`Fill the details`,'error'))  
                return
            }
            setisLoading(true)
            const res = await postCommonWithoutPayloadApi('/adminapi/forgotPassword',formData)
            if(!res.success){
                toast(toastFormatter('Error',`${res.message}`,'error'))  
            }else{
                toast(toastFormatter('OTP sent',`${res.message}`,'success')) 
                navigate('/reset-password',{state:formData})
            }
        } catch (error) {
            console.error(error);
        }finally{
            setisLoading(false)
        }
    };
    return (
        <Flex pos={'relative'} bg={'var(--blue-color)'} p={'1.5rem'} w={'full'} flexDir={'column'} alignItems={'center'} justifyContent={'center'} flex={'1'} gap={'1rem'}>
            <Image src='/images/bg-design1.png' pos={'fixed'} width={'50%'} top={'-4rem'} right={'-7rem'} zIndex={1} />
            <Image src='/images/bg-design1.png' pos={'fixed'} width={'50%'} bottom={'-1rem'} left={'-5rem'} zIndex={1} />
            <h1 style={{ color: 'rgba(255,255,255,1)', fontWeight: 600, fontSize: '2.5rem' }} >Forgot Password</h1>
            <Flex flexDir={'column'} gap={'1rem'} w={'full'} zIndex={2}>
                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', width: '100%' }}>
                    <Text color={'rgba(255,255,255,0.7)'} fontWeight={600} ml={'5px'} mb={'2px'} fontSize={'0.8rem'} opacity={0.8}>Email</Text>
                    <Input value={formData?.email_id} onChange={(e)=>setformData((prev)=>({...prev,email_id:e.target.value}))} fontSize={'0.8rem'} placeholder='Enter email..' type='email' bg={'white'} borderRadius={'8px'} minH={'2.8rem'} />
                </div>
                    <Button isLoading={isLoading} isDisabled={!formData.email_id} onClick={forgotPassFn} w={'full'} bg={'white'} _hover={{backgroundColor:'white'}} borderRadius={'8px'} p={'0.6rem'} fontWeight={500} >Submit</Button>
                    <Flex justifyContent="center" mt="0.2rem">
    <Link to={'/'} style={{ color: 'white', fontSize: '0.8rem' }}>Remember password?</Link>
</Flex>  </Flex>
        </Flex>
    )
}

export default ForgotPassword