import { Flex, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'
import { FaCalendarAlt } from "react-icons/fa";

const DatePickerWrapper = ({children}) => {
  return (
    <Flex borderRadius={'6px'} pos={'relative'}>
    {children}
      <FaCalendarAlt className='datePickerIcon' style={{position:'absolute',zIndex:88}} />
      </Flex>
  )
}

export default DatePickerWrapper