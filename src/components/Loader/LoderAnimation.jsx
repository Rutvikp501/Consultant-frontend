import { Box, Flex } from '@chakra-ui/react'
import Lottie from 'lottie-react'
import React from 'react'
import Loader from '../../assets/lottie/loader.json'

const LoderAnimation = () => {
    return (
        <Flex w={'full'} justifyContent={'center'} alignItems={'center'} mt={'4rem'}>
            <Box boxSize={'4rem'}>
                <Lottie animationData={Loader} loop={true} width={10} height={10} />
            </Box>
        </Flex>
    )
}

export default LoderAnimation