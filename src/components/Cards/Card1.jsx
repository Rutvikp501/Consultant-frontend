import { Badge, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'

const Card1 = ({title='',des='',status=0,consultant_code='',leadID='',name='',leadType='',_id=''}) => {
  let bgColor = status =='Failed'?'var(--red-color)':status =='Success'?'var(--green-color)':'var(--yellow-color)'
  let borderColor = status =='Failed'?'var(--red1-color)':status =='Success'?'var(--green1-color)':'var(--yellow1-color)'
  let textColor = status =='Failed'?'var(--red2-color)':status =='Success'?'var(--green2-color)':'var(--yellow2-color)'
  return (
    <Link to={`/leads/${_id}`}>
    <Flex w={'full'} bg={bgColor} flexDir={'column'} alignItems={'center'} p={'0.5rem 0.9rem'} border={`1px solid ${borderColor}`} borderRadius={'8px'} >
        <Flex w={'full'} justifyContent={'space-between'}>
            <Text fontWeight={700} fontSize={'0.7rem'}>{consultant_code}</Text>
            <Badge colorScheme='blue' px={'0.3rem'} fontWeight={600} borderRadius={'5px'}>{leadType}</Badge>
        </Flex>
        <Flex w={'full'} justifyContent={'space-between'}>
        <Flex flexDir={'column'}>
            <Text fontWeight={600} maxW={'50vw'} textOverflow={'ellipsis'} whiteSpace={'nowrap'} overflow={'hidden'}>{name}</Text>
            <Text fontWeight={400} fontSize={'0.8rem'}>{leadID}</Text>
        </Flex>
        <Flex color={textColor} alignItems={'center'} gap={'0.1rem'}>
            <Text fontSize={'0.8rem'}>{status == 0?'Failed':status == 1?'Success':'Pending'}</Text>
            <IoIosArrowForward fontSize={'0.8rem'} />
        </Flex>
        </Flex>
    </Flex>
    </Link>
  )
}

export default Card1