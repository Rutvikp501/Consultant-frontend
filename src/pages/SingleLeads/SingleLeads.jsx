import React, { useCallback, useEffect, useState } from 'react'
import { getCommonApi } from '../../services/ApiCalls'
import { Flex, Image, Text } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import LoderAnimation from '../../components/Loader/LoderAnimation'
import { IoIosArrowBack } from 'react-icons/io'
import InputWrapper from '../../components/InputWrapper'
import { DateFixer } from '../../services/formatter'
import Card3 from '../../components/Cards/Card3'

const SingleLeads = () => {
    const { id } = useParams()
    const [isLoading, setisLoading] = useState(true)
    const [leads, setleads] = useState({})
    const [packageItem, setpackageItem] = useState({})
    const getLeads = useCallback(async () => {
        try {
            setisLoading(true)
            const res = await getCommonApi(`/leadapi/getleadsview/${id}`)
           
            if (res?.success) {
                setleads(res?.data)
                setpackageItem(res?.data?.package)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setisLoading(false)
        }
    }, [])
    useEffect(() => {
        if (id)
            getLeads()
    }, [id])
    return (
        <Flex bg={'var(--blue-color)'} h={'100vh'} flexDir={'column'} pos={'relative'}>
            <Image src='/images/bg-design1.png' pos={'fixed'} width={'50%'} top={'-4rem'} right={'-7rem'} zIndex={1} />
            <>
            <Flex minH={'8vh'} px={'1rem'} gap={'1rem'} alignItems={'center'} justify={'space-between'}>
            <Link to={'/dashboard'}>
                        <Flex gap={'0.8rem'} color={'white'}>
                            <IoIosArrowBack fontSize={'1.5rem'} />
                            <Text>Leads</Text>
                        </Flex>
                    </Link>
                <Image src='/images/image-top.png' h={'2rem'} />
            </Flex>
                <Flex pos={'relative'} zIndex={2} flexDir={'column'} h={'92vh'} bg={'white'} borderRadius={'10px 10px 0 0'}>
                    {
                        isLoading ?
                            <Flex m={'auto'}>
                                <LoderAnimation />
                            </Flex> :
                            <>
                                <Flex flexDir={'column'} p={'1rem'} gap={'0.5rem'}>
                                    <Flex justifyContent={'space-between'} alignItems={'center'}>
                                        <Text fontSize={'0.8rem'} fontWeight={600}>{leads?.leadID}</Text>
                                        <Flex p={'0.3rem 0.7rem'} fontWeight={600} borderRadius={'8px'} fontSize={'0.8rem'} bg={'rgba(0,0,0,0.2)'}>{leads?.leadType}</Flex>
                                    </Flex>
                                    <Text fontSize={'1.2rem'} fontWeight={600}>{leads?.name}</Text>
                                    <Flex flexDir={'column'} gap={'1rem'} mt={'1rem'}>
                                        {
                                            leads?.events?.map((event, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <Card3 key={index} title={'Event'}>
                                                            <Text fontSize={'0.9rem'}>{event?.name}</Text>
                                                        </Card3>
                                                        <Card3 key={index} title={'Date'}>
                                                            <Text fontSize={'0.9rem'}>{DateFixer(event?.date)}</Text>
                                                        </Card3>
                                                        <Card3 key={index} title={'Location'}>
                                                            <Text fontSize={'0.9rem'}>{event?.location || 'N/A'}</Text>
                                                        </Card3>
                                                        <Card3 key={index} title={'Stage'}>
                                                            <Text fontSize={'0.9rem'}>{event?.stage || 'N/A'}</Text>
                                                        </Card3>
                                                    </React.Fragment>
                                                )
                                            })
                                        }

                                    </Flex>
                                    <Flex flexDir={'column'} gap={'0.3rem'}>
                                        {/* <Flex fontWeight={600} fontSize={'0.85rem'}>
                                            <Text>Package</Text>
                                        </Flex> */}
                                        <Flex 
  border={
    leads?.package?.name === "Pearl" ? "1px solid var(--pearl-color)" :
    leads?.package?.name === "Ruby" ? "1px solid var(--ruby-color)" :
    leads?.package?.name === "Diamond" ? "1px solid var(--diamond-color)" :
    leads?.package?.name === "Silver" ? "1px solid var(--gray-color)" :
    leads?.package?.name === "Gold" ? "1px solid var(--gold-color)" :
    leads?.package?.name === "Platinum" ? "1px solid var(--platinum-color)" :
    leads?.package?.name === "Classic" ? "1px solid var(--classic-color)" :
    leads?.package?.name === "Premium" ? "1px solid var(--premium-color)" :
    leads?.package?.name === "Luxury" ? "1px solid var(--luxury-color)" : ""
  }
  bgGradient={
    leads?.package?.name === "Pearl" ? "linear(to-br, #D0F2FF, #FEFEFE, #B5D3FF)" :
    leads?.package?.name === "Ruby" ? "linear(to-br, #FF6B6B, #FEFEFE, #FF8C8C)" :
    leads?.package?.name === "Diamond" ? "linear(to-br, #C1C1C1, #FEFEFE, #D5D5D5)" :
    leads?.package?.name === "Silver" ? "linear(to-br, #B2B1AF, #FEFEFE, #B5B5B5)" :
    leads?.package?.name === "Gold" ? "linear(to-br, #D39A4E, #FEFCBB, #FEC052)" :
    leads?.package?.name === "Platinum" ? "linear(to-br, #B4C7D6, #FEFEFE, #D4E4F2)" :
    leads?.package?.name === "Classic" ? "linear(to-br, #E1C699, #FEFEFE, #F5E4C3)" :
    leads?.package?.name === "Premium" ? "linear(to-br, #8BC34A, #FEFEFE, #AED581)" :
    leads?.package?.name === "Luxury" ? "linear(to-br, #6A1B9A, #FEFEFE, #9C27B0)" : ""
  }
  p={'0.7rem 1rem'}
  borderRadius={'10px'}
>
  <Flex justifyContent={'space-between'} w={'full'} alignItems={'center'}>
    <Flex flexDir={'column'}>
      <Text fontWeight={600} fontSize={'0.6rem'}>Package</Text>
      <Text fontWeight={600} fontSize={'0.8rem'}>{leads?.package?.name}</Text>
      {/* <Text>{leads?.package?.subname}</Text> */}
    </Flex>
    <Flex flexDir={'column'}>
    <Text fontWeight={600} fontSize={'0.6rem'}>Budget</Text>
    <Text fontSize={'1.1rem'} fontWeight={600}>{leads?.package?.amount}</Text>
    </Flex>
  </Flex>
</Flex>
                                    </Flex>
                                </Flex>
                            </>
                    }
                </Flex>
            </>

        </Flex>
    )
}

export default SingleLeads