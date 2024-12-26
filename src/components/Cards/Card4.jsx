import { Badge, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'

const Card4 = ({title='',des='',status=0,consultant_code='',leadID='',name='',leadType='',_id=''}) => {
  let bgColor = 'var(--yellow-color)'
  let borderColor = 'var(--yellow1-color)'
  let textColor = 'var(--yellow2-color)'
  return (
    <Link to={`/converted/${_id}`}>
    <Flex w={'full'} bgGradient={'linear(90deg, #f3c51f43, #f88d293b)'} flexDir={'column'} alignItems={'center'} p={'0.5rem 0.9rem'} borderRadius={'8px'} >
        <Flex w={'full'} justifyContent={'space-between'}>
            {/* <Text fontWeight={700} fontSize={'0.7rem'}>{consultant_code}</Text> */}
            {/* <Badge colorScheme='blue' px={'0.3rem'} fontWeight={600} borderRadius={'5px'}>{leadType}</Badge> */}
        </Flex>
        <Flex w={'full'} justifyContent={'space-between'}>
        <Flex flexDir={'column'}>
            <Text fontWeight={400} fontSize={'0.8rem'}>{leadID}</Text>
            <Text fontWeight={600} maxW={'50vw'} textOverflow={'ellipsis'} whiteSpace={'nowrap'} overflow={'hidden'}>{name}</Text>
        </Flex>
        <Flex color={textColor} alignItems={'center'} gap={'0.1rem'}>
            {/* <Text fontSize={'0.8rem'}>{status == 0?'Failed':status == 1?'Success':'Pending'}</Text> */}
            <IoIosArrowForward fontSize={'1rem'} />
        </Flex>
        </Flex>
    </Flex>
    </Link>
  )
}

export default Card4