import { Flex, Grid, Text } from '@chakra-ui/react'
import React from 'react'

const Card2 = ({item}) => {
    return (
        <Flex p={'0.6rem 1rem'} borderRadius={'12px'} flexDir={'column'} gap={'1rem'}>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Flex flexDir={'column'} w={'full'} justifyContent={'center'}>
                <Text noOfLines={1} m={0} fontSize={'0.9rem'} fontWeight={600}>{item?.title}</Text>
                <Text fontSize={'0.8rem'}>{item?.des}</Text>
            </Flex>
            <Text fontSize={'1.2rem'} fontWeight={600}>{item?.status}</Text>
            </Flex>
            {item?.subList?.length>0 && <Grid templateColumns={'repeat(2,1fr)'} gap={'1rem'}>
            {
                item?.subList?.map((subList,index) =>{
                    return  (subList.key != 'Junk' &&  (
                        <Flex className='statusCards' key={index}  borderRadius={'lg'} p={'0.8rem 0.5rem'} justifyContent={'space-between'}>
                            <Text fontSize={'0.9rem'} fontWeight={600}>{subList?.key}</Text>
                            <Text fontSize={'0.9rem'} fontWeight={600}>{subList?.status}</Text>
                        </Flex>
                    ))
                })
            }
            </Grid>}
        </Flex>
    )
}

export default Card2