import { Button, Flex, Image, Input, InputGroup, InputRightElement, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { showAnimation } from '../../utils/FramerAnimation';
import { Link, useNavigate } from 'react-router-dom';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { loginCall } from '../../services/ApiCalls';
import { toastFormatter } from '../../services/formatter';


const Home = () => {
    const toast = useToast()
    const [passType, setpassType] = useState('password')
    const navigate = useNavigate()
    const [formData, setformData] = useState({email_id:'',password:''})
    const [isLoading, setisLoading] = useState(false)
    const loginFn = async () => {
        try {
            if(formData.email_id == '' && formData.password == ''){
                toast(toastFormatter('Error',`Fill the details`,'error'))  
                return
            }
            setisLoading(true)
            const res = await loginCall(formData)
            if(!res.success){
                toast(toastFormatter('Error',`${res.message}`,'error'))  
            }else{
                sessionStorage.setItem('token',res.data)
                navigate('/dashboard')
            }
        } catch (error) {
            console.error(error);
        }finally{
            setisLoading(false)
        }
    };
    return (
        <Flex  pos={'relative'} bg={'var(--blue-color)'} p={'1.5rem'} pt={'10rem'} w={'full'} flexDir={'column'} alignItems={'center'} justifyContent={'center'} flex={'1'} gap={'1rem'}>
            <Image src='/images/bg-design1.png' pos={'fixed'} width={'50%'} top={'-4rem'} right={'-7rem'} zIndex={1} />
            <Image src='/images/bg-design1.png' pos={'fixed'} width={'50%'} bottom={'-1rem'} left={'-5rem'} zIndex={1} />
            <Image src='/images/logo.png' width={'60%'} pos={"absolute"} top={'4rem'}/>
            <motion.h1 variants={showAnimation(0.5)}
                initial="hidden"
                animate="show"
                exit="hidden" style={{ color: 'rgba(255,255,255,1)', fontWeight: 600, fontSize: '2.5rem' }} >Welcome</motion.h1>
            <Flex flexDir={'column'} gap={'1rem'} w={'full'} zIndex={2}>
                <motion.div variants={showAnimation(1)}
                    initial="hidden"
                    animate="show"
                    exit="hidden" style={{ display: 'flex', flexDirection: 'column', position: 'relative', width: '100%' }}>
                    <Text color={'rgba(255,255,255,0.7)'} fontWeight={600} ml={'5px'} mb={'2px'} fontSize={'0.8rem'} opacity={0.8}>Email</Text>
                    <Input value={formData?.email_id} onChange={(e)=>setformData((prev)=>({...prev,email_id:e.target.value}))} fontSize={'0.8rem'} placeholder='Enter email..' type='email' bg={'white'} borderRadius={'8px'} minH={'2.8rem'} />
                </motion.div>
                <motion.div variants={showAnimation(1.5)}
                    initial="hidden"
                    animate="show"
                    exit="hidden" style={{ display: 'flex', flexDirection: 'column', position: 'relative', width: '100%' }}>
                    <Text color={'rgba(255,255,255,0.7)'} fontWeight={600} ml={'5px'} mb={'2px'} fontSize={'0.8rem'} opacity={0.8}>Password</Text>
                    <InputGroup>
                    <Input onKeyDown={(e)=>{
                        if(e.key == 'Enter'){
                            loginFn()
                        }
                    }} value={formData?.password} onChange={(e)=>setformData((prev)=>({...prev,password:e.target.value}))} fontSize={'0.8rem'} placeholder='Enter password..' type={passType} bg={'white'} borderRadius={'8px'}
                        minH={'2.8rem'} />
                        <InputRightElement onClick={()=>{
                            setpassType(passType=='password'?'text':'password')
                        }}>
                           {
                            passType == 'password'?<LuEye style={{marginTop:'0.3rem'}} />:<LuEyeOff style={{marginTop:'0.3rem'}} />
                           }
                        </InputRightElement>
                    </InputGroup>
                    <Link to={'/forgot-password'} style={{color:'white',fontSize:'0.8rem',marginLeft:'auto',marginTop:'0.2rem'}}>Forgot password</Link>
                </motion.div>
                <motion.div variants={showAnimation(2)}
                    initial="hidden"
                    animate="show"
                    exit="hidden" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <Button isLoading={isLoading} isDisabled={!formData.email_id || !formData.password} onClick={loginFn} w={'full'} bg={'white'} _hover={{backgroundColor:'white'}} borderRadius={'8px'} p={'0.6rem'} fontWeight={500} >Login</Button>
                    {/* <Link to={'/signup'} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem',marginTop:'0.7rem' }}>Create new account?</Link> */}
                </motion.div>
            </Flex>
        </Flex>
    )
}

export default Home