import React, { useCallback, useEffect, useState } from 'react'
import { getCommonApi } from '../../services/ApiCalls'
import { Box, Flex, Grid, Image, Stat, StatHelpText, StatLabel, StatNumber, Text } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import LoderAnimation from '../../components/Loader/LoderAnimation'
import { IoIosArrowBack } from 'react-icons/io'
import InputWrapper from '../../components/InputWrapper'
import { DateFixer } from '../../services/formatter'
import Card3 from '../../components/Cards/Card3'

const SingleConvertedLeads = () => {
    const { id } = useParams()
    const [isLoading, setisLoading] = useState(true)
    const [leads, setleads] = useState({})
    const [invoiceList, setinvoiceList] = useState({})
    const getLeads = useCallback(async () => {
        try {
            setisLoading(true)
            const res = await getCommonApi(`/leadapi/getconvertedleadsview/${id}`)
            if (res?.success) {
                console.log(res?.data);
                
                setleads(res?.data)
                setinvoiceList(res?.data?.invoice)
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
                                   { leads?.events?.map((event, index) => {
                                                return (
                                                        <Card3 key={index} title={'Event'}>
                                                            <Text fontSize={'0.9rem'}>{event?.name}</Text>
                                                        </Card3>
                                                )
                                            })}
                                        <Card3 title={'Phone'}>
                                            <Text fontSize={'0.9rem'}>{leads?.phone}</Text>
                                        </Card3>
                                        <Card3 title={'Email'}>
                                            <Text fontSize={'0.9rem'}>{leads?.email}</Text>
                                        </Card3>
                                    </Flex>
                                    <Flex flexDir={'column'} gap={'0.4rem'}>
                                        <Flex fontWeight={600} fontSize={'0.85rem'}>
                                            <Text>Invoices</Text>
                                        </Flex>
                                        {
                                            invoiceList?.map((item,index)=>(
                                                <InvoiceCards key={index} data={item} />
                                            ))
                                        }
                                    </Flex>
                                </Flex>
                            </>
                    }
                </Flex>
            </>

        </Flex>
    )
}

export default SingleConvertedLeads

const InvoiceCards = ({data}) => {
    return <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        bg="var(--yellow-color)"
        maxW="sm"
    >
        <Flex justify={'space-between'}>
        <Text fontSize={'1rem'} fontWeight={700}>
            {data.name}
        </Text>
        <Text fontSize={'1rem'} fontWeight={500} bg={'rgba(0,0,0,0.3)'} px={'0.5rem'} borderRadius={'8px'}>
            {data.number}
        </Text>
        </Flex>
        <Grid templateColumns={'repeat(2,1fr)'} mt={'1rem'} gap={'0.5rem'}>
            <Flex flexDir={'column'}>
                <Text fontWeight={500} fontSize={'0.9rem'}>Payment Status</Text>
                <Text fontWeight={600} fontSize={'1.2rem'}>{data.paymentstatus}</Text>
            </Flex>
            <Flex flexDir={'column'}>
                <Text fontWeight={500} fontSize={'0.9rem'}>Total Amount</Text>
                <Text fontWeight={600} fontSize={'1.2rem'}>₹{data.totalamount}</Text>
            </Flex>
            <Flex flexDir={'column'}>
                <Text fontWeight={500} fontSize={'0.9rem'}>Percentage</Text>
                <Text fontWeight={600} fontSize={'1.2rem'}>{data.percentage}</Text>
            </Flex>
            <Flex flexDir={'column'}>
                <Text fontWeight={500} fontSize={'0.9rem'}>Commission</Text>
                <Text fontWeight={600} fontSize={'1.2rem'}>₹{data.commission}</Text>
            </Flex>
        </Grid>
    </Box>
};