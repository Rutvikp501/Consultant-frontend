import { Flex, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import LoderAnimation from '../../components/Loader/LoderAnimation'
import { postCommonApi } from '../../src/services/ApiCalls'

const SingleProfile = () => {
    const { id } = useParams()
    const [isLoading, setisLoading] = useState(true)
    const [profileDetails, setprofileDetails] = useState({})
    const getProfileDetails = useCallback(async () => {
        try {
            setisLoading(true)
            let payload = {
                UserId:id
            }
            const res = await postCommonApi(`/adminapi/getUserData`,payload)
            console.log(res);
            if (res?.success) {
                setprofileDetails(res?.data)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setisLoading(false)
        }
    }, [])
    useEffect(() => {
        if (id)
            getProfileDetails()
    }, [id])
    return (
        <Flex bg={'var(--blue-color)'} h={'100vh'} flexDir={'column'} pos={'relative'}>
            <Image src='/images/bg-design1.png' pos={'fixed'} width={'50%'} top={'-4rem'} right={'-7rem'} zIndex={1} />
            <>
                <Flex minH={'8vh'} px={'1rem'} gap={'1rem'} alignItems={'center'}>
                    <Link to={'/dashboard'}>
                        <Flex gap={'0.8rem'} color={'white'}>
                            <IoIosArrowBack fontSize={'1.5rem'} />
                            <Text>Dashboard</Text>
                        </Flex>
                    </Link>
                </Flex>
                <Flex pos={'relative'} zIndex={2} flexDir={'column'} h={'92vh'} bg={'white'} borderRadius={'10px 10px 0 0'}>
                    {
                        isLoading ?
                            <Flex m={'auto'}>
                                <LoderAnimation />
                            </Flex> :
                            <>
                                <Flex flexDir={'column'} p={'1rem'} gap={'0.5rem'}>
                                </Flex>
                            </>
                    }
                </Flex>
            </>

        </Flex>
    )
}

export default SingleProfile