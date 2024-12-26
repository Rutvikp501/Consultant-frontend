import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Flex } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import AllRoutes from './routes/AllRoutes'

function App() {
  const { pathname } = useLocation()
  return (
    <>
    <Flex h={'100vh'} flexDir={'column'}>
    <AllRoutes />
    {/* {pathname != '/login' && pathname != '/' && pathname != '/signup' && <BottomBar />} */}
    </Flex>
    </>
  )
}

export default App
