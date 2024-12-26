import { Flex, Input, Text } from '@chakra-ui/react'
import React, { memo } from 'react'

const InputWrapper = ({ title, children }) => {
    return (
        <Flex flexDir={'column'} pos={'relative'}>
            <Flex bg={'#fff'} color={'rgba(0,0,0,0.8)'} fontWeight={500} pos={'absolute'} top={'-10px'} left={'10px'} padding={'0 0.5rem'} fontSize={'0.7rem'} zIndex={10}>
                <Text>{title}</Text>
            </Flex>
            {children}
        </Flex>
    )
}

export default memo(InputWrapper)