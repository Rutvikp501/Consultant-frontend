import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Card3 = ({ children, title }) => {
    return (
        <Flex border={'1px solid rgba(0,0,0,0.2)'} p={'0.8rem'} borderRadius={'8px'} pos={'relative'}>
            <Flex fontWeight={600} bg={'#fff'} pos={'absolute'} top={'-10px'} left={'10px'} padding={'0 0.5rem'} fontSize={'0.85rem'} zIndex={10}>
                <Text>{title}</Text>
            </Flex>
            {children}
        </Flex>
    )
}

export default Card3