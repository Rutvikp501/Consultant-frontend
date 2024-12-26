import { Button, Flex, Image, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LuEye, LuEyeOff } from 'react-icons/lu';


const Signup = () => {
    const [passTypes, setpassTypes] = useState({password:'password',cfrmPassword:'password'})
    return (
        <Flex pos={'relative'} bg={'var(--blue-color)'} p={'1.5rem'} w={'full'} flexDir={'column'} alignItems={'center'} justifyContent={'center'} flex={'1'} gap={'1rem'}>
            <Image src='/images/bg-design1.png' pos={'fixed'} width={'50%'} top={'-4rem'} right={'-7rem'} zIndex={1} />
            <Image src='/images/bg-design1.png' pos={'fixed'} width={'50%'} bottom={'-1rem'} left={'-5rem'} zIndex={1} />
            <h1 style={{ color: 'rgba(255,255,255,1)', fontWeight: 600, fontSize: '2.5rem' }} >Signup</h1>
            <Flex flexDir={'column'} gap={'1rem'} w={'full'}>
            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', width: '100%' }}>
                <Text color={'rgba(255,255,255,0.7)'} fontWeight={600} ml={'5px'} mb={'2px'} fontSize={'0.8rem'} opacity={0.8}>Email</Text>
                <Input fontSize={'0.8rem'} placeholder='Enter email..' type='email' bg={'white'} borderRadius={'8px'} minH={'2.8rem'} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', width: '100%' }}>
                <Text color={'rgba(255,255,255,0.7)'} fontWeight={600} ml={'5px'} mb={'2px'} fontSize={'0.8rem'} opacity={0.8}>Password</Text>
                <InputGroup>
                    <Input fontSize={'0.8rem'} placeholder='Enter password..' type={passTypes.password} bg={'white'} borderRadius={'8px'}
                        minH={'2.8rem'} />
                        <InputRightElement onClick={()=>{
                            setpassTypes((prev)=>({...prev,password:prev.password =='password'?'text':'password'}))
                        }}>
                           {
                            passTypes.password == 'password'?<LuEye style={{marginTop:'0.3rem'}} />:<LuEyeOff style={{marginTop:'0.3rem'}} />
                           }
                        </InputRightElement>
                    </InputGroup>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', width: '100%' }}>
                <Text color={'rgba(255,255,255,0.7)'} fontWeight={600} ml={'5px'} mb={'2px'} fontSize={'0.8rem'} opacity={0.8}>Confirm Password</Text>
                <InputGroup>
                    <Input fontSize={'0.8rem'} placeholder='Enter password..' type={passTypes.cfrmPassword} bg={'white'} borderRadius={'8px'}
                        minH={'2.8rem'} />
                        <InputRightElement onClick={()=>{
                            setpassTypes((prev)=>({...prev,cfrmPassword:prev.cfrmPassword =='password'?'text':'password'}))
                        }}>
                           {
                            passTypes.cfrmPassword == 'password'?<LuEye style={{marginTop:'0.3rem'}} />:<LuEyeOff style={{marginTop:'0.3rem'}} />
                           }
                        </InputRightElement>
                    </InputGroup>
            </div>
            <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.5rem',marginTop:'0.5rem'}}>
                <Button w={'full'} bg={'white'} borderRadius={'8px'} p={'0.6rem'} fontWeight={500} >Signup</Button>
                <Link to={'/'} style={{color:'rgba(255,255,255,0.6)',fontSize:'0.9rem',marginTop:'0.7rem'}}>Already have an account?</Link>
            </div>
            </Flex>
        </Flex>
    )
}

export default Signup