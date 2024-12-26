import { Button, Flex, Image, Input, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { loginCall, postCommonWithoutPayloadApi } from '../../services/ApiCalls';
import { toastFormatter } from '../../services/formatter';
import OTPInput from 'react-otp-input';


const ResetPassword = () => {
    const { state } = useLocation()
    console.log(state);
    const [otp, setotp] = useState('')
    const toast = useToast()
    const [passType, setpassType] = useState({mainPass:'password',confirmPass:'password'})
    const navigate = useNavigate()
    const [formData, setformData] = useState({password: '' })
    const [confirmPass, setconfirmPass] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const resetPassFn = async () => {
        try {
            if(formData.password == ''){
                toast(toastFormatter('Error',`Fill the details`,'error'))  
                return
            }
            setisLoading(true)
            let payload = {
                email_id: state.email_id,
                otp: otp,
                newPassword: formData.password
            }
            const res = await postCommonWithoutPayloadApi('/adminapi/resetPassword',payload)
            if(!res.success){
                toast(toastFormatter('Error',`${res.message}`,'error'))  
            }else{
                toast(toastFormatter('OTP sent',`${res.message}`,'success')) 
                navigate('/')
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
            <h1 style={{ color: 'rgba(255,255,255,1)', fontWeight: 600, fontSize: '2.5rem' }} >Reset Password</h1>
            <Flex flexDir={'column'} gap={'0.5rem'} w={'full'} zIndex={2}>
                <OTPInput
                    value={otp}
                    onChange={setotp}
                    numInputs={4}
                    containerStyle={{ display: 'flex', width: '100%', gap: '1rem', justifyContent: 'center' }}
                    inputStyle={{ minWidth: '33px', borderRadius: '8px', minHeight: '40px', border: '1px solid #DDDDDD' }}
                    renderInput={(props) => <input {...props} type='number' />}
                />
                <Flex flexDir={'column'} pos={'relative'} w={'full'}>
                    <Text color={'rgba(255,255,255,0.7)'} fontWeight={600} ml={'5px'} mb={'2px'} fontSize={'0.8rem'} opacity={0.8}>Password</Text>
                    <InputGroup>
                        <Input autoComplete='new-password' onKeyDown={(e) => {
                            if (e.key == 'Enter') {
                                loginFn()
                            }
                        }} value={formData?.password} onChange={(e) => setformData((prev) => ({ ...prev, password: e.target.value }))} fontSize={'0.8rem'} placeholder='Enter password..' type={passType.mainPass} bg={'white'} borderRadius={'8px'}
                            minH={'2.8rem'} />
                        <InputRightElement onClick={() => {
                            let temp = passType.mainPass == 'password' ? 'text' : 'password'
                            setpassType({...passType,mainPass:temp})
                        }}>
                            {
                                passType.mainPass == 'password' ? <LuEye style={{ marginTop: '0.3rem' }} /> : <LuEyeOff style={{ marginTop: '0.3rem' }} />
                            }
                        </InputRightElement>
                    </InputGroup>
                </Flex>
                <Flex flexDir={'column'} pos={'relative'} w={'full'}>
                    <Text color={'rgba(255,255,255,0.7)'} fontWeight={600} ml={'5px'} mb={'2px'} fontSize={'0.8rem'} opacity={0.8}>Confirm Password</Text>
                    <InputGroup>
                        <Input autoComplete='new-password' onKeyDown={(e) => {
                            if (e.key == 'Enter') {
                                loginFn()
                            }
                        }} value={confirmPass} onChange={(e) => setconfirmPass(e.target.value)} fontSize={'0.8rem'} placeholder='Enter password..' type={passType.confirmPass} bg={'white'} borderRadius={'8px'}
                            minH={'2.8rem'} />
                        <InputRightElement onClick={() => {
                            let temp = passType.confirmPass == 'password' ? 'text' : 'password'
                            setpassType({...passType,confirmPass:temp})
                        }}>
                            {
                                passType.confirmPass == 'password' ? <LuEye style={{ marginTop: '0.3rem' }} /> : <LuEyeOff style={{ marginTop: '0.3rem' }} />
                            }
                        </InputRightElement>
                    </InputGroup>
                    {confirmPass?.length>0 &&(formData?.password != confirmPass) && <Text color={'#ff9696'} fontWeight={600} fontSize={'0.8rem'} opacity={0.8}>Password not matching</Text>}
                </Flex>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <Button isLoading={isLoading} isDisabled={!confirmPass || otp.length!=4 || !formData.password ||(formData.password != confirmPass)} onClick={resetPassFn} w={'full'} bg={'white'} _hover={{ backgroundColor: 'white' }} borderRadius={'8px'} p={'0.6rem'} fontWeight={500} >Login</Button>
                    {/* <Link to={'/signup'} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem',marginTop:'0.7rem' }}>Create new account?</Link> */}
                </div>
            </Flex>
        </Flex>
    )
}

export default ResetPassword