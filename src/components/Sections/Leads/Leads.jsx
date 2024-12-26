import { Button, Flex, Grid, Image, Text } from '@chakra-ui/react'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { getCommonApi } from '../../../services/ApiCalls'
import LoderAnimation from '../../Loader/LoderAnimation'
import Card1 from '../../Cards/Card1'

const Leads = () => {
    const [isLoading, setisLoading] = useState(false)
    const [leads, setleads] = useState([])
    const getLeads = useCallback(async () => {
        try {
            setisLoading(true)
            const res = await getCommonApi('/leadapi/getpendingLeads')
            if (res?.success) {
                setleads(res?.data)
            }
        } catch (error) {
            console.error(error);
        }finally{
            setisLoading(false)
        }
    },[])
    useEffect(()=>{
        getLeads()
    },[])
  return (
  <>
    <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Text fontWeight={600}>Your Leads</Text>
        <Link to={'/addLeads'}>
        <Button bg={'#59509B'} _hover={{bg:'#59509B'}} color={'white'} size={'sm'} py={'1.2rem'} borderRadius={'full'} leftIcon={<FaPlus />}>
            Add Leads
        </Button>
        </Link>
        </Flex>
        {
            isLoading?
            <>
            <LoderAnimation />
            </>:
        <Grid templateColumns={'repeat(1,1fr)'}  gap={'0.5rem'}>
            {
                leads?.map((item,index)=>(
                    <Card1 {...item} key={index} />
                ))
            }
        </Grid>
        }
    </>
  )
}

export default memo(Leads)