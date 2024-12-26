import { Flex, Image, Text } from '@chakra-ui/react'
import React, { memo } from 'react'

const NoData = () => {
  return (
    <Flex flexDir={'column'} gap={'0.4rem'} w={'full'} alignItems={'center'} pt={'8rem'}>
        <Image src='/images/nodata.png' width={'60%'} alt='image' />
        <Text fontSize={'0.9rem'} opacity={0.5}>No data available</Text>
    </Flex>
  )
}

export default memo(NoData)